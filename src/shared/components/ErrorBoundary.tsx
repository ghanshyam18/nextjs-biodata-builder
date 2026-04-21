'use client';

import { Box, Button, Center, Container, Stack, Text, Title } from '@mantine/core';
import { RefreshCcw } from 'lucide-react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Enterprise-grade Error Boundary to catch runtime crashes and
 * provide a graceful fallback UI, especially important on low-end devices.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center style={{ height: '100vh', width: '100vw', backgroundColor: '#f8f9fa' }}>
          <Container size="sm">
            <Stack align="center" gap="md">
              <Box
                bg="red.0"
                p="xl"
                style={{ borderRadius: '50%', display: 'flex', alignItems: 'center' }}
              >
                <Title order={1} c="red.6" fz={40}>
                  !
                </Title>
              </Box>
              <Title order={2} ta="center">
                Something went wrong
              </Title>
              <Text c="dimmed" ta="center" size="sm" maw={400}>
                We encountered an unexpected error while rendering the application. This can
                sometimes happen on devices with limited memory.
              </Text>
              <Button
                variant="filled"
                color="blue"
                leftSection={<RefreshCcw size={16} />}
                onClick={() => window.location.reload()}
                mt="md"
              >
                Reload Application
              </Button>
            </Stack>
          </Container>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
