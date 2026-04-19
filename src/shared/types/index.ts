export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  height: string;
  weight: string;
  bloodGroup: string;
  complexion: string;
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  manglik: string;
  photo: string; // base64 data URL
}

export interface EducationCareer {
  highestEducation: string;
  occupation: string;
  companyName: string;
  annualIncome: string;
}

export interface FamilyDetails {
  fathersName: string;
  fathersOccupation: string;
  mothersName: string;
  mothersOccupation: string;
  siblings: string;
  grandparents: string;
  familyType: string;
  hometown: string;
}

export interface ContactDetails {
  mobileNumber: string;
  email: string;
  address: string;
}

export interface BiodataData {
  personalDetails: PersonalDetails;
  educationCareer: EducationCareer;
  familyDetails: FamilyDetails;
  contactDetails: ContactDetails;
}

export type TemplateStyle =
  | 'traditional'
  | 'modern'
  | 'minimalist'
  | 'floral'
  | 'elegant'
  | 'classic';

export interface SavedProfile {
  id: string;
  profileName: string;
  data: BiodataData;
  template: TemplateStyle;
  updatedAt: number;
}
