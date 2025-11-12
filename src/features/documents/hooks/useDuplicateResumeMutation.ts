import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { createDuplicateResume } from '@/shared/lib/resume';
import { Resume } from '@/shared/types/resume';
import { useCallback } from 'react';
import { toast } from 'sonner';
import useCreateResumeMutation from './useCreateResumeMutation';

const useDuplicateResumeMutation = () => {
  const mutation = useCreateResumeMutation({});
  const { captureEvent } = usePosthog();

  const duplicateResume = useCallback(
    async (resume: Resume) => {
      const duplicatedDocument = createDuplicateResume(resume);

      await mutation.mutateAsync(duplicatedDocument, {
        onSuccess: () => {
          toast.success('Document duplicated successfully!');
          captureEvent(POSTHOG_EVENTS.RESUME_DUPLICATED, {
            title: resume.title,
          });
        },
        onError: (error) => {
          toast.error(`Failed to duplicate resume: ${error.message}`);
        },
      });
    },
    [mutation]
  );

  return {
    mutate: duplicateResume,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useDuplicateResumeMutation;
