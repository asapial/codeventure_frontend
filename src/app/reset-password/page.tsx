import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/shared/auth-shell";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = { title: "Reset password", description: "Set a new password for your CodeVenture account.", alternates: { canonical: "/reset-password" }, robots: { index: false, follow: false } };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const token = (await searchParams).token?.trim();
  if (!token) redirect("/forgot-password");
  return (
    <AuthShell
      variant="reset"
      eyebrow="Secure your account"
      title="Choose a new password"
      description="Use a strong, unique password you don’t use anywhere else."
      after={<><span>Link expired? </span><Link href="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Request a new one</Link></>}>
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
