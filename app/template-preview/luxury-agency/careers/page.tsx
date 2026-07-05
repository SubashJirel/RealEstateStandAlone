import Link from "next/link";
import { MapPin } from "lucide-react";
import { CompanyBreadcrumb } from "@/components/real-estate/company/CompanyBreadcrumb";
import { CompanyIconCard } from "@/components/real-estate/company/CompanyCards";
import { CompanyCta } from "@/components/real-estate/company/CompanyCta";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { CompanyPageNav } from "@/components/real-estate/company/CompanyPageNav";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  careerBenefits,
  careerOpenings,
} from "@/lib/real-estate-company";

export const metadata = {
  title: "Careers | Aurelia Estates Preview",
  description:
    "Careers page for the Aurelia Estates real estate agency website template.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyBreadcrumb current="Careers" />
      <CompanyPageNav activeHref="/template-preview/luxury-agency/careers" />
      <CompanyHero
        eyebrow="Careers"
        title="Build a Career Around Better Property Advisory"
        subtitle="A strong agency template should also help teams recruit. This page presents culture, benefits, and open roles in a polished real estate brand experience."
        image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Open Roles"
            title="Join a Team Built for Serious Client Work"
            subtitle="Mock career listings show how the template can support recruitment without needing a separate careers product."
          />
          <div className="grid gap-5">
            {careerOpenings.map((role) => (
              <article
                key={role.title}
                className="grid gap-5 rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-6 shadow-low lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">{role.team}</Badge>
                    <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {role.type}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-on-surface">
                    {role.title}
                  </h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
                    <MapPin className="size-4 text-primary" aria-hidden="true" />
                    {role.location}
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-on-surface-variant">
                    {role.description}
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/template-preview/luxury-agency/contact">
                    Apply Now
                  </Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Why Join"
            title="A Better Operating System for Real Estate Advisors"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {careerBenefits.map((benefit) => (
              <CompanyIconCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <CompanyCta
        title="Recruit advisors with the same confidence used to win clients."
        text="Careers, company story, mission, and listings now live together inside one complete agency template."
      />
      <RealEstateFooter />
    </div>
  );
}
