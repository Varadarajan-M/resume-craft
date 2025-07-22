import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";
import ResumeSection from "../ResumeSection";
import PersonalInfoForm from "./PersonalInfoForm";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.personalInfo;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const PersonalInformationSection = () => {
  return (
    <ResumeSection {...sectionConfig}>
      <PersonalInfoForm />
    </ResumeSection>
  );
};

export default PersonalInformationSection;
