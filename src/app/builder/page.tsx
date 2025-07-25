"use client";

import {
  ResumeBuilderNavbar,
  ResumeSectionQuickNavigationPanel,
  ResumeSectionsPanel,
} from "@/features/resume-builder";
import dynamic from "next/dynamic";

const ResumePreviewPanel = dynamic(
  () =>
    import("@/features/resume-builder/components/resume-preview").then(
      (mod) => mod.ResumePreviewPanel
    ),
  {
    ssr: false,
  }
);
const ResumeBuilderPage = () => {
  return (
    <section
      id="builder"
      className="bg-background w-full h-dvh flex flex-col transition-all duration-200 overflow-hidden"
    >
      <ResumeBuilderNavbar />
      <div className="flex-1 flex items-center-safe">
        <ResumeSectionQuickNavigationPanel />
        <ResumeSectionsPanel className="basis-full lg:basis-[28%]" />
        <ResumePreviewPanel className="flex-1 " />
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
