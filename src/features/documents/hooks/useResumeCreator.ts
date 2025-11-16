import { useResumeStore } from '@/features/resume-builder/store/resume';
import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { getPlaceholderResume } from '@/shared/lib/resume';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useCreateResumeFromTextMutation, {
  useCreateLocalResumeFromTextMutation,
} from './useCreateResumeFromTextMutation';
import useCreateResumeMutation from './useCreateResumeMutation';
import useIdbResume from './useIdbResume';

function useResumeCreator() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const setResume = useResumeStore((s) => s.setResume);
  const { captureEvent } = usePosthog();
  const { createLocalResume } = useIdbResume({ enabled: !isSignedIn });
  const createResume = useCreateResumeMutation({});
  const createResumeFromText = useCreateResumeFromTextMutation({});
  const createLocalFromText = useCreateLocalResumeFromTextMutation();

  const handleSuccess = (resume: Resume, eventName: string, extra = {}) => {
    toast.success('Resume created successfully!');
    setResume(resume);
    captureEvent(eventName, extra);
    router.push('/builder');
  };

  const handleError = (error: Error) =>
    toast.error(`Failed to create resume: ${error.message}`);

  const createFromPlaceholder = async () => {
    const placeholder = getPlaceholderResume(userId || undefined);

    if (!isSignedIn) {
      return createLocalResume(placeholder)
        .then(() => {
          handleSuccess(placeholder, POSTHOG_EVENTS.RESUME_CREATED, {
            templateId: placeholder.templateId,
          });
        })
        .catch(handleError);
    }

    return createResume
      .mutateAsync(placeholder)
      .then((res) =>
        handleSuccess(res, POSTHOG_EVENTS.RESUME_CREATED, {
          templateId: res.templateId,
        })
      )
      .catch(handleError);
  };

  const createFromPdfText = async (text: string) => {
    if (!isSignedIn) {
      const local = await createLocalFromText.mutateAsync(text);
      local.userId = 'anonymous';
      if (!local?.id)
        return handleError(new Error('Failed to create resume from PDF'));
      await createLocalResume(local);
      return handleSuccess(local, POSTHOG_EVENTS.RESUME_IMPORTED, {
        title: local.title,
      });
    }

    return createResumeFromText
      .mutateAsync(text)
      .then((res) =>
        handleSuccess(res, POSTHOG_EVENTS.RESUME_IMPORTED, { title: res.title })
      )
      .catch(handleError);
  };

  return {
    createFromPlaceholder,
    createFromPdfText,
    isPending:
      createResume.isPending ||
      createResumeFromText.isPending ||
      createLocalFromText.isPending,
  };
}

export default useResumeCreator;
