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
  const { width, height, isMobile } = useResponsiveDimensions();

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
      {/* Header */}
      <header className='bg-white border-b border-gray-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-8 py-6'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Thyroid-Reproductive Health Connection
          </h1>
          <p className='text-lg text-gray-600'>
            Explore how thyroid dysfunction cascades into reproductive health
            impacts. Click nodes for details, hover to highlight pathways.
          </p>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className='max-w-7xl mx-auto px-8 py-6'>
        <div className='flex gap-6'>
          {/* Left Sidebar - Controls */}
          <div className='w-80 flex-shrink-0 space-y-6'>
            {/* Scenario Selector */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-gray-900'>
                Clinical Scenarios
              </h3>
              <div className='space-y-3'>
                {scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleScenarioSelect(scenario)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      currentScenario?.id === scenario.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <h4 className='font-semibold text-sm text-gray-900 mb-1'>
                      {scenario.name}
                    </h4>
                    <p className='text-xs text-gray-600 leading-relaxed'>
                      {scenario.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Slider */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <SeveritySlider
                value={severity}
                onChange={handleSeverityChange}
              />
            </div>

            {/* Legend */}
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <CategoryLegend />
            </div>

            {/* Research Note */}
            <div className='bg-blue-50 border-2 border-blue-200 rounded-lg p-4'>
              <p className='text-sm text-blue-800'>
                <span className='font-semibold'>📚 Research-Backed:</span> All
                connections based on peer-reviewed research
              </p>
            </div>
          </div>

          {/* Right Side - Visualization */}
          <div className='flex-1 min-w-0'>
            <div className='bg-white rounded-xl shadow-xl p-6 mb-6'>
              <NetworkVisualization
                nodes={nodes}
                links={links}
                severity={severity}
                highlightedPath={highlightedPath}
                selectedNode={selectedNode}
                hoveredNode={hoveredNode}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                width={width}
                height={height}
                isMobile={isMobile}
              />
            </div>

            {/* Current Scenario Info - Below Diagram */}
            {currentScenario && (
              <div className='bg-white rounded-xl shadow-lg p-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                  {currentScenario.name}
                </h2>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  {currentScenario.description}
                </p>

                {/* Lab Values Grid */}
                <div className='grid grid-cols-5 gap-4 mb-6'>
                  <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
                    <div className='text-xs text-blue-600 font-semibold mb-2'>
                      TSH
                    </div>
                    <div className='text-xl font-bold text-blue-900'>
                      {currentScenario.thyroidValues.tsh}
                    </div>
                    <div className='text-xs text-blue-600 mt-1'>mIU/L</div>
                  </div>
                  <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
                    <div className='text-xs text-blue-600 font-semibold mb-2'>
                      Free T3
                    </div>
                    <div className='text-xl font-bold text-blue-900'>
                      {currentScenario.thyroidValues.freeT3}
                    </div>
                    <div className='text-xs text-blue-600 mt-1'>pg/mL</div>
                  </div>
                  <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
                    <div className='text-xs text-blue-600 font-semibold mb-2'>
                      Free T4
                    </div>
                    <div className='text-xl font-bold text-blue-900'>
                      {currentScenario.thyroidValues.freeT4}
                    </div>
                    <div className='text-xs text-blue-600 mt-1'>ng/dL</div>
                  </div>
                  <div className='p-4 bg-purple-50 rounded-lg border border-purple-100'>
                    <div className='text-xs text-purple-600 font-semibold mb-2'>
                      TPO Ab
                    </div>
                    <div className='text-xl font-bold text-purple-900'>
                      {currentScenario.thyroidValues.tpoAntibodies}
                    </div>
                    <div className='text-xs text-purple-600 mt-1'>IU/mL</div>
                  </div>
                  <div className='p-4 bg-purple-50 rounded-lg border border-purple-100'>
                    <div className='text-xs text-purple-600 font-semibold mb-2'>
                      Tg Ab
                    </div>
                    <div className='text-xl font-bold text-purple-900'>
                      {currentScenario.thyroidValues.tgAntibodies}
                    </div>
                    <div className='text-xs text-purple-600 mt-1'>IU/mL</div>
                  </div>
                </div>

                {/* Reproductive Impacts */}
                <div className='mb-6'>
                  <h3 className='font-semibold text-gray-900 mb-3 text-lg'>
                    Reproductive Impacts:
                  </h3>
                  <ul className='space-y-2'>
                    {currentScenario.reproductiveImpacts.map((impact, idx) => (
                      <li
                        key={idx}
                        className='text-gray-700 flex items-start leading-relaxed'
                      >
                        <span className='text-pink-500 mr-3 mt-1 font-bold'>
                          •
                        </span>
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical Notes */}
                <div className='p-4 bg-gray-50 rounded-lg border-2 border-gray-200'>
                  <h3 className='font-semibold text-gray-900 mb-2 text-lg'>
                    Clinical Notes:
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {currentScenario.clinicalNotes}
                  </p>
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
