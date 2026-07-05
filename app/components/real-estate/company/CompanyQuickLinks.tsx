import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CircleHelp, Compass, History, UsersRound } from "lucide-react";
import { companyPageLinks } from "@/lib/real-estate-company";

const linkMeta: Record<
  string,
  { description: string; icon: typeof UsersRound }
> = {
  "/template-preview/luxury-agency/about": {
    description: "Agency overview, values, and credibility signals.",
    icon: UsersRound,
  },
  "/template-preview/luxury-agency/mission": {
    description: "The principles guiding every client recommendation.",
    icon: Compass,
  },
  "/template-preview/luxury-agency/story": {
    description: "Timeline, growth, and the standards behind the brand.",
    icon: History,
  },
  "/template-preview/luxury-agency/careers": {
    description: "Open roles, culture, and benefits for new advisors.",
    icon: BriefcaseBusiness,
  },
  "/template-preview/luxury-agency/faq": {
    description: "Answers for buyers, sellers, renters, and investors.",
    icon: CircleHelp,
  },
};

export function CompanyQuickLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {companyPageLinks.map((link) => {
        const meta = linkMeta[link.href];
        const Icon = meta?.icon ?? UsersRound;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="card-hover group flex h-full flex-col rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-5 shadow-low"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-on-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-on-surface transition group-hover:text-primary">
              {link.label}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant">
              {meta?.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Explore
              <ArrowRight
                className="size-4 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
