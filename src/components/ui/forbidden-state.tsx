import { ShieldAlert } from "lucide-react";
import { EmptyState } from "./empty-state";

export function ForbiddenState({
  message,
  title = "Access denied",
  description,
  action,
}: {
  message?: string;
  title?: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
} = {}) {
  return (
    <EmptyState
      icon={<ShieldAlert aria-hidden className="size-8" />}
      title={title}
      description={description ?? message ?? "You do not have permission to view this content."}
      action={action}
    />
  );
}
