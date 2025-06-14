import { FadeIn } from "@/shared/components/animated/FadeIn";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import { ThemeSwitch } from "@/shared/components/common/ThemeSwitcher";
import { Button } from "@/shared/components/ui/button";
import { Download, Share2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center-safe sticky top-0 bg-background z-50 border-b border-border px-5 py-2   justify-between transition-all duration-200">
      <ResumeCraftBrand />
      <FadeIn className=" flex flex-row justify-end gap-4">
        <ThemeSwitch />
        <Button
          size={"sm"}
          variant="default"
          className="flex items-center gap-2"
        >
          <Download className="w-3 h-3" />
          <span className="md:inline hidden text-xs">Download Resume</span>
        </Button>

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

export default Navbar;
