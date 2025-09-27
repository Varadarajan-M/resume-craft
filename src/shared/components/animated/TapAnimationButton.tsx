"use client";
import { motion } from "motion/react";

export const TapAnimationButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div whileTap={{ scale: 0.85 }} className="w-full">
      {children}
    </motion.div>
  );
};
