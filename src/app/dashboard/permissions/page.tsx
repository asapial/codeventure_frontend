import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/empty-state";
import { roleGate } from "../_components/role-gate";

export const metadata: Metadata = {
  title: "My permissions — CodeVenture",
  description: "A read-only summary of what your role can do.",
  alternates: { canonical: "/dashboard/permissions" },
  robots: { index: false, follow: false },
};

export default async function PermissionsPage() {
  await roleGate("/dashboard/permissions");
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">
            My permissions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A read-only summary of what your role can do inside this workspace.
          </p>
        </div>
      </header>
      <EmptyState
        title="Permission summary coming soon"
        description="A detailed breakdown of capabilities for your role will appear here."
      />
    </div>
  );
}