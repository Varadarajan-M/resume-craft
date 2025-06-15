"use client";
import { ResumePersonalInfoItem } from "@/shared/types/resume";
import { User } from "lucide-react";
import { useState } from "react";
import ResumeSection from "../ResumeSection";
import PersonalInfoForm from "./PersonalInfoForm";

const PersonalInformationSection = () => {
  const [personalInfo, setPersonalInfo] = useState<ResumePersonalInfoItem>(
    {} as ResumePersonalInfoItem
  );

  const handlePersonalInfoChange = <T,>(
    key: keyof ResumePersonalInfoItem,
    value: T
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ResumeSection
      icon={<User className="w-4 h-4" />}
      title="Personal Information"
      subtitle="Basic contact details and personal info."
      defaultOpen
    >
      <PersonalInfoForm
        personalInfo={personalInfo}
        onPersonalInfoChange={handlePersonalInfoChange}
      />
    </ResumeSection>
  );
};

export default PersonalInformationSection;
