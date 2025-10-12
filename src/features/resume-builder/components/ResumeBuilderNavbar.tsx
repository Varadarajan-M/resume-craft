"use client";

import { toast } from "sonner";

import { FadeIn } from "@/shared/components/animated/FadeIn";
import { TapAnimationButton } from "@/shared/components/animated/TapAnimationButton";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import { ThemeSwitch } from "@/shared/components/common/ThemeSwitcher";
import { Button } from "@/shared/components/ui/button";

import { downloadFile } from "@/shared/lib/utils";
import { Download, Share2 } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useResumeStore } from "../store/resume";

interface SharedButtonProps {
  resumeTitle: string;
}

const getPdfBlobUrl = (): string | null =>
  document
    .querySelector("[data-pdf-blob-url]")
    ?.getAttribute("data-pdf-blob-url") ?? null;

const ResumeDownloadButton = ({ resumeTitle }: SharedButtonProps) => {
  const handleDownload = useCallback(() => {
    const url = getPdfBlobUrl();
    if (!url) return;
    downloadFile(url, resumeTitle);
  }, [resumeTitle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleDownload();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleDownload]);

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

const ResumeShareButton = ({ resumeTitle }: SharedButtonProps) => {
  const handleShare = async () => {
    try {
      const url = getPdfBlobUrl();
      if (!url) return;

      const response = await fetch(url);
      const pdfBlob = await response.blob();

      const file = new File([pdfBlob], "resume.pdf", { type: pdfBlob.type });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: resumeTitle,
          text: "Check out this document!",
        });
        toast.success("Resume shared successfully!");
      } else {
        toast.error("Sharing is not supported on this device.");
      }
    } catch (e: unknown) {
      toast.error(`${(e as Error)?.message}`);
    }
  };

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

  if (typeof window === "undefined") return null;

  return (
    <nav className="flex items-center-safe sticky top-0 z-50 justify-between border-b border-border bg-background px-4 py-2 transition-all duration-200">
      <ResumeCraftBrand />
      <FadeIn className="flex flex-row justify-end gap-4">
        <ThemeSwitch />
        <ResumeDownloadButton resumeTitle={resumeTitle} />
        <ResumeShareButton resumeTitle={resumeTitle} />
      </FadeIn>
    </nav>
  );
};

export default ResumeBuilderNavbar;
