import type { SimulationLink, SimulationNode } from '../app/data/types';
import { getSimulationNodeAndLinks } from './pathfinder';

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
  const { incoming, outgoing } = getSimulationNodeAndLinks(
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
