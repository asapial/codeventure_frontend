import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchProjectBySlug } from "@/lib/api/portal";

import { roleGate } from "../../_components/role-gate";
import { ProjectDetailView } from "./_components/project-detail-view";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await fetchProjectBySlug(slug);
    return {
      title: `${project.name} — CodeVenture`,
      description: project.description.slice(0, 160),
      alternates: { canonical: `/dashboard/projects/${project.slug}` },
      robots: { index: false, follow: false },
    };
  } catch {
    return {
      title: "Project — CodeVenture",
      robots: { index: false, follow: false },
    };
  }
}

const TAB_VALUES = [
  "overview",
  "milestones",
  "approvals",
  "files",
  "change-requests",
  "comments",
  "activity",
] as const;
type TabValue = (typeof TAB_VALUES)[number];

function isTab(value: string | undefined): value is TabValue {
  return !!value && (TAB_VALUES as readonly string[]).includes(value);
}

export default async function DashboardProjectDetailPage({
  params,
  searchParams,
}: Props) {
  await roleGate("/dashboard/projects");
  const { slug } = await params;
  const rawSearch = await searchParams;
  const initialTab: TabValue = isTab(rawSearch.tab) ? rawSearch.tab : "overview";

  let project;
  try {
    project = await fetchProjectBySlug(slug);
  } catch {
    notFound();
  }

  return <ProjectDetailView project={project} initialTab={initialTab} />;
}