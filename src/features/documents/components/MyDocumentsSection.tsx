"use client";

import { Grid, List } from "lucide-react";
import { useState } from "react";

import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import DocumentList from "./DocumentList";
import DocumentSearch from "./DocumentSearch";

import useDocumentListQuery from "../hooks/useDocumentListQuery";

const DocumentsSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const documents = useDocumentListQuery();

  return (
    <>
      <div className="flex gap-4">
        <DocumentSearch />
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
      <DocumentList viewType={activeView} documents={documents} />
    </>
  );
};

export default DocumentsSection;
