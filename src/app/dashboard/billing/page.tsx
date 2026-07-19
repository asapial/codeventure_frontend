import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/empty-state";
import { roleGate } from "../_components/role-gate";

export const metadata: Metadata = {
  title: "Billing — CodeVenture",
  description: "Invoices, payment methods, and billing history.",
  alternates: { canonical: "/dashboard/billing" },
  robots: { index: false, follow: false },
};

export default async function BillingPage() {
  await roleGate("/dashboard/billing");
  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Billing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Invoices, payment history, and account balances.
          </p>
        </div>
      </header>
      <EmptyState
        title="Billing coming soon"
        description="Invoices and payment history will appear here once your first invoice is issued."
      />
    </div>
  );
}