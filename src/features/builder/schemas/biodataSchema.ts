import { z } from 'zod';

export const personalDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full Name is required')
    .max(50, 'Max 50 characters allowed')
    .refine((val) => !/[<>]/.test(val), 'Invalid characters detected'),
  dateOfBirth: z.string().default(''),
  timeOfBirth: z.string().default(''),
  placeOfBirth: z
    .string()
    .max(100, 'Max 100 characters allowed')
    .refine((val) => !/[<>]/.test(val), 'Invalid characters detected')
    .default(''),
  height: z.string().max(20, 'Max 20 chars').default(''),
  weight: z.string().max(20, 'Max 20 chars').default(''),
  bloodGroup: z.string().max(10, 'Max 10 chars').default(''),
  complexion: z.string().max(50, 'Max 50 chars').default(''),
  religion: z.string().default(''),
  caste: z.string().max(50, 'Max 50 chars').default(''),
  subCaste: z.string().max(50, 'Max 50 chars').default(''),
  gotra: z.string().max(50, 'Max 50 chars').default(''),
  manglik: z.string().default(''),
  photo: z.string().default(''),
});

export const educationCareerSchema = z.object({
  highestEducation: z.string().max(100, 'Max 100 chars').default(''),
  occupation: z.string().max(100, 'Max 100 chars').default(''),
  companyName: z.string().max(100, 'Max 100 chars').default(''),
  annualIncome: z.string().max(50, 'Max 50 chars').default(''),
});

export const familyDetailsSchema = z.object({
  fathersName: z.string().max(50, 'Max 50 chars').default(''),
  fathersOccupation: z.string().max(100, 'Max 100 chars').default(''),
  mothersName: z.string().max(50, 'Max 50 chars').default(''),
  mothersOccupation: z.string().max(100, 'Max 100 chars').default(''),
  siblings: z.string().max(150, 'Max 150 chars').default(''),
  grandparents: z.string().max(150, 'Max 150 chars').default(''),
  familyType: z.string().default(''),
  hometown: z.string().max(100, 'Max 100 chars').default(''),
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
  address: z
    .string()
    .max(200, 'Max 200 characters allowed')
    .refine((val) => !val || !/[<>]/.test(val), 'Invalid characters detected')
    .default(''),
});

export const biodataSchema = z.object({
  personalDetails: personalDetailsSchema,
  educationCareer: educationCareerSchema,
  familyDetails: familyDetailsSchema,
  contactDetails: contactDetailsSchema,
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
