"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";

import { Input } from "@/shared/components/ui/input";

import AddNewButton from "../AddNewItemButton";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

import { ResumeLinkInput } from "@/shared/components/common/ResumeLinkInput";
import { getUniqId } from "@/shared/lib/utils";
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

      <UserLinks />
    </>
  );
};

const UserLinks = () => {
  const links = useResumeStore((s) => s.resume?.sections?.personalInfo?.links);
  const update = useResumeStore((s) => s.updatePersonalInfoField);

  const handleAddLink = () => {
    const newLink = {
      id: getUniqId(),
      label: "",
      url: "",
      iconName: "",
    };
    update("links", [...(links || []), newLink]);
  };

  const handleLinkChange = (
    id: string,
    field: "label" | "url" | "iconName",
    value: string
  ) => {
    const updatedLinks = links?.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    update("links", updatedLinks || []);
  };

  const handleLinkRemove = (id: string) => {
    const updatedLinks = links?.filter((link) => link.id !== id);
    update("links", updatedLinks || []);
  };

  return (
    <ResumeItem itemId="urls" label="Your Links">
      <div className="md:space-y-4 space-y-6">
        {links?.map((link) => (
          <ResumeLinkInput
            id={link?.id}
            label={link?.label}
            url={link?.url}
            iconName={link?.iconName}
            onChange={handleLinkChange}
            onRemove={handleLinkRemove}
          />
        ))}
        <AddNewButton label="Add Link" onClick={handleAddLink} />
      </div>
    </ResumeItem>
  );
};

export default PersonalInfoForm;
