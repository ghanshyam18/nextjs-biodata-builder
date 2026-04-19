import { Box, Flex, SimpleGrid, Text, Title } from '@mantine/core';
import Image from 'next/image';

import type { BiodataData } from '../../shared/types';

interface TemplateProps {
  data: BiodataData;
}

const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, educationCareer, familyDetails, contactDetails } = data;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-');
      return `${d}-${m}-${y}`;
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
    } catch {
      return timeStr;
    }
  };

  const DetailItem = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <Box mb={12}>
        <Text size="xs" tt="uppercase" lts={2} c="gray.6" fw={600} mb={2}>
          {label}
        </Text>
        <Text c="gray.9" fw={500} size="sm" lh="snug">
          {value}
        </Text>
      </Box>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Title
      order={3}
      size="h6"
      fw={300}
      c="gray.9"
      mb="md"
      mt={28}
      pb={6}
      style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
    >
      {title}
    </Title>
  );

  return (
    <Box style={{ minHeight: '100%', backgroundColor: 'white' }} p={24}>
      <Flex
        gap={16}
        align="flex-start"
        mb={32}
        pb={24}
        style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
      >
        <Box flex={1}>
          <Title
            order={1}
            size="h2"
            fw={300}
            style={{ letterSpacing: '-0.02em' }}
            c="gray.9"
            mb={4}
          >
            {personalDetails.fullName || 'Name Surname'}
          </Title>
          <Text size="md" c="gray.6" fw={300}>
            Biodata
          </Text>
          <Box c="gray.6" size="sm" mt={12} style={{ lineHeight: 1.6 }}>
            {contactDetails.mobileNumber && <Text>{contactDetails.mobileNumber}</Text>}
            {contactDetails.email && <Text>{contactDetails.email}</Text>}
          </Box>
        </Box>
        {personalDetails.photo && (
          <Image
            src={personalDetails.photo}
            alt="Profile"
            width={80}
            height={96}
            unoptimized
            style={{
              width: 80,
              height: 96,
              objectFit: 'cover',
              border: '1px solid var(--mantine-color-gray-3)',
              flexShrink: 0,
            }}
          />
        )}
      </Flex>

      <Box style={{ gap: 4, display: 'flex', flexDirection: 'column' }}>
        <SectionTitle title="Personal" />
        <SimpleGrid cols={2} spacing="md" verticalSpacing={0}>
          <DetailItem label="Date of Birth" value={formatDate(personalDetails.dateOfBirth)} />
          <DetailItem label="Time of Birth" value={formatTime(personalDetails.timeOfBirth)} />
          <DetailItem label="Place of Birth" value={personalDetails.placeOfBirth} />
          <DetailItem label="Height" value={personalDetails.height} />
          <DetailItem label="Weight" value={personalDetails.weight} />
          <DetailItem label="Blood Group" value={personalDetails.bloodGroup} />
          <DetailItem label="Complexion" value={personalDetails.complexion} />
          <DetailItem label="Manglik" value={personalDetails.manglik} />
        </SimpleGrid>

        <SectionTitle title="Religious" />
        <SimpleGrid cols={2} spacing="md" verticalSpacing={0}>
          <DetailItem label="Religion" value={personalDetails.religion} />
          <DetailItem label="Caste" value={personalDetails.caste} />
          <DetailItem label="Sub-Caste" value={personalDetails.subCaste} />
          <DetailItem label="Gotra" value={personalDetails.gotra} />
        </SimpleGrid>

        <SectionTitle title="Career & Education" />
        <SimpleGrid cols={2} spacing="md" verticalSpacing={0}>
          <DetailItem label="Education" value={educationCareer.highestEducation} />
          <DetailItem label="Occupation" value={educationCareer.occupation} />
          <DetailItem label="Company" value={educationCareer.companyName} />
          <DetailItem label="Income" value={educationCareer.annualIncome} />
        </SimpleGrid>

        <SectionTitle title="Family Details" />
        <SimpleGrid cols={2} spacing="md" verticalSpacing={0}>
          <DetailItem label="Father's Name" value={familyDetails.fathersName} />
          <DetailItem label="Father's Occupation" value={familyDetails.fathersOccupation} />
          <DetailItem label="Mother's Name" value={familyDetails.mothersName} />
          <DetailItem label="Mother's Occupation" value={familyDetails.mothersOccupation} />
          <DetailItem label="Siblings" value={familyDetails.siblings} />
          <DetailItem label="Family Type" value={familyDetails.familyType} />
          <DetailItem label="Hometown" value={familyDetails.hometown} />
        </SimpleGrid>
        {familyDetails.grandparents && (
          <DetailItem label="Grandparents" value={familyDetails.grandparents} />
        )}

        {contactDetails.address && (
          <>
            <SectionTitle title="Address" />
            <Text c="gray.8" style={{ lineHeight: 1.6 }} fw={500} size="sm">
              {contactDetails.address}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MinimalistTemplate;
