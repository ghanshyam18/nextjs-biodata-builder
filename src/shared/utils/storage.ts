import localforage from 'localforage';
import type { BiodataData, SavedProfile, TemplateStyle } from '../types';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const STORAGE_KEY = 'biodata_explorer_profiles';

// Initialize localforage configuration
localforage.config({
  name: 'BiodataBuilder',
  storeName: 'profiles' 
});

export const getSavedProfiles = async (): Promise<SavedProfile[]> => {
  try {
    const data = await localforage.getItem<SavedProfile[]>(STORAGE_KEY);
    return data || [];
  } catch (e) {
    console.error('Error fetching saved profiles from localforage:', e);
    return [];
  }
};

export const saveProfile = async (
  profileName: string,
  data: BiodataData,
  template: TemplateStyle
): Promise<SavedProfile> => {
  const profiles = await getSavedProfiles();
  const newProfile: SavedProfile = {
    id: generateId(),
    profileName,
    data,
    template,
    updatedAt: Date.now(),
  };

  const updatedProfiles = [newProfile, ...profiles];
  await localforage.setItem(STORAGE_KEY, updatedProfiles);
  return newProfile;
};

export const deleteProfile = async (id: string): Promise<void> => {
  const profiles = await getSavedProfiles();
  const updatedProfiles = profiles.filter((p) => p.id !== id);
  await localforage.setItem(STORAGE_KEY, updatedProfiles);
};

export const updateProfile = async (
  id: string,
  data: BiodataData,
  template: TemplateStyle
): Promise<void> => {
  const profiles = await getSavedProfiles();
  const index = profiles.findIndex((p) => p.id === id);
  if (index !== -1) {
    profiles[index] = {
      ...profiles[index],
      data,
      template,
      updatedAt: Date.now(),
    };
    await localforage.setItem(STORAGE_KEY, profiles);
  }
};
