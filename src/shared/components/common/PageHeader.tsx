import React from "react";
import { FadeIn } from "../animated/FadeIn";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  renderAction?: () => React.ReactNode;
}

export const PageHeader = ({
  title,
  description,
  renderAction,
}: PageHeaderProps) => {
  return (
    <header className="flex justify-between flex-wrap gap-5 items-center">
      <div className="flex flex-col gap-1">
        <FadeIn
          as="h1"
          transition={{ delay: 0.1 }}
          className="md:text-2xl text-lg font-bold tracking-tight"
        >
          {title}
        </FadeIn>
        <FadeIn
          as="p"
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm text-gray-600 dark:text-gray-400"
        >
          {description}
        </FadeIn>
      </div>
      <FadeIn
        as="div"
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2"
      >
        {renderAction?.()}
      </FadeIn>
    </header>
  );
};
