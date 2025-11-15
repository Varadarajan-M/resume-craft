'use client';

import { cn } from '@/shared/lib/utils';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { useSelectToHighlightPdfText } from '../../hooks/useSelectToHighlightPdfText';
import { useResumeStore } from '../../store/resume';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import ResumeRenderer from './ResumeRenderer';

const Worker = dynamic(
  () => import('@react-pdf-viewer/core').then((mod) => mod.Worker),
  {
    ssr: false,
  }
);

interface ResumePreviewPanelProps {
  className?: string;
}

const ResumePreviewPanel = ({ className }: ResumePreviewPanelProps) => {
  const resume = useResumeStore((state) => state.resume);
  const [debouncedResume, setDebouncedResume] = useState(resume);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerId.current = setTimeout(() => {
      if (resume) {
        setDebouncedResume(resume);
      }
    }, 1000);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [resume]);

  const resumePreviewPanelRef = useSelectToHighlightPdfText();

  return (
    <div
      className={cn(
        'h-[calc(100dvh_-_56px)] max-w-screen md:max-w-[900px] md:max-h-full md:m-auto py-4 px-5 flex flex-col gap-4 overflow-y-auto',
        className
      )}
      ref={resumePreviewPanelRef}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <ResumeRenderer
          templateId={debouncedResume?.templateId || ''}
          resume={debouncedResume!}
        />
      </Worker>
    </div>
  );
};

export default ResumePreviewPanel;
