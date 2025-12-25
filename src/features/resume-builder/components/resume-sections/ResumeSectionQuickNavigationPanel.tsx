import FadeInChildren from "@/shared/components/animated/FadeIn";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { RESUME_BUILDER_SECTIONS } from "../../lib/constants";

const ResumeSectionQuickNavigationPanel = () => {
  /**
   *
   * @param sectionId ID of the section to scroll to and open
   * This function finds the accordion trigger for the section and simulates a click to open it
   * and scrolls it into view.
   * It uses the sectionId to find the correct element in the DOM.
   */
  const handleSectionIconClick = (sectionId: string) => {
    const sectionAccordionTrigger = document.getElementById(sectionId);
    const sectionAccordionItem = document.getElementById(
      `accordion-item-${sectionId}`
    );
    if (sectionAccordionTrigger && sectionAccordionItem) {
      // open the section if it's closed
      if (sectionAccordionItem.getAttribute("data-state") === "closed") {
        sectionAccordionTrigger.click();
      }

      sectionAccordionTrigger.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      });
    }
  };

  return (
    <FadeInChildren
      asProp="nav"
      className="hidden md:flex flex-col items-center-safe justify-center-safe h-[calc(100dvh_-_56px)] w-13 border-r"
    >
      {Object.entries(RESUME_BUILDER_SECTIONS).map(
        ([key, { icon: Icon, sectionId, title }]) => (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <Button
                size={"icon"}
                variant="ghost"
                className="rounded-full mb-2"
                onClick={() => handleSectionIconClick(sectionId)}
                aria-label={`Go to ${title} section`}
              >
                <Icon className="w-3 h-3 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        )
      )}
    </FadeInChildren>
  );
};

export default ResumeSectionQuickNavigationPanel;
