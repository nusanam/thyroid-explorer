import type { Scenario } from '../data/types';
import { NetworkVisualization } from './NetworkVisualization';
import { NodeDetail } from './NodeDetail';
import { ScenarioSelector } from './ScenarioSelector';
import { SeveritySlider } from './SeveritySlider';
import { GuidedTour } from './GuidedTour';
import { CategoryLegend } from './CategoryLegend';
import { useEffect, useState } from 'react';
import { links } from '../data/links';
import { nodes } from '../data/nodes';
import { useResponsiveDimensions } from '../hooks/useResponsiveDimensions';
import { validateSimulationLinks } from '../utils/validation';

export const ThyroidExplorer: React.FC = () => {
  // State management
  const [severity, setSeverity] = useState<'normal' | 'subclinical' | 'overt'>(
    'subclinical'
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [highlightedPath, setHighlightedPath] = useState<string[] | undefined>(
    undefined
  );
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);

  // Get responsive dimensions
  const { width, height, isMobile } = useResponsiveDimensions();

  // Validate data on mount
  useEffect(() => {
    const validation = validateSimulationLinks(nodes, links);
    if (!validation.valid) {
      console.error('Connection validation errors:', validation.errors);
    }
  }, []);

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

  const handleTourHighlight = (nodeId?: string, path?: string[]) => {
    setSelectedNode(nodeId || null);
    setHighlightedPath(path);
  };
  return (
    <div className='thyroid-explorer min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8'>
      {/* Header */}
      <header className='max-w-7xl mx-auto mb-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
          Thyroid-Reproductive Health Connection
        </h1>
        <p className='text-lg text-gray-600 max-w-3xl'>
          Explore how thyroid dysfunction cascades into reproductive health
          impacts. Click nodes for details, hover to highlight pathways.
        </p>
      </header>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto'>
        {/* Scenario Selector */}
        <div className='mb-6'>
          <ScenarioSelector onSelect={handleScenarioSelect} />
        </div>

        {/* Controls Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <SeveritySlider value={severity} onChange={handleSeverityChange} />
          <CategoryLegend />
        </div>

        {/* Visualization Container */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
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

        {/* Current Scenario Info */}
        {currentScenario && (
          <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              {currentScenario.name}
            </h2>
            <p className='text-gray-600 mb-4'>{currentScenario.description}</p>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-4'>
              <div className='p-3 bg-blue-50 rounded'>
                <div className='text-xs text-blue-600 font-medium'>TSH</div>
                <div className='text-lg font-bold text-blue-900'>
                  {currentScenario.thyroidValues.tsh} mIU/L
                </div>
              </div>
              <div className='p-3 bg-blue-50 rounded'>
                <div className='text-xs text-blue-600 font-medium'>Free T3</div>
                <div className='text-lg font-bold text-blue-900'>
                  {currentScenario.thyroidValues.freeT3} pg/mL
                </div>
              </div>
              <div className='p-3 bg-blue-50 rounded'>
                <div className='text-xs text-blue-600 font-medium'>Free T4</div>
                <div className='text-lg font-bold text-blue-900'>
                  {currentScenario.thyroidValues.freeT4} ng/dL
                </div>
              </div>
              <div className='p-3 bg-purple-50 rounded'>
                <div className='text-xs text-purple-600 font-medium'>
                  TPO Ab
                </div>
                <div className='text-lg font-bold text-purple-900'>
                  {currentScenario.thyroidValues.tpoAntibodies} IU/mL
                </div>
              </div>
              <div className='p-3 bg-purple-50 rounded'>
                <div className='text-xs text-purple-600 font-medium'>Tg Ab</div>
                <div className='text-lg font-bold text-purple-900'>
                  {currentScenario.thyroidValues.tgAntibodies} IU/mL
                </div>
              </div>
            </div>

            <div className='mb-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                Reproductive Impacts:
              </h3>
              <ul className='space-y-1'>
                {currentScenario.reproductiveImpacts.map((impact, idx) => (
                  <li key={idx} className='text-gray-700 flex items-start'>
                    <span className='text-pink-500 mr-2'>•</span>
                    {impact}
                  </li>
                ))}
              </ul>
            </div>

            <div className='p-4 bg-gray-50 rounded'>
              <h3 className='font-semibold text-gray-900 mb-1'>
                Clinical Notes:
              </h3>
              <p className='text-gray-700 text-sm'>
                {currentScenario.clinicalNotes}
              </p>
            </div>
          </div>
        )}

        {/* Research Note */}
        <div className='bg-blue-50 border border-blue-200 rounded-xl p-6'>
          <h3 className='font-semibold text-blue-900 mb-2'>
            📚 Research-Backed Visualization
          </h3>
          <p className='text-blue-800 text-sm'>
            All connections in this visualization are based on peer-reviewed
            research. Click any connection or node to see the supporting
            citations.
          </p>
        </div>
      </div>

      {/* Side Panel - Node Details */}
      {selectedNodeData && (
        <NodeDetail
          node={selectedNodeData}
          links={links ? links : null}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Guided Tour */}
      <GuidedTour onHighlight={handleTourHighlight} />
    </div>
  );
};
