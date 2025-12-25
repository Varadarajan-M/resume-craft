import { DocumentTemplate } from '@/shared/types/document';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useTemplatesQuery from '../hooks/useTemplatesQuery';

/**
 * Hook to manage the logic for the Templates section.
 * Handles template fetching, navigation, and view type toggling.
 */
export const useTemplatesSection = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  
  const { data: templates, isLoading } = useTemplatesQuery();

  /**
   * Navigates to the resume builder with a new state and the selected template.
   */
  const handleTemplateClick = (template: DocumentTemplate) => {
    router.push(`/builder?new=true&templateId=${template.id}`);
  };

  return {
    activeView,
    setActiveView,
    templates,
    isLoading,
    handleTemplateClick,
  };
};
