import { CompanyBreadcrumb } from "@/components/real-estate/company/CompanyBreadcrumb";
import { CompanyIconCard } from "@/components/real-estate/company/CompanyCards";
import { CompanyCta } from "@/components/real-estate/company/CompanyCta";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { CompanyPageNav } from "@/components/real-estate/company/CompanyPageNav";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { missionPillars } from "@/lib/real-estate-company";

export const metadata = {
  title: "Our Mission | Aurelia Estates Preview",
  description:
    "Mission page for the Aurelia Estates real estate agency template.",
};

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyBreadcrumb current="Our Mission" />
      <CompanyPageNav activeHref="/template-preview/luxury-agency/mission" />
      <CompanyHero
        eyebrow="Our Mission"
        title="Make Premium Real Estate Feel Clear, Verified, and Human"
        subtitle="The mission page gives prospective clients a confident explanation of what the agency stands for before they inquire, book a viewing, or choose an advisor."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Mission Pillars"
            title="Three Principles Behind Every Client Brief"
            subtitle="A strong agency website should explain not only what the company sells, but how it protects client decisions."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {missionPillars.map((pillar) => (
              <CompanyIconCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-container-low">
        <div className="container-nexora grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[var(--radius-panel)] bg-charcoal shadow-luxury">
            <div
              className="min-h-[420px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85)",
              }}
              role="img"
              aria-label="Modern premium residence"
            />
          </div>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Client Promise"
              title="Every Recommendation Should Earn Its Place"
              subtitle="Aurelia advisors are presented as thoughtful filters: they reduce noise, clarify tradeoffs, and keep the client focused on properties that fit the brief."
            />
            <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
              <p className="text-lg font-semibold leading-8 text-on-surface">
                We help clients move from possibility to decision with better
                context, better inventory, and better communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CompanyCta title="Give clients a mission they can feel before they call." />
      <RealEstateFooter />
    </div>
  );
}
