import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchProjectBySlug } from "@/lib/api/projects";

import { roleGate } from "../../_components/role-gate";
import { ProjectDetailView } from "./_components/project-detail-view";

interface Props {
  params: Promise<{ slug: string }>;
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

export default async function DashboardProjectDetailPage({ params }: Props) {
  await roleGate("/dashboard/projects");
  const { slug } = await params;
  let project;
  try {
    project = await fetchProjectBySlug(slug);
  } catch {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}