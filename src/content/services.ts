import type {
  ServiceDetail,
  ServicesList,
} from "@/types/service";

/**
 * Temporary local content for the services catalogue and per-service detail.
 * Replace this module with the public services API once the CMS/server phase begins.
 */
export const servicesList: ServicesList = {
  services: [
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944101",
      slug: "product-engineering",
      name: "Product engineering",
      summary:
        "Scalable web applications and SaaS platforms built for real users, real growth, and long-term ownership.",
      category: "build",
      startingPriceText: "From $25K",
      iconKey: "code-xml",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944102",
      slug: "ecommerce-systems",
      name: "eCommerce systems",
      summary:
        "High-converting storefronts and custom commerce workflows that make complex operations feel simple.",
      category: "build",
      startingPriceText: "From $20K",
      iconKey: "shopping-bag",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944104",
      slug: "product-design",
      name: "Product design",
      summary:
        "Clear user journeys and polished interfaces that make sophisticated products easy to understand and use.",
      category: "design",
      startingPriceText: "From $15K",
      iconKey: "palette",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944103",
      slug: "ai-automation",
      name: "AI & automation",
      summary:
        "Useful AI features, intelligent workflows, and integrations that save teams time and sharpen decisions.",
      category: "operate",
      startingPriceText: "From $18K",
      iconKey: "bot",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944105",
      slug: "cloud-devops",
      name: "Cloud & DevOps",
      summary:
        "Secure deployment, monitoring, and infrastructure designed to keep your product fast and dependable.",
      category: "operate",
      startingPriceText: "From $12K",
      iconKey: "cloud-cog",
    },
    {
      id: "6d80ee9a-9f07-4ee1-bb8f-37873c944106",
      slug: "growth-optimization",
      name: "Growth optimization",
      summary:
        "Performance, analytics, and search improvements that turn product quality into measurable momentum.",
      category: "operate",
      startingPriceText: "From $10K",
      iconKey: "trending-up",
    },
  ],
};

/**
 * Per-service detail content keyed by slug.
 * Mirrors `GET /public/services/:slug`.
 */
export const servicesBySlug: Record<string, ServiceDetail> = {
  "product-engineering": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944101",
    slug: "product-engineering",
    name: "Product engineering",
    summary:
      "Scalable web applications and SaaS platforms built for real users, real growth, and long-term ownership.",
    category: "build",
    startingPriceText: "From $25K",
    iconKey: "code-xml",
    heroImageUrl: null,
    description:
      "We engineer full-stack web products with a senior team that owns the architecture, the build, and the runway beyond launch.\n\nYou work directly with the engineers writing the code — no layered account management, no surprise subcontracting. From the first commit to the first million users, we focus on performance, clarity, and the boring infrastructure that keeps great products alive.",
    deliverables: [
      {
        title: "Architecture and stack design",
        description: "A pragmatic, scalable architecture aligned with your team, constraints, and 3-year roadmap.",
      },
      {
        title: "Full-stack implementation",
        description: "Type-safe APIs, performant UI, accessible interfaces, and clean tests you can actually maintain.",
      },
      {
        title: "Auth, billing, and integrations",
        description: "Real-world product plumbing wired to Stripe, webhooks, queues, and third-party APIs.",
      },
      {
        title: "Observability and operability",
        description: "Logging, error tracking, feature flags, and the runbooks your team will thank us for.",
      },
      {
        title: "Performance and accessibility",
        description: "Lighthouse-friendly, keyboard-complete, and benchmarked against real device conditions.",
      },
      {
        title: "Hand-off and partnership",
        description: "Documentation, recorded walkthroughs, and an engineering team you can call after launch.",
      },
    ],
    pricingTiers: [
      {
        name: "Launch",
        priceText: "From $25K",
        description: "Sharpen one critical product surface and ship it to real users.",
        features: [
          "Defined MVP scope and roadmap",
          "Senior full-stack build",
          "Hosted preview + production launch",
          "Handover documentation",
        ],
      },
      {
        name: "Build",
        priceText: "From $60K",
        description: "Multi-feature product build with continuous delivery over 8–12 weeks.",
        features: [
          "Dedicated senior pod",
          "Weekly working releases",
          "Design + engineering parity",
          "Analytics + observability",
          "Optional ongoing partnership",
        ],
        highlighted: true,
      },
      {
        name: "Partnership",
        priceText: "From $20K / month",
        description: "Embedded product team for products already in market and ready to grow.",
        features: [
          "Embedded squad of 3–5 specialists",
          "Roadmap ownership",
          "Continuous improvement cadence",
          "Long-term architecture stewardship",
        ],
      },
    ],
    faqs: [
      {
        question: "Which stack do you recommend?",
        answer:
          "We default to TypeScript end-to-end — Next.js or Remix on the front, Node.js (Nest/Fastify) or your existing backend on the server. We adapt to your team's strengths rather than forcing a green-field rewrite.",
      },
      {
        question: "Do you sign NDAs and IP agreements?",
        answer:
          "Yes — confidentiality and clean IP transfer are standard in our engagements.",
      },
      {
        question: "How do you handle support after launch?",
        answer:
          "Every product build includes a 30-day post-launch stabilisation window. Most clients move into a Partnership tier for ongoing engineering, observability, and roadmap work.",
      },
      {
        question: "Can you integrate with my in-house team?",
        answer:
          "Absolutely. We regularly embed alongside internal product, design, and platform teams and adapt to your rituals, tooling, and codebases.",
      },
    ],
    relatedCaseStudies: [
      {
        slug: "fintech-operations-platform",
        title: "A clearer operating system for a fast-moving fintech team",
        industry: "Fintech",
        summary:
          "Unified fragmented workflows into one calm, role-aware platform that made everyday decisions faster.",
        thumbnailUrl: null,
      },
      {
        slug: "global-commerce-rebuild",
        title: "Rebuilding global commerce around speed and conversion",
        industry: "Commerce",
        summary:
          "A performance-first storefront and flexible content system designed for rapid campaign launches.",
        thumbnailUrl: null,
      },
    ],
  },

  "ecommerce-systems": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944102",
    slug: "ecommerce-systems",
    name: "eCommerce systems",
    summary:
      "High-converting storefronts and custom commerce workflows that make complex operations feel simple.",
    category: "build",
    startingPriceText: "From $20K",
    iconKey: "shopping-bag",
    heroImageUrl: null,
    description:
      "From bespoke storefronts to headless commerce platforms, we engineer shopping experiences that are fast, accessible, and built to convert.\n\nWe work with Shopify, Next.js Commerce, BigCommerce, and fully custom stacks — choosing what fits the brand, the catalogue, and the operations team that has to live with it.",
    deliverables: [
      {
        title: "Storefront engineering",
        description: "Headless or monolith — designed, built, and tuned for performance and conversion.",
      },
      {
        title: "Checkout and custom flows",
        description: "Multi-step, multi-market, and B2B-ready. Tuned for clarity and completion.",
      },
      {
        title: "Back-office and tooling",
        description: "Operational dashboards, merchandising tools, and the plumbing your team will actually use.",
      },
      {
        title: "Integrations and APIs",
        description: "PIM, ERP, OMS, tax, shipping, and the messy legacy behind every commerce stack.",
      },
      {
        title: "Performance and SEO",
        description: "Core Web Vitals, structured data, and a content model that won't make your SEO team cry.",
      },
      {
        title: "Launch and growth retainer",
        description: "Stabilisation window, ongoing experiments, and a roadmap for the next three quarters.",
      },
    ],
    pricingTiers: [
      {
        name: "Sprint",
        priceText: "From $20K",
        description: "Tight scope, fast turnaround — a single conversion-critical surface.",
        features: [
          "Diagnose-and-build engagement",
          "Performance + UX wins",
          "Production-ready output",
        ],
      },
      {
        name: "Storefront",
        priceText: "From $60K",
        description: "End-to-end rebuild of a storefront, ready for a multi-market rollout.",
        features: [
          "Headless or platform build",
          "Custom checkout flow",
          "Integrations with the back-office",
          "Launch support and tuning",
        ],
        highlighted: true,
      },
      {
        name: "Commerce Partnership",
        priceText: "From $15K / month",
        description: "Continuous engineering on a live commerce platform — experiments, integrations, and CRO.",
        features: [
          "Squad of senior engineers",
          "Experimentation roadmap",
          "Quarterly conversion reviews",
          "Platform partner relationships",
        ],
      },
    ],
    faqs: [
      {
        question: "Which commerce platforms do you work with?",
        answer:
          "Shopify, Shopify Hydrogen, BigCommerce, Next.js Commerce, Saleor, Medusa, and fully custom stacks. We pick based on your catalogue complexity, team, and roadmap.",
      },
      {
        question: "Can you migrate without losing SEO?",
        answer:
          "Yes. We design redirect maps, preserve structured data, and benchmark against the existing site's organic performance throughout the cutover.",
      },
      {
        question: "Do you do CRO as well?",
        answer:
          "We do — paired with engineering under our Growth Optimization service. We instrument, hypothesise, ship, and measure.",
      },
    ],
    relatedCaseStudies: [
      {
        slug: "global-commerce-rebuild",
        title: "Rebuilding global commerce around speed and conversion",
        industry: "Commerce",
        summary:
          "A performance-first storefront and flexible content system designed for rapid campaign launches.",
        thumbnailUrl: null,
      },
    ],
  },

  "product-design": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944104",
    slug: "product-design",
    name: "Product design",
    summary:
      "Clear user journeys and polished interfaces that make sophisticated products easy to understand and use.",
    category: "design",
    startingPriceText: "From $15K",
    iconKey: "palette",
    heroImageUrl: null,
    description:
      "We design end-to-end product experiences — research, IA, interaction, and visual systems — that turn complex requirements into interfaces people actually understand.\n\nWe embed with your team from the first workshop through engineering hand-off, so the work that ships reflects what was designed.",
    deliverables: [
      {
        title: "Research and discovery",
        description: "Interviews, JTBD analysis, and the qualitative read on where the product actually wins.",
      },
      {
        title: "Information architecture",
        description: "Sitemaps, flows, and a content model that holds up as features ship.",
      },
      {
        title: "Interaction design",
        description: "Wireframes and prototypes that make states, errors, and edge cases honest.",
      },
      {
        title: "Visual design systems",
        description: "Tokens, components, and a library engineers can actually consume.",
      },
      {
        title: "Accessibility audit",
        description: "WCAG 2.2 AA reviews with concrete fixes for keyboard, screen reader, and contrast.",
      },
      {
        title: "Design QA and hand-off",
        description: "Pixel and behaviour reviews at every milestone, with clear specs into engineering.",
      },
    ],
    pricingTiers: [
      {
        name: "Concept",
        priceText: "From $15K",
        description: "Focused discovery and design for one product moment.",
        features: [
          "Discovery interviews",
          "Concept prototypes",
          "Validated recommendations",
        ],
      },
      {
        name: "System",
        priceText: "From $40K",
        description: "Full design system + 1–2 product surfaces ready to build.",
        features: [
          "Design system in Figma",
          "Multi-flow interaction design",
          "Accessibility built in",
          "Engineering hand-off",
        ],
        highlighted: true,
      },
      {
        name: "Embedded",
        priceText: "From $12K / month",
        description: "A senior designer inside your product team for ongoing work.",
        features: [
          "Embedded designer (or pair)",
          "Continuous discovery",
          "Design system stewardship",
          "Cross-functional rituals",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you work with existing brand guidelines?",
        answer:
          "Yes. We work within your brand system, refine it for product contexts, and document the additions.",
      },
      {
        question: "What tools do you design in?",
        answer:
          "Figma as the primary canvas, with Loom, FigJam, and Miro for collaborative discovery.",
      },
      {
        question: "Can you run discovery before we commit?",
        answer:
          "Absolutely — many engagements start with a 2-week Concept sprint to align before the broader build.",
      },
    ],
    relatedCaseStudies: [
      {
        slug: "healthcare-intelligence-suite",
        title: "Making complex healthcare data useful at a glance",
        industry: "HealthTech",
        summary:
          "Turned dense operational data into an accessible intelligence suite for distributed care teams.",
        thumbnailUrl: null,
      },
    ],
  },

  "ai-automation": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944103",
    slug: "ai-automation",
    name: "AI & automation",
    summary:
      "Useful AI features, intelligent workflows, and integrations that save teams time and sharpen decisions.",
    category: "operate",
    startingPriceText: "From $18K",
    iconKey: "bot",
    heroImageUrl: null,
    description:
      "We build AI features and internal automations that are actually used: scoped tightly, measured honestly, and integrated into the workflows your team already has.\n\nNo demos that fall over in production. No 'just wrap an OpenAI call'. Real features, real governance, real usage.",
    deliverables: [
      {
        title: "Use-case discovery",
        description: "We map your workflows, find the high-leverage moments, and prioritise buildable AI wins.",
      },
      {
        title: "RAG and knowledge features",
        description: "Search, summarisation, and assistants grounded in your own content and constraints.",
      },
      {
        title: "Workflow automations",
        description: "Bridges between tools, agents on top of your APIs, and the boring plumbing that pays back.",
      },
      {
        title: "Evaluation and guardrails",
        description: "Test sets, evals, and the operational observability to keep quality from drifting.",
      },
      {
        title: "Security and governance",
        description: "Data handling, retention, and the policies compliance will actually approve.",
      },
      {
        title: "Operational hand-off",
        description: "Your team can run, extend, and improve the system after we leave.",
      },
    ],
    pricingTiers: [
      {
        name: "Pilot",
        priceText: "From $18K",
        description: "One tightly scoped AI feature from discovery to production.",
        features: [
          "Use-case validation",
          "Production-grade prototype",
          "Evaluation harness",
        ],
      },
      {
        name: "Program",
        priceText: "From $45K",
        description: "Multi-feature AI program with shared infrastructure.",
        features: [
          "Shared retrieval + evals",
          "Multiple productionised features",
          "Governance framework",
        ],
        highlighted: true,
      },
      {
        name: "Operate",
        priceText: "From $14K / month",
        description: "Continuous improvement of AI features already in production.",
        features: [
          "Reliability + cost reviews",
          "Model + prompt iteration",
          "Roadmap experimentation",
        ],
      },
    ],
    faqs: [
      {
        question: "Which model providers do you work with?",
        answer:
          "OpenAI, Anthropic, open-source models, and your own fine-tunes. We pick based on data residency, latency, and cost.",
      },
      {
        question: "How do you handle sensitive data?",
        answer:
          "We design for it from day one: no-training guarantees, scoped retrieval, audit logs, and redaction by default.",
      },
      {
        question: "What if my team doesn't have ML experience?",
        answer:
          "Then you especially need us. We deliver production code your engineers can read, change, and own.",
      },
    ],
    relatedCaseStudies: [
      {
        slug: "fintech-operations-platform",
        title: "A clearer operating system for a fast-moving fintech team",
        industry: "Fintech",
        summary:
          "Unified fragmented workflows into one calm, role-aware platform that made everyday decisions faster.",
        thumbnailUrl: null,
      },
    ],
  },

  "cloud-devops": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944105",
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    summary:
      "Secure deployment, monitoring, and infrastructure designed to keep your product fast and dependable.",
    category: "operate",
    startingPriceText: "From $12K",
    iconKey: "cloud-cog",
    heroImageUrl: null,
    description:
      "We design and run the platform beneath your product — infrastructure as code, observability that actually helps, and CI/CD your engineers will trust.\n\nWe work in AWS, GCP, and Vercel with a bias toward boring, well-understood systems that don't surprise your team at 3 AM.",
    deliverables: [
      {
        title: "Infrastructure as code",
        description: "Repeatable environments across staging and production with Terraform or Pulumi.",
      },
      {
        title: "CI/CD and release",
        description: "Pipelines with real gates — tests, types, security scans, and fast rollback.",
      },
      {
        title: "Observability",
        description: "Logs, metrics, and traces wired to SLOs your on-call team will actually use.",
      },
      {
        title: "Security baseline",
        description: "Secrets, IAM, and the boring defaults that prevent the kind of breach that ends companies.",
      },
      {
        title: "Cost and reliability reviews",
        description: "Quarterly reviews of your bill and your reliability posture — no surprises.",
      },
      {
        title: "On-call playbooks",
        description: "Runbooks, escalation paths, and incident retros that turn chaos into a better system.",
      },
    ],
    pricingTiers: [
      {
        name: "Hardening",
        priceText: "From $12K",
        description: "Boring basics, properly done: IaC, CI/CD, and one good observability stack.",
        features: [
          "Infrastructure as code",
          "Pipeline + release process",
          "Security baseline",
        ],
      },
      {
        name: "Platform",
        priceText: "From $30K",
        description: "A complete platform for a product already in market.",
        features: [
          "Multi-environment IaC",
          "SLOs and runbooks",
          "Cost + reliability review",
        ],
        highlighted: true,
      },
      {
        name: "Operate",
        priceText: "From $9K / month",
        description: "Continuous platform care alongside your engineering team.",
        features: [
          "On-call rotation partnership",
          "Quarterly platform reviews",
          "Cost and security monitoring",
        ],
      },
    ],
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer:
          "Primarily AWS, GCP, and Vercel. We also work fluently in hybrid and multi-cloud setups where the product requires it.",
      },
      {
        question: "Can you take over an existing platform?",
        answer:
          "Yes. Most Platform engagements begin with a 1–2 week audit and a stabilisation pass before the broader rebuild.",
      },
      {
        question: "Do you provide 24/7 on-call?",
        answer:
          "We pair with your team or a managed provider for true 24/7 coverage. Our retainers focus on platform engineering, incident response, and post-incident work.",
      },
    ],
    relatedCaseStudies: [],
  },

  "growth-optimization": {
    id: "6d80ee9a-9f07-4ee1-bb8f-37873c944106",
    slug: "growth-optimization",
    name: "Growth optimization",
    summary:
      "Performance, analytics, and search improvements that turn product quality into measurable momentum.",
    category: "operate",
    startingPriceText: "From $10K",
    iconKey: "trending-up",
    heroImageUrl: null,
    description:
      "We grow the product you already have — better performance, sharper analytics, and SEO work that compounds over quarters, not weeks.\n\nNo growth hacking theatre. Engineering-led experiments, measurement that survives scrutiny, and weekly wins your team can talk to leadership about.",
    deliverables: [
      {
        title: "Performance audits",
        description: "Real-device benchmarks, Web Vitals, and a prioritised fix list your team can ship.",
      },
      {
        title: "Analytics instrumentation",
        description: "Event models, dashboards, and the analytics hygiene your product team can rely on.",
      },
      {
        title: "SEO foundations",
        description: "Technical SEO, content architecture, and the structural work that compounds.",
      },
      {
        title: "Conversion rate optimization",
        description: "Hypothesis-driven experiments with clean measurement and clear attribution.",
      },
      {
        title: "Experimentation framework",
        description: "Feature flags, A/B testing, and the operational setup to run it well.",
      },
      {
        title: "Quarterly growth reviews",
        description: "What we shipped, what worked, what we learned — every quarter, no hand-waving.",
      },
    ],
    pricingTiers: [
      {
        name: "Diagnostic",
        priceText: "From $10K",
        description: "Two-week sprint focused on the biggest leverage point — performance, SEO, or conversion.",
        features: [
          "Diagnostic report",
          "Prioritised fix list",
          "First wins shipped",
        ],
      },
      {
        name: "Growth Program",
        priceText: "From $24K",
        description: "Multi-month program covering analytics, SEO, and CRO with weekly experiments.",
        features: [
          "Analytics + experimentation setup",
          "Weekly experiments",
          "Quarterly growth review",
        ],
        highlighted: true,
      },
      {
        name: "Embedded",
        priceText: "From $8K / month",
        description: "A senior growth engineer inside your team for sustained, compounding work.",
        features: [
          "Embedded growth engineer",
          "Continuous experiment roadmap",
          "Cross-functional rituals",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you measure success?",
        answer:
          "A north-star KPI we agree up front, plus the leading indicators that move it. No vanity dashboards.",
      },
      {
        question: "Do you replace an in-house growth team?",
        answer:
          "We complement. Most clients keep one internal owner, with us as the embedded execution layer.",
      },
      {
        question: "Can you fix a sudden traffic drop?",
        answer:
          "Yes — we have a 1-week diagnostic that ships an action plan within the second week.",
      },
    ],
    relatedCaseStudies: [],
  },
};
