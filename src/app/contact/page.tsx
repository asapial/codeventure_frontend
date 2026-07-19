import type { Metadata } from "next";

import { fetchContactDetails } from "@/lib/api/contact";

import { ContactForm } from "./_components/contact-form";
import { ContactDetailsList } from "./_components/contact-details";
import { ContactFallback } from "./_components/contact-fallback";

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

export default async function ContactPage() {
  const result = await fetchContactDetails();

  if (!result.ok) {
    return (
      <ContactFallback
        status={result.status}
        message={result.error.error.message}
      />
    );
  }

  const details = result.data;

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <header className="border-b">
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm font-medium text-muted-foreground">Contact</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {details.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {details.intro}
          </p>
        </div>
      </header>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
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
