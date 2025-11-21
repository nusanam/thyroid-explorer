import { useEffect, useState } from 'react';
import { NetworkVisualization } from '../components/NetworkVisualization';

export const useResponsiveDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

// Adjust visualization for mobile
export const ResponsiveNetworkVisualization = () => {
  const { isMobile, isTablet, width } = useResponsiveDimensions();

  const layout = isMobile
    ? 'vertical' // Stack nodes vertically
    : isTablet
    ? 'compact' // Tighter spacing
    : 'full'; // Full layout

  return (
    <NetworkVisualization
      width={width - 40}
      height={isMobile ? 1200 : 800}
      layout={layout}
    />
  );
};
