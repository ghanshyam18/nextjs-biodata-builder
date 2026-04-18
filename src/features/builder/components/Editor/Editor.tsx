import { Stack } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { BiodataFormValues } from '../../schemas/biodataSchema';
import { useCallback } from 'react';
import { PersonalInfoSection } from './PersonalInfoSection';
import { EducationSection } from './EducationSection';
import { FamilySection } from './FamilySection';
import { ContactSection } from './ContactSection';

interface EditorProps {
  form: UseFormReturnType<BiodataFormValues>;
  handlePhotoChange: (file: File | null) => void;
  removePhoto: () => void;
  parseTime: (timeStr: string) => { h: string; m: string; p: string };
  updateTime: (h: string, m: string, p: string) => void;
}

export default function Editor({
  form,
  handlePhotoChange,
  removePhoto,
  parseTime,
  updateTime,
}: EditorProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (e.target instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      const formContainer = e.currentTarget;
      const focusableElements = Array.from(
        formContainer.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled])')
      ) as HTMLElement[];
      const index = focusableElements.indexOf(e.target as HTMLElement);
      if (index > -1 && index + 1 < focusableElements.length) {
        focusableElements[index + 1].focus();
      }
    }
  }, []);

  return (
    <Stack gap="md" onKeyDown={handleKeyDown}>
      <PersonalInfoSection
        form={form}
        handlePhotoChange={handlePhotoChange}
        removePhoto={removePhoto}
        parseTime={parseTime}
        updateTime={updateTime}
      />
      <EducationSection form={form} />
      <FamilySection form={form} />
      <ContactSection form={form} />
    </Stack>
  );
}
