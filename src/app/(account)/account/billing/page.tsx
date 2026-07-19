import type { Metadata } from "next";

import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Billing — CodeVenture",
  description: "Invoices, payment methods, and billing history.",
  alternates: { canonical: "/account/billing" },
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/70 p-6 shadow-sm dark:border-blue-950 dark:from-card dark:to-blue-950/20"><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Workspace</p><h1 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Billing</h1><p className="mt-2 text-sm text-muted-foreground">Invoices, payment history, and account balances.</p></header>
      <EmptyState
        title="Billing coming soon"
        description="Invoices and payment history will appear here once your first invoice is issued."
      />
    </div>
  );
}
