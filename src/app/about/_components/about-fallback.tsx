import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function AboutFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "About page restricted" : "About unavailable"}
        description={message ?? "We could not load the about page right now."}
        action={{ label: "Back to home", href: "/" }}
      />
    </div>
  );
}