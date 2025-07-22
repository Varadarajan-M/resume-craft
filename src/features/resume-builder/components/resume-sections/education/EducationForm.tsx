"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { memo } from "react";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

const EducationForm = ({ id }: { id: string }) => {
  const education = useResumeStore((s) =>
    s.resume?.sections.education?.find((e) => e.id === id)
  );

  const handleUpdateEducationItem = useResumeStore(
    (s) => s.updateEducationItem
  );

  if (!education) return null;

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Institution" itemId={`${id}-institution`}>
        <Input
          value={education.institution}
          onChange={(e) =>
            handleUpdateEducationItem(id, { institution: e.target.value })
          }
          placeholder="e.g., Harvard University"
        />
      </ResumeItem>

      <ResumeItem label="Location" itemId={`${id}-location`}>
        <Input
          value={education.location}
          onChange={(e) =>
            handleUpdateEducationItem(id, { location: e.target.value })
          }
          placeholder="e.g., Austin, Texas"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem label="Field of Study" itemId={`${id}-field`}>
          <Input
            value={education.fieldOfStudy}
            onChange={(e) =>
              handleUpdateEducationItem(id, { fieldOfStudy: e.target.value })
            }
            placeholder="e.g., Computer Science"
          />
        </ResumeItem>

        <ResumeItem label="Time Period" itemId={`${id}-timePeriod`}>
          <Input
            value={education.timePeriod}
            onChange={(e) =>
              handleUpdateEducationItem(id, { timePeriod: e.target.value })
            }
            placeholder="e.g., 2019 – 2023"
          />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem label="GPA/Grade" itemId={`${id}-gpa`}>
        <Input
          value={education.gpa}
          onChange={(e) =>
            handleUpdateEducationItem(id, { gpa: e.target.value })
          }
          placeholder="e.g. 3.8/4.0"
        />
      </ResumeItem>

      <DescriptionEditor id={id} />
    </div>
  );
};

const DescriptionEditor = memo(({ id }: { id: string }) => {
  const description = useResumeStore(
    (s) =>
      s.resume?.sections.education?.find((e) => e.id === id)?.description || ""
  );
  const handleUpdateEducationItem = useResumeStore(
    (s) => s.updateEducationItem
  );

  return (
    <ResumeItem label="Description" itemId={`${id}-description`}>
      <RichTextEditor
        content={description}
        onChange={(v) => handleUpdateEducationItem(id, { description: v })}
        placeholder="e.g., Relevant coursework, honors, or extracurriculars."
      />
    </ResumeItem>
  );
});

export default EducationForm;
