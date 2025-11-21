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
        className='fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-6 overflow-y-auto'
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        <h2 className='text-2xl font-bold mb-2'>{node?.label}</h2>
        <p className='text-gray-600 mb-4'>{node?.description}</p>

        {node?.normalRange && (
          <div className='mb-4 p-3 bg-blue-50 rounded'>
            <div className='text-sm font-medium text-blue-900'>
              Normal Range
            </div>
            <div className='text-lg'>
              {node?.normalRange} {node.unit}
            </div>
          </div>
        )}

        {node?.optimalRange && (
          <div className='mb-4 p-3 bg-green-50 rounded'>
            <div className='text-sm font-medium text-green-900'>
              Optimal Range
            </div>
            <div className='text-lg'>{node?.optimalRange}</div>
          </div>
        )}

        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold text-lg mb-2'>What It Is</h3>
            <p className='text-gray-700'>{node?.educationalContent.whatItIs}</p>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-2'>Why It Matters</h3>
            <p className='text-gray-700'>
              {node?.educationalContent.whyItMatters}
            </p>
          </div>

          {node?.educationalContent.howToOptimize && (
            <div>
              <h3 className='font-semibold text-lg mb-2'>How to Optimize</h3>
              <p className='text-gray-700'>
                {node?.educationalContent.howToOptimize}
              </p>
            </div>
          )}
        </div>

        <div className='mt-6 pt-6 border-t'>
          <h3 className='font-semibold text-lg mb-2'>Connected To</h3>
          {/* Show incoming and outgoing connections */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
