"use client";

import { useAOS } from "@/components/shared/motion";

export interface LegalBlock {
  /** The parsed block text, with leading `#` markers trimmed for headings. */
  text: string;
  /** Block kind. */
  kind: "h1" | "h2" | "h3" | "p";
  /** Anchor id (set when this block is a heading). */
  id?: string;
}

interface Props {
  blocks: LegalBlock[];
}

/**
 * Client-side renderer that mounts each parsed legal block with a
 * `data-aos="fade-up"` attribute. `useAOS()` initialises the library once
 * per island and respects `prefers-reduced-motion` automatically.
 */
export function LegalDocumentBlocks({ blocks }: Props) {
  useAOS({ duration: 500, offset: 60, once: true });

  return (
    <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-4 leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.kind === "h3") {
          return (
            <h3
              key={idx}
              id={block.id}
              data-aos="fade-up"
              className="mt-6 text-lg font-semibold tracking-tight scroll-mt-24"
            >
              {block.text}
            </h3>
          );
        }
        if (block.kind === "h2") {
          return (
            <h2
              key={idx}
              id={block.id}
              data-aos="fade-up"
              className="mt-8 text-xl font-semibold tracking-tight scroll-mt-24"
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h1") {
          return (
            <h2
              key={idx}
              id={block.id}
              data-aos="fade-up"
              className="mt-8 text-2xl font-semibold tracking-tight scroll-mt-24"
            >
              {block.text}
            </h2>
          );
        }
        return (
          <p
            key={idx}
            data-aos="fade-up"
            className="text-sm text-foreground/90 sm:text-base"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
