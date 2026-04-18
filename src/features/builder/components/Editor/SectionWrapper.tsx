import { Paper, Group, Box, Title, Divider } from '@mantine/core';

interface SectionWrapperProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function SectionWrapper({ title, icon, children }: SectionWrapperProps) {
  return (
    <Paper p="md" radius="md" withBorder>
      <Group gap="xs" mb="xs" align="center">
        <Box c="blue.6" style={{ display: 'flex' }}>{icon}</Box>
        <Title order={3} fz="sm" fw={700} c="dark.7" lts={0.5} tt="uppercase">{title}</Title>
      </Group>
      <Divider mb="md" color="gray.2" />
      {children}
    </Paper>
  );
}
