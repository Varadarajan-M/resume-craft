"use client";

import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { type ResumeEducationItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";
import TwoItemGrid from "../TwoItemGrid";

interface EducationFormProps {
  education: ResumeEducationItem;
  onEducationChange: (key: keyof ResumeEducationItem, value: string) => void;
}

const EducationForm = ({
  education,
  onEducationChange,
}: EducationFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <ResumeItem
        label="Institution"
        itemId={`${education?.id}-institution`}
        className="p-0"
      >
        <Input
          value={education.institution}
          onChange={(e) => onEducationChange("institution", e.target.value)}
          id={`${education?.id}-institution`}
          placeholder="e.g., Harvard University"
        />
      </ResumeItem>

      <TwoItemGrid>
        <ResumeItem
          label="Field of Study"
          itemId={`${education}-field`}
          className="p-0"
        >
          <Input
            value={education.fieldOfStudy}
            onChange={(e) => onEducationChange("fieldOfStudy", e.target.value)}
            id={`${education.id}-field`}
            placeholder="e.g., Masters in Computer Science"
          />
        </ResumeItem>

        <ResumeItem
          label="Time Period"
          itemId={`${education}-timePeriod`}
          className="p-0"
        >
          <Input
            value={education.timePeriod}
            onChange={(e) => onEducationChange("timePeriod", e.target.value)}
            id={`${education.id}-timePeriod`}
            placeholder="e.g., March 2021 - Present"
          />
        </ResumeItem>
      </TwoItemGrid>

      <ResumeItem label="GPA/Grade" itemId={`${education}-gpa`} className="p-0">
        <Input
          value={education.gpa}
          onChange={(e) => onEducationChange("gpa", e.target.value)}
          id={`${education.id}-gpa`}
          placeholder="e.g. 3.8/4.0, First Class Honors, etc."
        />
      </ResumeItem>

      <ResumeItem
        itemId={`${education}-description`}
        label="Description"
        className="p-0"
      >
        <RichTextEditor
          content={education.description}
          onChange={(v) => onEducationChange("description", v)}
          id={`${education.id}-description`}
          placeholder="e.g., Relevant coursework, honors, or extracurricular activities."
        />
      </ResumeItem>
    </div>
  );
};

export default EducationForm;
