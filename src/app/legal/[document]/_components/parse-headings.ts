export interface Heading {
  /** Stable id used for the in-page anchor (`#some-heading`). */
  id: string;
  /** Display text of the heading. */
  text: string;
  /** Visual rank (1 = top-level `#`, 2 = `##`, 3 = `###`). */
  level: 1 | 2 | 3;
}

/**
 * Convert a free-form heading text into a URL-safe anchor id.
 * Keeps alphanumerics and dashes, lowercases, collapses whitespace.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Walk a markdown body string and extract every `#`/`##`/`###` heading that
 * appears at the start of a block. Matches the block-shape that
 * `LegalDocumentView` already understands.
 *
 * Duplicate heading texts get a numeric suffix so anchor ids stay unique.
 */
export function extractHeadings(body: string): Heading[] {
  const blocks = body.split(/\n{2,}/u);
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  for (const raw of blocks) {
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;

    let level: 1 | 2 | 3 | null = null;
    let text = "";

    if (trimmed.startsWith("### ")) {
      level = 3;
      text = trimmed.slice(4).trim();
    } else if (trimmed.startsWith("## ")) {
      level = 2;
      text = trimmed.slice(3).trim();
    } else if (trimmed.startsWith("# ")) {
      level = 1;
      text = trimmed.slice(2).trim();
    }

    if (!level || !text) continue;

    const baseId = slugifyHeading(text) || `heading-${headings.length + 1}`;
    const seenCount = seen.get(baseId) ?? 0;
    seen.set(baseId, seenCount + 1);
    const id = seenCount === 0 ? baseId : `${baseId}-${seenCount + 1}`;

    headings.push({ id, text, level });
  }

  return headings;
}
