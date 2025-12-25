import { useResumeStore } from '@/features/resume-builder/store/resume';

/**
 * Custom hook to manage work experience item data and updates.
 * 
 * @param id - The ID of the work experience item.
 * @returns The experience item and a function to update its fields.
 */
export const useWorkExperience = (id: string) => {
  const experience = useResumeStore((s) =>
    s.resume?.sections.experience?.find((e) => e.id === id)
  );
  
  const updateExperienceItem = useResumeStore(
    (s) => s.updateExperienceItem
  );

  const updateField = (fields: Partial<NonNullable<typeof experience>>) => {
    updateExperienceItem(id, fields);
  };

  const description = experience?.description || '';

  return {
    experience,
    description,
    updateField,
  };
};
