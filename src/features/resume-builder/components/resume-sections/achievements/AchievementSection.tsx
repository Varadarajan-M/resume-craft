// AchievementSection.tsx

"use client";

import { Trophy } from "lucide-react";
import { useState } from "react";

import Tip from "@/shared/components/common/Tip";
import AddNewButton from "../AddNewItemButton";
import ResumeSection from "../ResumeSection";

import { type ResumeAchievementItem } from "@/shared/types/resume";
import AchievementForm from "./AchievementForm";
import AchievementItem from "./AchievementItem";

const createNewAchievementItem = (): ResumeAchievementItem => ({
  id: "achv-" + Math.random().toString(36).substr(2, 9),
  title: "",
  description: "",
});

const AchievementSection = () => {
  const [achievements, setAchievements] = useState<ResumeAchievementItem[]>([
    createNewAchievementItem(),
  ]);

  const handleAddAchievement = () => {
    setAchievements((prev) => [...prev, createNewAchievementItem()]);
  };

  const handleAchievementChange = (
    id: string,
    key: keyof ResumeAchievementItem,
    value: string
  ) =>
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [key]: value } : a))
    );

  const handleDeleteAchievement = (id: string) =>
    setAchievements((prev) => prev.filter((a) => a.id !== id));

  const handleDuplicateAchievement = (
    id: string,
    index: number,
    achievement: ResumeAchievementItem
  ) => {
    const newAchievement = {
      ...achievement,
      title: achievement.title + " (Copy)",
      id: "achv-" + Math.random().toString(36).substr(2, 9),
    };
    setAchievements((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, newAchievement);
      return updated;
    });
  };

  return (
    <ResumeSection
      icon={<Trophy className="w-4 h-4" />}
      title="Achievements"
      subtitle="Showcase your key milestones or accomplishments."
    >
      {achievements.map((achievement, index) => (
        <AchievementItem
          key={achievement.id}
          achievement={achievement}
          index={index}
          onDeleteAchievement={handleDeleteAchievement}
          onDuplicateAchievement={handleDuplicateAchievement}
        >
          <AchievementForm
            achievement={achievement}
            onAchievementChange={(key, value) =>
              handleAchievementChange(achievement.id, key, value)
            }
          />
        </AchievementItem>
      ))}

      <AddNewButton
        className="ml-1"
        onClick={handleAddAchievement}
        label={"Add Achievement"}
      />

      <Tip>
        Highlight awards, recognitions, or big wins that showcase your impact
        and excellence.
      </Tip>
    </ResumeSection>
  );
};

export default AchievementSection;
