import { EmptyState } from "@/components/ui/empty-state";

interface Props {
  message: string;
}

/**
 * Friendly fallback shown when `fetchOnboarding` fails (401, 5xx, network).
 * The full editor lives behind a data fetch, so we don't render partial state.
 */
export function OnboardingViewFallback({ message }: Props) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
            Onboarding
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Finish setting up your workspace so we can hit the ground running.
          </p>
        </div>
      </header>
      <EmptyState
        title="We can't reach your onboarding state"
        description={message}
      />
    </div>
  );
}