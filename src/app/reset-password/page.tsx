import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new password for your CodeVenture account.",
  alternates: { canonical: "/reset-password" },
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = sp.token?.trim();

  if (!token) {
    // Without a token there is nothing useful to render — send them back to
    // the forgot-password flow.
    redirect("/forgot-password");
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <section className="container mx-auto max-w-md px-4 py-16">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Set a new password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a strong password you don&rsquo;t use elsewhere.
          </p>
        </header>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <ResetPasswordForm token={token} />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Token expired?{" "}
          <Link
            href="/forgot-password"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Request a new link
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


