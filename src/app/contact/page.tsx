import type { Metadata } from "next";

import { contactDetails } from "@/content/contact";

import { ContactForm } from "./_components/contact-form";
import { ContactDetailsList } from "./_components/contact-details";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Contact CodeVenture",
  description:
    "Get in touch with CodeVenture — offices, support, and a contact form for new project inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — CodeVenture",
    description: "Office locations, support channels, and a contact form.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const details = contactDetails;

  return (
    <div className="bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <PageHero eyebrow="Contact" title={details.headline} description={details.intro} compact />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="rounded-2xl border border-blue-100 bg-card p-6 shadow-[0_24px_70px_-38px_rgba(30,64,175,.45)] dark:border-blue-950 sm:p-8 lg:col-span-3">
            <h2 className="sr-only">Send a message</h2>
            <ContactForm defaultTopic="general" />
          </div>
          <aside className="lg:col-span-2">
            <ContactDetailsList details={details} />
          </aside>
        </div>
      </section>
    </div>
  );
}
