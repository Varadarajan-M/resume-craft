"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { Input } from "@/shared/components/ui/input";
import RichTextEditor from "@/shared/components/ui/rich-text-editor";
import { memo } from "react";
import EnhanceWithAI from "../../EnhanceWithAI";
import ResumeItem from "../ResumeItem";

const AchievementForm = ({ id }: { id: string }) => {
  const title = useResumeStore(
    (s) => s.resume?.sections.achievements?.find((a) => a.id === id)?.title
  );

  const handleUpdateAchievement = useResumeStore(
    (s) => s.updateAchievementItem
  );

  return (
    <div className="flex flex-col gap-4">
      <ResumeItem label="Title" itemId={`${id}-title`} className="p-0">
        <Input
          id={`${id}-title`}
          value={title || ""}
          onChange={(e) =>
            handleUpdateAchievement(id, { title: e.target.value })
          }
          placeholder="e.g., Winner - Hackathon 2024"
        />
      </ResumeItem>

      <DescriptionEditor id={id} />
    </div>
  );
};

const DescriptionEditor = memo(({ id }: { id: string }) => {
  const description = useResumeStore(
    (s) =>
      s.resume?.sections.achievements?.find((a) => a.id === id)?.description ||
      ""
  );

  const handleUpdateAchievement = useResumeStore(
    (s) => s.updateAchievementItem
  );

  return (
    <ResumeItem
      label="Description"
      itemId={`${id}-description`}
      className="p-0"
    >
      <EnhanceWithAI
        content={description}
        onEnhance={console.log}
        enhanceDialogTitle="Enhance Achievements with AI"
      >
        <RichTextEditor
          id={`${id}-description`}
          content={description}
          onChange={(v) => handleUpdateAchievement(id, { description: v })}
          placeholder="Explain the context, what you did, and the result."
        />
      </EnhanceWithAI>
    </ResumeItem>
  );
});

DescriptionEditor.displayName = "DescriptionEditor";

export default AchievementForm;
