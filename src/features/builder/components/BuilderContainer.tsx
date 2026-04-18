'use client';

import { Suspense, useCallback, useState, useRef, memo } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Edit3, Eye, Printer, Save } from 'lucide-react';
import { AppShell, Flex, Box, ScrollArea, Select, Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import Editor from './Editor/Editor';
import Preview from './Preview/Preview';
import { useBiodataForm } from '../hooks/useBiodataForm';
import { useProfiles } from '../../profiles/hooks/useProfiles';
import HeaderActions from '../../../shared/components/layout/HeaderActions';
import ProfileSidebar from '../../profiles/components/ProfileSidebar';
import SaveModal from '../../profiles/components/SaveModal';
import { initialBiodataState } from '../../../shared/constants/initialState';
import type { SavedProfile, TemplateStyle } from '../../../shared/types';

const templates: { id: TemplateStyle; name: string }[] = [
  { id: 'traditional', name: '🔴 Traditional' },
  { id: 'modern', name: '🔵 Modern' },
  { id: 'minimalist', name: '⚪ Minimalist' },
  { id: 'floral', name: '🌸 Floral' },
  { id: 'elegant', name: '✨ Elegant' },
  { id: 'classic', name: '📰 Classic' },
];

export default function BuilderContainer() {
  const [template, setTemplate] = useState<TemplateStyle>('traditional');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const {
    form,
    previewData,
    handlePhotoChange,
    removePhoto,
    parseTime,
    updateTime,
  } = useBiodataForm();

  const {
    profiles,
    currentProfileId,
    setCurrentProfileId,
    handleSave,
    handleDelete,
  } = useProfiles();

  const componentRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Biodata_${form.getValues().personalDetails.fullName || 'New'}`,
  });

  const onSaveClick = useCallback(() => {
    // Defensive check for empty form/name before full validation to prevent internal crashes
    const values = form.getValues();
    if (!values.personalDetails.fullName?.trim()) {
      notifications.show({
        title: 'Form Required',
        message: 'Please at least enter the Full Name before saving.',
        color: 'red',
        position: 'top-center'
      });
      return;
    }

    try {
      const result = form.validate();
      if (result.hasErrors) {
        notifications.show({
          title: 'Validation Failed',
          message: 'Please check the highlighted errors in the form.',
          color: 'red',
          position: 'top-center'
        });
        return;
      }
      
      if (currentProfileId) {
        handleSave('', values, template);
      } else {
        setIsSaveModalOpen(true);
      }
    } catch (err) {
      console.error('Validation Error:', err);
      // Fallback if internal validate fails
      if (currentProfileId) {
        handleSave('', values, template);
      } else {
        setIsSaveModalOpen(true);
      }
    }
  }, [form, currentProfileId, handleSave, template]);

  const onPrintClick = useCallback(() => {
    const values = form.getValues();
    if (!values.personalDetails.fullName?.trim()) {
      notifications.show({
        title: 'Name Required',
        message: 'Professional biodata requires at least a name to generate a valid PDF.',
        color: 'red',
        position: 'top-center'
      });
      return;
    }

    try {
      const result = form.validate();
      if (result.hasErrors) {
        notifications.show({
          title: 'Form Incomplete',
          message: 'Correct the errors before generating PDF.',
          color: 'red',
          position: 'top-center'
        });
        return;
      }
    } catch (err) {
      console.error('Validation Error:', err);
    }
    
    handlePrint();
  }, [form, handlePrint]);

  const handleLoadProfile = useCallback((profile: SavedProfile) => {
    form.setValues(profile.data);
    setTemplate(profile.template);
    setCurrentProfileId(profile.id);
    setIsSidebarOpen(false);
    setActiveTab('edit');
  }, [form, setCurrentProfileId]);

  const handleNewProfile = useCallback(() => {
    form.setValues(initialBiodataState);
    setCurrentProfileId(null);
    setIsSidebarOpen(false);
    setActiveTab('edit');
  }, [form, setCurrentProfileId]);

  const onModalSave = useCallback((profileName: string) => {
    handleSave(profileName, form.getValues(), template);
    setIsSaveModalOpen(false);
  }, [form, handleSave, template]);

  return (
    <>
      <AppShell header={{ height: 56 }} bg="gray.0">
        <AppShell.Header style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <HeaderActions
            onOpenSidebar={() => setIsSidebarOpen(true)}
            template={template}
            onTemplateChange={setTemplate}
            templates={templates}
          />
        </AppShell.Header>

        <AppShell.Main style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
          <ProfileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            profiles={profiles}
            onLoad={handleLoadProfile}
            onDelete={handleDelete}
            onNew={handleNewProfile}
          />

          <SaveModal
            isOpen={isSaveModalOpen}
            initialName={form.getValues().personalDetails.fullName || ''}
            onSave={onModalSave}
            onClose={() => setIsSaveModalOpen(false)}
          />

          {/* Mobile template picker */}
          <Box hiddenFrom="sm" px="sm" py={6} bg="white" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Select
              id="template-select-mobile"
              value={template}
              onChange={(e) => setTemplate((e as TemplateStyle) || 'traditional')}
              data={templates.map(t => ({ value: t.id, label: t.name }))}
              size="sm"
            />
          </Box>

          <nav className="top-tab-bar">
            <button
              className={activeTab === 'edit' ? 'active' : ''}
              onClick={() => setActiveTab('edit')}
              type="button"
            >
              <Edit3 size={16} />
              Editor
            </button>
            <button
              className={activeTab === 'preview' ? 'active' : ''}
              onClick={() => setActiveTab('preview')}
              type="button"
            >
              <Eye size={16} />
              Preview
            </button>
          </nav>

          <Flex flex={1} style={{ overflow: 'hidden', minHeight: 0 }} pb={{ base: 56, sm: 0 }}>
            {/* Editor Pane */}
            <Box
              className="pane-editor"
              w={{ base: '100%', sm: '50%', xl: '40%' }}
              style={{
                display: activeTab === 'edit' ? 'block' : 'none',
                borderRight: '1px solid var(--mantine-color-gray-2)',
                backgroundColor: 'white',
                overflow: 'hidden',
              }}
            >
              <ScrollArea h="100%" scrollbars="y" type="scroll">
                <Box p="md" pb={80}>
                  <Editor 
                    form={form}
                    handlePhotoChange={handlePhotoChange}
                    removePhoto={removePhoto}
                    parseTime={parseTime}
                    updateTime={updateTime}
                  />
                </Box>
              </ScrollArea>
            </Box>

            {/* Preview Pane */}
            <Box
              className="pane-preview"
              flex={1}
              bg="gray.1"
              style={{
                display: activeTab === 'preview' ? 'block' : 'none',
                overflow: 'hidden',
              }}
            >
              <ScrollArea h="100%" scrollbars="y">
                <Flex justify="center" p={{ base: 'xs', sm: 'lg' }} pb={80}>
                  <div className="mobile-page">
                    <Preview data={previewData} template={template} />
                  </div>
                </Flex>
              </ScrollArea>
            </Box>
          </Flex>

          {/* Hidden Print Container: Physically 1:1 A4 for high-quality capture */}
          <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
            <div ref={printRef} className="print-container">
              <Preview data={previewData} template={template} isPrint />
            </div>
          </div>

          {/* Mobile bottom action bar */}
          <div className="bottom-action-bar">
            <button className="action-btn save-btn" onClick={onSaveClick} type="button">
              <Save size={18} />
              {currentProfileId ? 'Update' : 'Save'}
            </button>
            <button className="action-btn print-btn" onClick={onPrintClick} type="button">
              <Printer size={18} />
              Print / PDF
            </button>
          </div>

          {/* Desktop action buttons */}
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
                onClick={onSaveClick}
              >
                {currentProfileId ? 'Update' : 'Save'}
              </Button>
              <Button
                leftSection={<Printer size={16} />}
                onClick={onPrintClick}
              >
                Print / Save PDF
              </Button>
            </Group>
          </Box>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
