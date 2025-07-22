"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import AchievementItem from "./AchievementItem";

import { RESUME_BUILDER_SECTIONS } from "@/features/resume-builder/lib/constants";

const { icon: SectionIcon, ...rest } = RESUME_BUILDER_SECTIONS.achievements;

const sectionConfig = {
  ...rest,
  icon: <SectionIcon className="w-4 h-4" />,
};

const AchievementSection = () => {
  const achievements = useResumeStore(
    (s) => s.resume?.sections.achievements ?? []
  );
  const handleAddAchievement = useResumeStore((s) => s.addAchievementItem);

  return (
    <ResumeSection {...sectionConfig}>
      {achievements.map((achievement, index) => (
        <AchievementItem
          key={achievement.id}
          id={achievement.id}
          index={index}
        />
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddAchievement}
        label="Add Achievement"
      />

      <Tip>
        Highlight awards, recognitions, or big wins that showcase your impact
        and excellence.
      </Tip>
    </ResumeSection>
  );
};

export default AchievementSection;
