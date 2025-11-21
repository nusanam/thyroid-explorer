export const annotations = [
  {
    x: 300,
    y: 200,
    text: 'Elevated TSH impairs progesterone',
    target: { nodeId: 'progesterone' },
  },
  {
    x: 600,
    y: 400,
    text: 'Low progesterone → short luteal phase',
    target: { connection: { from: 'progesterone', to: 'luteal_phase' } },
  },
];
