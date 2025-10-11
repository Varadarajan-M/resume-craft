"use client";

import type { Resume } from "@/shared/types/resume";
import React, { memo } from "react";
import PageSkeleton from "./PreviewSkeleton";

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
      default: module.default,
    }))
  ),
  standard: React.lazy(() =>
    import("@/features/pdf-templates/resume/standard").then((module) => ({
      default: module.default,
    }))
  ),
};

const ResumeRenderer = ({ templateId, resume }: ResumeRendererProps) => {
  const Component =
    RESUME_TEMPLATE_MAPPING?.[templateId] ||
    RESUME_TEMPLATE_MAPPING["clean-minimal"];

  if (!resume || !Component) return <PageSkeleton />;

  return (
    <React.Suspense fallback={<PageSkeleton />}>
      <Component resume={resume} />
    </React.Suspense>
  );
};

export default memo(ResumeRenderer);
