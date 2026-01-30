import type { SimulationNode } from '../data/types';

export const calculateVerticalArcLayout = (
  nodes: SimulationNode[],
): Record<string, { x: number; y: number }> => {
  const layout: Record<string, { x: number; y: number }> = {};

  const sortedNodes = [
    ...nodes.filter((n) => n.category === 'thyroid'),
    ...nodes.filter((n) => n.category === 'intermediate'),
    ...nodes.filter((n) => n.category === 'reproductive'),
  ];

  const x = 200;
  const marginTop = 40;
  const step = 25; // Fixed spacing between nodes (Observable uses 14)

  sortedNodes.forEach((node, i) => {
    layout[node.id] = {
      x: x,
      y: marginTop + i * step, // Fixed step instead of proportional
    };
  });

  return layout;
};

export const createVerticalArcPath = (
  source: { x: number; y: number },
  target: { x: number; y: number },
): string => {
  const dy = target.y - source.y;

  // use the vertical distance as the radius for a semicircular arc
  const radius = Math.abs(dy) / 2;

  // determine sweep direction based on whether target is above or below source
  // sweep = 1 means arc curves to the right (clockwise from bottom perspective)
  // sweep = 0 means arc curves to the right (counterclockwise from top perspective)
  const sweep = dy > 0 ? 1 : 0;

  // SVG Arc: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  return `M ${source.x},${source.y} A ${radius},${radius} 0 0,${sweep} ${target.x},${target.y}`;
};
