import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

export interface SimulationLink extends SimulationLinkDatum<SimulationNode> {
  source: string | SimulationNode;
  target: string | SimulationNode;
  strength: 'strong' | 'moderate' | 'weak';
  type: 'inhibitory' | 'stimulatory' | 'regulatory';
  description: string;
  researchCitations: string[];
  mechanismDetail?: string; // Optional deeper explanation
}

export interface SimulationNode extends SimulationNodeDatum {
  id: string;
  label: string;
  category: 'thyroid' | 'intermediate' | 'reproductive';
  description: string;
  normalRange?: string;
  optimalRange?: string;
  unit?: string;
  educationalContent: {
    whatItIs: string;
    whyItMatters: string;
    howToOptimize?: string;
  };
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  thyroidValues: {
    tsh: number;
    freeT3: number;
    freeT4: number;
    tpoAntibodies: number;
    tgAntibodies: number;
  };
  reproductiveImpacts: string[];
  clinicalNotes: string;
}