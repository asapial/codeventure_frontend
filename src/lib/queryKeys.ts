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

export const contactKeys = {
  all: ["public:contact"] as const,
  details: () => ["public:contact", "details"] as const,
};

export const quoteKeys = {
  all: ["quotes"] as const,
  services: () => [...quoteKeys.all, "services"] as const,
  draft: (id: string) => [...quoteKeys.all, "draft", id] as const,
};

export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

export const accountKeys = {
  all: ["account"] as const,
  summary: () => [...accountKeys.all, "summary"] as const,
};

export const projectKeys = {
  all: ["projects"] as const,
  list: (q: { status?: string; search?: string }) =>
    [...projectKeys.all, "list", q] as const,
  detail: (slug: string) => [...projectKeys.all, "detail", slug] as const,
};
