"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps
  extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  /** Reveal direction. */
  direction?: "up" | "down" | "left" | "right";
  /** Distance in px for the slide. */
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

const DIRECTION_OFFSET: Record<
  NonNullable<ScrollRevealProps["direction"]>,
  { x: number; y: number }
> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

/**
 * Reveals a block of content when it scrolls into view. Picks up
 * `prefers-reduced-motion` automatically.
 */
export function ScrollReveal({
  children,
  direction = "up",
  distance = 24,
  duration = 0.6,
  delay = 0,
  once = true,
  className,
  ...rest
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = DIRECTION_OFFSET[direction];
  const offset = reduce ? 0 : distance;

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, x: x * offset, y: y * offset }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}