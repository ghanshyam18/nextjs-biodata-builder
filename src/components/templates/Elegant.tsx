import { Box, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

import type { BiodataData } from '../../shared/types';

interface TemplateProps {
  data: BiodataData;
}

const ElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, educationCareer, familyDetails, contactDetails } = data;

  const GOLD = '#C9A84C';
  const NAVY = '#0f172a';

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
      <Flex py={6} align="flex-start" gap="sm" style={{ borderBottom: '1px solid #e8dfc8' }}>
        <Text
          span
          w={128}
          fz={12}
          fw={700}
          tt="uppercase"
          lts={1}
          pt={2}
          style={{ flexShrink: 0, color: GOLD }}
        >
          {label}
        </Text>
        <Text span fz="sm" fw={500} style={{ color: NAVY }}>
          {value}
        </Text>
      </Flex>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Flex align="center" gap="sm" mt={24} mb={12}>
      <Text span fz="xs" style={{ color: GOLD, userSelect: 'none' }}>
        ◆
      </Text>
      <Title
        order={3}
        fz="xs"
        fw={700}
        tt="uppercase"
        style={{ letterSpacing: '0.2em', color: GOLD }}
      >
        {title}
      </Title>
      <Box flex={1} h={1} style={{ background: GOLD, opacity: 0.4 }}></Box>
    </Flex>
  );

  return (
    <Box style={{ minHeight: '100%', backgroundColor: 'white', fontFamily: 'serif' }}>
      <Box pos="relative" px={24} py={32} style={{ backgroundColor: NAVY }}>
        <Box
          mb={12}
          h={1}
          w="100%"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
        ></Box>
        <Flex align="center" gap="md">
          <Box flex={1} ta="center">
            <Box fz="xs" tt="uppercase" mb={8} style={{ letterSpacing: '0.3em', color: GOLD }}>
              — Biodata —
            </Box>
            <Title order={1} fz={24} fw={700} style={{ letterSpacing: '-0.02em', color: GOLD }}>
              {personalDetails.fullName || 'Full Name'}
            </Title>
            {educationCareer.occupation && (
              <Text c="slate.4" fz="sm" mt={4} style={{ fontFamily: 'sans-serif' }}>
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
                border: `1.5px solid ${GOLD}`,
              }}
            />
          )}
        </Flex>
        <Box
          mt={12}
          h={1}
          w="100%"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
        ></Box>
      </Box>

      <Box px={24} pb={32} style={{ backgroundColor: '#fffef9' }}>
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

        <SectionTitle title="Contact" />
        <Row label="Mobile" value={contactDetails.mobileNumber} />
        <Row label="Email" value={contactDetails.email} />
        <Row label="Address" value={contactDetails.address} />

        <Box
          mt={32}
          h={1}
          w="100%"
          style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
        ></Box>
      </Box>
    </Box>
  );
};

export default ElegantTemplate;
