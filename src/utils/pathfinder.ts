import type { SimulationLink } from '../data/types';
import { getNodeId } from './helperFunctions';

// ==================== PATH HELPERS ====================

/**
 * Check if a SimulationLink is part of a highlighted path
 */
export const isSimulationLinkInPath = (
  SimulationLink: SimulationLink,
  path: string[]
): boolean => {
  for (let i = 0; i < path.length - 1; i++) {
    if (
      SimulationLink.source === path[i] &&
      SimulationLink.target === path[i + 1]
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Find all paths source a given SimulationNode using BFS
 */
export const findPathsFromSimulationNode = (
  SimulationNodeId: string,
  SimulationLinks: SimulationLink[],
  maxDepth: number = 5
): string[][] => {
  const paths: string[][] = [];
  const queue: { path: string[]; depth: number }[] = [
    { path: [SimulationNodeId], depth: 0 },
  ];

  while (queue.length > 0) {
    const { path, depth } = queue.shift()!;
    const current = path[path.length - 1];

    if (depth >= maxDepth) {
      paths.push(path);
      continue;
    }

    const outgoing = SimulationLinks.filter(
      (c) => getNodeId(c.source) === current
    );

    if (outgoing.length === 0) {
      paths.push(path);
    } else {
      outgoing.forEach((conn) => {
        const targetId = getNodeId(conn.target);
        // Avoid cycles
        if (!path.includes(targetId)) {
          queue.push({
            path: [...path, targetId],
            depth: depth + 1,
          });
        }
      });
    }
  }

  return paths;
};

/**
 * Find shortest path between two SimulationNodes
 */
export const findShortestPath = (
  startId: string,
  endId: string,
  SimulationLinks: SimulationLink[]
): string[] | null => {
  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (current === endId) {
      return path;
    }

    const outgoing = SimulationLinks.filter(
      (c) => getNodeId(c.source) === current
    );

    for (const conn of outgoing) {
      const targetId = getNodeId(conn.target);
      if (!visited.has(targetId)) {
        visited.add(targetId);
        queue.push([...path, targetId]);
      }
    }
  }

  return null;
};

/**
 * Find all SimulationLinks for a SimulationNode (incoming and outgoing)
 */
export const getSimulationNodeAndLinks = (
  SimulationNodeId: string,
  SimulationLinks: SimulationLink[]
): { incoming: SimulationLink[]; outgoing: SimulationLink[] } => {
  return {
    incoming: SimulationLinks.filter((c) => c.target === SimulationNodeId),
    outgoing: SimulationLinks.filter((c) => c.source === SimulationNodeId),
  };
};
