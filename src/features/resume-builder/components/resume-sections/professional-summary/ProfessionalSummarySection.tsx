"use client";

import Tip from "@/shared/components/common/Tip";
import { FileText } from "lucide-react";
import ResumeSection from "../ResumeSection";
import ProfessionalSummaryEditor from "./ProfessionalSummaryEditor";

const ProfessionalSummarySection = () => {
  return (
    <ResumeSection
      icon={<FileText className="w-4 h-4" />}
      title="Professional Summary"
      subtitle="A brief overview of your professional background and strengths."
      defaultOpen
    >
      <ProfessionalSummaryEditor />

      <Tip>
        Write a concise summary of your professional experience, skills, and
        career goals. Aim for 2–3 sentences max. Keep it clean, keyword-rich,
        and focused.
      </Tip>
    </ResumeSection>
  );
};

export default ProfessionalSummarySection;
