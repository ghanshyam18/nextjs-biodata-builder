'use client';

import { Box, Center, Loader } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { inter } from '../../../../app/fonts';
import { A4_ASPECT_RATIO, A4_WIDTH_PX } from '../../../../shared/constants/dimensions';
import type { BiodataData, TemplateStyle } from '../../../../shared/types';

// Dynamic imports for templates to reduce bundle size and memory usage on low-end devices
const TraditionalTemplate = dynamic(() => import('../../../../components/templates/Traditional'));
const ModernTemplate = dynamic(() => import('../../../../components/templates/Modern'));
const MinimalistTemplate = dynamic(() => import('../../../../components/templates/Minimalist'));
const FloralTemplate = dynamic(() => import('../../../../components/templates/Floral'));
const ElegantTemplate = dynamic(() => import('../../../../components/templates/Elegant'));
const ClassicTemplate = dynamic(() => import('../../../../components/templates/Classic'));

interface PreviewProps {
  data: BiodataData;
  template: TemplateStyle;
  isPrint?: boolean;
}

export default function Preview({ data, template, isPrint = false }: PreviewProps) {
  const { ref, width } = useElementSize();
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(isPrint);
  const TARGET_WIDTH = A4_WIDTH_PX;
  const ASPECT_RATIO = A4_ASPECT_RATIO;

  useEffect(() => {
    if (isPrint) {
      setScale(1);
      setIsReady(true);
      return;
    }

    if (width > 0) {
      const newScale = Math.min(1, width / TARGET_WIDTH);
      setScale(newScale);

      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [width, isPrint, TARGET_WIDTH]);

  const getTemplate = () => {
    const props = { data };
    switch (template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'minimalist':
        return <MinimalistTemplate {...props} />;
      case 'floral':
        return <FloralTemplate {...props} />;
      case 'elegant':
        return <ElegantTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'traditional':
      default:
        return <TraditionalTemplate {...props} />;
    }
  };

  const scaledHeight = TARGET_WIDTH * ASPECT_RATIO * scale;

  return (
    <Box
      ref={ref}
      className="preview-container"
      style={{
        width: '100%',
        minHeight: isPrint ? TARGET_WIDTH * ASPECT_RATIO : scaledHeight,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s ease',
        fontFamily: inter.style.fontFamily,
      }}
    >
      {!isReady && !isPrint && (
        <Center h={scaledHeight || 400}>
          <Loader size="sm" />
        </Center>
      )}

      <Box
        className="preview-content"
        style={{
          width: TARGET_WIDTH,
          minHeight: TARGET_WIDTH * ASPECT_RATIO,
          position: 'relative',
          transform: isPrint ? 'none' : `scale(${scale})`,
          transformOrigin: 'top left',
          visibility: isReady ? 'visible' : 'hidden',
        }}
      >
        {getTemplate()}
      </Box>
    </Box>
  );
}
