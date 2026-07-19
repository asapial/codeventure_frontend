"use client";

import { useEffect } from "react";
import AOS, { type AosOptions } from "aos";

/**
 * Initialises AOS once per Client island. Safe to call in multiple
 * components — AOS.init is idempotent. The library auto-disables on
 * `prefers-reduced-motion: reduce`.
 */
export function useAOS(options?: {
  duration?: number;
  delay?: number;
  once?: boolean;
  easing?: AosOptions["easing"];
  offset?: number;
}): void {
  useEffect(() => {
    AOS.init({
      duration: options?.duration ?? 600,
      delay: options?.delay ?? 0,
      once: options?.once ?? true,
      easing: options?.easing ?? "ease-out-quad",
      offset: options?.offset ?? 80,
    });
    // AOS uses MutationObserver under the hood; refresh on mount so
    // newly-rendered data-aos elements animate.
    AOS.refresh();
  }, [
    options?.duration,
    options?.delay,
    options?.once,
    options?.easing,
    options?.offset,
  ]);
}