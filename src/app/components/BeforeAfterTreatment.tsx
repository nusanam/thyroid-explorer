import React, { useRef } from 'react';
import { nodes } from '../data/nodes';
import { links } from '../data/links';
import { calculateVisualizationHeight } from '../utils/layout';
import { NetworkVisualization } from './NetworkVisualization';

export const BeforeAfterComparison: React.FC = () => {
  const vizHeight = calculateVisualizationHeight(nodes);
  const beforeSvgRef = useRef<SVGSVGElement>(null);
  const afterSvgRef = useRef<SVGSVGElement>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div>
        <h3 className='text-lg font-bold mb-4 text-center'>Before Treatment</h3>
        <NetworkVisualization
          nodes={nodes}
          links={links}
          severity='overt'
          highlightedPath={null}
          selectedNode={null}
          hoveredNode={null}
          onNodeClick={() => {}}
          onNodeHover={() => {}}
          width={600}
          height={vizHeight}
          isMobile={false}
          svgRef={beforeSvgRef} // ADD THIS
        />
        <div className='mt-4 p-4 bg-red-50 rounded'>
          <p className='text-sm text-red-900'>
            TSH: 6.8 | Multiple pathways disrupted
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-bold mb-4 text-center'>
          After 3 Months Treatment
        </h3>
        <NetworkVisualization
          nodes={nodes}
          links={links}
          severity='subclinical'
          highlightedPath={null}
          selectedNode={null}
          hoveredNode={null}
          onNodeClick={() => {}}
          onNodeHover={() => {}}
          width={600}
          height={vizHeight}
          isMobile={false}
          svgRef={afterSvgRef} // ADD THIS
        />
        <div className='mt-4 p-4 bg-green-50 rounded'>
          <p className='text-sm text-green-900'>
            TSH: 2.0 | Improved function, antibodies persist
          </p>
        </div>
      </div>
    </div>
  );
};
