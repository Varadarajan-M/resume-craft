"use client";

import Tip from "@/shared/components/common/Tip";
import { ResumeLanguageItem } from "@/shared/types/resume";
import { Languages as LanguagesIcon } from "lucide-react";
import { useState } from "react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import LanguageItem from "./LanguageItem";

const LanguageSection = () => {
  const [languages, setLanguages] = useState<ResumeLanguageItem[]>([
    {
      id: `lang-${Math.random().toString().substring(1, 9)}`,
      language: "English",
      proficiency: "Fluent",
    },
  ]);

  const handleUpdateLanguage = (
    index: number,
    field: keyof ResumeLanguageItem,
    value: string
  ) => {
    setLanguages((prev) =>
      prev.map((lang, i) => (i === index ? { ...lang, [field]: value } : lang))
    );
  };

  const handleAddLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      {
        id: `lang-${Math.random().toString().substring(1, 9)}`,
        language: "",
        proficiency: "Fluent",
      },
    ]);
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ResumeSection
      icon={<LanguagesIcon className="w-4 h-4" />}
      title="Languages"
      subtitle="List the languages you know and your proficiency level."
      defaultOpen
    >
      <div className="flex flex-col gap-6">
        {languages.map((lang, index) => (
          <LanguageItem
            key={index}
            index={index}
            language={lang}
            onUpdate={handleUpdateLanguage}
            onRemove={handleRemoveLanguage}
          />
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
