import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthShell } from "@/components/shared/auth-shell";
import { VerifyEmailForm } from "./_components/verify-email-form";

export const metadata: Metadata = { title: "Verify your email", description: "Verify your CodeVenture account email.", alternates: { canonical: "/verify-email" }, robots: { index: false, follow: false } };

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ email?: string; token?: string }> }) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) redirect("/account");
  const initialToken = sp.token && sp.token.length >= 20 ? sp.token : "";
  return (
    <AuthShell eyebrow="One quick step" title="Verify your email" description="Enter the six-digit code from your inbox or use the secure verification link we sent."
      after={<><span>Wrong address? </span><Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Sign in instead</Link></>}>
      <VerifyEmailForm initialEmail={sp.email ?? ""} initialToken={initialToken} />
    </AuthShell>
  );
}
