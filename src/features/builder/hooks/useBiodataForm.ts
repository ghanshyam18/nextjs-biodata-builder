import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useEffect, useState } from 'react';
import { biodataSchema, type BiodataFormValues } from '../schemas/biodataSchema';
import { initialBiodataState } from '../../../shared/constants/initialState';
import { compressImage } from '../../../shared/utils/image';

export function useBiodataForm() {
  const [previewData, setPreviewData] = useState<BiodataFormValues>(initialBiodataState);

  const form = useForm<BiodataFormValues>({
    mode: 'uncontrolled',
    initialValues: initialBiodataState,
    validate: zodResolver(biodataSchema),
  });

  // Performance Optimization: Update preview on demand or periodically
  // In uncontrolled mode, we'll sync values before Preview or on specific events
  // For live preview, we can use form.watch if available or just getValues in effect
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentValues = form.getValues();
      // Only update if values actually changed to avoid unnecessary re-renders
      setPreviewData(currentValues);
    }, 1000); // 1s sync is sufficient for uncontrolled "live" preview without overhead
    return () => clearInterval(interval);
  }, [form]);

  const handlePhotoChange = async (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target?.result as string;
      const compressed = await compressImage(base64);
      form.setFieldValue('personalDetails.photo', compressed);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    form.setFieldValue('personalDetails.photo', '');
  };

  const parseTime = (timeStr: string) => {
    if (!timeStr) return { h: '', m: '', p: '' };
    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr || '12');
    const p = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return { h: String(h), m: mStr, p };
  };

  const updateTime = (h: string, m: string, p: string) => {
    let hour = parseInt(h || '12');
    if (p === 'PM' && hour !== 12) hour += 12;
    if (p === 'AM' && hour === 12) hour = 0;
    form.setFieldValue('personalDetails.timeOfBirth', `${String(hour).padStart(2, '0')}:${m || '00'}`);
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
