import { useEffect, useState } from 'react';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: Math.min(window.innerWidth * 0.9, 1400),
    height: 900,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: Math.min(window.innerWidth * 0.9, 1400),
        height: isMobile ? 1200 : 900,
        isMobile,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};
