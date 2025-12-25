import { useWorkExperience } from "@/features/resume-builder/hooks/useWorkExperience";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import EnhanceWithAI from "../../EnhanceWithAI";
import ResumeItem from "../ResumeItem";

interface WorkExperienceFormProps {
  /** The unique ID of the work experience item to edit. */
  id: string;
}

/**
 * Component for editing work experience details (title, company, location, duration).
 */
const WorkExperienceForm = ({ id }: WorkExperienceFormProps) => {
  const { experience, updateField } = useWorkExperience(id);

  if (!experience) return null;

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Job Title" itemId={`${id}-title`}>
        <Input
          value={experience.title}
          onChange={(e) => updateField({ title: e.target.value })}
          placeholder="e.g., Frontend Engineer"
        />
      </ResumeItem>

      <ResumeItem label="Company" itemId={`${id}-company`}>
        <Input
          value={experience.company}
          onChange={(e) => updateField({ company: e.target.value })}
          placeholder="e.g., OpenAI"
        />
      </ResumeItem>

      <ResumeItem label="Location" itemId={`${id}-location`}>
        <Input
          value={experience.location}
          onChange={(e) => updateField({ location: e.target.value })}
          placeholder="e.g., Austin, Texas"
        />
      </ResumeItem>

      <ResumeItem label="Duration" itemId={`${id}-duration`}>
        <Input
          value={experience.timePeriod}
          onChange={(e) => updateField({ timePeriod: e.target.value })}
          placeholder="e.g., Jan 2020 – Present"
        />
      </ResumeItem>
      <ExperienceDescription id={id} />
    </div>
  );
};

interface ExperienceDescriptionProps {
  /** The unique ID of the work experience item. */
  id: string;
}

/**
 * Separate component for the experience description to optimize performance.
 * Rendering the RichTextEditor in every unrelated keystroke causes lag,
 * so this sub-component isolates description updates.
 */
const ExperienceDescription = ({ id }: ExperienceDescriptionProps) => {
  const { description, updateField } = useWorkExperience(id);

  const contentToEnhance = `Improve the following experience description to make it results-driven and professional. Start sentences with strong action verbs and emphasize measurable impact. Keep it concise and suitable for a resume:\n\n${description}`;

  return (
    <ResumeItem label="Description" itemId={`${id}-description`}>
      <EnhanceWithAI
        content={contentToEnhance}
        onEnhance={(updatedContent) =>
          updateField({ description: updatedContent })
        }
        enhanceDialogTitle="Enhance Work experience with AI"
      >
        <RichTextEditor
          content={description}
          onChange={(content) => {
            updateField({ description: content });
          }}
          placeholder="Describe your key responsibilities and achievements in this role..."
        />
      </EnhanceWithAI>
    </ResumeItem>
  );
};

export default WorkExperienceForm;
