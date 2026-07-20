import type { Metadata } from "next";

import { ApiError } from "@/lib/api/client";
import { fetchOnboarding } from "@/lib/api/portal";

import { roleGate } from "../_components/role-gate";
import { OnboardingView } from "./_components/onboarding-view";
import { OnboardingViewFallback } from "./_components/onboarding-view-fallback";

export const metadata: Metadata = {
  title: "Onboarding — CodeVenture",
  description:
    "Complete your workspace onboarding — contact, business, brand, and team.",
  alternates: { canonical: "/dashboard/onboarding" },
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  await roleGate("/dashboard/onboarding");

  try {
    const state = await fetchOnboarding();
    return <OnboardingView state={state} />;
  } catch (err) {
    if (err instanceof ApiError) {
      return (
        <OnboardingViewFallback
          message={
            err.status === 401
              ? "Please sign in to finish setting up your workspace."
              : err.body?.message ??
                "We couldn't load your onboarding state. Please try again."
          }
        />
      );
    }
    return (
      <OnboardingViewFallback message="We couldn't load your onboarding state. Please try again." />
    );
  }
}
