import React from 'react';
import {
  getSimulationLinkColor,
  getSimulationNodeColor,
} from '../utils/styling';

export const CategoryLegend: React.FC = () => {
  return (
    <div>
      <h3 className='text-base font-semibold mb-3 text-[#6298a0cc]'>Legend</h3>

      {/* Node Categories */}
      <div className='mb-4'>
        <h4 className='text-xs font-medium text-[#8e9047] mb-2'>
          Node Categories
        </h4>
        <div className='space-y-2'>
          <div className='flex items-start gap-2'>
            <div className='flex gap-1 flex-shrink-0 mt-0.5'>
              <div
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: '#22c55e' }}
              />
              <div
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: '#eab308' }}
              />
              <div
                className='w-4 h-4 rounded-full'
                style={{ backgroundColor: '#ef4444' }}
              />
            </div>
            <span className='text-xs text-[#426a70cc]'>
              Thyroid Markers (severity-based)
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-4 h-4 rounded-full flex-shrink-0'
              style={{
                backgroundColor: getSimulationNodeColor('intermediate'),
              }}
            />
            <span className='text-xs text-[#426a70cc]'>
              Intermediate Effects
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-4 h-4 rounded-full flex-shrink-0'
              style={{
                backgroundColor: getSimulationNodeColor('reproductive'),
              }}
            />
            <span className='text-xs text-[#426a70cc]'>
              Reproductive Outcomes
            </span>
          </div>
        </div>
      </div>

      {/* Connection Types */}
      <div>
        <h4 className='text-xs font-medium text-[#8e9047] mb-2'>
          Connection Types
        </h4>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <div
              className='w-8 h-0.5 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('stimulatory') }}
            />
            <span className='text-xs text-[#426a70cc]'>Stimulates</span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-8 h-0.5 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('inhibitory') }}
            />
            <span className='text-xs text-[#426a70cc]'>Inhibits</span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className='w-8 h-0.5 flex-shrink-0'
              style={{ backgroundColor: getSimulationLinkColor('regulatory') }}
            />
            <span className='text-xs text-[#426a70cc]'>Regulates</span>
          </div>
        </div>
      </div>
    </div>
  );
};
