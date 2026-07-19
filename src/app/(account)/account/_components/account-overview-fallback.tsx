import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  message: string;
}

export function AccountOverviewFallback({ message }: Props) {
  return (
    <EmptyState
      title="Account overview unavailable"
      description={message}
      action={{ label: "Refresh", href: "/account" }}
    />
  );
}