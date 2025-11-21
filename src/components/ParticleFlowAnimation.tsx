import { getSimulationLinkColor } from "../utils/stylers";

export function addParticleFlow(svg, links, layout) {
  links.forEach(link => {
    const source = layout[link.source];
    const target = layout[link.target];
    
    // Create particle
    const particle = svg.append('circle')
      .attr('r', 3)
      .attr('fill', getSimulationLinkColor(link.type))
      .attr('cx', source.x)
      .attr('cy', source.y);
    
    })
    return

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
}