"use client";
import Tip from "@/shared/components/common/Tip";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Book, Plus } from "lucide-react";
import { useState } from "react";
import ResumeItem from "../ResumeItem";
import ResumeSection from "../ResumeSection";
import TwoItemGrid from "../TwoItemGrid";

const EducationSection = () => {
  const [educations, setEducations] = useState<string[]>(["education-1"]);

  const handleAddEducationClick = () => {
    const newId = `education-${Date.now()}`;
    setEducations((prev) => [...prev, newId]);
  };

  return (
    <ResumeSection
      icon={<Book className="w-4 h-4" />}
      title="Education"
      subtitle="Your academic qualifications."
    >
      {educations.map((id) => (
        <div key={id} className="flex flex-col gap-4">
          <ResumeItem label="Institution" itemId={`${id}-institution`}>
            <Input
              id={`${id}-institution`}
              placeholder="e.g., Harvard University"
            />
          </ResumeItem>

          <TwoItemGrid>
            <ResumeItem label="Field of Study" itemId={`${id}-field`}>
              <Input
                id={`${id}-field`}
                placeholder="e.g., Masters in Computer Science"
              />
            </ResumeItem>

            <ResumeItem label="Time Period" itemId={`${id}-timePeriod`}>
              <Input
                id={`${id}-timePeriod`}
                placeholder="e.g., March 2021 - Present"
              />
            </ResumeItem>
          </TwoItemGrid>

          <ResumeItem itemId={`${id}-description`} label="Description">
            <Textarea
              id={`${id}-description`}
              placeholder="e.g., Relevant coursework, honors, or extracurricular activities."
              className="min-h-[100px]"
            />
          </ResumeItem>
        </div>
      ))}
      <div className="flex justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddEducationClick}
          className="mt-2 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>
      <Tip>
        Include schools, degrees, and graduation dates. Highlight relevant
        coursework or honors if applicable.
      </Tip>
    </ResumeSection>
  );
};

export default EducationSection;
