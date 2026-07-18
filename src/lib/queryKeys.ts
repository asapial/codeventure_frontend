/**
 * Centralized TanStack Query key factory.
 *
 * Pattern mirrors the skill: keep keys hierarchical so a mutation can
 * invalidate the whole feature via `featureKeys.all`.
 */
export const homeKeys = {
  all: ["home"] as const,
  detail: () => [...homeKeys.all, "detail"] as const,
};

export const portfolioKeys = {
  all: ["portfolio"] as const,
  featured: () => [...portfolioKeys.all, "featured"] as const,
  byService: (serviceSlug: string) =>
    [...portfolioKeys.all, "service", serviceSlug] as const,
};

export const testimonialKeys = {
  all: ["testimonials"] as const,
  featured: () => [...testimonialKeys.all, "featured"] as const,
};

export const serviceKeys = {
  all: ["services"] as const,
  list: () => [...serviceKeys.all, "list"] as const,
  detail: (slug: string) => [...serviceKeys.all, "detail", slug] as const,
};
