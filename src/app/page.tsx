import type { Metadata } from "next";
import { LandingView } from "./_components/landing-view";
import { homePage } from "@/content/home-page";

export const metadata: Metadata = {
  title: "Digital products people love",
  description:
    "CodeVenture is a product engineering studio for ambitious teams that care about craft, speed, and meaningful business outcomes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "CodeVenture - Digital products people love",
    description:
      "Strategy, design, and engineering for ambitious digital products.",
    url: "/",
    type: "website",
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodeVenture",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeventure.example",
  description:
    "CodeVenture designs and engineers premium digital products for ambitious teams.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "/contact",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, trusted content only.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      <LandingView data={homePage} />
    </>
  );
}
