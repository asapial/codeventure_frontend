"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSignOut } from "@/lib/auth/use-sign-out";
import { UserAvatar } from "./user-avatar";
import type { SessionUser } from "@/types/auth";

interface UserMenuProps {
  user: SessionUser;
}

const roleLabel: Record<SessionUser["role"], string> = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

/**
 * Account popover. Uses a native `<details>` element so we get
 * click-outside / ESC handling for free, mirroring the mobile menu
 * pattern already in use elsewhere in the navbar.
 */
export function UserMenu({ user }: UserMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { signOut, pending } = useSignOut();

  // Close when the route changes.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      const target = event.target as Node;
      if (!details.contains(target)) details.removeAttribute("open");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="group relative"
      data-pending={pending ? "true" : undefined}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-2 rounded-full p-0.5",
          "transition-all hover:bg-blue-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/40",
          "[&::-webkit-details-marker]:hidden",
        )}
        aria-label={`Open account menu for ${user.name}`}
        title={user.name}
      >
        <UserAvatar
          name={user.name}
          avatarUrl={user.avatarUrl ?? null}
          size="md"
          className="transition-transform group-hover:scale-[1.03]"
        />
        <ChevronDown
          className="size-3.5 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div
        role="menu"
        aria-label="Account menu"
        className={cn(
          "absolute right-0 top-[calc(100%+0.6rem)] z-50 w-72 overflow-hidden rounded-2xl",
          "border border-blue-100 bg-popover/95 p-2 text-popover-foreground shadow-xl shadow-blue-950/10 backdrop-blur-xl",
          "dark:border-blue-950",
        )}
      >
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 px-3 py-3 dark:from-blue-950/40 dark:to-indigo-950/40">
          <UserAvatar
            name={user.name}
            avatarUrl={user.avatarUrl ?? null}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            <Badge
              variant="secondary"
              className="mt-1.5 border-blue-200/60 bg-blue-100 text-[10px] uppercase tracking-wider text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-300"
            >
              {roleLabel[user.role]}
            </Badge>
          </div>
        </div>

        <div className="mt-1 grid gap-0.5">
          <Link
            href="/dashboard"
            role="menuitem"
            className="group/item flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
            onClick={() => detailsRef.current?.removeAttribute("open")}
          >
            <LayoutDashboard className="size-4 text-muted-foreground group-hover/item:text-blue-600" aria-hidden="true" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/projects"
            role="menuitem"
            className="group/item flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
            onClick={() => detailsRef.current?.removeAttribute("open")}
          >
            <UserIcon className="size-4 text-muted-foreground group-hover/item:text-blue-600" aria-hidden="true" />
            Projects
          </Link>
          <Link
            href="/dashboard/settings"
            role="menuitem"
            className="group/item flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
            onClick={() => detailsRef.current?.removeAttribute("open")}
          >
            <Settings className="size-4 text-muted-foreground group-hover/item:text-blue-600" aria-hidden="true" />
            Settings
          </Link>
        </div>

        <div className="mx-2 my-1 h-px bg-border" />

        <button
          type="button"
          role="menuitem"
          onClick={signOut}
          disabled={pending}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-foreground",
            "transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "dark:hover:bg-red-950/40 dark:hover:text-red-300",
            "disabled:opacity-60 disabled:pointer-events-none",
          )}
        >
          <LogOut className="size-4 text-muted-foreground" aria-hidden="true" />
          {pending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </details>
  );
}