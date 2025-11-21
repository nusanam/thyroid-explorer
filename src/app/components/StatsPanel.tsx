import type { Scenario, Stats } from '../data/types';

const getStatsByScenario = (scenario: Scenario): Stats => {
  switch (scenario.id) {
    case 'optimal':
      return {
        timeToConception: '3-6 months',
        miscarriageRisk: '15-20%',
        anovulationRate: '<5%',
        lutealPhaseLength: '12-14 days',
      };
    case 'subclinical-hypo':
      return {
        timeToConception: '8-12 months',
        miscarriageRisk: '25-30%',
        anovulationRate: '15-25%',
        lutealPhaseLength: '8-10 days',
      };
    case 'hashimotos-uncontrolled':
      return {
        timeToConception: '>12 months',
        miscarriageRisk: '35-45%',
        anovulationRate: '40-60%',
        lutealPhaseLength: '<8 days',
      };
    case 'default':
      return {
        timeToConception: '',
        miscarriageRisk: '',
        anovulationRate: '',
        lutealPhaseLength: '',
      };
  }
};

export const StatsPanel: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const stats = getStatsByScenario(scenario);

  return (
    <div className='stats-panel grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg'>
      <StatCard
        label='Time to Conception'
        value={stats.timeToConception}
        icon='⏱️'
      />
      <StatCard
        label='Miscarriage Risk'
        value={stats.miscarriageRisk}
        icon='⚠️'
      />
      <StatCard
        label='Anovulation Rate'
        value={stats.anovulationRate}
        icon='🔄'
      />
      <StatCard
        label='Luteal Phase'
        value={stats.lutealPhaseLength}
        icon='📊'
      />
    </div>
  );
};

const StatCard: React.FC<{
  label: string;
  value: string;
  icon: string;
}> = ({ label, value, icon }) => (
  <div className='text-center'>
    <div className='text-3xl mb-2'>{icon}</div>
    <div className='text-2xl font-bold text-gray-900 mb-1'>{value}</div>
    <div className='text-sm text-gray-600'>{label}</div>
  </div>
);
