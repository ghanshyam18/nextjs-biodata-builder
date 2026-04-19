import { SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { Phone } from 'lucide-react';
import { memo } from 'react';

import type { BiodataFormValues } from '../../schemas/biodataSchema';
import { SectionWrapper } from './SectionWrapper';

interface ContactSectionProps {
  form: UseFormReturnType<BiodataFormValues>;
}

export const ContactSection = memo(({ form }: ContactSectionProps) => {
  return (
    <SectionWrapper title="Contact Details" icon={<Phone size={18} />}>
      <Stack gap="sm">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            type="tel"
            label="Mobile Number"
            placeholder="+91 9876543210"
            key={form.key('contactDetails.mobileNumber')}
            {...form.getInputProps('contactDetails.mobileNumber')}
          />
          <TextInput
            type="email"
            label="Email Address"
            placeholder="rahul@example.com"
            key={form.key('contactDetails.email')}
            {...form.getInputProps('contactDetails.email')}
          />
        </SimpleGrid>
        <Textarea
          label="Residential Address"
          placeholder="Full Address"
          minRows={3}
          autosize
          key={form.key('contactDetails.address')}
          {...form.getInputProps('contactDetails.address')}
        />
      </Stack>
    </SectionWrapper>
  );
});
