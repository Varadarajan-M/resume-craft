"use client";

import Tip from "@/shared/components/common/Tip";
import { Button } from "@/shared/components/ui/button"; // Assuming you're using a shared Button
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Briefcase, Plus } from "lucide-react";
import { useState } from "react";
import ResumeItem from "../ResumeItem";
import ResumeSection from "../ResumeSection";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<string[]>(["experience-1"]);

  const handleAddExperienceClick = () => {
    const newId = `experience-${Date.now()}`;
    setExperiences((prev) => [...prev, newId]);
  };

  return (
    <ResumeSection
      icon={<Briefcase className="w-4 h-4" />}
      title="Work Experience"
      subtitle="Your relevant roles, starting from the most recent."
      defaultOpen
    >
      <div className="flex flex-col gap-6">
        {experiences.map((id) => (
          <div key={id} className="flex flex-col gap-4">
            <ResumeItem
              itemId={`${id}-title`}
              label="Job Title"
              labelClassName="text-sm font-medium"
            >
              <Input id={`${id}-title`} placeholder="e.g., Frontend Engineer" />
            </ResumeItem>

            <ResumeItem
              itemId={`${id}-company`}
              label="Company"
              labelClassName="text-sm font-medium"
            >
              <Input id={`${id}-company`} placeholder="e.g., OpenAI" />
            </ResumeItem>

            <ResumeItem
              itemId={`${id}-duration`}
              label="Duration"
              labelClassName="text-sm font-medium"
            >
              <Input
                id={`${id}-duration`}
                placeholder="e.g., Jan 2020 – Present"
              />
            </ResumeItem>

            <ResumeItem
              itemId={`${id}-description`}
              label="Description"
              labelClassName="text-sm font-medium"
            >
              <Textarea
                id={`${id}-description`}
                placeholder="Describe your responsibilities, achievements, and tools used..."
                className="min-h-[100px]"
              />
            </ResumeItem>
          </div>
        ))}

        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddExperienceClick}
            className="mt-2 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>

        <Tip>
          Focus on results. Start bullet points with action verbs and include
          metrics where possible.
        </Tip>
      </div>
    </ResumeSection>
  );
};

export default ExperienceSection;
