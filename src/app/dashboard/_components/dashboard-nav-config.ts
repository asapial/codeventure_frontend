/**
 * Role-aware dashboard navigation.
 *
 * The frontend's `SessionUser.role` mirrors the backend's `AccountRole`
 * (owner | admin | editor | viewer). Each role gets a nav tailored to what
 * they should actually see inside their workspace — OWNER sees Members and
 * Billing, ADMIN sees Users and Inquiries (platform-wide tools), EDITOR and
 * VIEWER see just Projects + Settings.
 */
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Mail,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
  UsersRound,
} from "lucide-react";
import type { SessionUser } from "@/types/auth";

export type DashboardRole = SessionUser["role"];

export interface NavItem {
  href: string;
  label: string;
  description?: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

const BASE = "/dashboard";

export const dashboardNavByRole: Record<DashboardRole, NavGroup[]> = {
  owner: [
    {
      label: "Workspace",
      items: [
        {
          href: BASE,
          label: "Overview",
          icon: LayoutDashboard,
          description: "Workspace snapshot",
        },
        {
          href: `${BASE}/projects`,
          label: "Projects",
          icon: FolderKanban,
          description: "Your engagements with CodeVenture",
        },
        {
          href: `${BASE}/members`,
          label: "Members",
          icon: UsersRound,
          description: "Invite teammates to your workspace",
        },
        {
          href: `${BASE}/billing`,
          label: "Billing",
          icon: ReceiptText,
          description: "Invoices, payment methods, plans",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          href: `${BASE}/settings`,
          label: "Settings",
          icon: Settings,
          description: "Profile, password, notifications",
        },
      ],
    },
  ],

  admin: [
    {
      label: "Operations",
      items: [
        {
          href: BASE,
          label: "Overview",
          icon: LayoutDashboard,
          description: "Platform-wide snapshot",
        },
        {
          href: `${BASE}/users`,
          label: "Users",
          icon: Users,
          description: "Manage platform accounts",
        },
        {
          href: `${BASE}/inquiries`,
          label: "Inquiries",
          icon: Mail,
          description: "Quote requests and contact form submissions",
        },
        {
          href: `${BASE}/projects`,
          label: "All Projects",
          icon: FolderKanban,
          description: "Projects across every workspace",
        },
      ],
    },
    {
      label: "Moderation",
      items: [
        {
          href: `${BASE}/review`,
          label: "Review queue",
          icon: ClipboardList,
          description: "Content awaiting moderation",
        },
        {
          href: `${BASE}/reports`,
          label: "Reports",
          icon: BarChart3,
          description: "Operational and engagement reports",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          href: `${BASE}/settings`,
          label: "Settings",
          icon: Settings,
          description: "Profile, password, notifications",
        },
      ],
    },
  ],

  editor: [
    {
      label: "Workspace",
      items: [
        {
          href: BASE,
          label: "Overview",
          icon: LayoutDashboard,
          description: "What you're working on",
        },
        {
          href: `${BASE}/projects`,
          label: "Projects",
          icon: FolderKanban,
          description: "Projects you can edit",
        },
      ],
    },
    {
      label: "Moderation",
      items: [
        {
          href: `${BASE}/review`,
          label: "Review queue",
          icon: ClipboardList,
          description: "Content awaiting moderation",
        },
        {
          href: `${BASE}/reports`,
          label: "Reports",
          icon: BarChart3,
          description: "Operational and engagement reports",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          href: `${BASE}/settings`,
          label: "Settings",
          icon: Settings,
          description: "Profile, password, notifications",
        },
        {
          href: `${BASE}/permissions`,
          label: "My Permissions",
          icon: ShieldCheck,
          description: "What you can and cannot do",
        },
      ],
    },
  ],

  viewer: [
    {
      label: "Workspace",
      items: [
        {
          href: BASE,
          label: "Overview",
          icon: LayoutDashboard,
          description: "Read-only summary",
        },
        {
          href: `${BASE}/projects`,
          label: "Projects",
          icon: FolderKanban,
          description: "Projects you can view",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          href: `${BASE}/settings`,
          label: "Settings",
          icon: Settings,
          description: "Profile, password, notifications",
        },
        {
          href: `${BASE}/permissions`,
          label: "My Permissions",
          icon: ShieldCheck,
          description: "What you can and cannot do",
        },
      ],
    },
  ],
};

/** Roles that may visit a given pathname prefix. Used by `role-gate`. */
export const pageAllowedRoles: Record<string, ReadonlyArray<DashboardRole>> = {
  "/dashboard": ["owner", "admin", "editor", "viewer"],
  "/dashboard/projects": ["owner", "admin", "editor", "viewer"],
  "/dashboard/settings": ["owner", "admin", "editor", "viewer"],
  "/dashboard/permissions": ["editor", "viewer"],

  // Owner-only workspace management
  "/dashboard/members": ["owner"],
  "/dashboard/billing": ["owner"],

  // Admin-only platform tools
  "/dashboard/users": ["admin"],
  "/dashboard/inquiries": ["admin"],

  // Moderation surfaces (today both admin and editor can reach review/reports)
  "/dashboard/review": ["admin", "editor"],
  "/dashboard/reports": ["admin", "editor"],
};
