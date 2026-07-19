import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { TwoFactorForm } from "./_components/two-factor-form";

export const metadata: Metadata = {
  title: "Two-factor verification",
  description:
    "Confirm the 6-digit code we sent to your email to finish signing in to the CodeVenture client portal.",
  alternates: { canonical: "/login/2fa" },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    challenge?: string;
    method?: string;
    from?: string;
  }>;
}

export default async function TwoFactorPage({ searchParams }: PageProps) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) {
    redirect(sp.from && sp.from.startsWith("/") ? sp.from : "/account");
  }

  // The challenge token is required. Without one, bounce the visitor back to
  // sign-in so they can re-issue a challenge.
  if (!sp.challenge || sp.challenge.length < 20) {
    redirect("/sign-in?reason=challenge_missing");
  }

  const method = sp.method === "recovery-code" ? "recovery-code" : "email-otp";

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-md px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Two-factor verification
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {method === "recovery-code"
              ? "Enter one of the recovery codes we showed when you enrolled 2FA."
              : "We sent a 6-digit code to your email. Enter it below to finish signing in."}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <TwoFactorForm
            challengeToken={sp.challenge}
            method={method}
            redirectTo={sp.from ?? "/account"}
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Lost access?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in another way
          </Link>
        </p>
      </section>
    </div>
  );
}
