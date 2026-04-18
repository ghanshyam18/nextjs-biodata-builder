import { Trash2, FileText, Search, Clock, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import type { SavedProfile } from '../../../shared/types';
import { Drawer, TextInput, Button, ActionIcon, Text, Group, Box, Center, Card, Stack } from '@mantine/core';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: SavedProfile[];
  onLoad: (profile: SavedProfile) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export default function ProfileSidebar({
  isOpen,
  onClose,
  profiles,
  onLoad,
  onDelete,
  onNew
}: ProfileSidebarProps) {
  const [search, setSearch] = useState('');

  const filteredProfiles = profiles.filter(p => 
    p.profileName.toLowerCase().includes(search.toLowerCase()) ||
    p.data.personalDetails.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Drawer 
      opened={isOpen} 
      onClose={onClose}
      title={
        <Group gap="xs" align="center">
          <Clock size={20} color="var(--mantine-color-blue-7)" style={{ display: 'flex' }} />
          <Text fw={700} fz="sm">SAVED PROFILES</Text>
        </Group>
      }
      padding="md"
      size="sm"
      position="right"
    >
      <Stack h="calc(100vh - 80px)" gap="md">
        <Box>
          <Button 
            fullWidth 
            variant="light" 
            leftSection={<PlusCircle size={16} />}
            onClick={onNew}
            mb="md"
          >
            Create New
          </Button>
          <TextInput
            placeholder="Search profiles..."
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Box>

        {filteredProfiles.length === 0 ? (
          <Center flex={1} style={{ flexDirection: 'column' }}>
            <FileText size={48} color="var(--mantine-color-gray-3)" style={{ marginBottom: 16 }} />
            <Text size="sm" c="dimmed" ta="center">
              {search ? 'No profiles found matching your search.' : 'No saved profiles yet. Click save to see them here!'}
            </Text>
          </Center>
        ) : (
          <Box flex={1} style={{ overflowY: 'auto' }}>
            <Stack gap="xs">
              {filteredProfiles.map((p) => (
                <Card 
                  key={p.id} 
                  withBorder 
                  shadow="sm" 
                  p="sm" 
                  style={{ cursor: 'pointer', transition: 'border-color 0.2s ease' }}
                  onClick={() => onLoad(p)}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Box style={{ overflow: 'hidden' }}>
                      <Text fw={600} truncate>{p.profileName}</Text>
                      <Group gap={4} mt={4}>
                        <Clock size={12} color="var(--mantine-color-gray-5)" />
                        <Text size="xs" c="dimmed">{new Date(p.updatedAt).toLocaleDateString()}</Text>
                      </Group>
                      {p.data.personalDetails.fullName && (
                        <Text size="xs" c="gray.5" truncate fs="italic" mt={2}>
                          {p.data.personalDetails.fullName}
                        </Text>
                      )}
                    </Box>
                    <ActionIcon 
                      color="red" 
                      variant="subtle" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(p.id);
                      }}
                      title="Delete Profile"
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        <Box pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
          <Text fz={10} c="dimmed" tt="uppercase" fw={700} ta="center" lts={1}>
            Data stored locally on this browser
          </Text>
        </Box>
      </Stack>
    </Drawer>
  );
}
