import { useResumeStore } from "@/features/resume-builder/store/resume";
import { DeleteButton } from "@/shared/components/common/DeleteButton";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ResumeLanguageItem } from "@/shared/types/resume";
import ResumeItem from "../ResumeItem";

const LanguageItem = ({ id }: { id: string }) => {
  const lang = useResumeStore((s) =>
    s.resume?.sections.languages?.find((l) => l.id === id)
  );

  const handleUpdateLanguage = useResumeStore((s) => s.updateLanguageItem);
  const handleRemoveLanguage = useResumeStore((s) => s.deleteLanguageItem);

  return (
    <ResumeItem label="" itemId={id}>
      <div className="flex items-center gap-4">
        <Input
          value={lang?.language}
          placeholder="Language (e.g., English)"
          onChange={(e) =>
            handleUpdateLanguage(id, { language: e.target.value })
          }
        />
        <Select
          value={lang?.proficiency}
          onValueChange={(value) =>
            handleUpdateLanguage(id, {
              proficiency: value as ResumeLanguageItem["proficiency"],
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Proficiency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Native">Native</SelectItem>
            <SelectItem value="Fluent">Fluent</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
          </SelectContent>
        </Select>
        <DeleteButton
          onDelete={() => handleRemoveLanguage(id)}
          tooltipText="Delete Language"
          variant="ghost"
        />
      </div>
    </ResumeItem>
  );
};

export default LanguageItem;
