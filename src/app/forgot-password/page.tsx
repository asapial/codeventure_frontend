import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/shared/auth-shell";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata: Metadata = { title: "Forgot password", description: "Reset your CodeVenture account password.", alternates: { canonical: "/forgot-password" }, robots: { index: false, follow: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthShell eyebrow="Account recovery" title="Reset your password" description="Enter your email and we’ll send you a secure link to choose a new password."
      after={<><span>Remembered it? </span><Link href="/sign-in" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">Back to sign in</Link></>}>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
