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
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
      <EmptyState
        title="Billing coming soon"
        description="Invoices and payment history will appear here once your first invoice is issued."
      />
    </div>
  );
}