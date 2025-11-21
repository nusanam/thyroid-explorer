import { motion } from 'framer-motion';

interface Props {
  value: 'normal' | 'subclinical' | 'overt';
  onChange: (value: 'normal' | 'subclinical' | 'overt') => void;
}

export const SeveritySlider: React.FC<Props> = ({ value, onChange }) => {
  const options = [
    {
      value: 'normal',
      label: 'Normal',
      color: '#22c55e',
      textColor: '#166534',
    },
    {
      value: 'subclinical',
      label: 'Subclinical',
      color: '#eab308',
      textColor: '#854d0e',
    },
    { value: 'overt', label: 'Overt', color: '#ef4444', textColor: '#991b1b' },
  ];

  return (
    <div>
      <h3 className='text-lg font-semibold mb-3 text-[#6298a0cc]'>
        Thyroid Status
      </h3>
      <div className='grid grid-cols-3 gap-2'>
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() =>
              onChange(option.value as 'normal' | 'subclinical' | 'overt')
            }
            className={`px py-2 rounded-lg text-xs font-semibold transition-all ${
              value === option.value
                ? 'ring-2 ring-offset-1'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                value === option.value ? option.color : '#f3f4f6',
              color: value === option.value ? 'white' : '#374151',
              boxShadow:
                value === option.value
                  ? `0 0 0 2px ${option.color}, 0 0 0 4px white`
                  : 'none',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <div className='mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200'>
        <p
          className='text-xs leading-relaxed'
          style={{
            color: options.find((o) => o.value === value)?.textColor,
          }}
        >
          {value === 'normal' && (
            <>
              <span className='font-bold' style={{ color: '#22c55e' }}>
                TSH &lt; 2.5 mIU/L
              </span>
              <br />
              Optimal thyroid function for fertility
            </>
          )}
          {value === 'subclinical' && (
            <>
              <span className='font-bold' style={{ color: '#eab308' }}>
                TSH 2.5-10 mIU/L
              </span>
              <br />
              Mild dysfunction often dismissed but impacts fertility
            </>
          )}
          {value === 'overt' && (
            <>
              <span className='font-bold' style={{ color: '#ef4444' }}>
                TSH &gt; 10 mIU/L
              </span>
              <br />
              Significant dysfunction requiring treatment
            </>
          )}
        </p>
      </div>
    </div>
  );
};
