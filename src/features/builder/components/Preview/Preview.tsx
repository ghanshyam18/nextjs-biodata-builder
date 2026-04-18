'use client';

import dynamic from 'next/dynamic';
import type { BiodataData, TemplateStyle } from '../../../../shared/types';
import { Box, Center, Loader } from '@mantine/core';

import TraditionalTemplate from '../../../../components/templates/Traditional';

// Dynamically import other templates for performance optimization
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
  const getTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'floral':
        return <FloralTemplate data={data} />;
      case 'elegant':
        return <ElegantTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'traditional':
      default:
        return <TraditionalTemplate data={data} />;
    }
  };

  return (
    <Box>
      {getTemplate()}
    </Box>
  );
}
