import { ShieldAlert } from "lucide-react";
import { EmptyState } from "./empty-state";

export function ForbiddenState({
  message = "You do not have permission to view this content.",
}: { message?: string } = {}) {
  return (
    <EmptyState
      icon={<ShieldAlert aria-hidden className="size-8" />}
      title="Access denied"
      description={message}
    />
  );
}