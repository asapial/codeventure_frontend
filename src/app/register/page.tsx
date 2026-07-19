import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth/session";

import { RegistrationForm } from "./_components/registration-form";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Sign up for the CodeVenture client portal to manage projects, billing, and team invitations.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ invite?: string }>;
}

export default async function RegisterPage({ searchParams }: PageProps) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) {
    redirect("/account");
  }

  const inviteToken =
    sp.invite && sp.invite.length >= 20 && sp.invite.length <= 256
      ? sp.invite
      : undefined;

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-xl px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {inviteToken
              ? "You're joining an organisation. Finish a few details and you're in."
              : "Tell us a little about yourself and you're ready to go."}
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <RegistrationForm inviteToken={inviteToken} />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link href="/legal/terms-of-service" className="underline-offset-4 hover:underline">
            Terms
          </Link>
          ,{" "}
          <Link href="/legal/privacy-policy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          , and{" "}
          <Link href="/legal/acceptable-use" className="underline-offset-4 hover:underline">
            Acceptable Use
          </Link>
          .
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
