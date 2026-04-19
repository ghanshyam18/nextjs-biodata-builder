import { Box, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

import type { BiodataData } from '../../shared/types';

interface TemplateProps {
  data: BiodataData;
}

const FloralTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        gap={4}
        style={{ borderBottom: '1px solid var(--mantine-color-pink-1)' }}
      >
        <Text
          span
          w={128}
          size="xs"
          fw={600}
          c="pink.7"
          tt="uppercase"
          lts={1}
          pt={2}
          style={{ flexShrink: 0 }}
        >
          {label}
        </Text>
        <Text span size="sm" fw={500} c="var(--mantine-color-blue-9)">
          {value}
        </Text>
      </Flex>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Flex align="center" gap="sm" my="md">
      <Text span c="pink.3" size="lg" style={{ userSelect: 'none' }}>
        ✿
      </Text>
      <Title order={3} size="sm" fw={700} c="pink.7" tt="uppercase" lts={2}>
        {title}
      </Title>
      <Box flex={1} h={1} bg="pink.2"></Box>
      <Text span c="pink.3" size="lg" style={{ userSelect: 'none' }}>
        ✿
      </Text>
    </Flex>
  );

  return (
    <Box
      style={{
        minHeight: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #fff0f5 0%, #fce7f3 50%, #fdf2f8 100%)',
      }}
    >
      <Box
        pos="absolute"
        top={12}
        left={12}
        c="pink.2"
        fz={36}
        style={{ userSelect: 'none', lineHeight: 1 }}
      >
        ❀
      </Box>
      <Box
        pos="absolute"
        top={12}
        right={12}
        c="pink.2"
        fz={36}
        style={{ userSelect: 'none', lineHeight: 1 }}
      >
        ❀
      </Box>
      <Box
        pos="absolute"
        bottom={12}
        left={12}
        c="pink.2"
        fz={36}
        style={{ userSelect: 'none', lineHeight: 1 }}
      >
        ❀
      </Box>
      <Box
        pos="absolute"
        bottom={12}
        right={12}
        c="pink.2"
        fz={36}
        style={{ userSelect: 'none', lineHeight: 1 }}
      >
        ❀
      </Box>
      <Box
        pos="absolute"
        top={8}
        left={8}
        right={8}
        bottom={8}
        style={{
          border: '2px solid var(--mantine-color-pink-2)',
          borderRadius: 'var(--mantine-radius-md)',
          pointerEvents: 'none',
        }}
      ></Box>

      <Box pos="relative" style={{ zIndex: 10 }} px={24} py={28}>
        <Flex align="flex-start" gap="md" mb="md">
          <Box flex={1} ta="center">
            <Box c="pink.3" fz={24} mb={8} lts={2} style={{ userSelect: 'none' }}>
              ✦ ✦ ✦
            </Box>
            <Title order={1} size="h3" fw={700} c="pink.7" tt="uppercase" lts={2} mb={4}>
              Biodata
            </Title>
            {personalDetails.fullName && (
              <Title order={2} size="h5" fw={600} c="var(--mantine-color-red-8)" mt={4}>
                {personalDetails.fullName}
              </Title>
            )}
            <Box c="pink.3" fz={18} mt={8} lts={2} style={{ userSelect: 'none' }}>
              ~ ❀ ~
            </Box>
          </Box>
          {personalDetails.photo && (
            <Box
              style={{
                flexShrink: 0,
                border: '2px solid var(--mantine-color-pink-3)',
                padding: 2,
                borderRadius: 'var(--mantine-radius-sm)',
                background: '#fdf2f8',
              }}
            >
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
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              />
            </Box>
          )}
        </Flex>

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

        <SectionTitle title="Contact Info" />
        <Row label="Mobile" value={contactDetails.mobileNumber} />
        <Row label="Email" value={contactDetails.email} />
        <Row label="Address" value={contactDetails.address} />

        <Box ta="center" mt={24} c="pink.3" fz={18} lts={2} style={{ userSelect: 'none' }}>
          ✦ ✦ ✦
        </Box>
      </Box>
    </Box>
  );
};

export default FloralTemplate;
