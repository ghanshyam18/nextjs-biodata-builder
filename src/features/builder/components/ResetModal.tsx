import { Button, Group, Modal, Text } from '@mantine/core';
import { Trash2 } from 'lucide-react';

interface ResetModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetModal({ opened, onClose, onConfirm }: ResetModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Reset Form"
      centered
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text size="sm" mb="lg">
        Are you sure you want to reset the form? This will clear all fields and cannot be undone.
      </Text>

      <Group justify="flex-end" gap="sm">
        <Button variant="subtle" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" leftSection={<Trash2 size={16} />} onClick={onConfirm}>
          Yes, Reset All
        </Button>
      </Group>
    </Modal>
  );
}
