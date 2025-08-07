"use client";

import { Grid, List } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import ViewTypeButton from "@/shared/components/common/ViewTypeButton";
import TemplateList from "./TemplateList";
import TemplateSearch from "./TemplateSearch";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { getPlaceholderResume } from "@/shared/lib/resume";
import { DocumentTemplate } from "@/shared/types/document";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useTemplatesQuery from "../hooks/useTemplatesQuery";

const AllTemplatesSection = () => {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const setResume = useResumeStore((state) => state.setResume);

  const userId = useAuth()?.userId;

  const { data: templates } = useTemplatesQuery();

  const router = useRouter();

  const handleTemplateClick = <T extends DocumentTemplate>(template: T) => {
    const newResume = getPlaceholderResume(
      userId!,
      template as DocumentTemplate
    );
    setResume(newResume);
    router.push(`/builder`);
  };

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
          viewType={activeView}
          templates={templates}
          onTemplateClick={handleTemplateClick}
        />
      </FadeIn>
    </>
  );
};

export default AllTemplatesSection;
