import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function RequestQuoteFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "Quote intake closed" : "Quote service unavailable"}
        description={
          message ??
            "We could not load the quote form right now. Please try again shortly."
        }
        action={{ label: "Retry", href: "/request-quote" }}
      />
    </div>
  );
}