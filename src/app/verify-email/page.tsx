import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth/session";

import { VerifyEmailForm } from "./_components/verify-email-form";

export const metadata: Metadata = {
  title: "Verify your email",
  description:
    "Enter the 6-digit code we emailed you — or open the magic link — to verify your CodeVenture account.",
  alternates: { canonical: "/verify-email" },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ email?: string; token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) {
    redirect("/account");
  }

  const initialEmail = sp.email ?? "";
  // Pre-fill the token field if the user clicked the magic link.
  const initialToken = sp.token && sp.token.length >= 20 ? sp.token : "";

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-md px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Verify your email
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the 6-digit code we sent, or open the magic link from your
            inbox.
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <VerifyEmailForm initialEmail={initialEmail} initialToken={initialToken} />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Wrong address?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in instead
          </Link>
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
