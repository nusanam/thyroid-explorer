import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import type { SimulationLink, SimulationNode } from '../data/types';
import { getSimulationNodeAriaLabel } from '../utils/accessibility';
import { getEntranceDelay } from '../utils/animation';
import { getNodeId } from '../utils/helpers';
import { calculateLayout, createCurvedPath } from '../utils/layout';
import {
  clearPathHighlight,
  findPathsFromSimulationNode,
  highlightConnectedElements,
  highlightPathsFromNode,
} from '../utils/pathfinder';
import {
  getSimulationLinkColor,
  getSimulationLinkOpacity,
  getSimulationLinkWidth,
  getSimulationNodeColor,
  getSimulationNodeLabelSize,
  getSimulationNodeOpacity,
  getSimulationNodeRadius,
} from '../utils/styling';
import {
  hideLinkTooltip,
  showLinkTooltip,
  showNodeTooltip,
  updateTooltipPosition,
} from '../utils/tooltip';
interface Props {
  nodes: SimulationNode[];
  links: SimulationLink[];
  severity: 'normal' | 'subclinical' | 'overt';
  highlightedPath: string[] | null;
  selectedNode: string | null;
  hoveredNode: string | null;
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
  isMobile,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // State for path highlighting
  const [activePathMode, setActivePathMode] = useState<
    'downstream' | 'upstream' | 'both'
  >('both');
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(
    new Set()
  );
  const [highlightedLinks, setHighlightedLinks] = useState<Set<string>>(
    new Set()
  );

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
      .attr('id', (_, i) => `link-${i}`) // Add ID for path highlighting
      .attr('d', (d) => {
        const sourceId = getNodeId(d.source);
        const targetId = getNodeId(d.target);

        const source = layout[sourceId];
        const target = layout[targetId];

        // Skip if source or target doesn't exist
        if (!source || !target) {
          console.warn(`Missing node in layout: ${sourceId} -> ${targetId}`);
          return 'M 0,0';
        }

        return createCurvedPath(source, target);
      })
      .attr('stroke', (d) => getSimulationLinkColor(d.type)) // Using helper
      .attr('stroke-width', (d, i) => {
        const linkId = `link-${i}`;
        if (highlightedLinks.size > 0) {
          return highlightedLinks.has(linkId) ? 0.9 : 0.1;
        }
        return getSimulationLinkOpacity(d, highlightedPath, hoveredNode);
      }) // Using helper with severity
      .attr('fill', 'none')
      .attr('opacity', (d) =>
        getSimulationLinkOpacity(d, highlightedPath, hoveredNode)
      ) // Using helper
      .attr('class', 'connection transition-all duration-300')
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .attr('opacity', 0.9)
          .attr(
            'stroke-width',
            getSimulationLinkWidth(d.strength, severity, isMobile) + 2
          );

        // Show tooltip (implement separately)
        showLinkTooltip(event, d, tooltipRef, nodes);
      })
      .on('mouseleave', function (_event, d) {
        d3.select(this)
          .attr('opacity', (_, i) => {
            const linkId = `link-${i}`;
            if (highlightedLinks.size > 0) {
              return highlightedLinks.has(linkId) ? 0.9 : 0.1;
            }
            return getSimulationLinkOpacity(d, highlightedPath, hoveredNode);
          })
          .attr('stroke-width', (_, i) => {
            const linkId = `link-${i}`;
            const isHighlighted = highlightedLinks.has(linkId);
            return (
              getSimulationLinkWidth(d.strength, severity) +
              (isHighlighted ? 3 : 0)
            );
          });

        hideLinkTooltip(tooltipRef);
      })
      .on('mousemove', function (event) {
        updateTooltipPosition(event, tooltipRef); // ADD THIS
      });

    // Add arrow markers for links
    svg
      .append('defs')
      .selectAll('marker')
      .data(['inhibitory', 'stimulatory', 'regulatory'])
      .join('marker')
      .attr('id', (d) => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 35)
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
      .style('opacity', (d) => {
        if (highlightedNodes.size > 0) {
          return highlightedNodes.has(d.id) ? 1 : 0.2;
        }
        return getSimulationNodeOpacity(d, highlightedPath, hoveredNode);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d.id);

        // Only highlight paths, don't toggle off
        const paths = findPathsFromSimulationNode(d.id, links);
        highlightConnectedElements(
          d.id,
          paths,
          setHighlightedNodes,
          setHighlightedLinks,
          activePathMode
        );
      })
      .on('mouseenter', function (event, d) {
        // Only show tooltip, don't trigger path highlighting
        showNodeTooltip(event, d, tooltipRef);

        // Commented out to debug disappear on hover/click
        // onNodeHover(d.id);
        // if (!selectedNode) {
        //   const paths = findPathsFromSimulationNode(d.id, links);
        //   highlightConnectedElements(
        //     d.id,
        //     paths,
        //     setHighlightedNodes,
        //     setHighlightedLinks,
        //     activePathMode
        //   );
        // }
      })
      .on('mouseleave', () => {
        // Only hide tooltip, don't clear highlighting
        hideLinkTooltip(tooltipRef);

        // Commented out to debug disappear on hover/click
        // onNodeHover(null);
        // if (!selectedNode) {
        //   clearPathHighlight(setHighlightedNodes, setHighlightedLinks);
        // }
      })
      .on('mousemove', function (event: MouseEvent) {
        updateTooltipPosition(event, tooltipRef);
      })
      .on('keydown', (event: KeyboardEvent, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNodeClick(d.id);
          highlightPathsFromNode(
            d.id,
            links,
            nodes,
            tooltipRef,
            setHighlightedNodes,
            setHighlightedLinks,
            activePathMode
          );
        }
      });

    // Node circles
    nodeGroups
      .append('circle')
      .attr('r', (d) =>
        getSimulationNodeRadius(d, severity, d.id === selectedNode, isMobile)
      )
      .attr('fill', (d) => getSimulationNodeColor(d.category, severity)) // Add severity parameter
      .attr('stroke', (d) => (d.id === selectedNode ? '#000' : '#fff'))
      .attr('stroke-width', (d) => (d.id === selectedNode ? 3 : 2))
      .attr('class', 'transition-all duration-300')
      .style('filter', (d) =>
        d.id === selectedNode ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
      );

    // Node labels - Position based on node category
    nodeGroups
      .append('text')
      .attr('text-anchor', (d) => {
        // Right-side nodes: position label to the left of the node
        if (d.category === 'reproductive') {
          return 'end';
        }
        // Left-side nodes: position label to the right
        if (d.category === 'thyroid') {
          return 'start';
        }
        // Middle nodes: center
        return 'middle';
      })
      .attr('dx', (d) => {
        if (d.category === 'reproductive')
          return (
            -getSimulationNodeRadius(
              d,
              severity,
              d.id === selectedNode,
              isMobile
            ) - 8
          );
        if (d.category === 'thyroid')
          return (
            getSimulationNodeRadius(
              d,
              severity,
              d.id === selectedNode,
              isMobile
            ) + 8
          );
        return 0;
      })
      .attr('dy', (d) => {
        // Only offset vertically for middle nodes
        if (d.category === 'intermediate') {
          return (
            getSimulationNodeRadius(
              d,
              severity,
              d.id === selectedNode,
              isMobile
            ) + 25
          );
        }
        return 5; // Vertically center for left/right nodes
      })
      .attr('font-size', (d) =>
        getSimulationNodeLabelSize(d, d.id === selectedNode, isMobile)
      )
      .attr('font-weight', (d) => (d.id === selectedNode ? 700 : 600))
      .attr('fill', '#4d787ecc')
      .attr('class', 'transition-all duration-300')
      .text((d) => d.label)
      .style('pointer-events', 'none');

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
      .duration(600)
      .delay((_d, i) => getEntranceDelay(i, 30))
      .attr('stroke-dashoffset', 0);
  }, [
    onNodeClick,
    onNodeHover,
    highlightedLinks,
    highlightedNodes,
    activePathMode,
    nodes,
    links,
    severity,
    highlightedPath,
    selectedNode,
    hoveredNode,
    width,
    height,
    isMobile,
  ]);

  return (
    <div className='relative'>
      {/* Path Mode Controls */}
      <div className='absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10'>
        <div className='text-xs font-semibold mb-2 text-[#4d787ecc]'>
          Path Display:
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => setActivePathMode('upstream')}
            className={`px-3 py-1 text-xs rounded ${
              activePathMode === 'upstream'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-[#8e9047] hover:bg-gray-300'
            }`}
          >
            ← Upstream
          </button>
          <button
            onClick={() => setActivePathMode('both')}
            className={`px-3 py-1 text-xs rounded ${
              activePathMode === 'both'
                ? 'bg-[#4d787ecc] text-white'
                : 'bg-text-[#588a91cc] text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⇄ Both
          </button>
          <button
            onClick={() => setActivePathMode('downstream')}
            className={`px-3 py-1 text-xs rounded ${
              activePathMode === 'downstream'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-[#8e9047] hover:bg-gray-300'
            }`}
          >
            Downstream →
          </button>
        </div>
        {highlightedNodes.size > 0 && (
          <button
            onClick={() =>
              clearPathHighlight(setHighlightedNodes, setHighlightedLinks)
            }
            className='mt-2 w-full px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200'
          >
            Clear Highlight
          </button>
        )}
      </div>

      <svg
        ref={svgRef}
        width={width}
        height={height}
        className='thyroid-network'
        style={{ background: '#fafafa' }}
        onClick={() =>
          clearPathHighlight(setHighlightedNodes, setHighlightedLinks)
        }
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
