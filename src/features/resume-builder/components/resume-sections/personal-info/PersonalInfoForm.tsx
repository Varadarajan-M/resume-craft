import { Input } from "@/shared/components/ui/input";
import { ResumePersonalInfoItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

interface PersonalInfoFormProps {
  personalInfo: ResumePersonalInfoItem;
  onPersonalInfoChange: <T>(
    key: keyof ResumePersonalInfoItem,
    value: T
  ) => void;
}

const PersonalInfoForm = ({
  personalInfo,
  onPersonalInfoChange,
}: PersonalInfoFormProps) => {
  return (
    <>
      <ResumeItem itemId="fullName" label="Full name">
        <Input
          value={personalInfo?.fullName}
          id="fullName"
          onChange={(e) => onPersonalInfoChange("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </ResumeItem>

      <ResumeItem itemId="headline" label="Headline">
        <Input
          id="headline"
          value={personalInfo?.headline}
          onChange={(e) => onPersonalInfoChange("headline", e.target.value)}
          placeholder="Principal Software Engineer."
        />
      </ResumeItem>

      <ResumeItem
        itemId="email"
        label="Email Address"
        description="Use a professional email address for job applications."
      >
        <Input
          required
          id="email"
          value={personalInfo?.email}
          onChange={(e) => onPersonalInfoChange("email", e.target.value)}
          type="email"
          placeholder="johndoe@example.com"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem itemId="phone" label="Phone Number">
          <Input
            required
            id="phone"
            value={personalInfo?.phone}
            onChange={(e) => onPersonalInfoChange("phone", e.target.value)}
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </ResumeItem>

        <ResumeItem itemId="location" label="Location">
          <Input
            id="location"
            value={personalInfo?.location}
            onChange={(e) => onPersonalInfoChange("location", e.target.value)}
            placeholder="City, State"
          />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem itemId="website" label="Website/Portfolio">
        <Input
          id="website"
          value={personalInfo?.website?.url || ""}
          onChange={(e) =>
            onPersonalInfoChange("website", {
              label: "Portfolio",
              url: e.target.value,
            })
          }
          type="url"
          placeholder="https://yourportfolio.com"
        />
      </ResumeItem>
    </>
  );
};

export default PersonalInfoForm;
