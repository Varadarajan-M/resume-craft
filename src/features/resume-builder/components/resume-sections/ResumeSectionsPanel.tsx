import { cn } from "@/shared/lib/utils";

interface ResumeSectionsPanelProps {
  className?: string;
}

const ResumeSectionsPanel = ({ className }: ResumeSectionsPanelProps) => {
  return (
    <aside className={cn("h-full border-r p-4", className)}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta a eius
      reiciendis! Pariatur, magnam nisi! Illum itaque cum nisi, natus expedita
      nostrum consequatur voluptates amet debitis reiciendis enim vitae
      incidunt?
    </aside>
  );
};

export default ResumeSectionsPanel;
