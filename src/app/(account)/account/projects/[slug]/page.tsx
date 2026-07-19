import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchProjectBySlug } from "@/lib/api/projects";

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
      alternates: { canonical: `/account/projects/${project.slug}` },
      robots: { index: false, follow: false },
    };
  } catch {
    return {
      title: "Project — CodeVenture",
      robots: { index: false, follow: false },
    };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  let project;
  try {
    project = await fetchProjectBySlug(slug);
  } catch {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}