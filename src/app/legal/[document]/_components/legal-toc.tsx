"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Heading } from "./parse-headings";

interface Props {
  headings: Heading[];
}

/**
 * Sticky table-of-contents for legal documents. Tracks the section currently
 * in view via IntersectionObserver and highlights the matching link.
 */
export function LegalToc({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observed = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (observed.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Prefer the heading nearest the top of the viewport that is still
        // visible. Sort by document order using `headings` rather than by
        // intersection ratio, which is less stable across browsers.
        const order = new Map(headings.map((h, idx) => [h.id, idx]));
        const next = [...visible.keys()].sort(
          (a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0),
        )[0];

        if (next) setActiveId(next);
      },
      {
        // Trigger when a heading enters the top 70% of the viewport.
        rootMargin: "-72px 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden rounded-2xl border border-blue-100/80 bg-card/80 p-5 shadow-sm shadow-blue-950/5 backdrop-blur-sm lg:block dark:border-blue-950"
    >
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <List className="size-3.5" aria-hidden="true" />
        On this page
      </p>
      <ol className="mt-4 space-y-1.5 text-sm">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          const isTopLevel = h.level === 1;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 96;
                  window.scrollTo({ top, behavior: "smooth" });
                  setActiveId(h.id);
                  // Update the URL hash without triggering a re-render storm.
                  window.history.replaceState(null, "", `#${h.id}`);
                }}
                className={cn(
                  "block rounded-lg border-l-2 py-1.5 pr-3 text-sm leading-snug transition-colors",
                  isTopLevel ? "pl-3" : "pl-6",
                  isActive
                    ? "border-blue-600 font-semibold text-blue-700 dark:border-blue-400 dark:text-blue-300"
                    : "border-transparent text-muted-foreground hover:border-blue-200 hover:text-blue-700 dark:hover:border-blue-900 dark:hover:text-blue-300",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
