import { Users } from 'lucide-react';
import { SimpleGrid, TextInput, Select } from '@mantine/core';
import { SectionWrapper } from './SectionWrapper';
import type { UseFormReturnType } from '@mantine/form';
import type { BiodataFormValues } from '../../schemas/biodataSchema';
import { memo } from 'react';

interface FamilySectionProps {
  form: UseFormReturnType<BiodataFormValues>;
}

export const FamilySection = memo(({ form }: FamilySectionProps) => {
  return (
    <SectionWrapper title="Family Details" icon={<Users size={18} />}>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput label="Father's Name" key={form.key('familyDetails.fathersName')} {...form.getInputProps('familyDetails.fathersName')} />
        <TextInput label="Father's Occupation" key={form.key('familyDetails.fathersOccupation')} {...form.getInputProps('familyDetails.fathersOccupation')} />
        <TextInput label="Mother's Name" key={form.key('familyDetails.mothersName')} {...form.getInputProps('familyDetails.mothersName')} />
        <TextInput label="Mother's Occupation" key={form.key('familyDetails.mothersOccupation')} {...form.getInputProps('familyDetails.mothersOccupation')} />
        <TextInput label="Siblings" placeholder="1 Brother, 1 Sister" key={form.key('familyDetails.siblings')} {...form.getInputProps('familyDetails.siblings')} />
        <TextInput label="Grandparents" key={form.key('familyDetails.grandparents')} {...form.getInputProps('familyDetails.grandparents')} />
        <TextInput label="Hometown" placeholder=" Jaipur" key={form.key('familyDetails.hometown')} {...form.getInputProps('familyDetails.hometown')} />
        <Select label="Family Type" placeholder="Select" clearable data={['Nuclear', 'Joint']} key={form.key('familyDetails.familyType')} {...form.getInputProps('familyDetails.familyType')} />
      </SimpleGrid>
    </SectionWrapper>
  );
});
