"use client";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import { Grid, List } from "lucide-react";
import { useTemplatesSection } from "../hooks/useTemplatesSection";
import TemplateList from "./TemplateList";
import TemplateSearch from "./TemplateSearch";

/**
 * AllTemplatesSection component coordinates the template browsing experience.
 */
const AllTemplatesSection = () => {
  const {
    activeView,
    setActiveView,
    templates,
    isLoading,
    handleTemplateClick,
  } = useTemplatesSection();

  return (
    <>
      <FadeIn transition={{ delay: 0.4 }} className="flex flex-row gap-4">
        <TemplateSearch />
        <div className="flex gap-2 items-center">
          <ViewTypeButton
            active={activeView === "grid"}
            icon={Grid}
            onClick={() => setActiveView("grid")}
            tooltipText="Grid View"
          />
          <ViewTypeButton
            active={activeView === "list"}
            icon={List}
            onClick={() => setActiveView("list")}
            tooltipText="List View"
          />
        </div>
      </FadeIn>
      <FadeIn transition={{ delay: 0.4 }} className="w-full">
        <TemplateList
          isLoading={isLoading}
          viewType={activeView}
          templates={templates}
          onTemplateClick={handleTemplateClick}
        />
      </FadeIn>
    </>
  );
};

export default AllTemplatesSection;
