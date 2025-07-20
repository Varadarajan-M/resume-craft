import { FadeIn } from "@/shared/components/animated/FadeIn";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import { ThemeSwitch } from "@/shared/components/common/ThemeSwitcher";
import { Button } from "@/shared/components/ui/button";
import { downloadFile } from "@/shared/lib/utils";
import { Download, Share2 } from "lucide-react";
import { useResumeStore } from "../store/resume";

const ResumeDownloadButton = () => {
  const fullName = useResumeStore(
    (state) => state.resume?.sections?.personalInfo?.fullName
  );
  const headline = useResumeStore(
    (state) => state.resume?.sections?.personalInfo?.headline
  );

  const resumeTitle = fullName
    ? `${fullName} - ${headline ?? ""} Resume`
    : "Resume";

  const handlePdfDownload = () => {
    const linkElement = document.querySelector("[data-pdf-blob-url]");
    if (linkElement) {
      const url = linkElement.getAttribute("data-pdf-blob-url");
      downloadFile(url!, resumeTitle);
    }
  };

  return (
    <Button
      size={"sm"}
      variant="default"
      onClick={handlePdfDownload}
      className="flex items-center gap-2"
    >
      <Download className="w-3 h-3" />
      <span className="md:inline hidden text-xs">Download Resume</span>
    </Button>
  );
};

const ResumeBuilderNavbar = () => {
  return (
    <nav className="flex items-center-safe sticky top-0 bg-background z-50 border-b border-border px-5 py-2   justify-between transition-all duration-200">
      <ResumeCraftBrand />
      <FadeIn className=" flex flex-row justify-end gap-4">
        <ThemeSwitch />

        <ResumeDownloadButton />
        <Button
          size={"sm"}
          variant="secondary"
          className="flex items-center gap-1"
        >
          <Share2 className="w-2 h-2" />
          <span className="md:inline hidden text-xs">Share</span>
        </Button>
      </FadeIn>
    </nav>
  );
};

export default ResumeBuilderNavbar;
