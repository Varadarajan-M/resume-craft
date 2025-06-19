import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Trash2 } from "lucide-react";
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
            handleUpdateLanguage(id, { proficiency: value as any })
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
        <Button
          size="icon"
          variant="ghost"
          onClick={() => handleRemoveLanguage(id)}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </ResumeItem>
  );
};

export default LanguageItem;
