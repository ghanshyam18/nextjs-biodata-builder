import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useCallback, useEffect, useState } from 'react';

import { initialBiodataState } from '../../../shared/constants/initialState';
import { compressImage } from '../../../shared/utils/image';
import { formatTime, parseTime } from '../../../shared/utils/timeUtils';
import { type BiodataFormValues, biodataSchema } from '../schemas/biodataSchema';

export function useBiodataForm() {
  const [previewData, setPreviewData] = useState<BiodataFormValues>(initialBiodataState);

  const form = useForm<BiodataFormValues>({
    mode: 'uncontrolled',
    initialValues: initialBiodataState,
    validate: zodResolver(biodataSchema),
    onValuesChange: () => syncPreview(),
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Sync values to preview with debouncing to prevent lag on low-end devices
  const syncPreview = useCallback(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setPreviewData({ ...form.getValues() });
    }, 250); // Slightly reduced debounce for snappier feel

    setDebounceTimer(timer);
  }, [form, debounceTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  const handlePhotoChange = async (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      try {
        const compressed = await compressImage(base64);
        form.setFieldValue('personalDetails.photo', compressed);
      } catch (err) {
        console.error('Image compression failed:', err);
        form.setFieldValue('personalDetails.photo', base64); // Fallback
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    form.setFieldValue('personalDetails.photo', '');
  };

  const updateTime = (h: string, m: string, p: string) => {
    form.setFieldValue('personalDetails.timeOfBirth', formatTime(h, m, p));
  };

  return {
    form,
    previewData,
    handlePhotoChange,
    removePhoto,
    parseTime,
    updateTime,
  };
}
