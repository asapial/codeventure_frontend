import { EmptyState } from "@/components/ui/empty-state";

export default function ProjectNotFound() {
  return (
    <EmptyState
      title="Project not found"
      description="This project may have been archived or moved."
      action={{
        label: "Back to projects",
        href: "/account/projects",
      }}
    />
  );
}
