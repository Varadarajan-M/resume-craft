"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import { Languages as LanguagesIcon } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import LanguageItem from "./LanguageItem";

const LanguageSection = () => {
  const languages = useResumeStore((s) => s.resume?.sections.languages ?? []);
  const handleAddLanguage = useResumeStore((s) => s.addLanguageItem);

  return (
    <ResumeSection
      icon={<LanguagesIcon className="w-4 h-4" />}
      title="Languages"
      subtitle="List the languages you know and your proficiency level."
      defaultOpen
    >
      <div className="flex flex-col gap-6">
        {languages.map((lang) => (
          <LanguageItem key={lang.id} id={lang.id} />
        ))}

        <AddNewButton
          className="ml-1"
          onClick={handleAddLanguage}
          label="Add Language"
        />

        <Tip>
          Include languages you're confident using in a professional context.
        </Tip>
      </div>
    </ResumeSection>
  );
};

export default LanguageSection;
