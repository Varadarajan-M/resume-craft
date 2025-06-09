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
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: HTMLElementType; // Allow specifying the HTML element type
} & HTMLMotionProps<"div">) => {
  const as = props.as ?? "div";
  const Component =
    (motionComponents as Record<string, React.ElementType>)[as] || motion.div;

  return (
    <Component
      className={cn("flex flex-col gap-2", className)}
      initial="hidden"
      animate="visible"
      // viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 10, filter: "blur(20px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ...props.transition },
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
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) => {
  return (
    <motion.div
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
        <motion.div
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
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FadeInChildren;
