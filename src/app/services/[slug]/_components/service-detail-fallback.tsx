import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function ServiceDetailFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "Service restricted" : "Service unavailable"}
        description={
          message ?? "We could not load this service right now."
        }
        action={{ label: "Browse all services", href: "/services" }}
      />
    </div>
  );
}