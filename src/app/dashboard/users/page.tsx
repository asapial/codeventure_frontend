import type { Metadata } from "next";

import { roleGate } from "../_components/role-gate";
import { StubPage } from "../_components/stub-page";

export const metadata: Metadata = {
  title: "Users — CodeVenture",
  description: "Platform user management for administrators.",
  alternates: { canonical: "/dashboard/users" },
  robots: { index: false, follow: false },
};

export default async function DashboardUsersPage() {
  await roleGate("/dashboard/users");
  return (
    <StubPage
      eyebrow="Administration"
      title="Users"
      description="Search, suspend, and audit every account on the platform."
      message="The user directory and audit log API is not yet implemented. This page is visible to platform administrators only."
    />
  );
}