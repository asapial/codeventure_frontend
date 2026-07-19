import type { Metadata } from "next";

import { roleGate } from "../_components/role-gate";
import { StubPage } from "../_components/stub-page";

export const metadata: Metadata = {
  title: "Review queue — CodeVenture",
  description: "Content moderation and review queue.",
  alternates: { canonical: "/dashboard/review" },
  robots: { index: false, follow: false },
};

export default async function DashboardReviewPage() {
  await roleGate("/dashboard/review");
  return (
    <StubPage
      eyebrow="Moderation"
      title="Review queue"
      description="Moderate user-submitted content and queued reviews."
      message="The review queue API is not yet implemented. This page is visible to platform administrators and moderators only."
    />
  );
}