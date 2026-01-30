import { useState, useRef } from 'react';
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
import { calculateVisualizationHeight } from '../utils/layout';

export const ThyroidExplorer: React.FC = () => {
  // State management
  const [severity, setSeverity] = useState<'normal' | 'subclinical' | 'overt'>(
    'subclinical',
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<string[] | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // Get responsive dimensions
  const { width, isMobile } = useResponsiveDimensions();
  const vizHeight = calculateVisualizationHeight(nodes);

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
    newSeverity: 'normal' | 'subclinical' | 'overt',
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
    path: string[] | null,
  ) => {
    setSelectedNode(nodeId || null);
    setHighlightedPath(path || null);
  };

  return (
    <div className='min-h-screen'>
      {/* Compact Header */}
      <header className='shadow-sm'>
        <div className='max-w-[1800px] mx-auto px-6 py-4'>
          <h1 className='text-3xl font-bold text-[#6298a0cc] mb-1'>
            Thyroid-Reproductive Health Connection
          </h1>
          <span className='text-sm text-[#6b9ba3]'>
            Click nodes for details • Hover to highlight pathways
          </span>
        </div>
      </header>

      {/* Main Content - Tighter Layout */}
      <div className='max-w-[1800px] mx-auto px-6 py-4'>
        <div className='flex gap-4'>
          {/* Compact Sidebar */}
          <div className='w-64 flex-shrink-0 space-y-4'>
            {/* Clinical Scenarios Dropdown */}
            <div className='bg-white rounded-lg shadow-lg p-4'>
              <h3 className='text-lg font-semibold mb-3 text-[#6298a0cc]'>
                Clinical Scenario
              </h3>
              <select
                value={currentScenario?.id || ''}
                onChange={(e) => {
                  const scenario = scenarios.find(
                    (s) => s.id === e.target.value,
                  );
                  if (scenario) handleScenarioSelect(scenario);
                }}
                className='w-full p-1 border-2 border-gray-300 rounded-lg text-[#6298a0cc] text-sm focus:border-[#6298a0cc] focus:outline-none'
              >
                <option value=''>Select a scenario...</option>
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>

              {currentScenario && (
                <div className='mt-3 p-3 bg-[#dcf0f0cc] rounded-lg'>
                  <p className='text-xs text-[#44676ccc] leading-relaxed'>
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
            <div className='bg-[#ebf6f8] rounded-lg p-3'>
              <p className='text-xs text-[#44676ccc]'>
                <span className='font-semibold'>📚</span> All connections
                peer-reviewed.
              </p>
            </div>
            <p className='text-xs text-[#80a4a9cc]'>
              Copyright © 2025 Ruth Anam
            </p>
          </div>

          {/* Main Visualization Area */}
          <div className='flex-1 min-w-0 space-y-3'>
            {/* Scenario Details Below - Only Show When Selected */}
            {currentScenario && (
              <div className='bg-white rounded-lg shadow-lg p-3'>
                <h2 className='text-xl font-bold text-[#6298a0cc] mb-2'>
                  {currentScenario.name}
                </h2>

                {/* Compact Lab Values */}
                <div className='grid grid-cols-5 gap-2 mb-2'>
                  <div className='p-2 bg-[#dcf0f0cc]  rounded border border-blue-100'>
                    <div className='text-[14px] text-[#43a5a1] font-semibold mb-1'>
                      TSH
                    </div>
                    <div className='text-lg font-bold text-[#268e8b]'>
                      {currentScenario.thyroidValues.tsh}
                    </div>
                    <div className='text-[11px] text-[#388c89]'>mIU/L</div>
                  </div>
                  <div className='p-2 bg-[#dcf0f0cc]  rounded border border-blue-100'>
                    <div className='text-[14px] text-[#43a5a1] font-semibold mb-1'>
                      Free T3
                    </div>
                    <div className='text-lg font-bold text-[#268e8b]'>
                      {currentScenario.thyroidValues.freeT3}
                    </div>
                    <div className='text-[11px] text-[#388c89]'>pg/mL</div>
                  </div>
                  <div className='p-2 bg-[#dcf0f0cc]  rounded border border-blue-100'>
                    <div className='text-[14px] text-[#43a5a1] font-semibold mb-1'>
                      Free T4
                    </div>
                    <div className='text-lg font-bold text-[#268e8b]'>
                      {currentScenario.thyroidValues.freeT4}
                    </div>
                    <div className='text-[11px] text-[#388c89]'>ng/dL</div>
                  </div>
                  <div className='p-2 bg-[#f4eafc] rounded border border-purple-100'>
                    <div className='text-[14px] text-[#aa60e7] font-semibold mb-1'>
                      TPO Ab
                    </div>
                    <div className='text-lg font-bold text-[#8652b0]'>
                      {currentScenario.thyroidValues.tpoAntibodies}
                    </div>
                    <div className='text-[11px] text-[#915abe]'>IU/mL</div>
                  </div>
                  <div className='p-2 bg-[#f4eafc] rounded border border-purple-100'>
                    <div className='text-[14px] text-[#aa60e7] font-semibold mb-1'>
                      Tg Ab
                    </div>
                    <div className='text-lg font-bold text-[#8652b0]'>
                      {currentScenario.thyroidValues.tgAntibodies}
                    </div>
                    <div className='text-[11px] text-[#915abe]'>IU/mL</div>
                  </div>
                </div>

                {/* Two Column Layout for Impacts & Notes */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    className='p-3 bg-[#edf6f6cc] rounded'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'flex-start',
                      alignItems: 'flex-start',
                      flex: '1',
                    }}
                  >
                    <h3 className='font-semibold text-[#6298a0cc] mb-2 text-sm'>
                      Reproductive Impacts
                    </h3>
                    <ul className='space-y-1'>
                      {currentScenario.reproductiveImpacts.map(
                        (impact, idx) => (
                          <li
                            key={idx}
                            className='text-xs text-[#44676ccc] flex'
                          >
                            <span className='text-[#54aea2] mr-2'>•</span>
                            <span>{impact}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div
                    className='p-3 bg-[#edf6f6cc] rounded'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'flex-start',
                      alignItems: 'start',
                      flex: '1',
                    }}
                  >
                    <h3 className='font-semibold text-[#6298a0cc] mb-2 text-sm'>
                      Clinical Notes
                    </h3>
                    <p className='text-xs text-[#44676ccc] leading-relaxed'>
                      {currentScenario.clinicalNotes}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                height={vizHeight}
                width={width}
                isMobile={isMobile}
                svgRef={svgRef}
              />
            </div>
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
      <GuidedTour
        onHighlight={handleTourHighlight}
        svgRef={svgRef}
        nodes={nodes}
      />
    </div>
  );
};
