import { GraduationCap } from 'lucide-react';
import { SimpleGrid, TextInput } from '@mantine/core';
import { SectionWrapper } from './SectionWrapper';
import type { UseFormReturnType } from '@mantine/form';
import type { BiodataFormValues } from '../../schemas/biodataSchema';

interface EducationSectionProps {
  form: UseFormReturnType<BiodataFormValues>;
}

export function EducationSection({ form }: EducationSectionProps) {
  return (
    <SectionWrapper title="Education & Career" icon={<GraduationCap size={18} />}>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <TextInput label="Highest Education" placeholder="e.g. B.Tech in CS" key={form.key('educationCareer.highestEducation')} {...form.getInputProps('educationCareer.highestEducation')} />
        <TextInput label="Occupation" placeholder="e.g. Software Engineer" key={form.key('educationCareer.occupation')} {...form.getInputProps('educationCareer.occupation')} />
        <TextInput label="Company" placeholder="e.g. Google India" key={form.key('educationCareer.companyName')} {...form.getInputProps('educationCareer.companyName')} />
        <TextInput label="Annual Income" placeholder="e.g. 15 LPA" key={form.key('educationCareer.annualIncome')} {...form.getInputProps('educationCareer.annualIncome')} />
      </SimpleGrid>
    </SectionWrapper>
  );
}
