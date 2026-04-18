'use client';

import dynamic from 'next/dynamic';
import type { BiodataData, TemplateStyle } from '../../../../shared/types';
import { Box, Center, Loader } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { inter, outfit } from '../../../../shared/fonts';

import TraditionalTemplate from '../../../../components/templates/Traditional';

const ModernTemplate = dynamic(() => import('../../../../components/templates/Modern'), {
  loading: () => <Center h={400}><Loader color="blue" /></Center>
});
const MinimalistTemplate = dynamic(() => import('../../../../components/templates/Minimalist'), {
  loading: () => <Center h={400}><Loader color="blue" /></Center>
});
const FloralTemplate = dynamic(() => import('../../../../components/templates/Floral'), {
  loading: () => <Center h={400}><Loader color="blue" /></Center>
});
const ElegantTemplate = dynamic(() => import('../../../../components/templates/Elegant'), {
  loading: () => <Center h={400}><Loader color="blue" /></Center>
});
const ClassicTemplate = dynamic(() => import('../../../../components/templates/Classic'), {
  loading: () => <Center h={400}><Loader color="blue" /></Center>
});

interface PreviewProps {
  data: BiodataData;
  template: TemplateStyle;
}

export default function Preview({ data, template }: PreviewProps) {
  const { ref, width } = useElementSize();
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const TARGET_WIDTH = 800;
  const ASPECT_RATIO = 1.414; // A4 aspect ratio

  useEffect(() => {
    if (width > 0) {
      const newScale = Math.min(1, width / TARGET_WIDTH);
      setScale(newScale);
      // Give a tiny delay to ensure the browser has applied the dimensions
      const timer = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [width]);

  const getTemplate = () => {
    switch (template) {
      case 'modern': return <ModernTemplate data={data} />;
      case 'minimalist': return <MinimalistTemplate data={data} />;
      case 'floral': return <FloralTemplate data={data} />;
      case 'elegant': return <ElegantTemplate data={data} />;
      case 'classic': return <ClassicTemplate data={data} />;
      case 'traditional':
      default: return <TraditionalTemplate data={data} />;
    }
  };

  const scaledHeight = TARGET_WIDTH * ASPECT_RATIO * scale;

  return (
    <Box 
      ref={ref} 
      className={`preview-container ${inter.className} ${outfit.variable}`}
      style={{ 
        width: '100%', 
        minHeight: scaledHeight,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s ease',
        fontFamily: "'Inter', sans-serif", // Direct fallback for print engines
      }}
    >
      <Box
        className="preview-content"
        style={{
          width: TARGET_WIDTH,
          minHeight: TARGET_WIDTH * ASPECT_RATIO,
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          // No transition on transform here to avoid the "shrinking" animation on first load
        }}
      >
        {getTemplate()}
      </Box>
    </Box>
  );
}
