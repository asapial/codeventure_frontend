import type { QuoteServicesResponse } from "@/types/quote";

/**
 * Temporary local content for the request-a-quote service options.
 * Replace this module with the public quote services API once the CMS/server phase begins.
 */
export const quoteServices: QuoteServicesResponse = {
  services: [
    {
      slug: "product-design",
      name: "Product Design",
      category: "design",
    },
    {
      slug: "product-engineering",
      name: "Product Engineering",
      category: "build",
    },
    {
      slug: "ecommerce-systems",
      name: "Ecommerce Systems",
      category: "build",
    },
    {
      slug: "ai-automation",
      name: "AI & Automation",
      category: "build",
    },
    {
      slug: "cloud-devops",
      name: "Cloud & DevOps",
      category: "operate",
    },
    {
      slug: "growth-optimization",
      name: "Growth Optimization",
      category: "operate",
    },
  ],
};