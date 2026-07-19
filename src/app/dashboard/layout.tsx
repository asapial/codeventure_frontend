import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getSession } from "@/lib/auth/session";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardHeader } from "./_components/dashboard-header";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in?from=/dashboard");
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
    avatarUrl: session.user.avatarUrl ?? null,
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100svh-4.5rem)] w-full bg-gradient-to-b from-blue-50/60 via-background to-background dark:from-blue-950/20">
        <DashboardSidebar user={user} />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader user={user} />
          {/* Desktop inline trigger so the keyboard shortcut + manual collapse
              still works above the lg breakpoint where the sidebar is
              persistent. */}
          <div className="hidden items-center gap-2 px-6 pt-4 lg:flex">
            <SidebarTrigger className="-ml-1" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {user.role}
            </span>
          </div>
          <main
            className="min-w-0 flex-1 px-4 pb-10 pt-2 sm:px-6 lg:px-8 lg:pt-4"
            aria-label="Dashboard content"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}