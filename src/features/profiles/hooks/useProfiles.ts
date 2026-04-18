import { useState, useEffect, useCallback } from 'react';
import type { SavedProfile, BiodataData, TemplateStyle } from '../../../shared/types';
import { getSavedProfiles, saveProfile, deleteProfile, updateProfile } from '../../../shared/utils/storage';
import { notifications } from '@mantine/notifications';
import { Check, Trash2 } from 'lucide-react';
import React from 'react';

export function useProfiles() {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    const p = await getSavedProfiles();
    setProfiles(p);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleSave = useCallback(async (
    profileName: string, 
    data: BiodataData, 
    template: TemplateStyle
  ) => {
    if (currentProfileId) {
      await updateProfile(currentProfileId, data, template);
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully!',
        color: 'green',
        icon: React.createElement(Check, { size: 16 }),
      });
    } else {
      const newProfile = await saveProfile(profileName, data, template);
      setCurrentProfileId(newProfile.id);
      notifications.show({
        title: 'Success',
        message: `${profileName} saved successfully!`,
        color: 'green',
        icon: React.createElement(Check, { size: 16 }),
      });
    }
    await fetchProfiles();
  }, [currentProfileId, fetchProfiles]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteProfile(id);
    await fetchProfiles();
    if (currentProfileId === id) setCurrentProfileId(null);
    notifications.show({
      title: 'Deleted',
      message: 'Profile removed from your device.',
      color: 'red',
      icon: React.createElement(Trash2, { size: 16 }),
    });
  }, [currentProfileId, fetchProfiles]);

  return {
    profiles,
    currentProfileId,
    setCurrentProfileId,
    handleSave,
    handleDelete,
    fetchProfiles,
  };
}
