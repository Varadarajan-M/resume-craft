import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createResumeWithTextContentAction } from '@/backend/actions/ai';

import type { Resume } from '@/shared/types/resume';

const mutationFn = async (content: string) => {
  const res = await createResumeWithTextContentAction(content);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to create resume');
  }

  return res.data;
};

interface UseCreateResumeFromTextMutationParams {
  onSuccess?: (data: Resume) => void;
  onError?: (error: Error) => void;
}

const useCreateResumeFromTextMutation = (
  props: UseCreateResumeFromTextMutationParams
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,

    onSuccess: (data) => {
      props.onSuccess?.(data);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'documents',
      });
    },

    onError: (error, _variables, context) => {
      props.onError?.(error);
    },
  });

  return mutation;
};

export default useCreateResumeFromTextMutation;
