import type { Scenario } from './types';

export const scenarios: Scenario[] = [
  {
    id: 'optimal',
    name: 'Optimal Thyroid Function',
    description: 'All thyroid markers in optimal range for fertility',
    thyroidValues: {
      tsh: 1.5,
      freeT3: 3.2,
      freeT4: 1.3,
      tpoAntibodies: 5,
      tgAntibodies: 3,
    },
    reproductiveImpacts: [
      'Regular 28-30 day cycles',
      'Consistent ovulation',
      '12-14 day luteal phase',
      'Clear BBT biphasic pattern',
    ],
    clinicalNotes:
      'This is what we aim for when optimizing thyroid health for fertility.',
  },
  {
    id: 'subclinical-hypo',
    name: 'Subclinical Hypothyroidism',
    description:
      'Elevated TSH but normal T3/T4 - often dismissed but impacts fertility',
    thyroidValues: {
      tsh: 4.2,
      freeT3: 2.4,
      freeT4: 1.0,
      tpoAntibodies: 15,
      tgAntibodies: 8,
    },
    reproductiveImpacts: [
      'Irregular cycles (32-40 days)',
      'Occasional anovulation',
      'Short luteal phase (8-10 days)',
      'Reduced BBT rise in luteal phase',
      'Increased time to conception',
    ],
    clinicalNotes:
      'Many doctors say this is "normal" but it significantly impacts fertility. Treatment often helps.',
  },
  {
    id: 'hashimotos-controlled',
    name: "Hashimoto's - Well Controlled",
    description: 'Autoimmune hypothyroidism with treatment',
    thyroidValues: {
      tsh: 2.0,
      freeT3: 2.9,
      freeT4: 1.2,
      tpoAntibodies: 245,
      tgAntibodies: 180,
    },
    reproductiveImpacts: [
      'Cycles mostly regular with treatment',
      'Antibodies still present - increased miscarriage risk',
      'May need progesterone support',
      'Requires monitoring throughout pregnancy',
    ],
    clinicalNotes:
      'TSH is controlled but antibodies remain elevated. This still carries reproductive risks that need monitoring.',
  },
  {
    id: 'hashimotos-uncontrolled',
    name: "Hashimoto's - Undiagnosed",
    description: 'Autoimmune attack in progress, not yet treated',
    thyroidValues: {
      tsh: 6.8,
      freeT3: 2.1,
      freeT4: 0.9,
      tpoAntibodies: 420,
      tgAntibodies: 310,
    },
    reproductiveImpacts: [
      'Very irregular cycles (30-60 days)',
      'Frequent anovulation',
      'Severely short luteal phase (<8 days)',
      'Flat BBT pattern',
      'Infertility or recurrent pregnancy loss',
      'Fatigue, weight gain, cold intolerance',
    ],
    clinicalNotes:
      'This pattern often goes undiagnosed for years. Comprehensive testing reveals the underlying autoimmune process.',
  },
  {
    id: 'overt-hypo',
    name: 'Overt Hypothyroidism',
    description: 'Severe thyroid dysfunction requiring immediate treatment',
    thyroidValues: {
      tsh: 12.4,
      freeT3: 1.8,
      freeT4: 0.7,
      tpoAntibodies: 85,
      tgAntibodies: 45,
    },
    reproductiveImpacts: [
      'Severely irregular or absent cycles',
      'Anovulation',
      'Elevated prolactin suppressing ovulation',
      'Very short or absent luteal phase',
      'Infertility',
      'High miscarriage risk if pregnancy occurs',
    ],
    clinicalNotes:
      'Requires immediate treatment. Most doctors recommend delaying pregnancy until thyroid is stable for 2-3 months.',
  },
];
