import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { AuthShell } from "@/components/shared/auth-shell";
import { TwoFactorForm } from "./_components/two-factor-form";

export const metadata: Metadata = { title: "Two-factor verification", description: "Finish signing in to the CodeVenture client portal.", alternates: { canonical: "/login/2fa" }, robots: { index: false, follow: false } };

export default async function TwoFactorPage({ searchParams }: { searchParams: Promise<{ challenge?: string; method?: string; from?: string }> }) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) redirect(sp.from && sp.from.startsWith("/") ? sp.from : "/dashboard");
  if (!sp.challenge || sp.challenge.length < 20) redirect("/sign-in?reason=challenge_missing");
  const method = sp.method === "recovery-code" ? "recovery-code" : "email-otp";
  return (
    <AuthShell
      variant="two-factor"
      eyebrow="Security check"
      title="Confirm it’s you"
      description={method === "recovery-code" ? "Enter one of the recovery codes saved when you enabled two-factor authentication." : "Enter the six-digit code we sent to your email to finish signing in."}
      after={<><span>Lost access? </span><Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Sign in another way</Link></>}>
      <TwoFactorForm challengeToken={sp.challenge} method={method} redirectTo={sp.from ?? "/dashboard"} />
    </AuthShell>
  );
}
