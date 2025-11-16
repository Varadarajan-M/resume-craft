'use client';

import { Grid, List } from 'lucide-react';

import ViewTypeButton from '@/shared/components/common/ViewTypeButton';
import DocumentList from './DocumentList';
import DocumentSearch from './DocumentSearch';

import { useResumeStore } from '@/features/resume-builder/store/resume';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import LocalDocumentsAlert from '@/shared/components/common/LocalDocumentsAlert';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { cn } from '@/shared/lib/utils';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import useDeleteResumeMutation from '../hooks/useDeleteDocumentMutation';
import useDocumentListQuery from '../hooks/useDocumentListQuery';
import useDuplicateResumeMutation from '../hooks/useDuplicateResumeMutation';
import useIdbResume from '../hooks/useIdbResume';
import SyncLocalResumesCallout from './SyncResumesCallout';

const DocumentsSection = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoaded, isSignedIn } = useAuth();
  const setResume = useResumeStore((s) => s.setResume);

  const {
    data: remoteResumes,
    error: remoteError,
    isLoading: isLoadingRemote,
  } = useDocumentListQuery({
    enabled: !!isSignedIn,
  });

  const {
    localResumes,
    loading: isLoadingLocal,
    error: localError,
    deleteLocalResume,
  } = useIdbResume({ enabled: !isSignedIn && isLoaded });

  const documents = (
    !isSignedIn && isLoaded ? localResumes : remoteResumes
  ) as Resume[];
  const isLoading = !isSignedIn && isLoaded ? isLoadingLocal : isLoadingRemote;
  const error = !isSignedIn && isLoaded ? localError : remoteError;

  const filteredDocuments = useMemo(
    () =>
      documents?.filter((doc) => {
        const derivedTitle =
          doc?.sections?.personalInfo?.fullName +
          ' - ' +
          doc?.sections?.personalInfo?.headline;
        return derivedTitle.toLowerCase().includes(searchQuery?.toLowerCase());
      }) || [],
    [documents, searchQuery]
  );

  const { mutate: handleDocumentDuplication } = useDuplicateResumeMutation();
  const { mutate: deleteResumeMutation } = useDeleteResumeMutation({});

  const { captureEvent } = usePosthog();

  const router = useRouter();

  // set the resume in the store and navigate to the builder page
  const handleDocumentClick = (document: Resume) => {
    setResume(document);
    router.push(`/builder`);
  };

  const handleDeleteDocument = (document: Resume) => {
    const onSuccess = () => {
      toast.success('Document deleted successfully!');
      captureEvent(POSTHOG_EVENTS.RESUME_DELETED);
    };

    const onError = (error: Error) => {
      toast.error(`Failed to delete document: ${error.message}`);
    };

    if (!isSignedIn) {
      return deleteLocalResume(document.id).then(onSuccess).catch(onError);
    }

    deleteResumeMutation(document?.id, {
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch documents');
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <FadeIn transition={{ delay: 0.3 }} className="flex flex-row gap-4">
        <DocumentSearch onChange={setSearchQuery} />
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

      {!isSignedIn && filteredDocuments?.length > 0 && isLoaded ? (
        <FadeIn transition={{ delay: 0.3 }} className="my-2">
          <LocalDocumentsAlert />
        </FadeIn>
      ) : null}

      {isSignedIn && isLoaded && (
        <FadeIn transition={{ delay: 0.2 }}>
          <SyncLocalResumesCallout />
        </FadeIn>
      )}

      <FadeIn
        transition={{ delay: 0.3 }}
        className={cn('w-full', filteredDocuments?.length === 0 && 'mt-4')}
      >
        <DocumentList
          isLoading={isLoading}
          viewType={activeView}
          documents={filteredDocuments!}
          onDocumentClick={handleDocumentClick}
          onDocumentCopy={handleDocumentDuplication}
          onDocumentDelete={handleDeleteDocument}
        />
      </FadeIn>
    </div>
  );
};

export default DocumentsSection;
