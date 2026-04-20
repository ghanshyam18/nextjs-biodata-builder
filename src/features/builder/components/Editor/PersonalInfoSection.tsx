import {
  Box,
  Button,
  FileButton,
  Group,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { Camera, User } from 'lucide-react';
import { memo } from 'react';

import type { BiodataFormValues } from '../../schemas/biodataSchema';
import { SectionWrapper } from './SectionWrapper';

interface PersonalInfoSectionProps {
  form: UseFormReturnType<BiodataFormValues>;
  handlePhotoChange: (file: File | null) => void;
  removePhoto: () => void;
  parseTime: (timeStr: string) => { h: string; m: string; p: string };
  updateTime: (h: string, m: string, p: string) => void;
}

export const PersonalInfoSectionComponent: React.FC<PersonalInfoSectionProps> = ({
  form,
  handlePhotoChange,
  removePhoto,
  parseTime,
  updateTime,
}) => {
  const photo = form.getValues().personalDetails.photo;

  return (
    <SectionWrapper title="Personal Details" icon={<User size={18} />}>
      <Stack gap="sm">
        <Group gap="md" align="flex-start">
          {photo ? (
            <Image
              src={photo}
              alt="Profile"
              w={72}
              h={88}
              radius="md"
              style={{ border: '2px solid var(--mantine-color-gray-2)', objectFit: 'cover' }}
            />
          ) : (
            <Box
              w={72}
              h={88}
              bg="gray.1"
              style={{
                border: '2px dashed var(--mantine-color-gray-3)',
                borderRadius: 'var(--mantine-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Camera size={22} color="var(--mantine-color-gray-4)" />
            </Box>
          )}
          <Stack gap={6}>
            <FileButton onChange={handlePhotoChange} accept="image/png,image/jpeg">
              {(props) => (
                <Button {...props} size="xs" variant="light">
                  {photo ? 'Change Photo' : 'Upload Photo'}
                </Button>
              )}
            </FileButton>
            {photo && (
              <Button size="xs" color="red" variant="subtle" onClick={removePhoto}>
                Remove
              </Button>
            )}
          </Stack>
        </Group>

        <TextInput
          label="Full Name"
          placeholder="e.g. Rahul Sharma"
          key={form.key('personalDetails.fullName')}
          {...form.getInputProps('personalDetails.fullName')}
          withAsterisk
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Date of Birth"
            type="date"
            key={form.key('personalDetails.dateOfBirth')}
            {...form.getInputProps('personalDetails.dateOfBirth')}
          />
          <Box>
            <Input.Label mb={6} fw={600} fz="sm">
              Time of Birth
            </Input.Label>
            <Group gap="xs" grow align="flex-start">
              <TextInput
                placeholder="HH"
                maxLength={2}
                inputMode="numeric"
                pattern="[0-9]*"
                key={form.key('personalDetails.timeOfBirth-hh')}
                defaultValue={parseTime(form.getValues().personalDetails.timeOfBirth).h || ''}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  // Proactive clamping for better UX
                  if (v && parseInt(v) > 12) v = '12';
                  // Force the input to show the clamped value
                  e.currentTarget.value = v;
                  const t = parseTime(form.values.personalDetails.timeOfBirth);
                  updateTime(v || '12', t.m, t.p);
                }}
                size="sm"
              />
              <TextInput
                placeholder="MM"
                maxLength={2}
                inputMode="numeric"
                pattern="[0-9]*"
                key={form.key('personalDetails.timeOfBirth-mm')}
                defaultValue={parseTime(form.getValues().personalDetails.timeOfBirth).m || ''}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  // Proactive clamping for better UX
                  if (v && parseInt(v) > 59) v = '59';
                  // Force the input to show the clamped value
                  e.currentTarget.value = v;
                  const t = parseTime(form.values.personalDetails.timeOfBirth);
                  updateTime(t.h, v || '00', t.p);
                }}
                size="sm"
              />
              <Select
                placeholder="AM/PM"
                key={form.key('personalDetails.timeOfBirth-ampm')}
                defaultValue={
                  parseTime(form.getValues().personalDetails.timeOfBirth).p || undefined
                }
                onChange={(v) => {
                  const t = parseTime(form.values.personalDetails.timeOfBirth);
                  updateTime(t.h, t.m, v || 'AM');
                }}
                data={['AM', 'PM']}
                size="sm"
                allowDeselect={false}
              />
            </Group>
          </Box>
        </SimpleGrid>

        <TextInput
          label="Place of Birth"
          placeholder="e.g. Mumbai, Maharashtra"
          key={form.key('personalDetails.placeOfBirth')}
          {...form.getInputProps('personalDetails.placeOfBirth')}
        />

        <SimpleGrid cols={{ base: 2, sm: 2 }}>
          <TextInput
            label="Height"
            placeholder="5' 8&quot;"
            key={form.key('personalDetails.height')}
            {...form.getInputProps('personalDetails.height')}
          />
          <TextInput
            label="Weight"
            placeholder="65 kg"
            key={form.key('personalDetails.weight')}
            {...form.getInputProps('personalDetails.weight')}
          />
          <TextInput
            label="Blood Group"
            placeholder="O+"
            key={form.key('personalDetails.bloodGroup')}
            {...form.getInputProps('personalDetails.bloodGroup')}
          />
          <TextInput
            label="Complexion"
            placeholder="Fair"
            key={form.key('personalDetails.complexion')}
            {...form.getInputProps('personalDetails.complexion')}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 2, sm: 2 }}>
          <Select
            label="Religion"
            placeholder="Select"
            clearable
            data={['Hindu', 'Sikh', 'Jain', 'Muslim', 'Christian', 'Other']}
            key={form.key('personalDetails.religion')}
            {...form.getInputProps('personalDetails.religion')}
          />
          <Select
            label="Manglik"
            placeholder="Select"
            clearable
            data={['No', 'Yes', 'Anshik', "Don't Know"]}
            key={form.key('personalDetails.manglik')}
            {...form.getInputProps('personalDetails.manglik')}
          />
          <TextInput
            label="Caste"
            placeholder="e.g. Brahmin"
            key={form.key('personalDetails.caste')}
            {...form.getInputProps('personalDetails.caste')}
          />
          <TextInput
            label="Sub-caste"
            key={form.key('personalDetails.subCaste')}
            {...form.getInputProps('personalDetails.subCaste')}
          />
        </SimpleGrid>
        <TextInput
          label="Gotra"
          key={form.key('personalDetails.gotra')}
          {...form.getInputProps('personalDetails.gotra')}
        />
      </Stack>
    </SectionWrapper>
  );
};

export const PersonalInfoSection = memo(PersonalInfoSectionComponent);
