import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { createDuplicateResume } from '@/shared/lib/resume';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useCallback } from 'react';
import { toast } from 'sonner';
import useCreateResumeMutation from './useCreateResumeMutation';
import useIdbResume from './useIdbResume';

const useDuplicateResumeMutation = () => {
  const mutation = useCreateResumeMutation({});
  const isSignedIn = useAuth()?.isSignedIn;
  const { captureEvent } = usePosthog();
  const { duplicateLocalResume } = useIdbResume({ enabled: !isSignedIn });

  const duplicateResume = useCallback(
    async (resume: Resume) => {
      const duplicatedDocument = createDuplicateResume(resume);

      const onSuccess = () => {
        toast.success('Resume duplicated successfully!');
        captureEvent(POSTHOG_EVENTS.RESUME_DUPLICATED);
      };

      if (!isSignedIn) {
        await duplicateLocalResume(resume?.id);
        return onSuccess();
      }

      await mutation.mutateAsync(duplicatedDocument, {
        onSuccess,
        onError: (error) => {
          toast.error(`Failed to duplicate resume: ${error.message}`);
        },
      });
    },
    [mutation, isSignedIn, captureEvent, duplicateLocalResume]
  );

  return {
    mutate: duplicateResume,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useDuplicateResumeMutation;
