import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  renderAction?: () => React.ReactNode;
}

const PageHeader = ({ title, description, renderAction }: PageHeaderProps) => {
  return (
    <header className="flex justify-between flex-wrap gap-3 items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        <p className="md:inline-block hidden text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      {renderAction?.()}
    </header>
  );
};

export default PageHeader;
