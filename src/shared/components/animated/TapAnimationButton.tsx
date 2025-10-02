"use client";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";

export const TapAnimationButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classNames = cn("inline-block", className);
  return (
    <motion.div whileTap={{ scale: 0.85 }} className={classNames}>
      {children}
    </motion.div>
  );
};
