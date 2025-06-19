import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Button } from "@/shared/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import ResumeItem from "../ResumeItem";
import EducationForm from "./EducationForm";

const EducationItem = ({ id, index }: { id: string; index: number }) => {
  const remove = useResumeStore((s) => s.deleteEducationItem);
  const duplicate = useResumeStore((s) => s.duplicateEducationItem);

  return (
    <ResumeItem
      label={`Education ${index + 1}`}
      itemId={id}
      labelClassName="text-sm font-semibold"
      className="flex flex-col gap-4"
      renderHeaderAction={() => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => duplicate(id)}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => remove(id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    >
      <EducationForm id={id} />
    </ResumeItem>
  );
};

export default EducationItem;
