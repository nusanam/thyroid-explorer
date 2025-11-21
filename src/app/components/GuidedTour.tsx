import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface TourStep {
  title: string;
  description: string;
  highlightNode: string | null;
  highlightPath: string[] | null;
  position: { x: number; y: number };
}

const tourSteps: TourStep[] = [
  {
    title: 'Welcome to the Thyroid-Reproductive Connection',
    description:
      "This visualization shows how thyroid dysfunction cascades into reproductive health issues. Let's explore the pathways.",
    position: { x: 100, y: 100 },
    highlightPath: null,
    highlightNode: null,
  },
  {
    title: 'It Starts with TSH',
    description:
      'TSH (Thyroid Stimulating Hormone) is released by your pituitary. When elevated (>2.5), it indicates your thyroid is struggling.',
    highlightNode: 'tsh',
    highlightPath: null,
    position: { x: 200, y: 300 },
  },
  {
    title: 'TSH Impairs Progesterone',
    description:
      'Elevated TSH directly interferes with corpus luteum function, reducing progesterone production after ovulation.',
    highlightPath: ['tsh', 'progesterone'],
    highlightNode: null,
    position: { x: 400, y: 350 },
  },
  {
    title: 'Low Progesterone = Short Luteal Phase',
    description:
      'Without adequate progesterone, the luteal phase becomes too short (<10 days), making it difficult for embryos to implant.',
    highlightPath: ['progesterone', 'luteal_phase_length'],
    highlightNode: null,
    position: { x: 700, y: 400 },
  },
  {
    title: 'Temperature Regulation',
    description:
      'Thyroid hormones regulate basal body temperature. Hypothyroidism causes lower temps, making BBT charting less reliable.',
    highlightPath: ['free_t3', 'basal_temp', 'bbt_pattern'],
    highlightNode: null,
    position: { x: 600, y: 200 },
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
    position: { x: 300, y: 500 },
  },
  {
    title: 'Multiple Pathways Converge',
    description:
      'Notice how thyroid dysfunction affects reproduction through many simultaneous pathways—metabolism, hormones, immune system, and more.',
    highlightPath: null,
    highlightNode: null,
    position: { x: 600, y: 100 },
  },
  {
    title: 'Why Comprehensive Testing Matters',
    description:
      "Standard care tests only TSH. But you need Free T3, Free T4, and antibodies to see the full picture. Doctors won't always test these values, so it can be important to see a physician who prioritizes functional / integrative medicine.",
    highlightPath: null,
    highlightNode: null,
    position: { x: 400, y: 150 },
  },
];

interface Props {
  onHighlight: (nodeId: string | null, path: string[] | null) => void;
}

export const GuidedTour: React.FC<Props> = ({ onHighlight }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
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

  return (
    <>
      {!isActive && (
        <button
          onClick={startTour}
          className='fixed top-4 right-4 px-6 py-3 bg-[#4d787ecc] text-white rounded-lg font-medium hover:bg-[#ffd89bcc] hover:text-[#8e9047] transition-colors shadow-lg'
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'relative',
                left: step.position.x,
                top: step.position.y,
                zIndex: 50,
              }}
              className='bg-white rounded-lg shadow-2xl p-6 max-w-md'
            >
              <div className='flex items-start justify-between mb-3'>
                <h3 className='text-xl font-bold text-[#6298a0cc]'>
                  {step.title}
                </h3>
                <button
                  onClick={endTour}
                  className='text-gray-400 font-semibold hover:text-[#6cbfc0]'
                >
                  ✕
                </button>
              </div>

              <p className='text-[#6cbfc0] mb-6'>{step.description}</p>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-[#6298a0cc]'>
                  Step {currentStep + 1} of {tourSteps.length}
                </span>

                <div className='flex gap-2'>
                  {currentStep > 0 && (
                    <button
                      onClick={prevStep}
                      className='px-4 py-2 bg-[#4d787ecc] text-white rounded hover:bg-[#ffd89bcc] hover:text-[#8e9047] transition-colors shadow-lg'
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className='px-4 py-2 bg-[#4d787ecc] text-white rounded hover:bg-[#ffd89bcc] hover:text-[#8e9047] transition-colors shadow-lg'
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
