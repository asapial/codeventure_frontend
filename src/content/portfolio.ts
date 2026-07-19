import type {
  CaseStudyDetail,
  PortfolioList,
} from "@/types/portfolio";

/**
 * Temporary local content for the portfolio grid and per-case study detail.
 * Replace this module with the public portfolio API once the CMS/server phase begins.
 */
export const portfolioList: PortfolioList = {
  cases: [
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940101",
      slug: "fintech-operations-platform",
      title: "A clearer operating system for a fast-moving fintech team",
      summary:
        "We unified fragmented workflows into one calm, role-aware platform that made everyday decisions faster.",
      thumbnailUrl: null,
      thumbnailAlt: "Operations platform dashboard concept",
      industry: "Fintech",
      serviceSlugs: ["product-engineering", "product-design"],
      publishedAt: "2026-04-18",
      featured: true,
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940102",
      slug: "global-commerce-rebuild",
      title: "Rebuilding global commerce around speed and conversion",
      summary:
        "A performance-first storefront and flexible content system designed for rapid campaign launches.",
      thumbnailUrl: null,
      thumbnailAlt: "Global storefront visual",
      industry: "Commerce",
      serviceSlugs: ["ecommerce-systems", "growth-optimization"],
      publishedAt: "2026-03-05",
      featured: true,
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940103",
      slug: "healthcare-intelligence-suite",
      title: "Making complex healthcare data useful at a glance",
      summary:
        "We turned dense operational data into an accessible intelligence suite for distributed care teams.",
      thumbnailUrl: null,
      thumbnailAlt: "Healthcare intelligence visual",
      industry: "HealthTech",
      serviceSlugs: ["product-design", "ai-automation"],
      publishedAt: "2026-02-12",
      featured: true,
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940104",
      slug: "industrial-logistics-portal",
      title: "A single source of truth for a logistics network",
      summary:
        "Replacing spreadsheets with a calm, role-aware operations portal for dispatch, fleet, and finance teams.",
      thumbnailUrl: null,
      thumbnailAlt: "Logistics portal visual",
      industry: "Logistics",
      serviceSlugs: ["product-engineering", "product-design"],
      publishedAt: "2026-01-22",
      featured: false,
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940105",
      slug: "education-platform-redesign",
      title: "A calmer learning platform for working professionals",
      summary:
        "Reimagining a 10-year-old education platform around the way modern learners actually manage a career.",
      thumbnailUrl: null,
      thumbnailAlt: "Education platform visual",
      industry: "EdTech",
      serviceSlugs: ["product-design", "growth-optimization"],
      publishedAt: "2025-12-04",
      featured: false,
    },
    {
      id: "832bb882-cc23-4462-b5ba-8c508e940106",
      slug: "ai-support-copilot",
      title: "An AI support copilot for a growing B2B SaaS team",
      summary:
        "Building a grounded, evaluated assistant that helps agents close tickets faster without inventing answers.",
      thumbnailUrl: null,
      thumbnailAlt: "AI support copilot visual",
      industry: "SaaS",
      serviceSlugs: ["ai-automation", "product-engineering"],
      publishedAt: "2025-10-30",
      featured: false,
    },
  ],
  industries: [
    "Fintech",
    "Commerce",
    "HealthTech",
    "Logistics",
    "EdTech",
    "SaaS",
  ],
  services: [
    "product-engineering",
    "ecommerce-systems",
    "product-design",
    "ai-automation",
    "cloud-devops",
    "growth-optimization",
  ],
};

/**
 * Per case-study detail content keyed by slug.
 * Mirrors `GET /public/portfolio/:slug`.
 */
export const caseStudiesBySlug: Record<string, CaseStudyDetail> = {
  "fintech-operations-platform": {
    id: "832bb882-cc23-4462-b5ba-8c508e940101",
    slug: "fintech-operations-platform",
    title: "A clearer operating system for a fast-moving fintech team",
    summary:
      "We unified fragmented workflows into one calm, role-aware platform that made everyday decisions faster.",
    thumbnailUrl: null,
    thumbnailAlt: "Operations platform dashboard concept",
    industry: "Fintech",
    serviceSlugs: ["product-engineering", "product-design"],
    publishedAt: "2026-04-18",
    featured: true,
    clientName: "Confidential fintech partner",
    heroImageUrl: null,
    heroImageAlt: "Operations platform hero",
    problem:
      "A high-growth fintech team had outgrown the spreadsheets and stitched-together SaaS that got them to Series B.\n\nOperations worked across five different tools to answer one question: 'is this deal healthy?' The result was slow decisions, brittle reporting, and an operations team that became the bottleneck for every other function.",
    approach:
      "We embedded a senior product pod — design, engineering, and an operations strategist — and ran a four-week discovery to map the decision flows that actually mattered.\n\nFrom there we designed and shipped a single role-aware platform, replacing five tools and the weekly spreadsheet dance with one calm system the team could rely on.",
    outcome:
      "Designed to reduce manual operations and speed up decisions across deal, risk, and finance teams.\n\nThe new platform became the operating system underneath the company's next two product launches and the foundation for its Series C story.",
    metrics: [
      {
        label: "Tools consolidated",
        value: "5 → 1",
        context: "From scattered tooling to a single role-aware platform.",
      },
      {
        label: "Decision cycle time",
        value: "−62%",
        context: "Operations review cycles compressed.",
      },
      {
        label: "Weekly active operators",
        value: "94%",
        context: "Adoption inside the first 60 days.",
      },
    ],
    sections: [
      {
        heading: "Discovery first, design second",
        body: "We started with the people doing the work — risk, ops, finance — and rebuilt their actual decision flows before drawing a single screen.",
        imageUrl: null,
        imageAlt: "Discovery workshops",
      },
      {
        heading: "A platform, not a portal",
        body: "Every screen is role-aware: the same data is shown differently for a risk reviewer than for a CFO, and the system adapts as the team's needs evolve.",
        imageUrl: null,
        imageAlt: "Role-aware platform architecture",
      },
    ],
    gallery: [],
    testimonial: {
      quote:
        "CodeVenture didn't just redesign a tool. They redesigned how our team makes decisions — under our actual constraints, with our actual people.",
      authorName: "Head of Operations",
      authorRole: "Operating Partner",
      authorCompany: "Confidential fintech partner",
    },
    relatedSlugs: ["global-commerce-rebuild", "industrial-logistics-portal"],
  },

  "global-commerce-rebuild": {
    id: "832bb882-cc23-4462-b5ba-8c508e940102",
    slug: "global-commerce-rebuild",
    title: "Rebuilding global commerce around speed and conversion",
    summary:
      "A performance-first storefront and flexible content system designed for rapid campaign launches.",
    thumbnailUrl: null,
    thumbnailAlt: "Global storefront visual",
    industry: "Commerce",
    serviceSlugs: ["ecommerce-systems", "growth-optimization"],
    publishedAt: "2026-03-05",
    featured: true,
    clientName: "Confidential DTC commerce brand",
    heroImageUrl: null,
    heroImageAlt: "Storefront hero",
    problem:
      "A multi-market DTC brand had outgrown a monolith theme that made every campaign launch a four-week project.\n\nPerformance suffered, SEO was drifting, and the marketing team had started to treat the storefront as a constraint instead of an advantage.",
    approach:
      "We rebuilt the storefront on a headless commerce stack with a flexible content model — one that the marketing team could ship without engineering involvement for 80% of work, and that engineering could extend without rewrites.\n\nPerformance was treated as a product feature, not a checklist, with real-device budgets and CI gates.",
    outcome:
      "Designed to improve speed, merchandising, and checkout clarity across web and mobile.\n\nThe new storefront powers three simultaneous regional launches, a doubling of campaign throughput, and a Core Web Vitals profile that gives the SEO team something to defend.",
    metrics: [
      {
        label: "LCP (p75)",
        value: "1.2s",
        context: "From over 4s on the legacy theme.",
      },
      {
        label: "Campaign throughput",
        value: "2x",
        context: "Twice the campaigns shipped per quarter.",
      },
      {
        label: "Checkout completion",
        value: "+18%",
        context: "Clearer funnel, fewer drops.",
      },
    ],
    sections: [
      {
        heading: "Marketing and engineering parity",
        body: "We designed the content model so marketing could ship independently of engineering for most campaigns, while keeping engineering in control of the parts that actually mattered.",
        imageUrl: null,
        imageAlt: "Content model diagram",
      },
      {
        heading: "Performance as a feature",
        body: "Performance budgets, real-device CI, and a performance review baked into the definition of done — every release is fast on release day and six months later.",
        imageUrl: null,
        imageAlt: "Performance dashboard",
      },
    ],
    gallery: [],
    testimonial: {
      quote:
        "We finally have a storefront that helps our marketing team instead of gating them. The performance story alone paid for the engagement.",
      authorName: "VP, Digital",
      authorRole: "VP Digital",
      authorCompany: "Confidential DTC commerce brand",
    },
    relatedSlugs: ["fintech-operations-platform", "ai-support-copilot"],
  },

  "healthcare-intelligence-suite": {
    id: "832bb882-cc23-4462-b5ba-8c508e940103",
    slug: "healthcare-intelligence-suite",
    title: "Making complex healthcare data useful at a glance",
    summary:
      "We turned dense operational data into an accessible intelligence suite for distributed care teams.",
    thumbnailUrl: null,
    thumbnailAlt: "Healthcare intelligence visual",
    industry: "HealthTech",
    serviceSlugs: ["product-design", "ai-automation"],
    publishedAt: "2026-02-12",
    featured: true,
    clientName: "Confidential healthcare network",
    heroImageUrl: null,
    heroImageAlt: "Healthcare intelligence hero",
    problem:
      "A distributed care network had a powerful data warehouse but a thin app on top of it — clinicians spent their mornings in spreadsheets before they could spend their afternoons with patients.\n\nThe board could see the opportunity: a calmer, faster experience that turned operational data into clinical decisions.",
    approach:
      "We embedded a senior product designer and engineer pair. The first four weeks went into shadowing the people actually using the data — clinicians, ops, finance — and rebuilding their flow from the screen back.\n\nWe then shipped a role-aware intelligence suite with grounded AI summaries, designed to be auditable, summarisable, and honest about what they didn't know.",
    outcome:
      "Designed to make reporting faster and easier across distributed care teams.\n\nAdoption reached over 90% of licensed clinicians within the first 60 days, and the suite is now the foundation for the network's wider operational tooling.",
    metrics: [
      {
        label: "Morning reporting time",
        value: "−71%",
        context: "Spreadsheets replaced by dashboards + summaries.",
      },
      {
        label: "Clinician adoption",
        value: "92%",
        context: "Inside the first 60 days post-launch.",
      },
      {
        label: "Audit traceability",
        value: "100%",
        context: "Every summary links to source data.",
      },
    ],
    sections: [
      {
        heading: "Shadow then ship",
        body: "We spent four weeks shadowing the people who would use the system — clinicians, ops, finance — before drawing the first product surface.",
        imageUrl: null,
        imageAlt: "Shadowing sessions",
      },
      {
        heading: "Honest AI summaries",
        body: "Every AI summary links back to the data, includes a confidence indicator, and is auditable end-to-end. Trust comes from structure, not from keynotes.",
        imageUrl: null,
        imageAlt: "Honest AI summarisation architecture",
      },
    ],
    gallery: [],
    testimonial: {
      quote:
        "The dashboards replaced our morning spreadsheets — and the summaries link back to the data. That's the difference between AI theatre and AI we can actually use.",
      authorName: "Chief Medical Information Officer",
      authorRole: "CMIO",
      authorCompany: "Confidential healthcare network",
    },
    relatedSlugs: ["ai-support-copilot", "education-platform-redesign"],
  },

  "industrial-logistics-portal": {
    id: "832bb882-cc23-4462-b5ba-8c508e940104",
    slug: "industrial-logistics-portal",
    title: "A single source of truth for a logistics network",
    summary:
      "Replacing spreadsheets with a calm, role-aware operations portal for dispatch, fleet, and finance teams.",
    thumbnailUrl: null,
    thumbnailAlt: "Logistics portal visual",
    industry: "Logistics",
    serviceSlugs: ["product-engineering", "product-design"],
    publishedAt: "2026-01-22",
    featured: false,
    clientName: "Confidential logistics operator",
    heroImageUrl: null,
    heroImageAlt: "Logistics portal hero",
    problem:
      "A regional logistics operator ran its network across three spreadsheets, two whiteboards, and a custom Excel macro that nobody else could touch.\n\nReporting was unreliable. Decisions were late. People were burning out.",
    approach:
      "We built a calm, role-aware portal for the dispatch, fleet, and finance teams — replacing the spreadsheets without forcing them to relearn their jobs.\n\nWe leaned on operability: every screen is keyboard-first, every action reversible, every exportable.",
    outcome:
      "Designed to give dispatchers, fleet managers, and finance one shared view of the operation — without the spreadsheets.",
    metrics: [
      {
        label: "Daily active users",
        value: "240+",
        context: "Across three regional hubs.",
      },
      {
        label: "Spreadsheets retired",
        value: "9",
        context: "All consolidated into the portal.",
      },
    ],
    sections: [],
    gallery: [],
    testimonial: null,
    relatedSlugs: ["fintech-operations-platform"],
  },

  "education-platform-redesign": {
    id: "832bb882-cc23-4462-b5ba-8c508e940105",
    slug: "education-platform-redesign",
    title: "A calmer learning platform for working professionals",
    summary:
      "Reimagining a 10-year-old education platform around the way modern learners actually manage a career.",
    thumbnailUrl: null,
    thumbnailAlt: "Education platform visual",
    industry: "EdTech",
    serviceSlugs: ["product-design", "growth-optimization"],
    publishedAt: "2025-12-04",
    featured: false,
    clientName: "Confidential education brand",
    heroImageUrl: null,
    heroImageAlt: "Education platform hero",
    problem:
      "A long-running education brand had a learning platform that looked great in a brochure and felt punishing in real life.\n\nWorking professionals — their most valuable learners — were churning faster than the marketing team could replace them.",
    approach:
      "We ran a discovery sprint with the people who actually used the platform, redesigned the core learning flow, and shipped a calmer IA that respected how adults manage a career.\n\nWe instrumented the funnel and ran experiments on the highest-friction moments.",
    outcome:
      "Designed to make the learning flow feel calmer, clearer, and more honest about time.",
    metrics: [
      {
        label: "Time to first lesson",
        value: "−45%",
        context: "Fewer clicks, clearer nav.",
      },
      {
        label: "30-day retention",
        value: "+22%",
        context: "Working professionals stayed longer.",
      },
    ],
    sections: [],
    gallery: [],
    testimonial: null,
    relatedSlugs: ["healthcare-intelligence-suite"],
  },

  "ai-support-copilot": {
    id: "832bb882-cc23-4462-b5ba-8c508e940106",
    slug: "ai-support-copilot",
    title: "An AI support copilot for a growing B2B SaaS team",
    summary:
      "Building a grounded, evaluated assistant that helps agents close tickets faster without inventing answers.",
    thumbnailUrl: null,
    thumbnailAlt: "AI support copilot visual",
    industry: "SaaS",
    serviceSlugs: ["ai-automation", "product-engineering"],
    publishedAt: "2025-10-30",
    featured: false,
    clientName: "Confidential B2B SaaS team",
    heroImageUrl: null,
    heroImageAlt: "AI support copilot hero",
    problem:
      "A B2B SaaS team had grown faster than its support organisation — agents were drowning in tickets, and the few seniors were doing most of the answers.\n\nA blanket 'use AI' memo wasn't going to cut it.",
    approach:
      "We built a grounded, evaluated copilot that sits next to the agent in the existing helpdesk UI.\n\nIt retrieves from the company's own documentation, drafts responses the agent can edit, and never publishes directly. Every interaction is evaluated against a curated test set so quality is observable, not vibes.",
    outcome:
      "Designed to help senior agents spend less time writing and more time mentoring — without putting customer trust at risk.",
    metrics: [
      {
        label: "Average reply time",
        value: "−38%",
        context: "Without changing reply quality.",
      },
      {
        label: "Agents using it weekly",
        value: "100%",
        context: "Adoption across the support team.",
      },
      {
        label: "Hallucination incidents",
        value: "0",
        context: "Disclosed, evaluated, gatekept.",
      },
    ],
    sections: [],
    gallery: [],
    testimonial: null,
    relatedSlugs: ["healthcare-intelligence-suite", "global-commerce-rebuild"],
  },
};
