import { Input } from "@/shared/components/ui/input";
import { User } from "lucide-react";
import ResumeItem from "../ResumeItem";
import ResumeSection from "../ResumeSection";
import TwoItemGrid from "../TwoItemGrid";

const PersonalInformationSection = () => {
  return (
    <ResumeSection
      icon={<User className="w-4 h-4" />}
      title="Personal Information"
      subtitle="Basic contact details and personal info."
      defaultOpen
    >
      <ResumeItem itemId="fullName" label="Full name">
        <Input id="fullName" placeholder="John Doe" />
      </ResumeItem>

      <ResumeItem itemId="headline" label="Headline">
        <Input id="headline" placeholder="Principal Software Engineer." />
      </ResumeItem>

      <ResumeItem
        itemId="email"
        label="Email Address"
        description="Use a professional email address for job applications."
      >
        <Input
          required
          id="email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem itemId="phone" label="Phone Number">
          <Input
            required
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </ResumeItem>

        <ResumeItem itemId="location" label="Location">
          <Input id="location" placeholder="City, State" />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem itemId="website" label="Website/Portfolio">
        <Input
          id="website"
          type="url"
          placeholder="https://yourportfolio.com"
        />
      </ResumeItem>
    </ResumeSection>
  );
};

export default PersonalInformationSection;
