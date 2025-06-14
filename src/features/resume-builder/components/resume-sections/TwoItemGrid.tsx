import React from "react";

interface TwoItemGridProps {
  children: React.ReactNode;
}

const TwoItemGrid = ({ children }: TwoItemGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end-safe">
      {children}
    </div>
  );
};

export default TwoItemGrid;
