import { createResumeAction } from '@/backend/actions/resume';
import { Resume } from '@/shared/types/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationFn = async (resume: Resume) => {
  const res = await createResumeAction(resume);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to create resume');
  }

  return res.data;
};

interface UseCreateResumeMutationParams {
  onSuccess?: (data: Resume) => void;
  onError?: (error: Error) => void;
}

const useCreateResumeMutation = (props: UseCreateResumeMutationParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,

    // --- OPTIMISTIC UPDATE ---
    onMutate: async (newResume: Resume) => {
      // Cancel any outgoing refetches for document-related queries
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'documents',
      });

      // Snapshot all documents-related queries
      const previousDocuments = queryClient.getQueriesData<Resume[]>({
        predicate: (query) => query.queryKey[0] === 'documents',
      });

      // Optimistically update each relevant query
      queryClient.setQueriesData<Resume[]>(
        { predicate: (query) => query.queryKey[0] === 'documents' },
        (old) => (Array.isArray(old) ? [newResume, ...old] : [newResume])
      );

      // Return context for rollback
      return { previousDocuments };
    },

    // --- SUCCESS ---
    onSuccess: (data) => {
      props.onSuccess?.(data);

      // Replace optimistic resume with the actual data
      queryClient.setQueriesData<Resume[]>(
        { predicate: (query) => query.queryKey[0] === 'documents' },
        (old) => {
          if (!Array.isArray(old)) return [data];
          return old.map((doc) => (doc.id === data.id ? data : doc));
        }
      );
    },

    // --- ERROR / ROLLBACK ---
    onError: (error, _variables, context) => {
      console.error('Error creating resume:', error);
      props.onError?.(error);

      // Restore all previous document queries from the snapshot
      if (context?.previousDocuments) {
        for (const [queryKey, oldData] of context.previousDocuments) {
          queryClient.setQueryData(queryKey, oldData);
        }
      }
    },
  });

  return mutation;
};

export default useCreateResumeMutation;
