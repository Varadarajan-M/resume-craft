import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createResumeWithTextContentAction,
  getResumeFromTextContentAction,
} from '@/backend/actions/ai';

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

    onError: (error) => {
      props.onError?.(error);
    },
  });

  return mutation;
};

const getResumeFromTextContentMutation = async (textContent: string) => {
  const res = await getResumeFromTextContentAction(textContent);

  return res;
};

export const useCreateLocalResumeFromTextMutation = () => {
  const mutation = useMutation({
    mutationFn: getResumeFromTextContentMutation,
  });

  return mutation;
};

export default useCreateResumeFromTextMutation;
