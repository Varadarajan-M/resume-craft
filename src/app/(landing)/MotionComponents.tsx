"use client";

import { Card } from "@/shared/components/ui/card";
import { motion } from "motion/react";
import { ReactNode } from "react";

export const MotionNav = motion.nav;
export const MotionDiv = motion.div;

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}

interface AnimatedFeatureCardProps {
  children: ReactNode;
  className?: string;
  index: number;
}

export function AnimatedFeatureCard({
  children,
  className,
  index,
}: AnimatedFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}

interface AnimatedTemplateCardProps {
  children: ReactNode;
  className?: string;
  index: number;
}

export function AnimatedTemplateCard({
  children,
  className,
  index,
}: AnimatedTemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
