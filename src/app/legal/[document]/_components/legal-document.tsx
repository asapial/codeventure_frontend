/**
 * Renders a published legal document body.
 *
 * The body is stored as markdown in the backend `LegalDocumentVersion.body`
 * column. For now we render paragraphs separated by blank lines and headings
 * prefixed with `#` — sufficient for the most common legal-doc shape. We can
 * swap in a full markdown renderer later without changing the API contract.
 *
 * Heading elements carry anchor ids so the sticky table-of-contents can scroll
 * to them and the IntersectionObserver can track the active section.
 *
 * The parsed block list is handed to a Client island (`LegalDocumentBlocks`)
 * that initialises AOS and animates each block as it scrolls into view.
 */

import { extractHeadings } from "./parse-headings";
import { LegalDocumentBlocks, type LegalBlock } from "./legal-document-blocks";

interface Props {
  body: string;
}

export function LegalDocumentView({ body }: Props) {
  const blocks = body.split(/\n{2,}/u);
  const headings = extractHeadings(body);

  // Pre-compute the heading id for each block so render output is O(n) and
  // doesn't depend on `indexOf` against duplicate blocks.
  let headingCursor = 0;
  const parsed: LegalBlock[] = blocks.flatMap<LegalBlock>((raw) => {
    const trimmed = raw.trim();
    if (trimmed.length === 0) return [];
    if (trimmed.startsWith("### ")) {
      const h = headings[headingCursor++];
      return [{ kind: "h3", text: trimmed.slice(4), id: h?.id }];
    }
    if (trimmed.startsWith("## ")) {
      const h = headings[headingCursor++];
      return [{ kind: "h2", text: trimmed.slice(3), id: h?.id }];
    }
    if (trimmed.startsWith("# ")) {
      const h = headings[headingCursor++];
      return [{ kind: "h1", text: trimmed.slice(2), id: h?.id }];
    }
    return [{ kind: "p", text: trimmed }];
  });

  return <LegalDocumentBlocks blocks={parsed} />;
}
