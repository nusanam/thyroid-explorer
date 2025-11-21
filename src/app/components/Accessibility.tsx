// const nodeGroups = nodesGroup
//   .selectAll('g')
//   .data(nodes)
//   .join('g')
//   .attr('role', 'button')
//   .attr('aria-label', (d) => `${d.label}: ${d.description}`)
//   .attr('tabindex', 0)
//   .on('keydown', (event, d) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       onNodeClick(d.id);
//     }
//   });

// // Add focus styles
// svg
//   .selectAll('.node')
//   .on('focus', function () {
//     d3.select(this)
//       .select('circle')
//       .attr('stroke', '#000')
//       .attr('stroke-width', 3);
//   })
//   .on('blur', function () {
//     d3.select(this)
//       .select('circle')
//       .attr('stroke', '#fff')
//       .attr('stroke-width', 1.5);
//   });
