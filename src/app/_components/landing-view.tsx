import type { z } from "zod";
import type { homePageSchema } from "@/types/home";
import { LandingHero } from "./landing-hero";
import { ProofSection } from "./proof-section";
import { ServicesStrip } from "./services-strip";
import { CaseStudiesStrip } from "./case-studies-strip";
import { TestimonialsStrip } from "./testimonials-strip";
import { ConversionBand } from "./conversion-band";

type HomePage = z.infer<typeof homePageSchema>;

export function LandingView({ data }: { data: HomePage }) {
  return (
    <>
      <LandingHero
        headline={data.heroHeadline}
        subheadline={data.heroSubheadline}
        primaryCta={data.primaryCta}
        secondaryCta={data.secondaryCta}
      />
      <ProofSection
        outcomes={data.outcomeMetrics}
        signals={data.trustSignals}
      />
      <ServicesStrip services={data.featuredServices} />
      <CaseStudiesStrip studies={data.featuredCaseStudies} />
      <TestimonialsStrip testimonials={data.featuredTestimonials} />
      <ConversionBand
        headline={data.conversionBand.headline}
        subheadline={data.conversionBand.subheadline}
        ctaLabel={data.conversionBand.ctaLabel}
        ctaHref={data.conversionBand.ctaHref}
      />
    </>
  );
}
