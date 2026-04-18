'use client';

import dynamic from 'next/dynamic';
import type { BiodataData, TemplateStyle } from '../../../../shared/types';
import { Box, Center, Loader } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { inter, outfit } from '../../../../shared/fonts';
import { A4_WIDTH_PX, A4_ASPECT_RATIO } from '../../../../shared/constants/dimensions';

import TraditionalTemplate from '../../../../components/templates/Traditional';
import ModernTemplate from '../../../../components/templates/Modern';
import MinimalistTemplate from '../../../../components/templates/Minimalist';
import FloralTemplate from '../../../../components/templates/Floral';
import ElegantTemplate from '../../../../components/templates/Elegant';
import ClassicTemplate from '../../../../components/templates/Classic';

interface PreviewProps {
  data: BiodataData;
  template: TemplateStyle;
  isPrint?: boolean;
}

export default function Preview({ data, template, isPrint = false }: PreviewProps) {
  const { ref, width } = useElementSize();
  const [scale, setScale] = useState(1);
  const [isReady, setIsReady] = useState(false);
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
      const timer = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timer);
    }
  }, [width, isPrint]);

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
          transform: isPrint ? 'none' : `scale(${scale})`,
          transformOrigin: 'top left',
          // No transition on transform here to avoid the "shrinking" animation on first load
        }}
      >
        {getTemplate()}
      </Box>
    </Box>
  );
}
