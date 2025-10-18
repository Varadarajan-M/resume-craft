import useUpdateResumeMutation from '@/features/documents/hooks/useUpdateResumeMutation';
import { useEffect, useRef } from 'react';
import { useResumeStore } from '../store/resume';

import { Resume } from '@/shared/types/resume';
import { useQueryClient } from '@tanstack/react-query';
import usePopulateLastViewedResumeFromStorage from './usePopulateLastViewedResumeFromStorage';

interface UseAutoSaveAndLoadResumeProps {
  onSave?: (resume: Resume) => void;
  onSaveError?: (error: Error) => void;
}

/**
 * Custom hook to handle auto-saving and loading of resumes.
 * It saves the resume to localStorage and updates the server periodically.
 */

const useAutoSaveAndLoadResume = ({
  onSave,
  onSaveError,
}: UseAutoSaveAndLoadResumeProps) => {
  const resume = useResumeStore((state) => state.resume);
  const queryClient = useQueryClient();

  // Populate last viewed resume from local storage
  usePopulateLastViewedResumeFromStorage();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const localStorageUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const saveResumeMutation = useUpdateResumeMutation({});

  // Auto-save the resume to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!resume) return;

    if (localStorageUpdateTimerRef.current) {
      clearTimeout(localStorageUpdateTimerRef.current);
    }
    localStorageUpdateTimerRef.current = setTimeout(() => {
      localStorage.setItem('resume', JSON.stringify(resume));
    }, 1000);

    return () => {
      if (localStorageUpdateTimerRef.current) {
        clearTimeout(localStorageUpdateTimerRef.current);
      }
    };
  }, [resume]);

  // Save every 2 seconds
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!resume?.id) return;

    timerRef.current = setTimeout(() => {
      if (resume?.id) {
        saveResumeMutation.mutateAsync(resume, {
          onSuccess: (data) => {
            queryClient.setQueriesData(
              {
                predicate: (query) => query.queryKey[0] === 'documents',
              },
              (oldData) => {
                if (Array.isArray(oldData)) {
                  const index = oldData.findIndex(
                    (doc) => doc?.id === data?.id
                  );
                  if (index !== -1) {
                    // Update existing resume
                    const newData = [...oldData];
                    newData[index] = data;
                    return newData;
                  } else {
                    // Add new resume
                    return [data, ...oldData];
                  }
                }
                return [data];
              }
            );
            onSave?.(data);
          },
          onError: onSaveError,
        });
      }
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  return null;
};

export default useAutoSaveAndLoadResume;
