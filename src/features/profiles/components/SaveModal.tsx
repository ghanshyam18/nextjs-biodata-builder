import { Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SaveModalProps {
  isOpen: boolean;
  initialName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveModal({ isOpen, initialName, onSave, onClose }: SaveModalProps) {
  const [name, setName] = useState(initialName);

  // Sync internal state when parent prop changes (e.g. user typed a name in the form)
  useEffect(() => {
    if (isOpen) setName(initialName);
  }, [isOpen, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) onSave(trimmed);
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Group gap="xs">
          <Save size={20} color="var(--mantine-color-blue-7)" />
          <Text fw={600}>Save Profile</Text>
        </Group>
      }
      centered
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Profile Name"
          placeholder="e.g. Rahul's Traditional Biodata"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          description="Use a unique name to easily find this profile later."
          data-autofocus
          mb="xl"
          required
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Profile</Button>
        </Group>
      </form>
    </Modal>
  );
}
