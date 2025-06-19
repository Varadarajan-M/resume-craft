"use client";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import Tip from "@/shared/components/common/Tip";
import { Trophy } from "lucide-react";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";
import AchievementItem from "./AchievementItem";

const AchievementSection = () => {
  const achievements = useResumeStore(
    (s) => s.resume?.sections.achievements ?? []
  );
  const handleAddAchievement = useResumeStore((s) => s.addAchievementItem);

  return (
    <ResumeSection
      icon={<Trophy className="w-4 h-4" />}
      title="Achievements"
      subtitle="Showcase your key milestones or accomplishments."
    >
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
