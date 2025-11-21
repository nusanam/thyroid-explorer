import { motion } from 'framer-motion';
import { scenarios } from '../data/scenarios';
import type { Scenario } from '../data/types';

export const ScenarioSelector: React.FC<{
  onSelect: (scenario: Scenario) => void;
}> = ({ onSelect }) => {
  return (
    <div className='scenario-selector mb-8'>
      <h3 className='text-xl font-semibold mb-4'>Explore Clinical Scenarios</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {scenarios.map((scenario) => (
          <motion.button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className='p-4 bg-white border-2 border-gray-200 rounded-lg text-left hover:border-blue-500 transition-colors'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <h4 className='font-semibold text-[#6298a0cc] mb-1'>
              {scenario.name}
            </h4>
            <p className='text-sm text-gray-600'>{scenario.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
