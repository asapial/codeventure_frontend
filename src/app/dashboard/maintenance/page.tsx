import type { Metadata } from "next";

import { ApiError } from "@/lib/api/client";
import { fetchMaintenance } from "@/lib/api/portal";

import { roleGate } from "../_components/role-gate";
import { MaintenanceView } from "./_components/maintenance-view";
import { MaintenanceViewFallback } from "./_components/maintenance-view-fallback";

export const metadata: Metadata = {
  title: "Maintenance — CodeVenture",
  description:
    "Manage your maintenance plan, raise new requests, and review recent activity.",
  alternates: { canonical: "/dashboard/maintenance" },
  robots: { index: false, follow: false },
};

export default async function MaintenancePage() {
  await roleGate("/dashboard/maintenance");

  try {
    const state = await fetchMaintenance();
    return <MaintenanceView state={state} />;
  } catch (err) {
    if (err instanceof ApiError) {
      return (
        <MaintenanceViewFallback
          reason={
            err.status === 401
              ? "Please sign in again to view your maintenance plan."
              : err.status === 403
                ? "Your workspace isn’t provisioned for maintenance yet."
                : err.body?.message ??
                  "We couldn’t load your maintenance plan. Please try again."
          }
        />
      );
    }
    return (
      <MaintenanceViewFallback reason="We couldn’t load your maintenance plan. Please try again." />
    );
  }
}