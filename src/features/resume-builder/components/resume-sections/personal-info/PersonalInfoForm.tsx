"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";

import { Input } from "@/shared/components/ui/input";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

import type { ResumePersonalInfoItem } from "@/shared/types/resume";

const PersonalInfoForm = () => {
  const personalInfo = useResumeStore(
    (s) => s.resume?.sections?.personalInfo as ResumePersonalInfoItem
  );
  const update = useResumeStore((s) => s.updatePersonalInfoField);

  return (
    <>
      <ResumeItem itemId="fullName" label="Full Name">
        <Input
          id="fullName"
          value={personalInfo?.fullName || ""}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="John Doe"
        />
      </ResumeItem>

      <ResumeItem itemId="headline" label="Headline">
        <Input
          id="headline"
          value={personalInfo?.headline || ""}
          onChange={(e) => update("headline", e.target.value)}
          placeholder="Principal Software Engineer"
        />
      </ResumeItem>

      <ResumeItem
        itemId="email"
        label="Email Address"
        description="Use a professional email address for job applications."
      >
        <Input
          id="email"
          value={personalInfo?.email || ""}
          onChange={(e) => update("email", e.target.value)}
          placeholder="johndoe@example.com"
          type="email"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem itemId="phone" label="Phone Number">
          <Input
            id="phone"
            value={personalInfo?.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            type="tel"
          />
        </ResumeItem>

        <ResumeItem itemId="location" label="Location">
          <Input
            id="location"
            value={personalInfo?.location || ""}
            onChange={(e) => update("location", e.target.value)}
            placeholder="City, State"
          />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem itemId="website" label="Website/Portfolio">
        <Input
          id="website"
          value={personalInfo?.website?.url || ""}
          onChange={(e) =>
            update("website", {
              label: personalInfo?.website?.label ?? "Website",
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
