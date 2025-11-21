import * as d3 from 'd3';
import type { SimulationLink } from '../data/types';
import { getNodeId } from '../utils/helpers';
import { getSimulationLinkColor } from '../utils/styling';

export function addParticleFlow(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  links: SimulationLink[],
  layout: Record<string, { x: number; y: number }>
) {
  links.forEach((link) => {
    const sourceId = getNodeId(link.source);
    const targetId = getNodeId(link.target);
    const source = layout[sourceId];
    const target = layout[targetId];

    // Create particle
    const particle = svg
      .append('circle')
      .attr('r', 3)
      .attr('fill', getSimulationLinkColor(link.type))
      .attr('cx', source.x)
      .attr('cy', source.y);

    function animateParticle() {
      particle
        .attr('cx', source.x)
        .attr('cy', source.y)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('cx', target.x)
        .attr('cy', target.y)
        .on('end', () => {
          // Fade out and restart
          particle
            .transition()
            .duration(200)
            .attr('opacity', 0)
            .on('end', () => {
              particle.attr('opacity', 1);
              setTimeout(animateParticle, Math.random() * 2000);
            });
        });
    }

    // Start with random delay
    setTimeout(animateParticle, Math.random() * 2000);
  });
}
