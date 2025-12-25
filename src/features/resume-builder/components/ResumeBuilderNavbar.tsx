/**
 * @file ResumeBuilderNavbar.tsx
 * @description Navbar component for the resume builder, providing actions for downloading and sharing resumes.
 */

"use client";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import { TapAnimationButton } from "@/shared/components/animated/TapAnimationButton";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import { ThemeSwitch } from "@/shared/components/common/ThemeSwitcher";
import { Button } from "@/shared/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useResumeActions } from "../hooks/useResumeActions";
import { useResumeStore } from "../store/resume";

interface SharedButtonProps {
  resumeTitle: string;
}

/**
 * Button component for downloading the resume as a PDF.
 */
const ResumeDownloadButton = ({ resumeTitle }: SharedButtonProps) => {
  const { handleDownload } = useResumeActions(resumeTitle);

  return (
    <TapAnimationButton>
      <Button
        size="sm"
        variant="default"
        onClick={handleDownload}
        className="flex items-center gap-2"
      >
        <Download className="w-3 h-3" />
        <span className="hidden md:inline text-xs">Download Resume</span>
      </Button>
    </TapAnimationButton>
  );
};

/**
 * Button component for sharing the resume PDF using the Web Share API.
 */
const ResumeShareButton = ({ resumeTitle }: SharedButtonProps) => {
  const { handleShare } = useResumeActions(resumeTitle);

  return (
    <TapAnimationButton>
      <Button
        size="sm"
        variant="secondary"
        onClick={handleShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-3 h-3" />
        <span className="hidden md:inline text-xs">Share</span>
      </Button>
    </TapAnimationButton>
  );
};

/**
 * Main Navbar component for the Resume Builder.
 * Handles the display of the brand, theme switch, and resume actions.
 */
const ResumeBuilderNavbar = () => {
  const fullName = useResumeStore(
    (state) => state.resume?.sections?.personalInfo?.fullName
  );
  const headline = useResumeStore(
    (state) => state.resume?.sections?.personalInfo?.headline
  );

  const resumeTitle = fullName
    ? `${fullName} - ${headline ?? ""} Resume`
    : "Resume";

  return (
    <nav className="flex items-center-safe sticky top-0 z-50 justify-between border-b border-border bg-background px-4 py-2 transition-all duration-200">
      <ResumeCraftBrand to="/dashboard" />
      <FadeIn className="flex flex-row items-center justify-end gap-4">
        <ThemeSwitch className="cursor-pointer mr-4 lg:mr-2" />
        <ResumeDownloadButton resumeTitle={resumeTitle} />
        <ResumeShareButton resumeTitle={resumeTitle} />
      </FadeIn>
    </nav>
  );
};

export default ResumeBuilderNavbar;
