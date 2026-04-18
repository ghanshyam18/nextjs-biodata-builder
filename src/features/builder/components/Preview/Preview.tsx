'use client';

import dynamic from 'next/dynamic';
import type { BiodataData, TemplateStyle } from '../../../../shared/types';
import { Box, Center, Loader } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';

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
  const TARGET_WIDTH = 800;
  const ASPECT_RATIO = 1.414; // A4 aspect ratio

  useEffect(() => {
    if (width > 0) {
      const newScale = Math.min(1, width / TARGET_WIDTH);
      setScale(newScale);
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
    <Box ref={ref} style={{ width: '100%', minHeight: scaledHeight }}>
      <Box
        style={{
          width: TARGET_WIDTH,
          minHeight: TARGET_WIDTH * ASPECT_RATIO,
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          transition: 'transform 0.1s ease',
        }}
      >
        {getTemplate()}
      </Box>
    </Box>
  );
}
