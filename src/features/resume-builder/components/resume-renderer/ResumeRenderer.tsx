"use client";

import type { Resume } from "@/shared/types/resume";
import React, { memo } from "react";

interface ResumeRendererProps {
  templateId: string;
  resume: Resume;
}

const RESUME_TEMPLATE_MAPPING: Record<
  string,
  React.ComponentType<Pick<ResumeRendererProps, "resume">>
> = {
  "clean-minimal": React.lazy(() =>
    import("@/features/pdf-templates/resume/clean-minimal").then((module) => ({
      default: module.CleanMinimalResumeTemplate,
    }))
  ),
  creative: React.lazy(() =>
    import("@/features/pdf-templates/resume/creative").then((module) => ({
      default: module.CreativeResumeTemplate,
    }))
  ),
};

const PageSkeleton = () => (
  <div className="flex items-center bg-white rounded-lg w-[2480px] shadow-2xl justify-center h-[3508px] p-8">
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ResumeRenderer = ({ templateId, resume }: ResumeRendererProps) => {
  const Component =
    RESUME_TEMPLATE_MAPPING?.[templateId] ||
    RESUME_TEMPLATE_MAPPING["clean-minimal"];

  return (
    <React.Suspense fallback={<PageSkeleton />}>
      <Component resume={resume} />
    </React.Suspense>
  );
};

export default memo(ResumeRenderer);
