"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { getPlaceholderResume } from "@/shared/lib/resume";
import { Resume } from "@/shared/types/resume";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useCreateResumeMutation from "../hooks/useCreateResumeMutation";

const CreateResumeButton = () => {
  const mutation = useCreateResumeMutation({});
  const userId = useAuth()?.userId;
  const router = useRouter();

  const setResume = useResumeStore((state) => state.setResume);

  const handleClick = async () => {
    if (!userId) return;

    await mutation.mutateAsync(getPlaceholderResume(userId), {
      onSuccess: (data: Resume) => {
        toast.success("Resume created successfully!");
        setResume(data);
        router.push(`/builder`);
      },
      onError: (error) => {
        toast.error(`Failed to create resume: ${error.message}`);
      },
    });
  };

  return (
    <Button
      variant={"default"}
      size={"sm"}
      className="flex items-center gap-1 cursor-pointer"
      onClick={handleClick}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <Plus className="h-3 w-3" />
      )}

      <span className="text-xs font-medium">Create New Resume</span>
    </Button>
  );
};

export default CreateResumeButton;
