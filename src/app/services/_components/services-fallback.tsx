import { EmptyState } from "@/components/ui/empty-state";
import { ForbiddenState } from "@/components/ui/forbidden-state";

interface Props {
  status: number;
  message?: string;
}

export function ServicesFallback({ status, message }: Props) {
  if (status === 403) {
    return (
      <ForbiddenState
        title="Services unavailable"
        description={message ?? "The services catalogue is not accessible."}
        action={{ label: "Back to home", href: "/" }}
      />
    );
  }
  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <EmptyState
        title="Services unavailable"
        description={
          message ?? "We could not load the services catalogue right now."
        }
        action={{ label: "Retry", href: "/services" }}
      />
    </div>
  );
}