import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { SimulationLink, SimulationNode } from '../data/types';
import { getNodeId } from './helpers';

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
 * Find all paths from a given SimulationNode using BFS
 */
// export const findPathsFromSimulationNode = (
//   SimulationNodeId: string,
//   SimulationLinks: SimulationLink[],
//   maxDepth: number = 5
// ): string[][] => {
//   const paths: string[][] = [];
//   const queue: { path: string[]; depth: number }[] = [
//     { path: [SimulationNodeId], depth: 0 },
//   ];

//   while (queue.length > 0) {
//     const { path, depth } = queue.shift()!;
//     const current = path[path.length - 1];

//     if (depth >= maxDepth) {
//       paths.push(path);
//       continue;
//     }

//     const outgoing = SimulationLinks.filter(
//       (c) => getNodeId(c.source) === current
//     );

//     if (outgoing.length === 0) {
//       paths.push(path);
//     } else {
//       outgoing.forEach((conn) => {
//         const targetId = getNodeId(conn.target);
//         // Avoid cycles
//         if (!path.includes(targetId)) {
//           queue.push({
//             path: [...path, targetId],
//             depth: depth + 1,
//           });
//         }
//       });
//     }
//   }

//   return paths;
// };

/**
 * Find shortest path between two SimulationNodes
 */
// export const findShortestPath = (
//   startId: string,
//   endId: string,
//   SimulationLinks: SimulationLink[]
// ): string[] | null => {
//   const queue: string[][] = [[startId]];
//   const visited = new Set<string>([startId]);

//   while (queue.length > 0) {
//     const path = queue.shift()!;
//     const current = path[path.length - 1];

//     if (current === endId) {
//       return path;
//     }

//     const outgoing = SimulationLinks.filter(
//       (c) => getNodeId(c.source) === current
//     );

//     for (const conn of outgoing) {
//       const targetId = getNodeId(conn.target);
//       if (!visited.has(targetId)) {
//         visited.add(targetId);
//         queue.push([...path, targetId]);
//       }
//     }
//   }

//   return null;
// };

/**
 * Finds the shortest path between two nodes
 */
export function findShortestPath(
  startNodeId: string,
  endNodeId: string,
  links: SimulationLink[]
): string[] | null {
  // BFS to find shortest path
  const queue: { nodeId: string; path: string[] }[] = [
    { nodeId: startNodeId, path: [startNodeId] },
  ];
  const visited = new Set<string>([startNodeId]);

  while (queue.length > 0) {
    const { nodeId, path } = queue.shift()!;

    if (nodeId === endNodeId) {
      return path;
    }

    links.forEach((link) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (sourceId === nodeId && !visited.has(targetId)) {
        visited.add(targetId);
        queue.push({ nodeId: targetId, path: [...path, targetId] });
      }
    });
  }

  return null; // No path found
}

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

/**
 * Finds all paths originating from a given node
 * Returns an object with direct connections and downstream paths
 */
export function findPathsFromSimulationNode(
  nodeId: string,
  links: SimulationLink[]
): {
  directConnections: string[]; // Node IDs directly connected
  downstreamNodes: string[]; // All nodes reachable downstream
  upstreamNodes: string[]; // All nodes that lead to this node
  affectedLinks: string[]; // Link IDs in the paths
} {
  const directConnections: string[] = [];
  const downstreamNodes: string[] = [];
  const upstreamNodes: string[] = [];
  const affectedLinks: string[] = [];

  // Find direct connections
  links.forEach((link, index) => {
    const sourceId = getNodeId(link.source);
    const targetId = getNodeId(link.target);

    if (sourceId === nodeId) {
      directConnections.push(targetId);
      affectedLinks.push(`link-${index}`);
    } else if (targetId === nodeId) {
      directConnections.push(sourceId);
      affectedLinks.push(`link-${index}`);
    }
  });

  // Find all downstream nodes (BFS traversal)
  const visitedDownstream = new Set<string>([nodeId]);
  const queueDownstream = [nodeId];

  while (queueDownstream.length > 0) {
    const currentNode = queueDownstream.shift()!;

    links.forEach((link, index) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (sourceId === currentNode && !visitedDownstream.has(targetId)) {
        visitedDownstream.add(targetId);
        queueDownstream.push(targetId);
        downstreamNodes.push(targetId);
        affectedLinks.push(`link-${index}`);
      }
    });
  }

  // Find all upstream nodes (reverse BFS)
  const visitedUpstream = new Set<string>([nodeId]);
  const queueUpstream = [nodeId];

  while (queueUpstream.length > 0) {
    const currentNode = queueUpstream.shift()!;

    links.forEach((link, index) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (targetId === currentNode && !visitedUpstream.has(sourceId)) {
        visitedUpstream.add(sourceId);
        queueUpstream.push(sourceId);
        upstreamNodes.push(sourceId);
        affectedLinks.push(`link-${index}`);
      }
    });
  }

  return {
    directConnections,
    downstreamNodes,
    upstreamNodes,
    affectedLinks: [...new Set(affectedLinks)], // Remove duplicates
  };
}

/**
 * Gets all links that are part of the specified path
 */
export function getLinksInPath(
  path: string[],
  links: SimulationLink[]
): SimulationLink[] {
  const getNodeId = (nodeRef: string | SimulationNode): string => {
    return typeof nodeRef === 'string' ? nodeRef : nodeRef.id;
  };

  const pathLinks: SimulationLink[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = path[i];
    const nextNode = path[i + 1];

    const link = links.find((l) => {
      const sourceId = getNodeId(l.source);
      const targetId = getNodeId(l.target);
      return sourceId === currentNode && targetId === nextNode;
    });

    if (link) {
      pathLinks.push(link);
    }
  }

  return pathLinks;
}

/**
 * Calculates path statistics for visualization
 */
export function calculatePathImpact(
  path: string[],
  links: SimulationLink[]
): {
  totalInhibitory: number;
  totalStimulatory: number;
  totalRegulatory: number;
  strongConnections: number;
  overallEffect: 'positive' | 'negative' | 'mixed';
} {
  const pathLinks = getLinksInPath(path, links);

  const stats = {
    totalInhibitory: 0,
    totalStimulatory: 0,
    totalRegulatory: 0,
    strongConnections: 0,
    overallEffect: 'mixed' as 'positive' | 'negative' | 'mixed',
  };

  pathLinks.forEach((link) => {
    if (link.type === 'inhibitory') stats.totalInhibitory++;
    if (link.type === 'stimulatory') stats.totalStimulatory++;
    if (link.type === 'regulatory') stats.totalRegulatory++;
    if (link.strength === 'strong') stats.strongConnections++;
  });

  // Determine overall effect
  if (stats.totalInhibitory > stats.totalStimulatory) {
    stats.overallEffect = 'negative';
  } else if (stats.totalStimulatory > stats.totalInhibitory) {
    stats.overallEffect = 'positive';
  }

  return stats;
}

// ==================== PATH HIGHLIGHTING FUNCTIONS ====================

export const highlightConnectedElements = (
  nodeId: string,
  paths: ReturnType<typeof findPathsFromSimulationNode>,
  // isTemporary: boolean,
  setHighlightedNodes: Dispatch<SetStateAction<Set<string>>>,
  setHighlightedLinks: Dispatch<SetStateAction<Set<string>>>,
  activePathMode: string
) => {
  const nodesToHighlight = new Set<string>([nodeId]);
  const linksToHighlight = new Set<string>();

  // Add nodes based on active mode
  if (activePathMode === 'downstream' || activePathMode === 'both') {
    paths.downstreamNodes.forEach((n) => nodesToHighlight.add(n));
  }
  if (activePathMode === 'upstream' || activePathMode === 'both') {
    paths.upstreamNodes.forEach((n) => nodesToHighlight.add(n));
  }

  // Always add direct connections
  paths.directConnections.forEach((n) => nodesToHighlight.add(n));

  // Add all affected links
  paths.affectedLinks.forEach((l) => linksToHighlight.add(l));

  setHighlightedNodes(nodesToHighlight);
  setHighlightedLinks(linksToHighlight);
};

export const clearPathHighlight = (
  setHighlightedNodes: Dispatch<SetStateAction<Set<string>>>,
  setHighlightedLinks: Dispatch<SetStateAction<Set<string>>>
) => {
  setHighlightedNodes(new Set());
  setHighlightedLinks(new Set());
};

export const showPathInfoTooltip = (
  nodes: SimulationNode[],
  links: SimulationLink[],
  nodeId: string,
  paths: ReturnType<typeof findPathsFromSimulationNode>,
  tooltipRef: RefObject<HTMLDivElement| null>
) => {
  if (!tooltipRef?.current) return;

  const tooltip = tooltipRef.current;
  const node = nodes.find((n) => n.id === nodeId);

  // Calculate path statistics
  const downstreamPath = [nodeId, ...paths.downstreamNodes];
  const pathStats = calculatePathImpact(downstreamPath, links);

  tooltip.innerHTML = `
      <div class="font-bold text-base mb-3">
        🔍 Pathways from ${node?.label}
      </div>

      <div class="text-sm mb-2">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-green-600">→</span>
          <span><strong>Downstream:</strong> ${paths.downstreamNodes.length} nodes affected</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-orange-600">←</span>
          <span><strong>Upstream:</strong> ${paths.upstreamNodes.length} influencing nodes</span>
        </div>
      </div>

      <div class="text-xs mt-3 pt-2 border-t border-gray-200">
        <div class="font-semibold mb-1">Connection Types:</div>
        <div class="flex gap-2 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-red-100 text-red-800">
            ⊣ ${pathStats.totalInhibitory} Inhibitory
          </span>
          <span class="px-2 py-0.5 rounded bg-green-100 text-green-800">
            → ${pathStats.totalStimulatory} Stimulatory
          </span>
          <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800">
            ⇄ ${pathStats.totalRegulatory} Regulatory
          </span>
        </div>
      </div>

      <div class="text-xs mt-2 text-gray-500">
        Click elsewhere to clear highlighting
      </div>
    `;

  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
  tooltip.style.position = 'fixed';
  tooltip.style.left = '20px';
  tooltip.style.top = '20px';
};

export const highlightPathsFromNode = (
  nodeId: string,
  links: SimulationLink[],
  nodes: SimulationNode[],
  tooltipRef: RefObject<HTMLDivElement| null>,
  setHighlightedNodes: Dispatch<SetStateAction<Set<string>>>,
  setHighlightedLinks: Dispatch<SetStateAction<Set<string>>>,
  activePathMode: 'downstream' | 'upstream' | 'both'
) => {
  const paths = findPathsFromSimulationNode(nodeId, links);
  highlightConnectedElements(
    nodeId,
    paths,
    setHighlightedNodes,
    setHighlightedLinks,
    activePathMode
  );

  // Show path info tooltip
  showPathInfoTooltip(nodes, links, nodeId, paths, tooltipRef);
};
