import { User } from "lucide-react";
import ResumeSection from "../ResumeSection";
import PersonalInfoForm from "./PersonalInfoForm";

const PersonalInformationSection = () => {
  return (
    <ResumeSection
      icon={<User className="w-4 h-4" />}
      title="Personal Information"
      subtitle="Basic contact details and personal info."
      defaultOpen
    >
      <PersonalInfoForm />
    </ResumeSection>
  );
};

export default PersonalInformationSection;
