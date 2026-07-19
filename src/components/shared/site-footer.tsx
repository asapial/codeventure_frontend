import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { PageContainer } from "./layout/page-container";

const groups = [
  { title: "Explore", links: [{ label: "Services", href: "/#services" }, { label: "Selected work", href: "/#work" }, { label: "Our process", href: "/#process" }] },
  { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Insights", href: "/blog" }, { label: "Contact", href: "/contact" }] },
  { title: "Legal", links: [{ label: "Privacy", href: "/legal/privacy" }, { label: "Terms", href: "/legal/terms" }, { label: "Cookies", href: "/legal/cookies" }] },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-white">
      <PageContainer className="py-14 sm:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg text-lg font-bold tracking-[-0.025em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white"><Code2 className="size-5" strokeWidth={2.5} aria-hidden="true" /></span>
              <span>Code<span className="text-blue-400">Venture</span></span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-slate-400">Strategy, design, and engineering for digital products that deserve to stand out.</p>
            <Link href="/request-quote" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300">Tell us what you&apos;re building <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {group.links.map((link) => <li key={link.href}><Link href={link.href} className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">{link.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {year} CodeVenture. Built with intent.</p>
          <p>Product thinking · Design craft · Engineering depth</p>
        </div>
      </PageContainer>
    </footer>
  );
}
