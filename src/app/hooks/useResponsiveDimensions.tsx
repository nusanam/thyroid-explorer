import { useEffect, useState } from 'react';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 650,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;

      // Calculate available width
      const availableWidth = window.innerWidth - 320; // Account for sidebar

      setDimensions({
        width: Math.min(availableWidth, 1200),
        height: 650,
        isMobile,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};
