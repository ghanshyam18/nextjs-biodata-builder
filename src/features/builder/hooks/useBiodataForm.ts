import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useCallback, useState } from 'react';

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
    validateInputOnBlur: true,
    validateInputOnChange: false,
  });

  // Sync values to preview manually to prevent lag on low-end devices
  const syncPreview = useCallback(() => {
    setPreviewData({ ...form.getValues() });
  }, [form]);

  const handlePhotoChange = useCallback(
    async (file: File | null) => {
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
    },
    [form]
  );

  const removePhoto = useCallback(() => {
    form.setFieldValue('personalDetails.photo', '');
  }, [form]);

  const updateTime = useCallback(
    (h: string, m: string, p: string) => {
      form.setFieldValue('personalDetails.timeOfBirth', formatTime(h, m, p));
    },
    [form]
  );

  return {
    form,
    previewData,
    handlePhotoChange,
    removePhoto,
    parseTime,
    updateTime,
    syncPreview,
  };
}
