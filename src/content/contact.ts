import type { ContactDetails } from "@/types/contact";

/**
 * Temporary local content for the public contact page.
 * Replace this module with the public contact API once the CMS/server phase begins.
 */
export const contactDetails: ContactDetails = {
  headline: "Talk to a CodeVenture lead",
  intro:
    "Tell us what you're working on. A senior lead will read your message and reply with a useful response — usually within one working day.",
  supportEmail: "support@codeventure.example",
  salesEmail: "hello@codeventure.example",
  responseTime: "We usually reply within 1 working day.",
  offices: [
    {
      name: "Headquarters",
      addressLines: ["House 12, Road 7", "Dhanmondi"],
      city: "Dhaka",
      country: "Bangladesh",
      phone: "+880 1700 000000",
      email: "hello@codeventure.example",
      hours: "Sun – Thu, 10:00 – 18:00 BST",
    },
    {
      name: "Engineering studio",
      addressLines: ["Block B, Level 4", "Banani"],
      city: "Dhaka",
      country: "Bangladesh",
      phone: "+880 1700 000111",
      email: "engineering@codeventure.example",
      hours: "Sun – Thu, 10:00 – 18:00 BST",
    },
  ],
  social: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/codeventure-example",
    },
    {
      platform: "github",
      url: "https://github.com/codeventure-example",
    },
    {
      platform: "twitter",
      url: "https://x.com/codeventure",
    },
  ],
};