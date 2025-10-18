import { createResumeAction } from '@/backend/actions/resume';
import { Resume } from '@/shared/types/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationFn = async (resume: Resume) => {
  const res = await createResumeAction(resume);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to create resume');
  }

  return res?.data;
};

interface UseCreateResumeMutationParams {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

const useCreateResumeMutation = (props: UseCreateResumeMutationParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Optionally handle success, e.g., show a toast or redirect
      props.onSuccess?.(data);
      // Update the 'documents' query data to include the newly created resume
      queryClient.setQueriesData(
        {
          predicate: (query) => {
            return query.queryKey[0] === 'documents';
          },
        },
        (oldData) => {
          if (Array.isArray(oldData)) {
            return [data, ...oldData];
          }
          return [data];
        }
      );
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error('Error creating resume:', error);
      props.onError?.(error);
    },
  });
  return mutation;
};

export default useCreateResumeMutation;
