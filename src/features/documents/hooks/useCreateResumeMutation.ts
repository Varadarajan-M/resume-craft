import { createResumeAction } from "@/backend/actions/resume";
import { Resume } from "@/shared/types/resume";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFn = async (resume: Resume) => {
  const res = await createResumeAction(resume);

  if (!res?.success) {
    throw new Error((res?.error as string) || "Failed to create resume");
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
      console.log("Resume created successfully:", data);
      props.onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      }); // Invalidate documents query to refresh the list
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Error creating resume:", error);
      props.onError?.(error);
    },
  });
  return mutation;
};

export default useCreateResumeMutation;
