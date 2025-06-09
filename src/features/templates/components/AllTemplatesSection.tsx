"use client";

import { Grid, List } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import TemplateList from "./TemplateList";
import TemplateSearch from "./TemplateSearch";

import useTemplatesQuery from "../hooks/useTemplatesQuery";

const AllTemplatesSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const templates = useTemplatesQuery();

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
        <TemplateList templates={templates} />
      </FadeIn>
    </>
  );
};

export default AllTemplatesSection;
