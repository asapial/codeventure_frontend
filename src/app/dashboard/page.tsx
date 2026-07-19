import type { Metadata } from "next";

import { fetchAccountSummary } from "@/lib/api/account";

import { DashboardOverview } from "./_components/dashboard-overview";
import { roleGate } from "./_components/role-gate";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your CodeVenture workspace overview.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  await roleGate("/dashboard");
  const summary = await fetchAccountSummary();
  return <DashboardOverview summary={summary} />;
}