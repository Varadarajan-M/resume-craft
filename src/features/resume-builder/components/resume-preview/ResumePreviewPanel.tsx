"use client";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  {
    ssr: false,
  }
);

import { cn } from "@/shared/lib/utils";
import dynamic from "next/dynamic";
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
        "h-[calc(100dvh_-_56px)] max-w-screen md:max-w-[800px] md:max-h-full md:m-auto py-4 px-5 flex flex-col gap-4 overflow-y-auto",
        className
      )}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <ResumeRenderer templateId={resume?.templateId!} resume={resume!} />
      </Worker>
    </div>
  );
};

export default ResumePreviewPanel;
