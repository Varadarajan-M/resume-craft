'use client';

import {
  AutoSaveAndLoadResume,
  ResumeBuilderNavbar,
  ResumeConfigPanel,
  ResumeSectionQuickNavigationPanel,
  ResumeSectionsPanel,
} from '@/features/resume-builder';
import CreateResumeFromSearchParams from '@/features/resume-builder/components/CreateResumeFromSearchParams';
import PageSkeleton from '@/features/resume-builder/components/resume-preview/PreviewSkeleton';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import { cn } from '@/shared/lib/utils';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const ResumePreviewPanel = dynamic(
  () =>
    import('@/features/resume-builder/components/resume-preview').then(
      (mod) => mod.ResumePreviewPanel
    ),
  {
    ssr: false,
    loading: () => (
      <PageSkeleton className="h-[90dvh] w-[80%] m-5 opacity-65" />
    ),
  }
);

enum ResumeBuilderSection {
  Sections = 'Sections',
  Preview = 'Preview',
  Settings = 'Settings',
}

const ResumeBuilderPage = () => {
  const [activeSection, setActiveSection] =
    useState<ResumeBuilderSection | null>(ResumeBuilderSection.Preview);

  return (
    <section
      id="builder"
      className="bg-background relative w-full h-dvh flex flex-col transition-all duration-200 overflow-hidden"
    >
      <Suspense fallback={null}>
        <CreateResumeFromSearchParams />
      </Suspense>
      <AutoSaveAndLoadResume />
      <ResumeBuilderNavbar />
      <div className="flex-1 flex items-center-safe w-full ">
        <ResumeSectionQuickNavigationPanel />
        <ResumeSectionsPanel
          className={cn('basis-full lg:flex md:border-r lg:basis-[25%]', {
            hidden: activeSection !== ResumeBuilderSection.Sections,
          })}
        />
        <ResumePreviewPanel
          className={cn('flex-1 lg:flex', {
            hidden: activeSection !== ResumeBuilderSection.Preview,
          })}
        />
        <ResumeConfigPanel
          className={cn(
            'lg:block lg:basis-[24%] md:border-l lg:max-w-[400px]  w-full',
            {
              hidden: activeSection !== ResumeBuilderSection.Settings,
            }
          )}
        />

        <FadeIn
          as="footer"
          className="absolute flex flex-row lg:hidden justify-center gap-4 items-center bottom-20 left-1/2 -translate-x-1/2 text-sm shadow-sm px-4 py-2 rounded-full bg-background backdrop-blur-lg"
        >
          {['Sections', 'Preview', 'Settings'].map((section) => (
            <button
              key={section}
              className={`px-3 py-1 rounded-lg text-xs ${
                activeSection === section ? 'bg-foreground text-background' : ''
              }`}
              onClick={() =>
                setActiveSection(
                  activeSection === section ? null : (section as any)
                )
              }
            >
              {section}
            </button>
          ))}
        </FadeIn>
      </div>
    </section>
  );
};

export default ResumeBuilderPage;
