import type { SimulationNode } from '../data/types';

export const calculateVerticalArcLayout = (
  nodes: SimulationNode[],
  height: number,
): Record<string, { x: number; y: number }> => {
  const layout: Record<string, { x: number; y: number }> = {};

  // Sort nodes by category to maintain flow
  const sortedNodes = [
    ...nodes.filter((n) => n.category === 'thyroid'),
    ...nodes.filter((n) => n.category === 'intermediate'),
    ...nodes.filter((n) => n.category === 'reproductive'),
  ];

  // All nodes on a vertical line on the left
  const x = 200; // Left margin with space for labels
  const padding = 60;
  const availableHeight = height - padding * 2;
  const spacing = availableHeight / (sortedNodes.length - 1);

  sortedNodes.forEach((node, i) => {
    layout[node.id] = {
      x: x,
      y: padding + i * spacing,
    };
  });

  return layout;
};

export const createVerticalArcPath = (
  source: { x: number; y: number },
  target: { x: number; y: number },
): string => {
  const dy = target.y - source.y;

  // Control point that extends to the RIGHT
  // The further apart vertically, the wider the arc
  const arcWidth = Math.abs(dy) * 0.5; // Arc extends right based on vertical distance
  const controlX = source.x + arcWidth; // Extend RIGHT from the vertical line
  const controlY = source.y + dy / 2; // Halfway between source and target vertically

  // Quadratic bezier curve
  return `M ${source.x},${source.y} Q ${controlX},${controlY} ${target.x},${target.y}`;
};
