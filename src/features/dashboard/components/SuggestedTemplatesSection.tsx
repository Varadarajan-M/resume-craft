"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { useResumeStore } from "@/features/resume-builder/store/resume";
import { TemplateList, useTemplatesQuery } from "@/features/templates";
import { FadeIn } from "@/shared/components/animated/FadeIn";
import { Button } from "@/shared/components/ui/button";
import { getPlaceholderResume } from "@/shared/lib/resume";
import { DocumentTemplate } from "@/shared/types/document";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SuggestedTemplatesSection = () => {
  const { data: templates, isLoading } = useTemplatesQuery();

  const setResume = useResumeStore((state) => state.setResume);

  const userId = useAuth()?.userId;

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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FadeIn
          as="h2"
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl font-semibold tracking-tight"
        >
          Suggested Templates
        </FadeIn>
        <Button variant={"link"} asChild className="text-xs">
          <FadeIn as="span" transition={{ delay: 0.4 }}>
            <Link href="/templates" className="flex items-center gap-1">
              Browse more <ChevronRight className="w-3 h-3" />
            </Link>
          </FadeIn>
        </Button>
      </div>
      <FadeIn transition={{ delay: 0.3 }} className="w-full">
        <TemplateList
          isLoading={isLoading}
          skeletonCount={2}
          templates={templates}
          onTemplateClick={handleTemplateClick}
        />
      </FadeIn>
    </div>
  );
};

export default SuggestedTemplatesSection;
