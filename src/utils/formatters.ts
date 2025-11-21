/* eslint-disable @typescript-eslint/no-unused-vars */


// ==================== FORMAT HELPERS ====================

/**
 * Format lab value with unit
 */
export const formatLabValue = (value: number, unit?: string): string => {
  const formatted = value.toFixed(1);
  return unit ? `${formatted} ${unit}` : formatted;
};

/**
 * Determine if lab value is in optimal range
 */
export const isInOptimalRange = (
  value: number,
  optimalRange: string
): boolean => {
  // Parse range like "<2.5" or "3.0-4.0" or ">40"
  if (optimalRange.startsWith('<')) {
    const threshold = parseFloat(optimalRange.slice(1));
    return value < threshold;
  }

  if (optimalRange.startsWith('>')) {
    const threshold = parseFloat(optimalRange.slice(1));
    return value > threshold;
  }

  if (optimalRange.includes('-')) {
    const [min, max] = optimalRange.split('-').map((s) => parseFloat(s.trim()));
    return value >= min && value <= max;
  }

  // Handle ranges like "3.0-4.0 (upper half of range)"
  const match = optimalRange.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
  if (match) {
    const [_, min, max] = match;
    return value >= parseFloat(min) && value <= parseFloat(max);
  }

  return true; // Default to true if can't parse
};

/**
 * Get severity label for lab value
 */
export const getLabSeverity = (
  value: number,
  normalRange: string,
  optimalRange?: string
): 'optimal' | 'suboptimal' | 'abnormal' => {
  if (optimalRange && isInOptimalRange(value, optimalRange)) {
    return 'optimal';
  }

  if (isInOptimalRange(value, normalRange)) {
    return 'suboptimal';
  }

  return 'abnormal';
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Format duration (months)
 */
export const formatDuration = (months: number): string => {
  if (months < 1) {
    return '<1 month';
  }
  if (months === 1) {
    return '1 month';
  }
  if (months > 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years}y ${remainingMonths}m`;
  }
  return `${months} months`;
};
