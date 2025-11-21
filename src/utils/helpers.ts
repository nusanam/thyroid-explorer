import { links } from '../data/links';
import type { SimulationLink, SimulationNode } from '../data/types';

export const getNodeId = (node: string | SimulationNode): string => {
  return typeof node === 'string' ? node : node.id;
};

// Helper function to get downstream links
const getDownstreamLinks = (nodeId: string): SimulationLink[] => {
  return links.filter((conn) => getNodeId(conn.source) === nodeId);
};

// Helper function to get upstream links
export const getUpstreamLinks = (nodeId: string): string | SimulationLink[] => {
  return links.filter((c) => c.target === nodeId);
};

// Helper function to find all paths between two nodes
export const findPathsBetweenNodes = (
  startId: string,
  endId: string,
  maxDepth: number = 5
): string[][] => {
  const paths: string[][] = [];

  const dfs = (
    currentId: string,
    target: string,
    path: string[],
    depth: number
  ) => {
    if (depth > maxDepth) return;
    if (currentId === target) {
      paths.push([...path, currentId]);
      return;
    }

    const downstream = getDownstreamLinks(currentId);
    for (const conn of downstream) {
      const targetId = getNodeId(conn.target);

      if (!path.includes(targetId)) {
        dfs(targetId, target, [...path, currentId], depth + 1);
      }
    }
  };

  dfs(startId, endId, [], 0);
  return paths;
};

// Get all nodes involved in links (for validation)
export const getAllNodeIds = (): Set<string | SimulationNode> => {
  const nodeIds = new Set<string | SimulationNode>();
  links.forEach((conn) => {
    nodeIds.add(conn.source);
    nodeIds.add(conn.target);
  });
  return nodeIds;
};
