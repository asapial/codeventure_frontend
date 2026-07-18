import { EmptyState } from "@/components/ui/empty-state";
import { ForbiddenState } from "@/components/ui/forbidden-state";

interface Props {
  status: number;
  message?: string;
}

export function LandingViewFallback({ status, message }: Props) {
  if (status === 403) {
    return (
      <ForbiddenState
        title="Access restricted"
        description={message ?? "This content is not available right now."}
        action={{ label: "Back to home", href: "/" }}
      />
    );
  }

  if (status === 404) {
    return (
      <EmptyState
        title="Content unavailable"
        description={message ?? "We could not find the homepage content."}
        action={{ label: "Retry", href: "/" }}
      />
    );
  }

  return (
    <EmptyState
      title="Service temporarily unavailable"
      description={
        message ??
          "We could not load the homepage. Please refresh in a moment."
      }
      action={{ label: "Try again", href: "/" }}
    />
  );
}
