import type { HomePage } from "@/types/home";

/**
 * Temporary local content for the landing page.
 * Replace this module with the public home API once the CMS/server phase begins.
 */
export const homePage: HomePage = {
  heroHeadline: "We turn ambitious ideas into digital products people love.",
  heroSubheadline:
    "CodeVenture is a product engineering studio for teams that care about craft, speed, and meaningful business outcomes.",
  primaryCta: { label: "Start your project", url: "/request-quote" },
  secondaryCta: { label: "See our work", url: "#work" },
  outcomeMetrics: [
    { value: "Senior", label: "specialists from day one", description: "Direct access to the people designing and building your product." },
    { value: "Weekly", label: "visible delivery progress", description: "Working software, clear decisions, and no mystery status reports." },
    { value: "End-to-end", label: "ownership from idea to scale", description: "One accountable team across strategy, design, and engineering." },
  ],
  trustSignals: [
    { value: "Next.js", label: "products" },
    { value: "Node.js", label: "platforms" },
    { value: "Cloud", label: "infrastructure" },
    { value: "AI", label: "integrations" },
  ],
  featuredServices: [
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944101",
      slug: "web-development",
      name: "Product engineering",
      summary: "Scalable web applications and SaaS platforms built for real users, real growth, and long-term ownership.",
      category: "build",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944102",
      slug: "ecommerce",
      name: "eCommerce systems",
      summary: "High-converting storefronts and custom commerce workflows that make complex operations feel simple.",
      category: "build",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944103",
      slug: "seo-growth",
      name: "AI & automation",
      summary: "Useful AI features, intelligent workflows, and integrations that save teams time and sharpen decisions.",
      category: "operate",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944104",
      slug: "product-design",
      name: "Product design",
      summary: "Clear user journeys and polished interfaces that make sophisticated products easy to understand and use.",
      category: "design",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944105",
      slug: "cloud-devops",
      name: "Cloud & DevOps",
      summary: "Secure deployment, monitoring, and infrastructure designed to keep your product fast and dependable.",
      category: "operate",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944106",
      slug: "growth-optimization",
      name: "Growth optimization",
      summary: "Performance, analytics, and search improvements that turn product quality into measurable momentum.",
      category: "operate",
    },
  ],
  featuredCases: [
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940101",
      slug: "fintech-operations-platform",
      title: "A clearer operating system for a fast-moving fintech team",
      summary: "We unified fragmented workflows into one calm, role-aware platform that made everyday decisions faster.",
      industry: "Fintech · Solution concept",
      outcome: "Designed to reduce manual operations and speed up decisions",
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940102",
      slug: "global-commerce-rebuild",
      title: "Rebuilding global commerce around speed and conversion",
      summary: "A performance-first storefront and flexible content system designed for rapid campaign launches.",
      industry: "Commerce · Solution concept",
      outcome: "Designed to improve speed, merchandising, and checkout clarity",
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940103",
      slug: "healthcare-intelligence-suite",
      title: "Making complex healthcare data useful at a glance",
      summary: "We turned dense operational data into an accessible intelligence suite for distributed care teams.",
      industry: "HealthTech · Solution concept",
      outcome: "Designed to make reporting faster and easier across care teams",
    },
  ],
  testimonials: [],
};
