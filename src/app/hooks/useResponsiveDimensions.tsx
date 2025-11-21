import { useEffect, useState } from 'react';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: 1100,
    height: 480,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;

      // Calculate available width (sidebar is 256px + gaps)
      const availableWidth = window.innerWidth - 320;

      setDimensions({
        width: Math.min(availableWidth, 1100),
        height: 480,
        isMobile,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
};
