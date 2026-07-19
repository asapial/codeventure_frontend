import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  message: string;
}

export function DashboardOverviewFallback({ message }: Props) {
  return (
    <EmptyState
      title="Dashboard overview unavailable"
      description={message}
      action={{ label: "Refresh", href: "/dashboard" }}
    />
  );
}