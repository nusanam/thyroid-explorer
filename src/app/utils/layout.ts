import type { SimulationNode } from '../app/data/types';
// ==================== LAYOUT HELPERS ====================

/**
 * Calculate SimulationNode positions in a three-column layout
 */
export const calculateLayout = (
  SimulationNodes: SimulationNode[],
  width: number,
  height: number
): Record<string, { x: number; y: number }> => {
  const layout: Record<string, { x: number; y: number }> = {};

  const thyroidSimulationNodes = SimulationNodes.filter(
    (n) => n.category === 'thyroid'
  );
  const intermediateSimulationNodes = SimulationNodes.filter(
    (n) => n.category === 'intermediate'
  );
  const reproductiveSimulationNodes = SimulationNodes.filter(
    (n) => n.category === 'reproductive'
  );

  const columnWidth = width / 4;
  const padding = 80; // Padding source top/bottom

  // Position thyroid markers (left column)
  const thyroidHeight = height - padding * 2;
  const thyroidSpacing = thyroidHeight / (thyroidSimulationNodes.length + 1);

  thyroidSimulationNodes.forEach((SimulationNode, i) => {
    layout[SimulationNode.id] = {
      x: columnWidth,
      y: padding + (i + 1) * thyroidSpacing,
    };
  });

  // Position intermediate effects (middle column)
  const intermediateHeight = height - padding * 2;
  const intermediateSpacing =
    intermediateHeight / (intermediateSimulationNodes.length + 1);

  intermediateSimulationNodes.forEach((SimulationNode, i) => {
    layout[SimulationNode.id] = {
      x: columnWidth * 2,
      y: padding + (i + 1) * intermediateSpacing,
    };
  });

  // Position reproductive outcomes (right column)
  const reproductiveHeight = height - padding * 2;
  const reproductiveSpacing =
    reproductiveHeight / (reproductiveSimulationNodes.length + 1);

  reproductiveSimulationNodes.forEach((SimulationNode, i) => {
    layout[SimulationNode.id] = {
      x: columnWidth * 3,
      y: padding + (i + 1) * reproductiveSpacing,
    };
  });

  return layout;
};

/**
 * Create a curved path between two points (for SimulationLinks)
 */
export const createCurvedPath = (
  source: { x: number; y: number },
  target: { x: number; y: number }
): string => {
  const midX = (source.x + target.x) / 2;

  // Use quadratic bezier curve for smooth SimulationLink
  return `M ${source.x},${source.y} Q ${midX},${source.y} ${midX},${
    (source.y + target.y) / 2
  } T ${target.x},${target.y}`;
};

/**
 * Create a more dramatic curved path (for emphasis)
 */
export const createDramaticCurvedPath = (
  source: { x: number; y: number },
  target: { x: number; y: number }
): string => {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const dr = Math.sqrt(dx * dx + dy * dy);

  // Create arc
  return `M ${source.x},${source.y} A ${dr},${dr} 0 0,1 ${target.x},${target.y}`;
};
