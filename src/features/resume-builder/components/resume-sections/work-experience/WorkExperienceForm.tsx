import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { ResumeExperienceItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";

interface WorkExperienceFormProps {
  experience: ResumeExperienceItem;
  onExperienceChange: (key: keyof ResumeExperienceItem, value: string) => void;
}

const WorkExperienceForm = ({
  experience,
  onExperienceChange,
}: WorkExperienceFormProps) => {
  return (
    <div key={experience.id} className="flex flex-col gap-4">
      <ResumeItem
        itemId={`${experience.id}-title`}
        label="Job Title"
        labelClassName="text-sm font-medium"
      >
        <Input
          value={experience.title}
          id={`${experience}-title`}
          onChange={(e) => onExperienceChange("title", e.target.value)}
          placeholder="e.g., Frontend Engineer"
        />
      </ResumeItem>

      <ResumeItem
        itemId={`${experience}-company`}
        label="Company"
        labelClassName="text-sm font-medium"
      >
        <Input
          value={experience.company}
          id={`${experience}-company`}
          onChange={(e) => onExperienceChange("company", e.target.value)}
          placeholder="e.g., OpenAI"
        />
      </ResumeItem>

      <ResumeItem
        itemId={`${experience}-duration`}
        label="Duration"
        labelClassName="text-sm font-medium"
      >
        <Input
          id={`${experience}-duration`}
          value={experience.timePeriod}
          onChange={(e) => onExperienceChange("timePeriod", e.target.value)}
          placeholder="e.g., Jan 2020 – Present"
        />
      </ResumeItem>

      <ResumeItem
        itemId={`${experience}-description`}
        label="Description"
        labelClassName="text-sm font-medium"
      >
        <Textarea
          id={`${experience}-description`}
          value={experience.description}
          onChange={(e) => onExperienceChange("description", e.target.value)}
          placeholder="Describe your responsibilities, achievements, and tools used..."
          className="min-h-[100px]"
        />
      </ResumeItem>
    </div>
  );
};

export default WorkExperienceForm;
