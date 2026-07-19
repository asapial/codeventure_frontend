import type { Metadata } from "next";

import { roleGate } from "../_components/role-gate";
import { StubPage } from "../_components/stub-page";

export const metadata: Metadata = {
  title: "Inquiries — CodeVenture",
  description: "Quote requests and contact-form submissions across the platform.",
  alternates: { canonical: "/dashboard/inquiries" },
  robots: { index: false, follow: false },
};

export default async function DashboardInquiriesPage() {
  await roleGate("/dashboard/inquiries");
  return (
    <StubPage
      eyebrow="Administration"
      title="Inquiries"
      description="Triage incoming quote requests and contact-form submissions."
      message="The inquiries API is not yet implemented. This page is visible to platform administrators only."
    />
  );
}