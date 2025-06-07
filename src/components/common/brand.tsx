import Link from "next/link";
import React from "react";
import ResumeCraftIcon from "./brand-icon";

const ResumeCraftBrand = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <ResumeCraftIcon className="w-4 h-4" />
      <h3 className="text-md font-bold text-foreground tracking-tight">
        ResumeCraft
      </h3>
    </Link>
  );
};

export default ResumeCraftBrand;
