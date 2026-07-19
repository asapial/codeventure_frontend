import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function PortfolioFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "Portfolio restricted" : "Portfolio unavailable"}
        description={message ?? "We could not load case studies right now."}
        action={{ label: "Retry", href: "/portfolio" }}
      />
    </div>
  );
}