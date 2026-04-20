import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

import type { BiodataData } from '../../types';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
      fontWeight: 700,
    },
  ],
});

const NAVY = '#0d2137';
const GOLD = '#B8952A';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    color: NAVY,
  },
  outerBorder: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    border: `2.5pt solid ${GOLD}`,
    borderRadius: 8,
  },
  innerBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: `1pt solid ${GOLD}`,
    borderRadius: 4,
  },
  container: {
    padding: 35,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 2,
  },
  mainSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsColumn: {
    flex: 1,
  },
  photoContainer: {
    width: 100,
    height: 125,
    border: `2pt solid ${GOLD}`,
    padding: 3,
    backgroundColor: '#f9f6ee',
    marginLeft: 15,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: {
    width: 130,
    fontSize: 12,
    fontWeight: 600,
  },
  colon: {
    width: 10,
    fontSize: 12,
    fontWeight: 600,
  },
  value: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
  },
  divider: {
    borderBottom: `1pt solid ${GOLD}`,
    marginVertical: 15,
    opacity: 0.4,
  },
});

interface TemplateProps {
  data: BiodataData;
}

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
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export const TraditionalPDF: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, educationCareer, familyDetails, contactDetails } = data;

  return (
    <Document title={`Biodata - ${personalDetails.fullName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder} fixed />
        <View style={styles.innerBorder} fixed />

        <View style={styles.container}>
          <Text style={styles.title}>BIODATA</Text>

          <View style={styles.mainSection}>
            <View style={styles.detailsColumn}>
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
            </View>

            {personalDetails.photo && (
              <View style={styles.photoContainer}>
                <Image src={personalDetails.photo} style={styles.photo} />
              </View>
            )}
          </View>

          <Row label="Blood Group" value={personalDetails.bloodGroup} />
          <Row label="Complexion" value={personalDetails.complexion} />
          <Row label="Religion" value={personalDetails.religion} />
          <Row label="Caste" value={personalDetails.caste} />
          <Row label="Sub-Caste" value={personalDetails.subCaste} />
          <Row label="Gotra" value={personalDetails.gotra} />
          <Row label="Manglik" value={personalDetails.manglik} />

          <View style={styles.divider} />

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
        </View>
      </Page>
    </Document>
  );
};
