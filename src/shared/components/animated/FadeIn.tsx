"use client";
import { cn } from "@/shared/lib/utils";
import { HTMLMotionProps } from "motion/react";
import * as motion from "motion/react-client";
import React, { HTMLElementType } from "react";

const motionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  nav: motion.nav,
} as const;

export const FadeIn = ({
  children,
  className,
  as,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: HTMLElementType; // Allow specifying the HTML element type
} & HTMLMotionProps<"div">) => {
  const asProp = as ?? "div";
  const Component =
    (motionComponents as Record<string, React.ElementType>)[asProp] ||
    motion.div;

  const initial = typeof props.initial === "object" ? props.initial : {};
  const animate = typeof props.animate === "object" ? props.animate : {};

  return (
    <Component
      className={cn("flex flex-col gap-2", className)}
      initial="hidden"
      animate="visible"
      // viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
          filter: "blur(20px)",
          ...initial,
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ...props.transition },
          ...animate,
        },
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export const FadeInChildren = ({
  children,
  className,
  as,
  childrenAs,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: HTMLElementType; // Allow specifying the HTML element type
  childrenAs?: HTMLElementType; // Allow specifying the HTML element type for children
} & HTMLMotionProps<"div">) => {
  const asProp = as ?? "div";
  const Component =
    (motionComponents as Record<string, React.ElementType>)[asProp] ||
    motion.div;
  const childrenAsProp = childrenAs ?? "div";
  const ChildComponent =
    (motionComponents as Record<string, React.ElementType>)[childrenAsProp] ||
    motion.div;

  return (
    <Component
      className={cn("flex flex-col gap-2", className)}
      initial="hidden"
      animate="visible"
      // viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <ChildComponent
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(20px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, delay: i * 0.1 },
            },
          }}
          key={i}
        >
          {child}
        </ChildComponent>
      ))}
    </Component>
  );
};

export default FadeInChildren;
