import { updateResumeAction } from "@/backend/actions/resume";
import { Resume } from "@/shared/types/resume";
import { useMutation } from "@tanstack/react-query";

const mutationFn = async (resume: Resume) => {
  const res = await updateResumeAction(resume?.id, resume);

  if (!res?.success) {
    throw new Error((res?.error as string) || "Failed to save resume");
  }

  return res?.data;
};

interface UseCreateResumeMutationParams {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

const useUpdateResumeMutation = (props: UseCreateResumeMutationParams) => {
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Optionally handle success, e.g., show a toast or redirect
      props.onSuccess?.(data);
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Error creating resume:", error);
      props.onError?.(error);
    },
  });
  return mutation;
};

export default useUpdateResumeMutation;
