import { motion } from 'framer-motion';

interface Props {
  value: 'normal' | 'subclinical' | 'overt';
  onChange: (value: 'normal' | 'subclinical' | 'overt') => void;
}

export const SeveritySlider: React.FC<Props> = ({ value, onChange }) => {
  const options = [
    { value: 'normal', label: 'Normal Thyroid', color: '#22c55e' },
    { value: 'subclinical', label: 'Subclinical Hypo', color: '#eab308' },
    { value: 'overt', label: 'Overt Hypo', color: '#ef4444' },
  ];

  return (
    <div className='severity-slider'>
      <h3 className='text-lg font-semibold mb-4'>Thyroid Status</h3>
      <div className='flex gap-4'>
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() =>
              onChange(option.value as 'normal' | 'subclinical' | 'overt')
            }
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              value === option.value ? 'ring-2 ring-offset-2' : 'opacity-50'
            }`}
            style={{
              backgroundColor:
                value === option.value ? option.color : '#e5e7eb',
              color: value === option.value ? 'white' : '#374151',
              boxShadow:
                value === option.value
                  ? `0 0 0 2px ${option.color}, 0 0 0 4px white` // Inner color and offset color
                  : 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <p className='text-sm text-gray-700'>
          {value === 'normal' && 'TSH < 2.5, optimal thyroid function'}
          {value === 'subclinical' &&
            'TSH 2.5-10, mild thyroid dysfunction often overlooked'}
          {value === 'overt' && 'TSH > 10, significant thyroid dysfunction'}
        </p>
      </div>
    </div>
  );
};
