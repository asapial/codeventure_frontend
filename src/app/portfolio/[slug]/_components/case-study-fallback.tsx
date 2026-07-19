import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function CaseStudyFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "Case study restricted" : "Case study unavailable"}
        description={message ?? "We could not load this case study right now."}
        action={{ label: "Back to portfolio", href: "/portfolio" }}
      />
    </div>
  );
}