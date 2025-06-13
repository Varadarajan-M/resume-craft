import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { FadeIn } from "../animated/FadeIn";
import ResumeCraftIcon from "./ResumeCraftIcon";

interface ResumeCraftBrandProps {
  className?: string;
  iconClassName?: string;
}
const ResumeCraftBrand: React.FC<ResumeCraftBrandProps> = ({
  className,
  iconClassName,
}) => {
  return (
    <FadeIn>
      <Link href="/" className="flex items-center gap-1 ">
        <ResumeCraftIcon className={cn("w-5 h-5", iconClassName)} />
        <h3
          className={cn(
            "text-lg font-bold text-foreground tracking-tight",
            className
          )}
        >
          ResumeCraft
        </h3>
      </Link>
    </FadeIn>
  );
};

export default ResumeCraftBrand;
