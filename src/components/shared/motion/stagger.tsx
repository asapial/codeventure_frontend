"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StaggerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  /** Per-child delay in seconds. */
  stagger?: number;
  /** Initial delay before the first child animates. */
  delay?: number;
  /** Vertical offset for each child. */
  y?: number;
  /** Animation duration per child. */
  duration?: number;
  /** Animate on mount or when scrolled into view. */
  trigger?: "mount" | "inView";
  className?: string;
}

/**
 * Sequentially reveals its direct children. Honours
 * `prefers-reduced-motion` by snapping children into place.
 */
export function Stagger({
  children,
  stagger = 0.06,
  delay = 0,
  y = 18,
  duration = 0.5,
  trigger = "inView",
  className,
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
    show: reduce
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  const inViewProps =
    trigger === "inView"
      ? {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount: 0.15 },
        }
      : { initial: "hidden", animate: "show" };

  return (
    <motion.div
      variants={containerVariants}
      className={cn(className)}
      {...inViewProps}
      {...rest}
    >
      {items.map((child, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}