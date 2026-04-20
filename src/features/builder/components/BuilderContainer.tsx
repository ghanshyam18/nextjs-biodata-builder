'use client';

import { AppShell, Box, Flex, ScrollArea, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Edit3, Eye } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import HeaderActions from '../../../shared/components/layout/HeaderActions';
import { initialBiodataState } from '../../../shared/constants/initialState';
import type { SavedProfile, TemplateStyle } from '../../../shared/types';
import { exportToPDF } from '../../../shared/utils/pdf';
import ProfileSidebar from '../../profiles/components/ProfileSidebar';
import SaveModal from '../../profiles/components/SaveModal';
import { useProfiles } from '../../profiles/hooks/useProfiles';
import { useBiodataForm } from '../hooks/useBiodataForm';
import { DesktopActionBar, MobileActionBar } from './ActionBars';
import Editor from './Editor/Editor';
import Preview from './Preview/Preview';
import ResetModal from './ResetModal';

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
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);

  const { form, previewData, handlePhotoChange, removePhoto, parseTime, updateTime } =
    useBiodataForm();

  const { profiles, currentProfileId, setCurrentProfileId, handleSave, handleDelete } =
    useProfiles();

  const printRef = useRef<HTMLDivElement>(null);

  const onSaveClick = useCallback(() => {
    const values = form.getValues();
    if (!values.personalDetails.fullName?.trim()) {
      notifications.show({
        title: 'Form Required',
        message: 'Please at least enter the Full Name before saving.',
        color: 'red',
        position: 'top-center',
      });
      return;
    }

    const result = form.validate();
    if (result.hasErrors) {
      notifications.show({
        title: 'Validation Failed',
        message: 'Please check the highlighted errors in the form.',
        color: 'red',
        position: 'top-center',
      });
      return;
    }

    if (currentProfileId) {
      handleSave('', values, template);
    } else {
      setIsSaveModalOpen(true);
    }
  }, [form, currentProfileId, handleSave, template]);

  const startDownload = useCallback(async () => {
    const values = form.getValues();
    setIsGenerating(true);
    notifications.show({
      id: 'pdf-generating',
      title: 'Generating PDF',
      message: 'Please wait while we prepare your professional biodata...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });

    setTimeout(async () => {
      try {
        if (printRef.current) {
          await exportToPDF(
            printRef.current,
            `Biodata_${values.personalDetails.fullName.replace(/\s+/g, '_')}.pdf`
          );
          notifications.update({
            id: 'pdf-generating',
            title: 'Success!',
            message: 'Your biodata has been saved and downloaded.',
            color: 'teal',
            loading: false,
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error('PDF Error:', err);
        notifications.update({
          id: 'pdf-generating',
          title: 'Export Failed',
          message: 'There was an error generating the PDF. Please try again.',
          color: 'red',
          loading: false,
          autoClose: 5000,
        });
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  }, [form]);

  const onPrintClick = useCallback(() => {
    if (isGenerating) return;

    const values = form.getValues();
    if (!values.personalDetails.fullName?.trim()) {
      notifications.show({
        title: 'Name Required',
        message: 'Professional biodata requires at least a name to generate a valid PDF.',
        color: 'red',
        position: 'top-center',
      });
      return;
    }

    const result = form.validate();
    if (result.hasErrors) {
      notifications.show({
        title: 'Form Incomplete',
        message: 'Correct the errors before generating PDF.',
        color: 'red',
        position: 'top-center',
      });
      return;
    }

    if (currentProfileId) {
      handleSave('', values, template);
      startDownload();
    } else {
      setPendingDownload(true);
      setIsSaveModalOpen(true);
    }
  }, [form, isGenerating, currentProfileId, handleSave, template, startDownload]);

  const handleLoadProfile = useCallback(
    (profile: SavedProfile) => {
      form.setValues(profile.data);
      setTemplate(profile.template);
      setCurrentProfileId(profile.id);
      setIsSidebarOpen(false);
      setActiveTab('edit');
    },
    [form, setCurrentProfileId]
  );

  const handleNewProfile = useCallback(() => {
    form.setValues(initialBiodataState);
    setCurrentProfileId(null);
    setIsSidebarOpen(false);
    setActiveTab('edit');
  }, [form, setCurrentProfileId]);

  const onModalSave = useCallback(
    (profileName: string) => {
      handleSave(profileName, form.getValues(), template);
      setIsSaveModalOpen(false);
      if (pendingDownload) {
        setPendingDownload(false);
        startDownload();
      }
    },
    [form, handleSave, template, pendingDownload, startDownload]
  );

  const handleConfirmReset = useCallback(() => {
    form.setValues(initialBiodataState);
    setCurrentProfileId(null);
    setIsResetModalOpen(false);
    notifications.show({
      title: 'Form Reset',
      message: 'All fields have been cleared.',
      color: 'gray',
    });
  }, [form, setCurrentProfileId]);

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
            onClose={() => {
              setIsSaveModalOpen(false);
              setPendingDownload(false);
            }}
          />

          <ResetModal
            opened={isResetModalOpen}
            onClose={() => setIsResetModalOpen(false)}
            onConfirm={handleConfirmReset}
          />

          {/* Mobile template picker */}
          <Box
            hiddenFrom="sm"
            px="sm"
            py={6}
            bg="white"
            style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
          >
            <Select
              id="template-select-mobile"
              value={template}
              onChange={(e) => setTemplate((e as TemplateStyle) || 'traditional')}
              data={templates.map((t) => ({ value: t.id, label: t.name }))}
              size="sm"
              allowDeselect={false}
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
              display={{ base: activeTab === 'edit' ? 'block' : 'none', sm: 'block' }}
              style={{
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
                    onReset={() => setIsResetModalOpen(true)}
                  />
                </Box>
              </ScrollArea>
            </Box>

            {/* Preview Pane */}
            <Box
              className="pane-preview"
              flex={1}
              bg="gray.1"
              display={{ base: activeTab === 'preview' ? 'block' : 'none', sm: 'block' }}
              style={{
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

          {/* Hidden Print Container */}
          <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }}>
            <div ref={printRef} className="print-container">
              <Preview data={previewData} template={template} isPrint />
            </div>
          </div>

          <MobileActionBar isGenerating={isGenerating} onDownload={onPrintClick} />

          <DesktopActionBar
            isGenerating={isGenerating}
            onSave={onSaveClick}
            onDownload={onPrintClick}
            currentProfileId={currentProfileId}
          />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
