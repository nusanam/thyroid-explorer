import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import type { SimulationNode } from '../data/types';

interface TourStep {
  title: string;
  description: string;
  highlightNode: string | null;
  highlightPath: string[] | null;
  nodeIndex?: number; // Which node to position near
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to the Thyroid-Reproductive Connection',
    description:
      "This visualization shows how thyroid dysfunction cascades into reproductive health issues. Let's explore the pathways.",
    highlightPath: null,
    highlightNode: null,
  },
  {
    title: 'It Starts with TSH',
    description:
      'TSH (Thyroid Stimulating Hormone) is released by your pituitary. When elevated (>2.5), it indicates your thyroid is struggling.',
    highlightNode: 'tsh',
    highlightPath: null,
    nodeIndex: 0, // First thyroid node
  },
  {
    title: 'TSH Impairs Progesterone',
    description:
      'Elevated TSH directly interferes with corpus luteum function, reducing progesterone production after ovulation.',
    highlightPath: ['tsh', 'progesterone_production'],
    highlightNode: null,
    nodeIndex: 7, // Progesterone Production (intermediate category)
  },
  {
    title: 'Low Progesterone = Short Luteal Phase',
    description:
      'Without adequate progesterone, the luteal phase becomes too short (<10 days), making it difficult for embryos to implant.',
    highlightPath: ['progesterone_production', 'luteal_phase_length'],
    highlightNode: null,
    nodeIndex: 15, // Luteal Phase Length (reproductive category)
  },
  {
    title: 'Temperature Regulation',
    description:
      'Thyroid hormones regulate basal body temperature. Hypothyroidism causes lower temps, making BBT charting less reliable.',
    highlightPath: ['free_t3', 'basal_body_temp', 'bbt_pattern'],
    highlightNode: null,
    nodeIndex: 6, // Body Temperature
  },
  {
    title: 'The Autoimmune Factor',
    description:
      "In Hashimoto's, thyroid antibodies create inflammation that can directly impact pregnancy. Even with normal TSH, antibodies increase miscarriage risk.",
    highlightNode: 'tpo_antibodies',
    highlightPath: [
      'tpo_antibodies',
      'immune_activation',
      'pregnancy_loss_risk',
    ],
    nodeIndex: 3, // TPO Antibodies
  },
  {
    title: 'Multiple Pathways Converge',
    description:
      'Notice how thyroid dysfunction affects reproduction through many simultaneous pathways—metabolism, hormones, immune system, and more.',
    highlightPath: null,
    highlightNode: null,
  },
  {
    title: 'Why Comprehensive Testing Matters',
    description:
      'Standard care tests only TSH. But you need Free T3, Free T4, and antibodies to see the full picture.',
    highlightPath: null,
    highlightNode: null,
  },
];

interface Props {
  onHighlight: (nodeId: string | null, path: string[] | null) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
  nodes: SimulationNode[];
}

export const GuidedTour: React.FC<Props> = ({ onHighlight, svgRef }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Calculate positions based on actual DOM elements
  const calculatePositions = useCallback(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;

    const nodeGroups = svg.querySelectorAll('.node');
    const newPositions = Array.from(nodeGroups).map((nodeGroup) => {
      const rect = nodeGroup.getBoundingClientRect();
      return {
        x: rect.right + 20,
        y: rect.top + window.scrollY - 50,
      };
    });

    setPositions(newPositions);
  }, [svgRef]);

  // Recalculate on mount and window resize
  useEffect(() => {
    calculatePositions();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (isActive) {
        calculatePositions();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculatePositions, isActive]);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
    calculatePositions(); // Recalculate when tour starts
    applyStep(0);
  };

  const nextStep = () => {
    const next = currentStep + 1;
    if (next >= tourSteps.length) {
      endTour();
    } else {
      setCurrentStep(next);
      applyStep(next);
    }
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    if (prev >= 0) {
      setCurrentStep(prev);
      applyStep(prev);
    }
  };

  const endTour = () => {
    setIsActive(false);
    onHighlight(null, null);
  };

  const applyStep = (stepIndex: number) => {
    const step = tourSteps[stepIndex];
    onHighlight(step.highlightNode, step.highlightPath);
  };

  const step = tourSteps[currentStep];

  // Get position for current step
  const getStepPosition = () => {
    if (step.nodeIndex !== undefined && positions[step.nodeIndex]) {
      return positions[step.nodeIndex];
    }
    // Default position for intro/outro steps
    return { x: window.innerWidth / 2 - 200, y: 150 };
  };

  const position = getStepPosition();

  // Only show tour button if window is wide enough
  const isTourAvailable = windowWidth >= 822;

  return (
    <>
      {!isActive && isTourAvailable && (
        <button
          onClick={startTour}
          className='fixed top-4 right-4 px-6 py-3 bg-[#6298a0cc] text-white rounded-lg font-medium hover:bg-[#5a8a91] transition-colors shadow-lg z-50'
        >
          Let's Take a Tour
        </button>
      )}

      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black pointer-events-none z-40'
            />

            {/* Tour Card */}
            <motion.div
              key={currentStep} // Re-animate on step change
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex: 50,
              }}
              className='bg-white rounded-lg shadow-2xl p-6 max-w-md'
            >
              <div className='flex items-start justify-between mb-3'>
                <h3 className='text-xl font-bold text-gray-900'>
                  {step.title}
                </h3>
                <button
                  onClick={endTour}
                  className='text-gray-400 hover:text-gray-600'
                >
                  ✕
                </button>
              </div>

              <p className='text-gray-700 mb-6'>{step.description}</p>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>
                  Step {currentStep + 1} of {tourSteps.length}
                </span>

                <div className='flex gap-2'>
                  {currentStep > 0 && (
                    <button
                      onClick={prevStep}
                      className='px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors'
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className='px-4 py-2 bg-[#6298a0cc] text-white rounded hover:bg-[#5a8a91] transition-colors'
                  >
                    {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
