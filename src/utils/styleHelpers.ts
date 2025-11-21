import type { SimulationLink, SimulationNode } from '../data/types';
import { isSimulationLinkInPath } from './pathfinder';

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
