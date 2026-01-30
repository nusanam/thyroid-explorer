import * as d3 from 'd3';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import type { SimulationLink, SimulationNode } from '../data/types';
import { getNodeId } from '../utils/helpers';
import {
  calculateVerticalArcLayout,
  createVerticalArcPath,
} from '../utils/layout';
import {
  getSimulationLinkColor,
  getSimulationLinkWidth,
  getSimulationNodeColor,
  getSimulationNodeLabelSize,
  getSimulationNodeRadius,
} from '../utils/styling';

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

  const layout = useMemo(() => {
    return calculateVerticalArcLayout(nodes, height);
  }, [nodes, height]);

  const isLinkInPath = useCallback(
    (link: SimulationLink): boolean => {
      if (!highlightedPath || highlightedPath.length < 2) return false;

      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      for (let i = 0; i < highlightedPath.length - 1; i++) {
        if (
          sourceId === highlightedPath[i] &&
          targetId === highlightedPath[i + 1]
        ) {
          return true;
        }
      }
      return false;
    },
    [highlightedPath],
  );

  const getLinkOpacity = useCallback(
    (link: SimulationLink): number => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (highlightedPath && highlightedPath.length > 0) {
        return isLinkInPath(link) ? 0.8 : 0.05;
      }

      if (selectedNode || hoveredNode) {
        const activeNode = selectedNode || hoveredNode;
        if (sourceId === activeNode || targetId === activeNode) {
          return 0.8;
        }
        return 0.1;
      }

      return 0.15;
    },
    [highlightedPath, selectedNode, hoveredNode, isLinkInPath],
  );

  const getNodeOpacity = useCallback(
    (node: SimulationNode): number => {
      if (highlightedPath && highlightedPath.length > 0) {
        return highlightedPath.includes(node.id) ? 1 : 0.2;
      }

      if (node.id === selectedNode || node.id === hoveredNode) {
        return 1;
      }

      return 0.4;
    },
    [highlightedPath, selectedNode, hoveredNode],
  );

  useEffect(() => {
    if (!svgRef.current || Object.keys(layout).length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const linksGroup = svg.append('g').attr('class', 'links');
    const nodesGroup = svg.append('g').attr('class', 'nodes');

    // Render links
    linksGroup
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', (d) => {
        const sourceId = getNodeId(d.source);
        const targetId = getNodeId(d.target);
        const source = layout[sourceId];
        const target = layout[targetId];
        return createVerticalArcPath(source, target);
      })
      .attr('stroke', (d) => getSimulationLinkColor(d.type))
      .attr('stroke-width', (d) =>
        getSimulationLinkWidth(d.strength, severity, isMobile),
      )
      .attr('fill', 'none')
      .attr('opacity', (d) => getLinkOpacity(d))
      .attr('class', 'transition-opacity duration-300')
      .style('pointer-events', 'none');

    // Render nodes
    const nodeGroups = nodesGroup
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr(
        'transform',
        (d) => `translate(${layout[d.id].x}, ${layout[d.id].y})`,
      )
      .attr('class', 'node cursor-pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick(d.id);
      })
      .on('mouseenter', (_event, d) => {
        onNodeHover(d.id);
      })
      .on('mouseleave', () => {
        onNodeHover(null);
      });

    nodeGroups
      .append('circle')
      .attr('r', (d) => {
        const isActive = d.id === selectedNode || d.id === hoveredNode;
        const isInPath = highlightedPath?.includes(d.id);
        return getSimulationNodeRadius(
          d,
          severity,
          isActive || !!isInPath,
          isMobile,
        );
      })
      .attr('fill', (d) => getSimulationNodeColor(d.category))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', (d) => getNodeOpacity(d))
      .attr('class', 'transition-all duration-300');

    // Node labels - RIGHT-JUSTIFIED with more space
    nodeGroups
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', -40) // CHANGED: More space from circle (was -15)
      .attr('dy', '0.35em')
      .attr('font-size', (d) =>
        getSimulationNodeLabelSize(d, d.id === selectedNode, isMobile),
      )
      .attr('font-weight', (d) => (d.id === selectedNode ? 700 : 600))
      .attr('fill', '#1f2937')
      .attr('opacity', (d) => getNodeOpacity(d))
      .attr('class', 'transition-all duration-300')
      .text((d) => d.label)
      .style('pointer-events', 'none');
  }, [
    layout,
    links,
    nodes,
    severity,
    highlightedPath,
    selectedNode,
    hoveredNode,
    isMobile,
    onNodeClick,
    onNodeHover,
    getLinkOpacity,
    getNodeOpacity,
  ]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className='thyroid-network'
      style={{ background: '#fafafa' }}
    />
  );
};
