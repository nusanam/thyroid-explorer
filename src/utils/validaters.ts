import type { SimulationLink, SimulationNode } from '../data/types';
import { getNodeId } from './helpers';

// ==================== DATA VALIDATION HELPERS ====================

/**
 * Validate that all SimulationLinks reference existing SimulationNodes
 */
export const validateSimulationLinks = (
  SimulationNodes: SimulationNode[],
  SimulationLinks: SimulationLink[]
): { valid: boolean; errors: string[] } => {
  const SimulationNodeIds = new Set(SimulationNodes.map((n) => n.id));
  const errors: string[] = [];

  SimulationLinks.forEach((conn, index) => {
    const sourceId = getNodeId(conn.source);
    const targetId = getNodeId(conn.target);

    if (!SimulationNodeIds.has(sourceId)) {
      errors.push(
        `SimulationLink ${index}: 'source' SimulationNode '${sourceId}' does not exist`
      );
    }
    if (!SimulationNodeIds.has(targetId)) {
      errors.push(
        `SimulationLink ${index}: 'target' SimulationNode '${targetId}' does not exist`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Detect circular dependencies (cycles) in the graph
 */
export const detectCycles = (
  SimulationNodes: SimulationNode[],
  SimulationLinks: SimulationLink[]
): string[][] => {
  const cycles: string[][] = [];

  const visit = (
    SimulationNodeId: string,
    path: string[],
    visited: Set<string>
  ) => {
    if (path.includes(SimulationNodeId)) {
      // Found a cycle
      const cycleStart = path.indexOf(SimulationNodeId);
      cycles.push(path.slice(cycleStart).concat(SimulationNodeId));
      return;
    }

    if (visited.has(SimulationNodeId)) {
      return;
    }

    visited.add(SimulationNodeId);
    const newPath = [...path, SimulationNodeId];

    const outgoing = SimulationLinks.filter(
      (c) => getNodeId(c.source) === SimulationNodeId
    );
    outgoing.forEach((conn) => {
      visit(getNodeId(conn.target), newPath, visited);
    });
  };

  SimulationNodes.forEach((SimulationNode) => {
    visit(SimulationNode.id, [], new Set());
  });

  return cycles;
};
