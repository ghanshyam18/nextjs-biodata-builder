import { Box, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

import type { BiodataData } from '../../shared/types';

interface TemplateProps {
  data: BiodataData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
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

  const Row = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <Flex
        py={6}
        align="flex-start"
        gap="sm"
        style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Text
          span
          w={128}
          fz={12}
          fw={700}
          tt="uppercase"
          lts={1}
          pt={2}
          c="gray.6"
          style={{ flexShrink: 0 }}
        >
          {label}
        </Text>
        <Text span fz="sm" fw={500} c="dark.8">
          {value}
        </Text>
      </Flex>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Box mt={24} mb={12}>
      <Box h={2} bg="dark.8" mb={4}></Box>
      <Title
        order={3}
        fz="xs"
        fw={700}
        tt="uppercase"
        c="dark.8"
        style={{ letterSpacing: '0.25em' }}
      >
        {title}
      </Title>
      <Box h={1} bg="gray.4" mt={4}></Box>
    </Box>
  );

  return (
    <Box style={{ minHeight: '100%', backgroundColor: 'white', fontFamily: 'serif' }}>
      <Box bg="dark.8" c="white" px={20} py={24}>
        <Flex align="flex-start" gap="md">
          <Box flex={1}>
            <Box fz="xs" tt="uppercase" c="gray.5" mb={8} style={{ letterSpacing: '0.4em' }}>
              Matrimonial Biodata
            </Box>
            <Title order={1} fz={24} fw={700} style={{ letterSpacing: '-0.02em', color: 'white' }}>
              {personalDetails.fullName || 'Full Name'}
            </Title>
            {educationCareer.occupation && (
              <Text
                c="gray.5"
                fz="xs"
                mt={6}
                tt="uppercase"
                lts={2}
                style={{ fontFamily: 'sans-serif' }}
              >
                {educationCareer.occupation}
              </Text>
            )}
          </Box>
          {personalDetails.photo && (
            <Image
              src={personalDetails.photo}
              alt="Profile"
              width={64}
              height={80}
              unoptimized
              style={{
                width: 64,
                height: 80,
                objectFit: 'cover',
                flexShrink: 0,
                border: '1px solid var(--mantine-color-gray-6)',
              }}
            />
          )}
        </Flex>
      </Box>

      {(contactDetails.mobileNumber || contactDetails.email) && (
        <Flex
          bg="gray.1"
          px={20}
          py={8}
          justify="center"
          wrap="wrap"
          gap={24}
          style={{
            borderBottom: '1px solid var(--mantine-color-gray-3)',
            borderTop: '1px solid var(--mantine-color-gray-3)',
          }}
        >
          {contactDetails.mobileNumber && (
            <Text span fz="xs" c="dark.6" style={{ fontFamily: 'sans-serif' }}>
              📞 {contactDetails.mobileNumber}
            </Text>
          )}
          {contactDetails.email && (
            <Text span fz="xs" c="dark.6" style={{ fontFamily: 'sans-serif' }}>
              ✉ {contactDetails.email}
            </Text>
          )}
        </Flex>
      )}

      <Box px={20} pb={32}>
        <SectionTitle title="Personal Details" />
        <Row label="Date of Birth" value={formatDate(personalDetails.dateOfBirth)} />
        <Row label="Time of Birth" value={formatTime(personalDetails.timeOfBirth)} />
        <Row label="Place of Birth" value={personalDetails.placeOfBirth} />
        <Row label="Height" value={personalDetails.height} />
        <Row label="Weight" value={personalDetails.weight} />
        <Row label="Blood Group" value={personalDetails.bloodGroup} />
        <Row label="Complexion" value={personalDetails.complexion} />
        <Row label="Religion" value={personalDetails.religion} />
        <Row label="Caste" value={personalDetails.caste} />
        <Row label="Sub-Caste" value={personalDetails.subCaste} />
        <Row label="Gotra" value={personalDetails.gotra} />
        <Row label="Manglik" value={personalDetails.manglik} />

        <SectionTitle title="Education & Career" />
        <Row label="Education" value={educationCareer.highestEducation} />
        <Row label="Occupation" value={educationCareer.occupation} />
        <Row label="Company" value={educationCareer.companyName} />
        <Row label="Income" value={educationCareer.annualIncome} />

        <SectionTitle title="Family Details" />
        <Row label="Father's Name" value={familyDetails.fathersName} />
        <Row label="Father's Job" value={familyDetails.fathersOccupation} />
        <Row label="Mother's Name" value={familyDetails.mothersName} />
        <Row label="Mother's Job" value={familyDetails.mothersOccupation} />
        <Row label="Siblings" value={familyDetails.siblings} />
        <Row label="Grandparents" value={familyDetails.grandparents} />
        <Row label="Family Type" value={familyDetails.familyType} />
        <Row label="Hometown" value={familyDetails.hometown} />

        {contactDetails.address && (
          <>
            <SectionTitle title="Address" />
            <Text c="dark.8" fz="sm" style={{ lineHeight: 1.6 }}>
              {contactDetails.address}
            </Text>
          </>
        )}

        <Box mt={32} h={2} bg="dark.8"></Box>
      </Box>
    </Box>
  );
};

export default ClassicTemplate;
