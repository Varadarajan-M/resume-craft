"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";

const ProfessionalSummaryEditor = () => {
  const content = useResumeStore(
    (s) => s.resume?.sections?.summary?.content || ""
  );
  const update = useResumeStore((s) => s.updateSummary);

  return (
    <RichTextEditor
      className="mx-0.5"
      content={content}
      onChange={update}
      placeholder="Write a short paragraph summarizing your key strengths, experience, and goals..."
    />
  );
};

export default ProfessionalSummaryEditor;
