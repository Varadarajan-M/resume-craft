'use client';

import { createBulkResumesAction } from '@/backend/actions/resume';
import { Resume } from '@/shared/types/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationFn = async (resumes: Resume[]) => {
  const res = await createBulkResumesAction(resumes);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to create resumes');
  }

  return res.data;
};

interface UseCreateResumeMutationParams {
  onSuccess?: (data: Resume[]) => void;
  onError?: (error: Error) => void;
}

const useSyncResumesMutation = ({
  onSuccess,
  onError,
}: UseCreateResumeMutationParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: mutationFn,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'documents',
      });
      onSuccess?.(data || []);
    },
    onError: (error) => {
      onError?.(error as Error);
    },
  });

  return mutation;
};

export default useSyncResumesMutation;
