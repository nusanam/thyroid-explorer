/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SimulationLink, SimulationNode } from '../data/types';
import { getNodeId } from './helperFunctions';
// ==================== COLOR HELPERS ====================

/**
 * Get color for SimulationLink type
 * Red = inhibitory (negative effect)
 * Green = stimulatory (positive effect)
 * Yellow = regulatory (complex/bidirectional)
 */
export const getSimulationLinkColor = (
  type: 'inhibitory' | 'stimulatory' | 'regulatory'
): string => {
  switch (type) {
    case 'inhibitory':
      return '#ef4444'; // red-500
    case 'stimulatory':
      return '#22c55e'; // green-500
    case 'regulatory':
      return '#eab308'; // yellow-500
    default:
      return '#94a3b8'; // slate-400
  }
};

/**
 * Get color for SimulationNode category
 * Blue = thyroid markers (source)
 * Purple = intermediate effects (cascade)
 * Pink = reproductive outcomes (endpoints)
 */
export const getSimulationNodeColor = (
  category: 'thyroid' | 'intermediate' | 'reproductive'
): string => {
  switch (category) {
    case 'thyroid':
      return '#3b82f6'; // blue-500
    case 'intermediate':
      return '#8b5cf6'; // purple-500
    case 'reproductive':
      return '#ec4899'; // pink-500
    default:
      return '#64748b'; // slate-500
  }
};

/**
 * Get lighter shade for SimulationNode category (for backgrounds, hover states)
 */
export const getSimulationNodeColorLight = (
  category: 'thyroid' | 'intermediate' | 'reproductive'
): string => {
  switch (category) {
    case 'thyroid':
      return '#dbeafe'; // blue-100
    case 'intermediate':
      return '#ede9fe'; // purple-100
    case 'reproductive':
      return '#fce7f3'; // pink-100
    default:
      return '#f1f5f9'; // slate-100
  }
};

/**
 * Get severity color for scenarios
 */
export const getSeverityColor = (
  severity: 'normal' | 'subclinical' | 'overt'
): string => {
  switch (severity) {
    case 'normal':
      return '#22c55e'; // green-500
    case 'subclinical':
      return '#eab308'; // yellow-500
    case 'overt':
      return '#ef4444'; // red-500
    default:
      return '#94a3b8'; // slate-400
  }
};

// ==================== SIZE HELPERS ====================

/**
 * Get SimulationLink width based on strength
 * Stronger SimulationLinks = thicker lines
 */
export const getSimulationLinkWidth = (
  strength: 'strong' | 'moderate' | 'weak',
  severity?: 'normal' | 'subclinical' | 'overt'
): number => {
  const baseWidth = {
    strong: 3,
    moderate: 2,
    weak: 1,
  }[strength];

  // Amplify SimulationLink width based on thyroid severity
  if (severity) {
    const multiplier = {
      normal: 1,
      subclinical: 1.5,
      overt: 2.5,
    }[severity];

    return baseWidth * multiplier;
  }

  return baseWidth;
};

/**
 * Get SimulationNode radius based on importance and severity
 */
export const getSimulationNodeRadius = (
  SimulationNode: SimulationNode,
  severity?: 'normal' | 'subclinical' | 'overt',
  isSelected?: boolean
): number => {
  let baseRadius = 30;

  // Thyroid SimulationNodes grow with severity (they're the source of dysfunction)
  if (SimulationNode.category === 'thyroid' && severity) {
    baseRadius = {
      normal: 30,
      subclinical: 35,
      overt: 42,
    }[severity];
  }

  // Reproductive outcome SimulationNodes (endpoints) are slightly larger for emphasis
  if (SimulationNode.category === 'reproductive') {
    baseRadius = 32;
  }

  // Selected SimulationNodes are larger
  if (isSelected) {
    baseRadius *= 1.2;
  }

  return baseRadius;
};

/**
 * Get font size for SimulationNode labels
 */
export const getSimulationNodeLabelSize = (
  SimulationNode: SimulationNode,
  isSelected?: boolean
): number => {
  const baseSize = 14;

  if (isSelected) {
    return baseSize + 2;
  }

  if (SimulationNode.category === 'reproductive') {
    return baseSize + 1; // Slightly larger for outcomes
  }

  return baseSize;
};

// ==================== OPACITY HELPERS ====================

/**
 * Get SimulationLink opacity based on highlight state
 */
export const getSimulationLinkOpacity = (
  SimulationLink: SimulationLink,
  highlightedPath?: string[],
  hoveredSimulationNode?: string
): number => {
  // If nothing is highlighted, show all at medium opacity
  if (!highlightedPath && !hoveredSimulationNode) {
    return 0.4;
  }

  // If a path is highlighted, show only that path
  if (highlightedPath) {
    return isSimulationLinkInPath(SimulationLink, highlightedPath) ? 0.8 : 0.08;
  }

  // If a SimulationNode is hovered, highlight its SimulationLinks
  if (hoveredSimulationNode) {
    return SimulationLink.source === hoveredSimulationNode ||
      SimulationLink.target === hoveredSimulationNode
      ? 0.8
      : 0.15;
  }

  return 0.4;
};

/**
 * Get SimulationNode opacity based on highlight state
 */
export const getSimulationNodeOpacity = (
  SimulationNode: SimulationNode,
  highlightedPath?: string[],
  hoveredSimulationNode?: string
): number => {
  if (!highlightedPath && !hoveredSimulationNode) {
    return 1;
  }

  if (highlightedPath && highlightedPath.includes(SimulationNode.id)) {
    return 1;
  }

  if (hoveredSimulationNode === SimulationNode.id) {
    return 1;
  }

  return 0.3;
};

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
export const getSimulationNodeSimulationLinks = (
  SimulationNodeId: string,
  SimulationLinks: SimulationLink[]
): { incoming: SimulationLink[]; outgoing: SimulationLink[] } => {
  return {
    incoming: SimulationLinks.filter((c) => c.target === SimulationNodeId),
    outgoing: SimulationLinks.filter((c) => c.source === SimulationNodeId),
  };
};

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

// ==================== ANIMATION HELPERS ====================

/**
 * Get staggered delay for entrance animations
 */
export const getEntranceDelay = (
  index: number,
  baseDelay: number = 50
): number => {
  return index * baseDelay;
};

/**
 * Get animation duration based on SimulationLink length
 */
export const getAnimationDuration = (
  source: { x: number; y: number },
  target: { x: number; y: number }
): number => {
  const distance = Math.sqrt(
    Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)
  );

  // Longer SimulationLinks take longer to animate
  const baseDuration = 1500;
  const durationPerPixel = 2;

  return baseDuration + distance * durationPerPixel;
};

// ==================== FORMAT HELPERS ====================

/**
 * Format lab value with unit
 */
export const formatLabValue = (value: number, unit?: string): string => {
  const formatted = value.toFixed(1);
  return unit ? `${formatted} ${unit}` : formatted;
};

/**
 * Determine if lab value is in optimal range
 */
export const isInOptimalRange = (
  value: number,
  optimalRange: string
): boolean => {
  // Parse range like "<2.5" or "3.0-4.0" or ">40"
  if (optimalRange.startsWith('<')) {
    const threshold = parseFloat(optimalRange.slice(1));
    return value < threshold;
  }

  if (optimalRange.startsWith('>')) {
    const threshold = parseFloat(optimalRange.slice(1));
    return value > threshold;
  }

  if (optimalRange.includes('-')) {
    const [min, max] = optimalRange.split('-').map((s) => parseFloat(s.trim()));
    return value >= min && value <= max;
  }

  // Handle ranges like "3.0-4.0 (upper half of range)"
  const match = optimalRange.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
  if (match) {
    const [_, min, max] = match;
    return value >= parseFloat(min) && value <= parseFloat(max);
  }

  return true; // Default to true if can't parse
};

/**
 * Get severity label for lab value
 */
export const getLabSeverity = (
  value: number,
  normalRange: string,
  optimalRange?: string
): 'optimal' | 'suboptimal' | 'abnormal' => {
  if (optimalRange && isInOptimalRange(value, optimalRange)) {
    return 'optimal';
  }

  if (isInOptimalRange(value, normalRange)) {
    return 'suboptimal';
  }

  return 'abnormal';
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Format duration (months)
 */
export const formatDuration = (months: number): string => {
  if (months < 1) {
    return '<1 month';
  }
  if (months === 1) {
    return '1 month';
  }
  if (months > 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years}y ${remainingMonths}m`;
  }
  return `${months} months`;
};

// ==================== RESPONSIVE HELPERS ====================

/**
 * Get responsive dimensions based on viewport
 */
export const getResponsiveDimensions = (
  windowWidth: number,
  windowHeight: number
): { width: number; height: number; isMobile: boolean; isTablet: boolean } => {
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  if (isMobile) {
    return {
      width: windowWidth - 40,
      height: 1200, // Taller for vertical layout
      isMobile: true,
      isTablet: false,
    };
  }

  if (isTablet) {
    return {
      width: windowWidth - 80,
      height: 800,
      isMobile: false,
      isTablet: true,
    };
  }

  return {
    width: Math.min(windowWidth - 100, 1400),
    height: Math.min(windowHeight - 200, 900),
    isMobile: false,
    isTablet: false,
  };
};

/**
 * Get responsive font size
 */
export const getResponsiveFontSize = (
  baseSize: number,
  isMobile: boolean,
  isTablet: boolean
): number => {
  if (isMobile) {
    return baseSize * 0.85;
  }
  if (isTablet) {
    return baseSize * 0.92;
  }
  return baseSize;
};

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

// ==================== EXPORT HELPERS ====================

/**
 * Generate citation text for research references
 */
export const formatCitation = (citation: string, index: number): string => {
  return `${index + 1}. ${citation}`;
};

/**
 * Generate markdown export of SimulationNode information
 */
export const exportSimulationNodeAsMarkdown = (
  SimulationNode: SimulationNode,
  SimulationLinks: SimulationLink[]
): string => {
  const { incoming, outgoing } = getSimulationNodeSimulationLinks(
    SimulationNode.id,
    SimulationLinks
  );

  return `# ${SimulationNode.label}

**Category:** ${SimulationNode.category}
**Description:** ${SimulationNode.description}
${
  SimulationNode.normalRange
    ? `**Normal Range:** ${SimulationNode.normalRange} ${
        SimulationNode.unit || ''
      }`
    : ''
}
${
  SimulationNode.optimalRange
    ? `**Optimal Range:** ${SimulationNode.optimalRange}`
    : ''
}

## What It Is
${SimulationNode.educationalContent.whatItIs}

## Why It Matters
${SimulationNode.educationalContent.whyItMatters}

${
  SimulationNode.educationalContent.howToOptimize
    ? `## How to Optimize
${SimulationNode.educationalContent.howToOptimize}`
    : ''
}

## SimulationLinks
- **Influences:** ${outgoing.length} downstream effects
- **Influenced by:** ${incoming.length} upstream factors
`;
};
