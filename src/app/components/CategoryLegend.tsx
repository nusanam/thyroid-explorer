import React from 'react';
import {
  getSimulationLinkColor,
  getSimulationNodeColor,
} from '../utils/styling';

export const CategoryLegend: React.FC = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h3 className='text-lg font-semibold mb-4'>Legend</h3>

      {/* Node Categories */}
      <div className='mb-6'>
        <h4 className='text-sm font-medium text-gray-700 mb-3'>
          Node Categories
        </h4>
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <div
              className='w-6 h-6 rounded-full flex-shrink-0'
              style={{ backgroundColor: getSimulationNodeColor('thyroid') }}
            />
            <span className='text-sm text-gray-700'>Thyroid Markers</span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='w-6 h-6 rounded-full flex-shrink-0'
              style={{
                backgroundColor: getSimulationNodeColor('intermediate'),
              }}
            />
            <span className='text-sm text-gray-700'>Intermediate Effects</span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='w-6 h-6 rounded-full flex-shrink-0'
              style={{
                backgroundColor: getSimulationNodeColor('reproductive'),
              }}
            />
            <span className='text-sm text-gray-700'>Reproductive Outcomes</span>
          </div>
        </div>
      </div>

      {/* Connection Types */}
      <div>
        <h4 className='text-sm font-medium text-gray-700 mb-3'>
          Connection Types
        </h4>
        <div className='space-y-3'>
          <div className='flex items-center gap-3'>
            <div
              className='w-12 h-1 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('stimulatory') }}
            />
            <span className='text-sm text-gray-700'>Stimulates</span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='w-12 h-1 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('inhibitory') }}
            />
            <span className='text-sm text-gray-700'>Inhibits</span>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className='w-12 h-1 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('regulatory') }}
            />
            <span className='text-sm text-gray-700'>Regulates</span>
          </div>
        </div>
      </div>
    </div>
  );
};
