import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  status: number;
  message?: string;
}

export function ContactFallback({ status, message }: Props) {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title={status === 403 ? "Contact form restricted" : "Contact unavailable"}
        description={message ?? "We could not load the contact form right now."}
        action={{ label: "Back to home", href: "/" }}
      />
    </div>
  );
}
