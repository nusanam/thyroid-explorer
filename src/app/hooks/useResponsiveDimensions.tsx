import { useEffect, useState } from 'react';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth - 100 : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight - 200 : 800,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: isMobile ? window.innerWidth - 40 : window.innerWidth - 100,
        height: isMobile ? 1200 : Math.min(window.innerHeight - 200, 900),
        isMobile,
      });
    };

    handleResize(); // call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};