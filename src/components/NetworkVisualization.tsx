import { drag as d3Drag } from 'd3-drag';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
} from 'd3-force';
import { select } from 'd3-selection';
import { links } from '../data/links';
import { nodes } from '../data/nodes';
import type { SimulationLink, SimulationNode } from '../data/types';
import * as helper from '../utils/stylers';

// Option 1: Get dimensions from a container element
const container = document.getElementById('graph-container'); // or however you're selecting it
const width = container?.clientWidth || 800;
const height = container?.clientHeight || 600;

// Create SVG
const svg = select<SVGSVGElement, unknown>('#graph-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create simulation
const simulation = forceSimulation(nodes)
  .force(
    'link',
    forceLink<SimulationNode, SimulationLink>(links)
      .id((d: SimulationNode) => d.id)
      .distance((d: SimulationLink) => (d.strength === 'strong' ? 150 : 200))
  )
  .force('charge', forceManyBody().strength(-300))
  .force('center', forceCenter(width / 2, height / 2))
  .force('collide', forceCollide(50));

// Drag behavior
const drag = (simulation: any) => {
  function dragstarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3Drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

// Render links
const link = svg
  .append('g')
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('stroke', (d: SimulationLink) => helper.getSimulationLinkColor(d.type))
  .attr('stroke-width', (d: SimulationLink) =>
    helper.getSimulationLinkWidth(d.strength)
  )
  .attr('opacity', 0.6);

// Render nodes
const node = svg
  .append('g')
  .selectAll('circle')
  .data(nodes)
  .join('circle')
  .attr('r', 30)
  .attr('fill', (d: SimulationNode) =>
    helper.getSimulationNodeColor(d.category)
  )
  .call(drag(simulation));

// Update positions on simulation tick
simulation.on('tick', () => {
  link
    .attr('x1', (d: any) => d.source.x)
    .attr('y1', (d: any) => d.source.y)
    .attr('x2', (d: any) => d.target.x)
    .attr('y2', (d: any) => d.target.y);

  node
    .attr('cx', (d: SimulationNode) => d.x!)
    .attr('cy', (d: SimulationNode) => d.y!);
});
