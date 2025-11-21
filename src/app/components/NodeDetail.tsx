import { AnimatePresence, motion } from 'framer-motion';
import type { SimulationNode } from '../data/types';

interface Props {
  node: SimulationNode;
  onClose: () => void;
}

export const NodeDetail: React.FC<Props> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className='fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto z-50'
        style={{ maxWidth: '90vw' }}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-[#6cbfc0] text-2xl font-bold'
        >
          ×
        </button>

        <h2 className='text-2xl font-bold mb-2 text-[#6298a0cc]'>
          {node.label}
        </h2>
        <p className='text-[#6298a0cc] mb-4'>{node.description}</p>

        {node.normalRange && (
          <div className='mb-4 p-3 bg-blue-50 rounded'>
            <div className='text-sm font-medium text-[#57868dcc]'>
              Normal Range
            </div>
            <div className='text-lg text-[#507a81cc]'>
              {node.normalRange} {node.unit}
            </div>
          </div>
        )}

        {node.optimalRange && (
          <div className='mb-4 p-3 bg-green-50 rounded'>
            <div className='text-sm font-medium text-[#6298a0cc]'>
              Optimal Range
            </div>
            <div className='text-lg text-[#507a81cc]'>{node.optimalRange}</div>
          </div>
        )}

        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-lg mb-2 text-[#6298a0cc]'>
              What It Is
            </h3>
            <p className='text-[#6cbfc0]'>{node.educationalContent.whatItIs}</p>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-2 text-[#6298a0cc]'>
              Why It Matters
            </h3>
            <p className='text-[#6cbfc0]'>
              {node.educationalContent.whyItMatters}
            </p>
          </div>

          {node.educationalContent.howToOptimize && (
            <div>
              <h3 className='font-semibold text-lg mb-2 text-[#6298a0cc]'>
                How to Optimize
              </h3>
              <p className='text-[#6cbfc0]'>
                {node.educationalContent.howToOptimize}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
