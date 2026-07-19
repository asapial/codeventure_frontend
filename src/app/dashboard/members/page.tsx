import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/empty-state";
import { roleGate } from "../_components/role-gate";

export const metadata: Metadata = {
  title: "Members — CodeVenture",
  description: "Manage the members of your CodeVenture workspace.",
  alternates: { canonical: "/dashboard/members" },
  robots: { index: false, follow: false },
};

export default async function MembersPage() {
  await roleGate("/dashboard/members");
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Members</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Invite teammates and control their access to this workspace.
          </p>
        </div>
      </header>
      <EmptyState
        title="Member management coming soon"
        description="Invitations, role changes, and seat management will live here."
      />
    </div>
  );
}