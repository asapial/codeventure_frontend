import type { AboutPage } from "@/types/about";

/**
 * Temporary local content for the about page.
 * Replace this module with the public about API once the CMS/server phase begins.
 */
export const aboutPage: AboutPage = {
  headline: "We design, build, and operate digital products that grow businesses.",
  intro: "CodeVenture is a focused product studio — a small senior team that ships meaningful digital products with the people who need them.",
  mission:
    "Our mission is to make great digital products feel accessible, dependable, and useful — for the teams that build them and the people who rely on them every day.\n\nWe believe software should be crafted, not assembled. We invest in the early decisions so the long-term outcomes are easier, calmer, and more valuable.",
  values: [
    {
      title: "Craft first",
      description: "We care about the small details — typography, motion, performance — because they shape how a product feels to use.",
    },
    {
      title: "Senior, hands-on",
      description: "The people you meet are the people doing the work. No handoffs, no theatre, no surprise subcontracting.",
    },
    {
      title: "Long-term thinking",
      description: "We optimise for products that age well: clean code, clear architecture, and decisions that respect the next five years.",
    },
    {
      title: "Honest communication",
      description: "Weekly working progress, visible trade-offs, and a clear point of view when you need one.",
    },
    {
      title: "Outcome-focused",
      description: "We measure success by the business and user outcomes we move, not the number of tickets we close.",
    },
    {
      title: "Built to scale",
      description: "Security, performance, and operability are part of the build — not a retrofit the day before launch.",
    },
  ],
  milestones: [
    {
      year: 2018,
      title: "CodeVenture founded",
      description: "Started as a two-person studio helping early-stage teams ship their first commercial products.",
    },
    {
      year: 2020,
      title: "First long-term engagements",
      description: "Began multi-year partnerships with SaaS, commerce, and health-tech teams across three continents.",
    },
    {
      year: 2022,
      title: "Design and engineering united",
      description: "Brought product design and full-stack engineering under one roof for clearer decisions and faster delivery.",
    },
    {
      year: 2024,
      title: "AI and automation practice",
      description: "Established a focused practice for practical AI features, workflow automation, and intelligent integrations.",
    },
    {
      year: 2026,
      title: "Studio of senior partners",
      description: "A senior-only team of product designers, engineers, and operators working as an embedded product partner.",
    },
  ],
  team: [
    {
      name: "Asad Piyal",
      role: "Founder · Product Engineering",
      bio: "Designs and ships the product. Full-stack by trade, product-minded by default.",
      photoUrl: null,
    },
    {
      name: "Maya Chen",
      role: "Design Partner",
      bio: "Leads product design — research, systems, and the craft that makes complex software feel simple.",
      photoUrl: null,
    },
    {
      name: "Daniel Okonkwo",
      role: "Engineering Partner",
      bio: "Builds the foundations that keep products fast, secure, and easy to evolve as the business grows.",
      photoUrl: null,
    },
    {
      name: "Priya Raman",
      role: "Growth & SEO Partner",
      bio: "Turns a well-built product into something measurable — analytics, search, and conversion work that compounds.",
      photoUrl: null,
    },
    {
      name: "Lukas Weber",
      role: "Cloud & DevOps Partner",
      bio: "Owns the platform side: deployment, observability, and the calm infrastructure that lets teams ship with confidence.",
      photoUrl: null,
    },
    {
      name: "Sara Mendes",
      role: "Product Operations",
      bio: "Keeps delivery visible and calm — scope, prioritisation, and the kind of operational clarity that lets great work happen.",
      photoUrl: null,
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect — Associate",
      issuer: "Amazon Web Services",
      year: 2024,
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      year: 2023,
    },
    {
      name: "Certified Scrum Product Owner",
      issuer: "Scrum Alliance",
      year: 2022,
    },
    {
      name: "Vercel Enterprise Partner",
      issuer: "Vercel",
      year: 2025,
    },
  ],
};