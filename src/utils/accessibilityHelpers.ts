import type { SimulationLink, SimulationNode } from '../data/types';
import { getSimulationNodeSimulationLinks } from './styleHelpers';

// ==================== ACCESSIBILITY HELPERS ====================

/**
 * Get ARIA label for SimulationNode
 */
export const getSimulationNodeAriaLabel = (
  SimulationNode: SimulationNode,
  SimulationLinks: SimulationLink[]
): string => {
  const { incoming, outgoing } = getSimulationNodeSimulationLinks(
    SimulationNode.id,
    SimulationLinks
  );

  return (
    `${SimulationNode.label}: ${SimulationNode.description}. ` +
    `${incoming.length} incoming SimulationLinks, ${outgoing.length} outgoing SimulationLinks. ` +
    `Press Enter to view details.`
  );
};

/**
 * Get ARIA label for SimulationLink
 */
export const getSimulationLinkAriaLabel = (
  SimulationLink: SimulationLink,
  SimulationNodes: SimulationNode[]
): string => {
  const sourceSimulationNode = SimulationNodes.find(
    (n) => n.id === SimulationLink.source
  );
  const targetSimulationNode = SimulationNodes.find(
    (n) => n.id === SimulationLink.target
  );

  const typeLabel = {
    inhibitory: 'inhibits',
    stimulatory: 'stimulates',
    regulatory: 'regulates',
  }[SimulationLink.type];

  return `${sourceSimulationNode?.label} ${typeLabel} ${targetSimulationNode?.label}. ${SimulationLink.description}`;
};
