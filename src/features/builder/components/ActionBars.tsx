import { Box, Button, Group } from '@mantine/core';
import { FileDown, Save } from 'lucide-react';
import { memo } from 'react';

interface ActionBarProps {
  isGenerating: boolean;
  onSave: () => void;
  onDownload: () => void;
  currentProfileId: string | null;
}

export const MobileActionBar = memo(
  ({ isGenerating, onDownload }: Pick<ActionBarProps, 'isGenerating' | 'onDownload'>) => (
    <div className="bottom-action-bar">
      <button
        className="action-btn print-btn"
        onClick={onDownload}
        type="button"
        disabled={isGenerating}
      >
        {isGenerating ? <div className="loader-dots" /> : <FileDown size={18} />}
        {isGenerating ? 'Generating...' : 'Save & Download PDF'}
      </button>
    </div>
  )
);

export const DesktopActionBar = memo(
  ({ isGenerating, onSave, onDownload, currentProfileId }: ActionBarProps) => (
    <Box
      visibleFrom="sm"
      px="lg"
      py="sm"
      bg="white"
      style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
    >
      <Group justify="flex-end" gap="sm">
        <Button
          variant="default"
          leftSection={<Save size={16} color="var(--mantine-color-blue-7)" />}
          onClick={onSave}
          disabled={isGenerating}
        >
          {currentProfileId ? 'Update Profile' : 'Save Draft'}
        </Button>
        <Button
          leftSection={isGenerating ? null : <FileDown size={16} />}
          onClick={onDownload}
          loading={isGenerating}
          variant="filled"
          color="blue.7"
        >
          Save & Download PDF
        </Button>
      </Group>
    </Box>
  )
);
