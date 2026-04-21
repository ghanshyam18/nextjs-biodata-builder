import { z } from 'zod';

/**
 * Reusable safe string schema to prevent XSS and enforce length limits
 * across all input fields consistently.
 */
const safeString = (max: number = 100, required: boolean = false) => {
  let schema = z.string().trim();

  if (required) {
    schema = schema.min(1, 'This field is required');
  }

  return schema
    .max(max, `Max ${max} characters allowed`)
    .refine((val) => !val || !/[<>]/.test(val), 'Invalid characters detected')
    .default('');
};

export const personalDetailsSchema = z.object({
  fullName: safeString(50, true),
  dateOfBirth: z.string().default(''),
  timeOfBirth: z.string().default(''),
  placeOfBirth: safeString(100),
  height: safeString(20),
  weight: safeString(20),
  bloodGroup: safeString(10),
  complexion: safeString(50),
  religion: z.string().default(''),
  caste: safeString(50),
  subCaste: safeString(50),
  gotra: safeString(50),
  manglik: z.string().default(''),
  photo: z.string().default(''),
});

export const educationCareerSchema = z.object({
  highestEducation: safeString(100),
  occupation: safeString(100),
  companyName: safeString(100),
  annualIncome: safeString(50),
});

export const familyDetailsSchema = z.object({
  fathersName: safeString(50),
  fathersOccupation: safeString(100),
  mothersName: safeString(50),
  mothersOccupation: safeString(100),
  siblings: safeString(150),
  grandparents: safeString(150),
  familyType: z.string().default(''),
  hometown: safeString(100),
});

export const contactDetailsSchema = z.object({
  mobileNumber: z
    .string()
    .refine((val) => !val || /^[\d\s+\-()]{10,15}$/.test(val), '10-15 digits allowed')
    .default(''),
  email: z
    .string()
    .refine((val) => !val || /^\S+@\S+\.\S+$/.test(val), 'Invalid email address')
    .default(''),
  address: safeString(200),
});

export const biodataSchema = z.object({
  personalDetails: personalDetailsSchema,
  educationCareer: educationCareerSchema,
  familyDetails: familyDetailsSchema,
  contactDetails: contactDetailsSchema,
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
