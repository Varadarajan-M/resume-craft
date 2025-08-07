import FadeInChildren from "@/shared/components/animated/FadeIn";

import { cn } from "@/shared/lib/utils";
import SectionOrder from "./SectionOrder";
import TemplateSelection from "./TemplateSelection";

interface ResumeConfigPanelProps {
  className?: string;
}

const ResumeConfigPanel = ({ className }: ResumeConfigPanelProps) => {
  return (
    <FadeInChildren
      asProp="aside"
      childrenAs="section"
      className={cn(
        "h-[calc(100dvh_-_56px)] border-r py-4 px-5 flex flex-col gap-4 overflow-y-auto",
        className
      )}
    >
      <TemplateSelection />
      <SectionOrder />
    </FadeInChildren>
  );
};

export default ResumeConfigPanel;
