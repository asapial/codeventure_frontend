import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSession } from "@/lib/auth/session";

import { AccountSidebar } from "./_components/account-sidebar";

interface Props {
  children: ReactNode;
}

export default async function AccountLayout({ children }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in?from=/account");
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <AccountSidebar
          user={{
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
          }}
        />
        <section className="min-w-0" aria-label="Account content">
          {children}
        </section>
      </div>
    </div>
  );
}