import type { HomePage } from "@/types/home";
import { LandingHero } from "./landing-hero";
import { ProofSection } from "./proof-section";
import { ServicesStrip } from "./services-strip";
import { CaseStudiesStrip } from "./case-studies-strip";
import { TestimonialsStrip } from "./testimonials-strip";
import { ConversionBand } from "./conversion-band";
import { ProcessSection } from "./process-section";
import { StudioSection } from "./studio-section";

export function LandingView({ data }: { data: HomePage }) {
  return (
    <>
      <LandingHero
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        primaryCta={{ label: data.primaryCta.label, href: data.primaryCta.url }}
        secondaryCta={{ label: data.secondaryCta.label, href: data.secondaryCta.url }}
      />
      <ProofSection
        outcomes={data.outcomeMetrics}
        signals={data.trustSignals}
      />
      <ServicesStrip services={data.featuredServices} />
      <ProcessSection />
      <CaseStudiesStrip studies={data.featuredCases} />
      <TestimonialsStrip testimonials={data.testimonials} />
      <StudioSection />
      <ConversionBand
        headline="Ready to build something better?"
        subheadline="Tell us what you are working on and we will help you find the clearest next step."
        ctaLabel="Start a conversation"
        ctaHref="/request-quote"
      />
    </>
  );
}
