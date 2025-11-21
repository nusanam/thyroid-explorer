// ==================== ANIMATION HELPERS ====================

/**
 * Get staggered delay for entrance animations
 */
export const getEntranceDelay = (
  index: number,
  baseDelay: number = 50
): number => {
  return index * baseDelay;
};

/**
 * Get animation duration based on SimulationLink length
 */
export const getAnimationDuration = (
  source: { x: number; y: number },
  target: { x: number; y: number }
): number => {
  const distance = Math.sqrt(
    Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)
  );

  // Longer SimulationLinks take longer to animate
  const baseDuration = 1500;
  const durationPerPixel = 2;

  return baseDuration + distance * durationPerPixel;
};