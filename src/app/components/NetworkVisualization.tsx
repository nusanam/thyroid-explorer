import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import type { SimulationLink, SimulationNode } from '../data/types';
import { getSimulationNodeAriaLabel } from '../utils/accessibility';
import { getEntranceDelay } from '../utils/animation';
import { getNodeId } from '../utils/helpers';
import { calculateLayout, createCurvedPath } from '../utils/layout';
import { findPathsFromSimulationNode } from '../utils/pathfinder';
import {
  getSimulationLinkColor,
  getSimulationLinkOpacity,
  getSimulationLinkWidth,
  getSimulationNodeColor,
  getSimulationNodeLabelSize,
  getSimulationNodeOpacity,
  getSimulationNodeRadius,
} from '../utils/styling';
import { hideLinkTooltip, showLinkTooltip } from '../utils/tooltip';
interface Props {
  nodes: SimulationNode[];
  links: SimulationLink[];
  severity: 'normal' | 'subclinical' | 'overt';
  highlightedPath?: string[];
  selectedNode?: string;
  hoveredNode?: string;
  onNodeClick: (nodeId: string) => void;
  onNodeHover: (nodeId: string | null) => void;
  width: number;
  height: number;
  isMobile: boolean;
  scenarios?: string;
}

export const NetworkVisualization: React.FC<Props> = ({
  nodes,
  links,
  severity,
  highlightedPath,
  selectedNode,
  hoveredNode,
  onNodeClick,
  onNodeHover,
  width,
  height,
  // isMobile,
  // scenarios,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Calculate layout ONCE for all nodes - this returns Record<nodeId, {x, y}>
    const layout = calculateLayout(nodes, width, height);

    // Create groups for layering (links behind nodes)
    const linksGroup = svg.append('g').attr('class', 'links');
    const nodesGroup = svg.append('g').attr('class', 'nodes');

    // ==================== RENDER links ====================
    const linkPaths = linksGroup
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', (d) => {
        const sourceId = getNodeId(d.source);
        const targetId = getNodeId(d.target);

        const source = layout[sourceId];
        const target = layout[targetId];
        return createCurvedPath(source, target); // Using helper
      })
      .attr('stroke', (d) => getSimulationLinkColor(d.type)) // Using helper
      .attr('stroke-width', (d) => getSimulationLinkWidth(d.strength, severity)) // Using helper with severity
      .attr('fill', 'none')
      .attr('opacity', (d) =>
        getSimulationLinkOpacity(d, highlightedPath, hoveredNode)
      ) // Using helper
      .attr('class', 'connection transition-all duration-300')
      .style('cursor', 'pointer')
      .on('mouseenter', function (_event, d) {
        d3.select(this)
          .attr('opacity', 0.9)
          .attr(
            'stroke-width',
            getSimulationLinkWidth(d.strength, severity) + 2
          );

        // Show tooltip (implement separately)
        showLinkTooltip(_event, d);
      })
      .on('mouseleave', function (_event, d) {
        d3.select(this)
          .attr(
            'opacity',
            getSimulationLinkOpacity(d, highlightedPath, hoveredNode)
          )
          .attr('stroke-width', getSimulationLinkWidth(d.strength, severity));

        hideLinkTooltip();
      });

    // Add arrow markers for links
    svg
      .append('defs')
      .selectAll('marker')
      .data(['inhibitory', 'stimulatory', 'regulatory'])
      .join('marker')
      .attr('id', (d) => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 35) // Offset so arrow doesn't overlap node
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', (d) =>
        getSimulationLinkColor(d as 'inhibitory' | 'stimulatory' | 'regulatory')
      );

    linkPaths.attr('marker-end', (d) => `url(#arrow-${d.type})`);

    // ==================== RENDER NODES ====================
    const nodeGroups = nodesGroup
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr(
        'transform',
        (d) => `translate(${layout[d.id].x}, ${layout[d.id].y})`
      )
      .attr('class', 'node')
      .attr('role', 'button')
      .attr('tabindex', 0)
      .attr('aria-label', (d) => getSimulationNodeAriaLabel(d, links)) // Using helper
      .style('cursor', 'pointer')
      .style('opacity', (d) =>
        getSimulationNodeOpacity(d, highlightedPath, hoveredNode)
      ) // Using helper
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d.id);
      })
      .on('mouseenter', (_event, d) => {
        onNodeHover(d.id);

        // Highlight connected paths
        const paths = findPathsFromSimulationNode(d.id, links); // Using helper

        // Update connection opacities
        linkPaths.attr('opacity', (conn) => {
          const isConnected = conn.source === d.id || conn.target === d.id;
          return isConnected ? 0.9 : 0.1;
        });

        // Update node opacities
        nodeGroups.style('opacity', (node) => {
          if (node.id === d.id) return 1;
          const isConnected = links.some(
            (c) =>
              (c.source === d.id && c.target === node.id) ||
              (c.target === d.id && c.source === node.id)
          );
          return isConnected ? 1 : 0.3;
        });
      })
      .on('mouseleave', () => {
        onNodeHover(null);

        // Reset opacities
        linkPaths.attr('opacity', (d) =>
          getSimulationLinkOpacity(d, highlightedPath, hoveredNode)
        );
        nodeGroups.style('opacity', (d) =>
          getSimulationNodeOpacity(d, highlightedPath, hoveredNode)
        );
      })
      .on('keydown', (event, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNodeClick(d.id);
        }
      });

    // Node circles
    nodeGroups
      .append('circle')
      .attr('r', (d) =>
        getSimulationNodeRadius(d, severity, d.id === selectedNode)
      ) // Using helper
      .attr('fill', (d) => getSimulationNodeColor(d.category)) // Using helper
      .attr('stroke', (d) => (d.id === selectedNode ? '#000' : '#fff'))
      .attr('stroke-width', (d) => (d.id === selectedNode ? 3 : 2))
      .attr('class', 'transition-all duration-300')
      .style('filter', (d) =>
        d.id === selectedNode ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
      );

    // Node labels
    nodeGroups
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'dy',
        (d) => getSimulationNodeRadius(d, severity, d.id === selectedNode) + 20
      ) // Position below node
      .attr('font-size', (d) =>
        getSimulationNodeLabelSize(d, d.id === selectedNode)
      ) // Using helper
      .attr('font-weight', (d) => (d.id === selectedNode ? 700 : 600))
      .attr('fill', '#1f2937')
      .attr('class', 'transition-all duration-300')
      .text((d) => d.label)
      .style('pointer-events', 'none'); // Don't interfere with node interactions

    // Optional: Add node value indicators for selected scenario
    if (severity !== 'normal') {
      nodeGroups
        .filter((d) => d.category === 'thyroid')
        .append('circle')
        .attr('r', 8)
        .attr('cx', 25)
        .attr('cy', -25)
        .attr('fill', severity === 'overt' ? '#ef4444' : '#eab308')
        .attr('class', 'pulse');
    }

    // ==================== ENTRANCE ANIMATIONS ====================
    nodeGroups
      .style('opacity', 0)
      .transition()
      .duration(600)
      .delay((_d, i) => getEntranceDelay(i, 50)) // Using helper
      .style('opacity', (d) =>
        getSimulationNodeOpacity(d, highlightedPath, hoveredNode)
      );

    linkPaths
      .attr('stroke-dasharray', function () {
        const length = (this as SVGPathElement).getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke-dashoffset', function () {
        return (this as SVGPathElement).getTotalLength();
      })
      .transition()
      .duration(1000)
      .delay((_d, i) => getEntranceDelay(i, 30))
      .attr('stroke-dashoffset', 0);
  }, [
    onNodeClick,
    onNodeHover,
    nodes,
    links,
    severity,
    highlightedPath,
    selectedNode,
    hoveredNode,
    width,
    height,
  ]);

  return (
    <div className='relative'>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className='thyroid-network'
        style={{ background: '#fafafa' }}
      />
      <div
        ref={tooltipRef}
        className='absolute pointer-events-none z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm'
        style={{
          display: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
    </div>
  );
};
