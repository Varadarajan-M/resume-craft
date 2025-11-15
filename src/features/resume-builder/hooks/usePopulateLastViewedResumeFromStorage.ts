import { safeJsonParse } from '@/shared/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { useLayoutEffect } from 'react';
import { useResumeStore } from '../store/resume';

const usePopulateLastViewedResumeFromStorage = () => {
  const resume = useResumeStore((state) => state.resume);

  const userId = useAuth()?.userId;
  const setResume = useResumeStore((state) => state.setResume);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const storedResume = localStorage.getItem('resume-craft:resume');
    const parsedResume = safeJsonParse<typeof resume>(storedResume);

    // Ensure the stored resume belongs to the current user
    // This is important to prevent loading resumes from other users
    if (
      parsedResume?.userId !== userId &&
      parsedResume?.userId !== 'anonymous'
    ) {
      localStorage.removeItem('resume');
      return;
    }

    // If the resume is not set in the store, set it from localStorage
    if (!resume?.id) setResume(parsedResume!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume, userId]);
};

export default usePopulateLastViewedResumeFromStorage;
