'use client';

import { usePosthog } from '@/shared/hooks/usePosthog';
import { POSTHOG_EVENTS } from '@/shared/lib/constants';
import { getPlaceholderResume } from '@/shared/lib/resume';
import { DocumentTemplate } from '@/shared/types/document';
import { useAuth } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useResumeStore } from '../store/resume';

const useCreateResumeFromSearchParams = () => {
  const setResume = useResumeStore((state) => state.setResume);
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  const isNew = searchParams.get('new') === 'true';
  const userId = useAuth()?.userId;

  const { captureEvent } = usePosthog();

  const router = useRouter();

  useLayoutEffect(() => {
    if (isNew && templateId) {
      const template = {
        id: templateId,
      };

      const newResume = getPlaceholderResume(
        userId!,
        template as DocumentTemplate
      );

      setResume(newResume);

      captureEvent(POSTHOG_EVENTS.RESUME_CREATED, {
        templateId,
      });

      // Clean up the URL by removing query parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('new');
      url.searchParams.delete('templateId');
      router.replace(url.toString());
    }
  }, [userId, isNew, templateId, router, setResume]);

  return null;
};

export default useCreateResumeFromSearchParams;
