import useUpdateResumeMutation from '@/features/documents/hooks/useUpdateResumeMutation';
import { useEffect, useRef } from 'react';
import { useResumeStore } from '../store/resume';

import useIdbResume from '@/features/documents/hooks/useIdbResume';
import { Resume } from '@/shared/types/resume';
import { useAuth } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';

interface UseAutoSaveAndLoadResumeProps {
  onSave?: (resume: Resume) => void;
  onSaveError?: (error: Error) => void;
}

/**
 * Custom hook to handle auto-saving of resumes.
 * It saves the resume to localStorage and updates the server periodically.
 */

const useAutoSaveResume = ({
  onSave,
  onSaveError,
}: UseAutoSaveAndLoadResumeProps) => {
  const resume = useResumeStore((state) => state.resume);
  const queryClient = useQueryClient();
  const isSignedIn = useAuth()?.isSignedIn;
  const { upsertLocalResume } = useIdbResume({
    enabled: !isSignedIn,
  });

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
      localStorage.setItem('resume-craft:resume', JSON.stringify(resume));
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
      if (!resume.id) return;
      if (isSignedIn) {
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
      } else {
        // For unsigned users, update in indexedDB or local state if needed
        upsertLocalResume(resume)
          .then(() => {
            onSave?.(resume);
          })
          .catch((error) => {
            onSaveError?.(error);
          });
      }
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume, isSignedIn]);

  return null;
};

export default useAutoSaveResume;
