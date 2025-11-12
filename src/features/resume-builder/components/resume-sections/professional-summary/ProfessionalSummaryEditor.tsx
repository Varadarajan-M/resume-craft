'use client';

import { useResumeStore } from '@/features/resume-builder/store/resume';
import RichTextEditor from '@/shared/components/ui/rich-text-editor';
import EnhanceWithAI from '../../EnhanceWithAI';

const ProfessionalSummaryEditor = () => {
  const content = useResumeStore(
    (s) => s.resume?.sections?.summary?.content || ''
  );
  const update = useResumeStore((s) => s.updateSummary);

  const contentToEnhance = `Improve the following professional summary to make it concise, confident, and achievement-focused. Keep it under 3 sentences:\n\n${content}`;

  return (
    <EnhanceWithAI
      content={contentToEnhance}
      onEnhance={update}
      enhanceDialogTitle="Enhance Summary with AI"
    >
      <RichTextEditor
        className="mx-0.5"
        content={content}
        onChange={update}
        placeholder="Write a short paragraph summarizing your key strengths, experience, and goals..."
      />
    </EnhanceWithAI>
  );
};

export default ProfessionalSummaryEditor;
