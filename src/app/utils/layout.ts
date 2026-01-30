import type { SimulationNode } from '../data/types';

export const calculateVerticalArcLayout = (
  nodes: SimulationNode[],
): Record<string, { x: number; y: number }> => {
  const layout: Record<string, { x: number; y: number }> = {};

  const thyroidNodes = nodes.filter((n) => n.category === 'thyroid');
  const intermediateNodes = nodes.filter((n) => n.category === 'intermediate');
  const reproductiveNodes = nodes.filter((n) => n.category === 'reproductive');

  const x = 200;
  const marginTop = 15;
  const withinCategoryStep = 16; // Spacing within same category
  const betweenCategoryGap = 22; // Extra gap between categories

  let currentY = marginTop;

  // Position thyroid nodes
  thyroidNodes.forEach((node) => {
    layout[node.id] = { x, y: currentY };
    currentY += withinCategoryStep;
  });

  // Add extra gap before intermediate nodes
  currentY += betweenCategoryGap - withinCategoryStep;

  // Position intermediate nodes
  intermediateNodes.forEach((node) => {
    layout[node.id] = { x, y: currentY };
    currentY += withinCategoryStep;
  });

  // Add extra gap before reproductive nodes
  currentY += betweenCategoryGap - withinCategoryStep;

  // Position reproductive nodes
  reproductiveNodes.forEach((node) => {
    layout[node.id] = { x, y: currentY };
    currentY += withinCategoryStep;
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

export const calculateVisualizationHeight = (
  nodes: SimulationNode[],
): number => {
  const thyroidCount = nodes.filter((n) => n.category === 'thyroid').length;
  const intermediateCount = nodes.filter(
    (n) => n.category === 'intermediate',
  ).length;
  const reproductiveCount = nodes.filter(
    (n) => n.category === 'reproductive',
  ).length;

  const withinCategoryStep = 18;
  const betweenCategoryGap = 20;
  const marginTop = 15;
  const marginBottom = 10;

  return (
    marginTop +
    (thyroidCount - 1) * withinCategoryStep +
    betweenCategoryGap +
    (intermediateCount - 1) * withinCategoryStep +
    betweenCategoryGap +
    (reproductiveCount - 1) * withinCategoryStep +
    marginBottom
  );
};
