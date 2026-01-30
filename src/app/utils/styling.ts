import type { SimulationLink, SimulationNode } from '../data/types';
import { isSimulationLinkInPath } from './pathfinder';

// COLOR HELPERS

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
/**
 * Get color for SimulationNode category
 * Thyroid nodes change color based on severity
 * Purple = intermediate effects (cascade)
 * Pink = reproductive outcomes (endpoints)
 */
export const getSimulationNodeColor = (
  category: 'thyroid' | 'intermediate' | 'reproductive',
  severity?: 'normal' | 'subclinical' | 'overt'
): string => {
  switch (category) {
    case 'thyroid':
      // Change thyroid node color based on severity
      if (severity === 'overt') return '#ef4444'; // red-500
      if (severity === 'subclinical') return '#eab308'; // yellow-500
      return '#22c55e'; // green-500 (normal/default)
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
  severity?: 'normal' | 'subclinical' | 'overt',
  isMobile?: boolean
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

    return baseWidth * multiplier * (isMobile ? 0.8 : 1);
  }

  return baseWidth * (isMobile ? 0.8 : 1);
};

/**
 * Get SimulationNode radius based on importance and severity
 */
export const getSimulationNodeRadius = (
  node: SimulationNode,
  severity: 'normal' | 'subclinical' | 'overt',
  isSelected?: boolean,
  isMobile?: boolean
): number => {
  let baseRadius = 10;

  // Rest of your logic, but with smaller base sizes
  if (node.category === 'thyroid' && severity) {
    baseRadius = {
      normal: 10,
      subclinical: 15,
      overt: 20,
    }[severity];
  }

  // Reproductive outcome nodes are slightly larger for emphasis
  if (node.category === 'reproductive') {
    baseRadius = 10;
  }

  // Selected nodes are larger
  if (isSelected) {
    baseRadius *= 1.25;
  }

  // Increase size for mobile (better touch targets)
  if (isMobile) {
    baseRadius *= 1.4;
  }

  return baseRadius;
};

/**
 * Get font size for SimulationNode labels
 */
export const getSimulationNodeLabelSize = (
  SimulationNode: SimulationNode,
  isSelected?: boolean,
  isMobile?: boolean
): number => {
  const baseSize = 12; // Reduced from 14

  if (isSelected) {
    if (isMobile) {
      return baseSize + 2;
    }
    return baseSize + 1;
  }

  if (SimulationNode.category === 'reproductive') {
    return baseSize; // Same size
  }

  // Increase font size for mobile readability
  if (isMobile) {
    return baseSize + 1;
  }

  return baseSize;
};

// ==================== OPACITY HELPERS ====================

/**
 * Get SimulationLink opacity based on highlight state
 */
export const getSimulationLinkOpacity = (
  SimulationLink: SimulationLink,
  highlightedPath: string[] | null,
  hoveredSimulationNode: string | null
): number => {
  // If nothing is highlighted, show all at medium opacity
  if (!highlightedPath && !hoveredSimulationNode) {
    return 0.4;
  }

  // If a path is highlighted, show only that path
  if (highlightedPath) {
    return isSimulationLinkInPath(SimulationLink, highlightedPath) ? 0.8 : 0.1;
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
  highlightedPath: string[] | null,
  hoveredSimulationNode: string | null
): number => {
  // If nothing is highlighted or hovered, show everything fully
  if (!highlightedPath && !hoveredSimulationNode) {
    return 1;
  }

  // If this node is in the highlighted path or is hovered, show it fully
  if (highlightedPath && highlightedPath.includes(SimulationNode.id)) {
    return 1;
  }

  if (hoveredSimulationNode === SimulationNode.id) {
    return 1;
  }

  // Otherwise, keep nodes visible but slightly dimmed (not invisible!)
  return 0.5; // Changed from 0.3 to 0.5 so nodes stay visible
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
