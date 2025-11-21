import { useState } from 'react';
import { links } from '../data/links';
import { nodes } from '../data/nodes';
import { scenarios } from '../data/scenarios';
import type { Scenario } from '../data/types';
import { useResponsiveDimensions } from '../hooks/useResponsiveDimensions';
import { CategoryLegend } from './CategoryLegend';
import { GuidedTour } from './GuidedTour';
import { NetworkVisualization } from './NetworkVisualization';
import { NodeDetail } from './NodeDetail';
import { SeveritySlider } from './SeveritySlider';

export const ThyroidExplorer: React.FC = () => {
  // State management
  const [severity, setSeverity] = useState<'normal' | 'subclinical' | 'overt'>(
    'subclinical'
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<string[] | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  // Get responsive dimensions
  const { width, isMobile } = useResponsiveDimensions();

  // Get selected node object
  const selectedNodeData = selectedNode
    ? nodes.find((n) => n.id === selectedNode)
    : null;

  // Handlers
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
  };

  const handleSeverityChange = (
    newSeverity: 'normal' | 'subclinical' | 'overt'
  ) => {
    setSeverity(newSeverity);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    // Update severity based on scenario
    if (scenario.id === 'optimal') {
      setSeverity('normal');
    } else if (
      scenario.id.includes('uncontrolled') ||
      scenario.id === 'overt-hypo'
    ) {
      setSeverity('overt');
    } else {
      setSeverity('subclinical');
    }
  };

  const handleTourHighlight = (
    nodeId: string | null,
    path: string[] | null
  ) => {
    setSelectedNode(nodeId || null);
    setHighlightedPath(path || null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
      {/* Compact Header */}
      <header className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='max-w-[1800px] mx-auto px-6 py-4'>
          <h1 className='text-3xl font-bold text-gray-900 mb-1'>
            Thyroid-Reproductive Health Connection
          </h1>
          <p className='text-sm text-gray-600'>
            Click nodes for details • Hover to highlight pathways
          </p>
        </div>
      </header>

      {/* Main Content - Tighter Layout */}
      <div className='max-w-[1800px] mx-auto px-6 py-4'>
        <div className='flex gap-4'>
          {/* Compact Sidebar */}
          <div className='w-64 flex-shrink-0 space-y-4'>
            {/* Clinical Scenarios Dropdown */}
            <div className='bg-white rounded-lg shadow-lg p-4'>
              <h3 className='text-lg font-semibold mb-3 text-gray-900'>
                Clinical Scenario
              </h3>
              <select
                value={currentScenario?.id || ''}
                onChange={(e) => {
                  const scenario = scenarios.find(
                    (s) => s.id === e.target.value
                  );
                  if (scenario) handleScenarioSelect(scenario);
                }}
                className='w-full p-3 border-2 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none'
              >
                <option value=''>Select a scenario...</option>
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>

              {currentScenario && (
                <div className='mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-xs text-blue-800 leading-relaxed'>
                    {currentScenario.description}
                  </p>
                </div>
              )}
            </div>

            {/* Compact Severity Slider */}
            <div className='bg-white rounded-lg shadow-lg p-4'>
              <SeveritySlider
                value={severity}
                onChange={handleSeverityChange}
              />
            </div>

            {/* Compact Legend */}
            <div className='bg-white rounded-lg shadow-lg p-4'>
              <CategoryLegend />
            </div>

            {/* Research Note */}
            <div className='bg-blue-50 border-2 border-blue-200 rounded-lg p-3'>
              <p className='text-xs text-blue-800'>
                <span className='font-semibold'>📚</span> All connections
                peer-reviewed
              </p>
            </div>
          </div>

          {/* Main Visualization Area */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white rounded-xl shadow-xl p-4'>
              <NetworkVisualization
                nodes={nodes}
                links={links}
                severity={severity}
                highlightedPath={highlightedPath}
                selectedNode={selectedNode}
                hoveredNode={hoveredNode}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                width={Math.min(width - 320, 1200)}
                height={650}
                isMobile={isMobile}
              />
            </div>

            {/* Scenario Details Below - Only Show When Selected */}
            {currentScenario && (
              <div className='bg-white rounded-xl shadow-lg p-4 mt-4'>
                <h2 className='text-xl font-bold text-gray-900 mb-2'>
                  {currentScenario.name}
                </h2>

                {/* Compact Lab Values */}
                <div className='grid grid-cols-5 gap-2 mb-4'>
                  <div className='p-2 bg-blue-50 rounded border border-blue-100'>
                    <div className='text-[10px] text-blue-600 font-semibold mb-1'>
                      TSH
                    </div>
                    <div className='text-lg font-bold text-blue-900'>
                      {currentScenario.thyroidValues.tsh}
                    </div>
                    <div className='text-[9px] text-blue-600'>mIU/L</div>
                  </div>
                  <div className='p-2 bg-blue-50 rounded border border-blue-100'>
                    <div className='text-[10px] text-blue-600 font-semibold mb-1'>
                      Free T3
                    </div>
                    <div className='text-lg font-bold text-blue-900'>
                      {currentScenario.thyroidValues.freeT3}
                    </div>
                    <div className='text-[9px] text-blue-600'>pg/mL</div>
                  </div>
                  <div className='p-2 bg-blue-50 rounded border border-blue-100'>
                    <div className='text-[10px] text-blue-600 font-semibold mb-1'>
                      Free T4
                    </div>
                    <div className='text-lg font-bold text-blue-900'>
                      {currentScenario.thyroidValues.freeT4}
                    </div>
                    <div className='text-[9px] text-blue-600'>ng/dL</div>
                  </div>
                  <div className='p-2 bg-purple-50 rounded border border-purple-100'>
                    <div className='text-[10px] text-purple-600 font-semibold mb-1'>
                      TPO Ab
                    </div>
                    <div className='text-lg font-bold text-purple-900'>
                      {currentScenario.thyroidValues.tpoAntibodies}
                    </div>
                    <div className='text-[9px] text-purple-600'>IU/mL</div>
                  </div>
                  <div className='p-2 bg-purple-50 rounded border border-purple-100'>
                    <div className='text-[10px] text-purple-600 font-semibold mb-1'>
                      Tg Ab
                    </div>
                    <div className='text-lg font-bold text-purple-900'>
                      {currentScenario.thyroidValues.tgAntibodies}
                    </div>
                    <div className='text-[9px] text-purple-600'>IU/mL</div>
                  </div>
                </div>

                {/* Two Column Layout for Impacts & Notes */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2 text-sm'>
                      Reproductive Impacts
                    </h3>
                    <ul className='space-y-1'>
                      {currentScenario.reproductiveImpacts.map(
                        (impact, idx) => (
                          <li
                            key={idx}
                            className='text-xs text-gray-700 flex items-start'
                          >
                            <span className='text-pink-500 mr-2'>•</span>
                            <span>{impact}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className='p-3 bg-gray-50 rounded border border-gray-200'>
                    <h3 className='font-semibold text-gray-900 mb-2 text-sm'>
                      Clinical Notes
                    </h3>
                    <p className='text-xs text-gray-700 leading-relaxed'>
                      {currentScenario.clinicalNotes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side Panel - Node Details */}
      {selectedNodeData && (
        <NodeDetail
          node={selectedNodeData}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Guided Tour */}
      <GuidedTour onHighlight={handleTourHighlight} />
    </div>
  );
};
