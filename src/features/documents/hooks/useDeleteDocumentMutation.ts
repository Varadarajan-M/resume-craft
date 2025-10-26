import { deleteResumeAction } from '@/backend/actions/resume';
import { Resume } from '@/shared/types/resume';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationFn = async (id: string) => {
  const res = await deleteResumeAction(id);

  console.log('Delete resume action response:', res);

  if (!res?.success) {
    throw new Error((res?.error as string) || 'Failed to delete resume');
  }

  return res.success;
};

interface UseDeleteResumeMutationParams {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const useDeleteResumeMutation = (props: UseDeleteResumeMutationParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    // --- OPTIMISTIC UPDATE ---
    onMutate: async (id: string) => {
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
        (old) => (Array.isArray(old) ? old.filter((doc) => doc.id !== id) : [])
      );

      // Return context for rollback
      return { previousDocuments };
    },

    // --- SUCCESS ---
    onSuccess: () => {
      props.onSuccess?.();

      // Replace optimistic resume with the actual data
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'documents',
      });
    },

    // --- ERROR / ROLLBACK ---
    onError: (error, _variables, context) => {
      console.error('Error deleting resume:', error);
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

export default useDeleteResumeMutation;
