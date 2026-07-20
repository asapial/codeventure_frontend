import type { Metadata } from "next";

import { ApiError } from "@/lib/api/client";
import { fetchCustomerDashboard } from "@/lib/api/portal";

import { roleGate } from "./_components/role-gate";
import { DashboardOverview } from "./_components/dashboard-overview";
import { DashboardOverviewFallback } from "./_components/dashboard-overview-fallback";

export const metadata: Metadata = {
  title: "Dashboard — CodeVenture",
  description: "Your CodeVenture workspace overview.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await roleGate("/dashboard");

  try {
    const dashboard = await fetchCustomerDashboard();
    return <DashboardOverview dashboard={dashboard} />;
  } catch (err) {
    if (err instanceof ApiError) {
      return (
        <DashboardOverviewFallback
          message={
            err.status === 401
              ? "Please sign in to view your workspace overview."
              : err.body?.message ?? "We couldn't load your overview."
          }
        />
      );
    }
    return (
      <DashboardOverviewFallback message="We couldn't load your overview." />
    );
  }
}