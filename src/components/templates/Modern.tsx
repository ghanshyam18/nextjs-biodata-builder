import type { BiodataData } from "../../shared/types";
import { Box, Flex, Text, Title } from '@mantine/core';

interface TemplateProps {
  data: BiodataData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, educationCareer, familyDetails, contactDetails } = data;

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
      <Flex direction="column" py={8} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Text span size="xs" c="gray.6" fw={500} tt="uppercase" lts={1}>{label}</Text>
        <Text span c="dark.8" fw={500} size="sm" mt={2}>{value}</Text>
      </Flex>
    );
  };

  const SectionTitle = ({ title }: { title: string }) => (
    <Title order={3} size="h6" fw={700} c="dark.8" mb="sm" pb={6} mt="xl" w="100%" style={{ borderBottom: '2px solid var(--mantine-color-blue-5)' }}>
      {title}
    </Title>
  );

  return (
    <Box style={{ minHeight: '100%', backgroundColor: 'var(--mantine-color-gray-0)', position: 'relative' }}>
      <Box p={24} pb={56} style={{ backgroundColor: 'var(--mantine-color-blue-6)', color: 'white', position: 'relative', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
        <Flex align="flex-start" gap={16}>
          <Box flex={1}>
            <Title order={1} size="h3" fw={800} style={{ letterSpacing: '-0.02em' }} mb={4}>
              {personalDetails.fullName || 'Your Name'}
            </Title>
            {educationCareer.occupation && (
              <Text c="blue.1" size="sm" fw={500}>{educationCareer.occupation}</Text>
            )}
          </Box>
          {personalDetails.photo && (
            <img src={personalDetails.photo} alt="Profile" style={{ width: 64, height: 80, objectFit: 'cover', borderRadius: 'var(--mantine-radius-md)', border: '2px solid var(--mantine-color-blue-4)', flexShrink: 0 }} />
          )}
        </Flex>
      </Box>

      <Box px={20} pb={32} pos="relative" style={{ zIndex: 20, marginTop: -24 }}>
        <Box bg="white" p={20} style={{ borderRadius: 'var(--mantine-radius-xl)', boxShadow: 'var(--mantine-shadow-lg)', border: '1px solid var(--mantine-color-gray-2)' }}>

          <SectionTitle title="Personal Info" />
          <Row label="Date of Birth" value={formatDate(personalDetails.dateOfBirth)} />
          <Row label="Time of Birth" value={formatTime(personalDetails.timeOfBirth)} />
          <Row label="Place of Birth" value={personalDetails.placeOfBirth} />
          <Row label="Height" value={personalDetails.height} />
          <Row label="Weight" value={personalDetails.weight} />
          <Row label="Blood Group" value={personalDetails.bloodGroup} />
          <Row label="Complexion" value={personalDetails.complexion} />
          <Row label="Religion" value={personalDetails.religion} />
          <Row label="Caste" value={personalDetails.caste} />
          <Row label="Gotra" value={personalDetails.gotra} />
          <Row label="Manglik" value={personalDetails.manglik} />

          <SectionTitle title="Education & Career" />
          <Row label="Highest Education" value={educationCareer.highestEducation} />
          <Row label="Occupation" value={educationCareer.occupation} />
          <Row label="Company" value={educationCareer.companyName} />
          <Row label="Income" value={educationCareer.annualIncome} />

          <SectionTitle title="Family Background" />
          <Row label="Father" value={familyDetails.fathersName} />
          <Row label="Father's Job" value={familyDetails.fathersOccupation} />
          <Row label="Mother" value={familyDetails.mothersName} />
          <Row label="Mother's Job" value={familyDetails.mothersOccupation} />
          <Row label="Siblings" value={familyDetails.siblings} />
          <Row label="Grandparents" value={familyDetails.grandparents} />
          <Row label="Family Type" value={familyDetails.familyType} />
          <Row label="Hometown" value={familyDetails.hometown} />

          <SectionTitle title="Contact" />
          <Row label="Mobile" value={contactDetails.mobileNumber} />
          <Row label="Email" value={contactDetails.email} />
          <Row label="Address" value={contactDetails.address} />
        </Box>
      </Box>
    </Box>
  );
};

export default ModernTemplate;
