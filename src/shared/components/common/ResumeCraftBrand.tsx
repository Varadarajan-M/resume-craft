import Link from "next/link";
import { FadeIn } from "../animated/FadeIn";
import ResumeCraftIcon from "./ResumeCraftIcon";

const ResumeCraftBrand = () => {
  return (
    <FadeIn>
      <Link href="/" className="flex items-center gap-1 ">
        <ResumeCraftIcon className="w-5 h-5" />
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          ResumeCraft
        </h3>
      </Link>
    </FadeIn>
  );
};

export default ResumeCraftBrand;
