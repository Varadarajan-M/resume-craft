'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import useIdbResume from '../hooks/useIdbResume';
import useSyncResumesMutation from '../hooks/useSyncResumesMutation';

const useResumeSyncWithLocalDelete = () => {
  const userId = useAuth()?.userId;

  const { localResumes, deleteLocalResume, loading } = useIdbResume({
    enabled: !!userId,
  });

  const syncMutation = useSyncResumesMutation({});

  const count = localResumes.length;

  const hasLocalResumes = useMemo(() => {
    return !!userId && count > 0;
  }, [userId, count]);

  const syncResumes = useCallback(async () => {
    const previousCount = localResumes?.length;

    await syncMutation.mutateAsync(localResumes, {
      onSuccess: (data) => {
        let synced = 0;

        data?.forEach((resume) => {
          const local = localResumes.find((r) => r?.id === resume?.id);
          if (local) {
            deleteLocalResume(local.id);
            synced++;
          }
        });

        toast.success(
          `Synced ${synced}/${previousCount} resume${synced !== 1 ? 's' : ''}.`
        );
      },
      onError: (err) => {
        toast.error(`Sync failed: ${err.message}`);
      },
    });
  }, [localResumes, syncMutation, deleteLocalResume]);

  return {
    // state used by component
    count,
    hasLocalResumes,
    loading,
    isSyncing: syncMutation.isPending,
    syncResumes,
  };
};

export default useResumeSyncWithLocalDelete;
