import { notifications } from '@mantine/notifications';
import { Check, Save, Trash2 } from 'lucide-react';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';

import type { BiodataData, SavedProfile, TemplateStyle } from '../../../shared/types';
import {
  deleteProfile,
  getSavedProfiles,
  saveProfile,
  updateProfile,
} from '../../../shared/utils/storage';

export function useProfiles() {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfiles = useCallback(async () => {
    const p = await getSavedProfiles();
    setProfiles(p);
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleSave = useCallback(
    async (profileName: string, data: BiodataData, template: TemplateStyle) => {
      if (isSaving) return;
      setIsSaving(true);
      try {
        if (currentProfileId) {
          await updateProfile(currentProfileId, data, template);
          notifications.show({
            title: 'Profile Updated',
            message: 'Your changes have been saved successfully.',
            color: 'blue',
            icon: React.createElement(Save, { size: 16 }),
            position: 'top-center',
          });
        } else {
          const newProfile = await saveProfile(profileName, data, template);
          setCurrentProfileId(newProfile.id);
          notifications.show({
            title: 'Profile Saved',
            message: `${profileName} is now stored locally.`,
            color: 'green',
            icon: React.createElement(Check, { size: 16 }),
            position: 'top-center',
          });
        }
        await fetchProfiles();
      } finally {
        setIsSaving(false);
      }
    },
    [currentProfileId, fetchProfiles, isSaving]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProfile(id);
      await fetchProfiles();
      if (currentProfileId === id) setCurrentProfileId(null);
      notifications.show({
        title: 'Profile Deleted',
        message: 'The profile was removed from your storage.',
        color: 'red',
        icon: React.createElement(Trash2, { size: 16 }),
        position: 'top-center',
      });
    },
    [currentProfileId, fetchProfiles]
  );

  return {
    profiles,
    currentProfileId,
    setCurrentProfileId,
    handleSave,
    handleDelete,
    fetchProfiles,
    isSaving,
  };
}
