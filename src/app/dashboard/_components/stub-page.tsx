import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  message?: string;
}

/**
 * Shared "this section is reserved for {role} and not yet wired up"
 * placeholder used by the admin / moderator stub pages.
 */
export function StubPage({ eyebrow, title, description, message }: Props) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </header>
      <EmptyState
        title="Coming soon"
        description={
          message ??
          "This area is reserved for its role and will be wired up once the corresponding API is ready."
        }
      />
    </div>
  );
}