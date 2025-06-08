"use client";

import { Grid, List } from "lucide-react";
import { useState } from "react";

import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import TemplateList from "./TemplateList";
import TemplateSearch from "./TemplateSearch";

import useTemplatesQuery from "../hooks/useTemplatesQuery";

const AllTemplatesSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const templates = useTemplatesQuery();

  return (
    <>
      <div className="flex gap-4">
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
      </div>
      <TemplateList templates={templates} />
    </>
  );
};

export default AllTemplatesSection;
