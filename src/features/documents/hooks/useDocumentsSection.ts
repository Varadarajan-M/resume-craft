import { useResumeStore } from '@/features/resume-builder/store/resume';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import useDeleteResumeMutation from '../hooks/useDeleteDocumentMutation';
import useDocumentListQuery from '../hooks/useDocumentListQuery';
import useDuplicateResumeMutation from '../hooks/useDuplicateResumeMutation';
import useIdbResume from '../hooks/useIdbResume';

/**
 * Hook to manage the logic for the Documents section (dashboard).
 * Handles data fetching, searching, duplication, and deletion of resumes.
 */
export const useDocumentsSection = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoaded, isSignedIn } = useAuth();
  const setResume = useResumeStore((s) => s.setResume);
  const router = useRouter();
  const { captureEvent } = usePosthog();

  // remote data
  const {
    data: remoteResumes,
    error: remoteError,
    isLoading: isLoadingRemote,
  } = useDocumentListQuery({
    enabled: !!isSignedIn,
  });

  // local data
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

  // filtering logic
  const filteredDocuments = useMemo(
    () =>
      documents?.filter((doc) => {
        const personalInfo = doc?.sections?.personalInfo;
        const derivedTitle = `${personalInfo?.fullName || ''} ${personalInfo?.headline || ''} ${doc?.category || ''}`;
        return derivedTitle.toLowerCase().includes(searchQuery?.toLowerCase());
      }) || [],
    [documents, searchQuery]
  );

  const { mutate: handleDocumentDuplication } = useDuplicateResumeMutation();
  const { mutate: deleteResumeMutation } = useDeleteResumeMutation({});

  /**
   * Navigates to the resume builder for a specific document.
   */
  const handleDocumentClick = (document: Resume) => {
    setResume(document);
    router.push(`/builder`);
  };

  /**
   * Handles resume deletion (local or remote).
   */
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

  // report fetching errors
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch documents');
    }
  }, [error]);

  return {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    filteredDocuments,
    isLoading,
    isSignedIn,
    isLoaded,
    handleDocumentClick,
    handleDocumentDuplication,
    handleDeleteDocument,
  };
};
