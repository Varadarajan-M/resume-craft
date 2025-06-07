import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  renderAction?: () => React.ReactNode;
}

const PageHeader = ({ title, description, renderAction }: PageHeaderProps) => {
  return (
    <header className="flex justify-between flex-wrap gap-5 items-center">
      <div className="flex flex-col gap-1">
        <h1 className="md:text-xl text-lg font-bold tracking-tight">{title}</h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      {renderAction?.()}
    </header>
  );
};

export default PageHeader;
