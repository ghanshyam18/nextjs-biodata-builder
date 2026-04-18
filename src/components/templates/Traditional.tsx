import type { BiodataData } from "../../shared/types";
import { Box, Flex, Text, Title, Divider } from '@mantine/core';

interface TemplateProps {
  data: BiodataData;
}

const TraditionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, educationCareer, familyDetails, contactDetails } = data;

  const NAVY = '#0d2137';
  const GOLD = '#B8952A';

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try { const [y, m, d] = dateStr.split('-'); return `${d}-${m}-${y}`; } catch { return dateStr; }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
    } catch { return timeStr; }
  };

  const Row = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <Flex align="baseline" py={6}>
        <Text span fw={600} fz={13} lh="snug" c={NAVY} w={140} miw={140} style={{ flexShrink: 0 }}>
          {label}
        </Text>
        <Text span fw={600} fz={13} c={NAVY} mr="xs">:</Text>
        <Text span fw={400} fz={13} lh="snug" c={NAVY}>{value}</Text>
      </Flex>
    );
  };

  return (
    <Box pos="relative" bg="#ffffff" p={12} style={{ minHeight: '100%', fontFamily: 'var(--mantine-font-family)' }}>
      {/* Outer gold border */}
      <Box
        pos="absolute"
        top={12} left={12} right={12} bottom={12}
        style={{
          border: `2.5px solid ${GOLD}`,
          borderRadius: 8,
          pointerEvents: 'none',
        }}
      />
      {/* Inner gold border */}
      <Box
        pos="absolute"
        top={18} left={18} right={18} bottom={18}
        style={{
          border: `1px solid ${GOLD}`,
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />

      <Box pos="relative" style={{ zIndex: 10 }} px={32} pb={24} pt={24}>
        <Title order={1} ta="center" fw={700} lts={2} fz={20} mb={20} c={NAVY}>
          BIODATA
        </Title>

        <Flex gap="md" align="flex-start">
          <Box flex={1} style={{ minWidth: 0 }}>
            <Row label="Name" value={personalDetails.fullName} />
            <Row label="Date of Birth" value={formatDate(personalDetails.dateOfBirth)} />
            <Row label="Time of Birth" value={formatTime(personalDetails.timeOfBirth)} />
            <Row label="Place of Birth" value={personalDetails.placeOfBirth} />
            <Row label="Education" value={educationCareer.highestEducation} />
            <Row label="Occupation" value={educationCareer.occupation} />
            <Row label="Firm" value={educationCareer.companyName} />
            <Row label="Income" value={educationCareer.annualIncome} />
            <Row label="Height" value={personalDetails.height} />
            <Row label="Weight" value={personalDetails.weight} />
          </Box>
          {personalDetails.photo && (
            <Box style={{ flexShrink: 0, width: 100, border: `2px solid ${GOLD}`, padding: 3, background: '#f9f6ee' }}>
              <img
                src={personalDetails.photo}
                alt="Profile"
                style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}
        </Flex>

        <Row label="Blood Group" value={personalDetails.bloodGroup} />
        <Row label="Complexion" value={personalDetails.complexion} />
        <Row label="Religion" value={personalDetails.religion} />
        <Row label="Caste" value={personalDetails.caste} />
        <Row label="Sub-Caste" value={personalDetails.subCaste} />
        <Row label="Gotra" value={personalDetails.gotra} />
        <Row label="Manglik" value={personalDetails.manglik} />

        <Divider my="sm" color={GOLD} style={{ opacity: 0.4 }} />

        <Row label="Father's Name" value={familyDetails.fathersName} />
        <Row label="Father's Occupation" value={familyDetails.fathersOccupation} />
        <Row label="Mother's Name" value={familyDetails.mothersName} />
        <Row label="Mother's Occupation" value={familyDetails.mothersOccupation} />
        <Row label="Siblings" value={familyDetails.siblings} />
        <Row label="Grandparents" value={familyDetails.grandparents} />
        <Row label="Family Type" value={familyDetails.familyType} />
        <Row label="Hometown" value={familyDetails.hometown} />
        <Row label="Address" value={contactDetails.address} />
        <Row label="Contact Number" value={contactDetails.mobileNumber} />
        <Row label="Email" value={contactDetails.email} />
      </Box>
    </Box>
  );
};

export default TraditionalTemplate;
