import { CompanyBreadcrumb } from "@/components/real-estate/company/CompanyBreadcrumb";
import { CompanyIconCard } from "@/components/real-estate/company/CompanyCards";
import { CompanyCta } from "@/components/real-estate/company/CompanyCta";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { CompanyPageNav } from "@/components/real-estate/company/CompanyPageNav";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  leadershipPrinciples,
  storyTimeline,
} from "@/lib/real-estate-company";

export const metadata = {
  title: "Our Story | Aurelia Estates Preview",
  description:
    "Company story and timeline page for the Aurelia Estates agency template.",
};

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyBreadcrumb current="Our Story" />
      <CompanyPageNav activeHref="/template-preview/luxury-agency/story" />
      <CompanyHero
        eyebrow="Our Story"
        title="From Referral-Led Advisory to Full-Service Property Platform"
        subtitle="The story page helps an agency communicate longevity, growth, specialization, and the standards behind its reputation."
        image="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Company Timeline"
            title="A Credible Growth Story for a Modern Agency"
            subtitle="A simple timeline gives visitors proof that the company has roots, momentum, and a clear operating model."
          />
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-light-border md:block" />
            <div className="space-y-5">
              {storyTimeline.map((item) => (
                <article
                  key={item.year}
                  className="relative rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-6 shadow-low md:ml-16"
                >
                  <span className="absolute -left-[5.5rem] top-6 hidden rounded-full bg-primary px-4 py-2 text-sm font-bold text-on-primary md:inline-flex">
                    {item.year}
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent md:hidden">
                    {item.year}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-on-surface md:mt-0">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="What We Learned"
            title="The Standards That Shaped the Agency"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {leadershipPrinciples.map((principle) => (
              <CompanyIconCard key={principle.title} {...principle} />
            ))}
          </div>
        </div>
      </section>

      <CompanyCta title="Show the agency history behind the listings." />
      <RealEstateFooter />
    </div>
  );
}
