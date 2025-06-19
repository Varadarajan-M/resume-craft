import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import ResumeItem from "../ResumeItem";

const WorkExperienceForm = ({ id }: { id: string }) => {
  const experience = useResumeStore((s) =>
    s.resume?.sections.experience?.find((e) => e.id === id)
  );
  const handleUpdateExperienceField = useResumeStore(
    (s) => s.updateExperienceItem
  );

  if (!experience) return null;

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Job Title" itemId={`${id}-title`}>
        <Input
          value={experience.title}
          onChange={(e) =>
            handleUpdateExperienceField(id, { title: e.target.value })
          }
          placeholder="e.g., Frontend Engineer"
        />
      </ResumeItem>

      <ResumeItem label="Company" itemId={`${id}-company`}>
        <Input
          value={experience.company}
          onChange={(e) =>
            handleUpdateExperienceField(id, { company: e.target.value })
          }
          placeholder="e.g., OpenAI"
        />
      </ResumeItem>

      <ResumeItem label="Duration" itemId={`${id}-duration`}>
        <Input
          value={experience.timePeriod}
          onChange={(e) =>
            handleUpdateExperienceField(id, { timePeriod: e.target.value })
          }
          placeholder="e.g., Jan 2020 – Present"
        />
      </ResumeItem>
      <ExperienceDescription id={id} />
    </div>
  );
};

// rendering rich text editor in every unreleated keystroke causes performance issues
// so using a separate component with selective rendering for description to avoid re-rendering when other fields change
const ExperienceDescription = ({ id }: { id: string }) => {
  const description = useResumeStore(
    (s) =>
      s.resume?.sections.experience?.find((e) => e.id === id)?.description || ""
  );
  const handleUpdateExperienceField = useResumeStore(
    (s) => s.updateExperienceItem
  );

  return (
    <ResumeItem label="Description" itemId={`${id}-description`}>
      <RichTextEditor
        content={description}
        onChange={(content) =>
          handleUpdateExperienceField(id, { description: content })
        }
        placeholder="Describe your key responsibilities and achievements in this role..."
      />
    </ResumeItem>
  );
};

export default WorkExperienceForm;
