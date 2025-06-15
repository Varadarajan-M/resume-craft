import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ResumeLanguageItem } from "@/shared/types/resume";
import { Trash2 } from "lucide-react";
import ResumeItem from "../ResumeItem";

interface Props {
  index: number;
  language: ResumeLanguageItem;
  onUpdate: (
    index: number,
    field: keyof ResumeLanguageItem,
    value: string
  ) => void;
  onRemove: (index: number) => void;
}

const LanguageItem = ({ index, language, onUpdate, onRemove }: Props) => {
  return (
    <ResumeItem label="" itemId={language?.id}>
      <div className="flex items-center gap-4">
        <Input
          value={language.language}
          placeholder="Language (e.g., English)"
          onChange={(e) => onUpdate(index, "language", e.target.value)}
        />
        <Select
          value={language.proficiency}
          onValueChange={(value) => onUpdate(index, "proficiency", value)}
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
        <Button size="icon" variant="ghost" onClick={() => onRemove(index)}>
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </ResumeItem>
  );
};

export default LanguageItem;
