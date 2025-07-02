"use client";

import { cn } from "@/shared/lib/utils";
import { useResumeStore } from "../../store/resume";
import ResumeRenderer from "../resume-renderer/ResumeRenderer";

interface ResumePreviewPanelProps {
  className?: string;
}

const ResumePreviewPanel = ({ className }: ResumePreviewPanelProps) => {
  const resume = useResumeStore((state) => state.resume);

  return (
    <div
      className={cn(
        "md:h-[calc(100dvh_-_56px)] max-w-screen md:max-w-[800px] h-[555px] md:max-h-full md:m-auto py-4 px-5 flex flex-col gap-4 overflow-y-auto",
        className
      )}
    >
      <ResumeRenderer templateId={resume?.templateId!} resume={resume!} />
    </div>
  );
};

export default ResumePreviewPanel;
