import { cn } from "@/shared/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

interface ResumeSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  sectionId?: string;
}

const ResumeSection = ({
  className,
  icon,
  subtitle,
  title,
  children,
  sectionId,
  defaultOpen = false,
}: ResumeSectionProps) => {
  const classes = cn("flex flex-col gap-5 mb-2 pt-2", className);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? title : undefined}
    >
      <AccordionItem value={title} id={`accordion-item-${sectionId}`}>
        <AccordionTrigger>
          <div className="flex flex-col" id={sectionId}>
            <div className="flex items-start gap-2">
              {icon}
              <h3 className="-mt-[6px] font-semibold text-foreground text-sm tracking-tight md:text-base">
                {" "}
                {title}
              </h3>
            </div>
            {subtitle && (
              <small className="-mt-0.5 ml-6 text-xs font-[500] text-muted-foreground">
                {subtitle}
              </small>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className={classes}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ResumeSection;
