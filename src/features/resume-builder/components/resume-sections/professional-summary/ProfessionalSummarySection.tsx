"use client";

import Tip from "@/shared/components/common/Tip";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { FileText } from "lucide-react";
import { useState } from "react";
import ResumeItem from "../ResumeItem";
import ResumeSection from "../ResumeSection";

const ProfessionalSummarySection = () => {
  const [professionalSummary, setProfessionalSummary] = useState("");

  return (
    <ResumeSection
      icon={<FileText className="w-4 h-4" />}
      title="Professional Summary"
      subtitle="A brief overview of your experience and strengths."
      defaultOpen
    >
      <ResumeItem itemId="professionalSummary" label={""}>
        <div className="flex flex-col gap-3">
          <RichTextEditor
            id="professionalSummary"
            content={professionalSummary}
            onChange={setProfessionalSummary}
            placeholder="e.g., Frontend engineer with 5+ years of experience crafting fast, accessible UIs..."
          />
          <Tip>
            Keep it focused and powerful — summarize your top skills,
            experience, and career direction in 2–3 sentences.
          </Tip>
        </div>
      </ResumeItem>
    </ResumeSection>
  );
};

export default ProfessionalSummarySection;
