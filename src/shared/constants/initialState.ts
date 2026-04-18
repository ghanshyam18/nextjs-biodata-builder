import type { BiodataData } from '../types';

export const initialBiodataState: BiodataData = {
  personalDetails: {
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    height: '',
    weight: '',
    bloodGroup: '',
    complexion: '',
    religion: '',
    caste: '',
    subCaste: '',
    gotra: '',
    manglik: '',
    photo: '',
  },
  educationCareer: {
    highestEducation: '',
    occupation: '',
    companyName: '',
    annualIncome: '',
  },
  familyDetails: {
    fathersName: '',
    fathersOccupation: '',
    mothersName: '',
    mothersOccupation: '',
    siblings: '',
    grandparents: '',
    familyType: '',
    hometown: '',
  },
  contactDetails: {
    mobileNumber: '',
    email: '',
    address: '',
  }
};
