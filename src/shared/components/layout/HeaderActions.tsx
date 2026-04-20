import { Box, Button, Group, Image, Select, Title } from '@mantine/core';
import { History } from 'lucide-react';

import type { TemplateStyle } from '../../types';

interface HeaderActionsProps {
  onOpenSidebar: () => void;
  template: TemplateStyle;
  onTemplateChange: (val: TemplateStyle) => void;
  templates: { id: TemplateStyle; name: string }[];
}

export default function HeaderActions({
  onOpenSidebar,
  template,
  onTemplateChange,
  templates,
}: HeaderActionsProps) {
  return (
    <Group h="100%" px="sm" justify="space-between" bg="white" wrap="nowrap">
      {/* Left: Brand */}
      <Group gap={8} wrap="nowrap" align="center">
        <Image src="/logo.svg" w={32} h={32} alt="Logo" />
        <Title
          order={1}
          fz={{ base: 'md', sm: 'h5' }}
          fw={700}
          c="dark.8"
          style={{ whiteSpace: 'nowrap', lineHeight: 1 }}
        >
          Biodata Builder
        </Title>
      </Group>

      {/* Right: Template selector (desktop) + History */}
      <Group gap={8} wrap="nowrap" style={{ flexShrink: 0 }}>
        <Box visibleFrom="sm">
          <Select
            id="template-select-desktop"
            value={template}
            onChange={(e) => onTemplateChange((e as TemplateStyle) || 'traditional')}
            data={templates.map((t) => ({ value: t.id, label: t.name }))}
            w={160}
            size="sm"
            allowDeselect={false}
          />
        </Box>
        <Button
          variant="default"
          size="compact-sm"
          leftSection={<History size={16} />}
          onClick={onOpenSidebar}
          visibleFrom="sm"
        >
          Profiles
        </Button>
        <Button
          variant="default"
          size="compact-sm"
          leftSection={<History size={16} />}
          onClick={onOpenSidebar}
          hiddenFrom="sm"
        >
          Profiles
        </Button>
      </Group>
    </Group>
  );
}
