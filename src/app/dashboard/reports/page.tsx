import type { Metadata } from "next";

import { roleGate } from "../_components/role-gate";
import { StubPage } from "../_components/stub-page";

export const metadata: Metadata = {
  title: "Reports — CodeVenture",
  description: "Operational and engagement reports.",
  alternates: { canonical: "/dashboard/reports" },
  robots: { index: false, follow: false },
};

export default async function DashboardReportsPage() {
  await roleGate("/dashboard/reports");
  return (
    <StubPage
      eyebrow="Moderation"
      title="Reports"
      description="Operational and engagement reporting."
      message="Reporting APIs are not yet implemented. This page is visible to platform administrators and moderators only."
    />
  );
}