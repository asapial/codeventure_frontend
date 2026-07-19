/**
 * Renders a published legal document body.
 *
 * The body is stored as markdown in the backend `LegalDocumentVersion.body`
 * column. For now we render paragraphs separated by blank lines and headings
 * prefixed with `#` — sufficient for the most common legal-doc shape. We can
 * swap in a full markdown renderer later without changing the API contract.
 */

interface Props {
  body: string;
}

export function LegalDocumentView({ body }: Props) {
  const blocks = body.split(/\n{2,}/u);

  return (
    <div className="prose prose-slate dark:prose-invert mt-8 max-w-none space-y-4 leading-relaxed">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.length === 0) return null;

        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={idx}
              className="mt-6 text-lg font-semibold tracking-tight"
            >
              {trimmed.slice(4)}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={idx}
              className="mt-8 text-xl font-semibold tracking-tight"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h2
              key={idx}
              className="mt-8 text-2xl font-semibold tracking-tight"
            >
              {trimmed.slice(2)}
            </h2>
          );
        }
        return (
          <p key={idx} className="text-sm text-foreground/90 sm:text-base">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
