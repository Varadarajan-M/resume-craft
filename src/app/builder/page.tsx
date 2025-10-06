"use client";

import {
  AutoSaveAndLoadResume,
  ResumeBuilderNavbar,
  ResumeConfigPanel,
  ResumeSectionQuickNavigationPanel,
  ResumeSectionsPanel,
} from "@/features/resume-builder";
import PageSkeleton from "@/features/resume-builder/components/resume-preview/PreviewSkeleton";
import dynamic from "next/dynamic";

const ResumePreviewPanel = dynamic(
  () =>
    import("@/features/resume-builder/components/resume-preview").then(
      (mod) => mod.ResumePreviewPanel
    ),
  {
    ssr: false,
    loading: () => (
      <PageSkeleton className="h-[90dvh] w-[80%] m-5 opacity-65" />
    ),
  }
);
const ResumeBuilderPage = () => {
  return (
    <section
      id="builder"
      className="bg-background w-full h-dvh flex flex-col transition-all duration-200 overflow-hidden"
    >
      <AutoSaveAndLoadResume />
      <ResumeBuilderNavbar />
      <div className="flex-1 flex items-center-safe w-full ">
        <ResumeSectionQuickNavigationPanel />
        <ResumeSectionsPanel className="basis-full md:border-r lg:basis-[25%]" />
        <ResumePreviewPanel className="flex-1 " />
        <ResumeConfigPanel className="hidden lg:block basis-[24%] md:border-l max-w-[400px] w-full" />
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
