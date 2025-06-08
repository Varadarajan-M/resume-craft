import Link from "next/link";
import ResumeCraftIcon from "./ResumeCraftIcon";

const ResumeCraftBrand = () => {
  return (
    <Link href="/" className="flex items-center gap-1 ">
      <ResumeCraftIcon className="w-5 h-5" />
      <h3 className="text-lg font-bold text-foreground tracking-tight">
        ResumeCraft
      </h3>
    </Link>
  );
};

export default ResumeCraftBrand;
