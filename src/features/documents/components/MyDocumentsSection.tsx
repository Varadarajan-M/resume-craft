'use client';

import { Grid, List } from 'lucide-react';

import ViewTypeButton from '@/shared/components/common/ViewTypeButton';
import DocumentList from './DocumentList';
import DocumentSearch from './DocumentSearch';

import { useResumeStore } from '@/features/resume-builder/store/resume';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { Resume } from '@/shared/types/resume';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useDeleteResumeMutation from '../hooks/useDeleteDocumentMutation';
import useDocumentListQuery from '../hooks/useDocumentListQuery';
import useDuplicateResumeMutation from '../hooks/useDuplicateResumeMutation';

const DocumentsSection = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

  const setResume = useResumeStore((s) => s.setResume);

  const { data: documents = [], isLoading, error } = useDocumentListQuery({});
  const { mutate: handleDocumentDuplication } = useDuplicateResumeMutation();
  const { mutate: deleteResumeMutation } = useDeleteResumeMutation({});

  const { captureEvent } = usePosthog();

  const router = useRouter();

  // set the resume in the store and navigate to the builder page
  const handleDocumentClick = <T extends Resume>(document: T) => {
    setResume(document);
    router.push(`/builder`);
  };

  const handleDeleteDocument = <T extends Resume>(document: T) => {
    deleteResumeMutation(document.id, {
      onSuccess: () => {
        toast.success('Document deleted successfully!');
        captureEvent(POSTHOG_EVENTS.RESUME_DELETED);
      },
      onError: (error) => {
        toast.error(`Failed to delete document: ${error.message}`);
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch documents');
    }
  }, [error]);

  return (
    <>
      <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
        <DocumentSearch />
        <div className="flex gap-2 items-center">
          <ViewTypeButton
            active={activeView === 'grid'}
            icon={Grid}
            onClick={() => setActiveView('grid')}
            tooltipText="Grid View"
          />
          <ViewTypeButton
            active={activeView === 'list'}
            icon={List}
            onClick={() => setActiveView('list')}
            tooltipText="List View"
          />
        </div>
      </FadeIn>

      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <DocumentList
          isLoading={isLoading}
          viewType={activeView}
          documents={documents}
          onDocumentClick={handleDocumentClick}
          onDocumentCopy={handleDocumentDuplication}
          onDocumentDelete={handleDeleteDocument}
        />
      </FadeIn>
    </>
  );
};

export default DocumentsSection;
