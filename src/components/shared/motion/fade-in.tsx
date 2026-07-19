"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  /** Animate on mount only (default), or on scroll into view. */
  trigger?: "mount" | "inView";
  /** Vertical offset in px. */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before animating in, in seconds. */
  delay?: number;
  /** Once-only when trigger === "inView". */
  once?: boolean;
  className?: string;
}

/**
 * Lightweight Framer Motion reveal. Honours `prefers-reduced-motion`
 * by skipping the transform entirely.
 */
export function FadeIn({
  children,
  trigger = "inView",
  y = 16,
  duration = 0.55,
  delay = 0,
  once = true,
  className,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();

  const baseInitial = reduce ? { opacity: 1 } : { opacity: 0, y };
  const baseAnimate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  if (trigger === "mount") {
    return (
      <motion.div
        initial={baseInitial}
        animate={baseAnimate}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={baseInitial}
      whileInView={baseAnimate}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}