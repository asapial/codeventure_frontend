import type { Metadata } from "next";

import { fetchAccountSummary } from "@/lib/api/account";

import { AccountOverview } from "./_components/account-overview";

export const metadata: Metadata = {
  title: "Account",
  description: "Your CodeVenture client account overview.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const summary = await fetchAccountSummary();
  return <AccountOverview summary={summary} />;
}