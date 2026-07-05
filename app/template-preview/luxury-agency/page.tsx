import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Calculator,
  CheckCircle2,
  Gem,
  Home,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AgentCard } from "@/components/real-estate/AgentCard";
import { CompanyQuickLinks } from "@/components/real-estate/company/CompanyQuickLinks";
import { CategoryCard } from "@/components/real-estate/homepage/CategoryCard";
import { PropertySearchForm } from "@/components/real-estate/homepage/PropertySearchForm";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { NewsletterSubscription } from "@/components/real-estate/leads/LeadForms";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { StatsCard } from "@/components/real-estate/StatsCard";
import { TestimonialCard } from "@/components/real-estate/TestimonialCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  propertyCategories,
  templateAgents,
  templateProperties,
  templateStats,
  templateTestimonials,
  whyChoosePoints,
} from "@/lib/real-estate-template";

export const metadata = {
  title: "Aurelia Estates Preview",
  description:
    "Premium real estate agency homepage template preview with luxury listings, agents, testimonials, and lead capture.",
};

export default function LuxuryAgencyTemplatePage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />

      <section className="relative overflow-hidden bg-charcoal text-inverse-on-surface">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/78 to-charcoal/25" />

        <div className="container-nexora relative grid min-h-[780px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <Badge variant="accent">Luxury Real Estate Agency</Badge>
            <h1 className="display-xl mt-6 max-w-3xl text-inverse-on-surface">
              Find a Home That Matches Your Next Chapter.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-inverse-on-surface/78">
              Discover refined homes, private villas, investment properties, and
              premium land opportunities guided by trusted local advisors.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link href="/template-preview/luxury-agency/properties">
                  Explore Listings
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="luxury" size="lg">
                <Link href="/template-preview/luxury-agency/agents">
                  Meet Advisors
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[var(--radius-panel)] border border-white/15 bg-white/10 p-4 shadow-luxury backdrop-blur-md">
            <PropertySearchForm />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {["Prime Areas", "Verified Homes", "Private Tours"].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 px-3 py-4">
                  <CheckCircle2 className="mx-auto size-5 text-accent" aria-hidden="true" />
                  <p className="mt-2 text-xs font-semibold text-inverse-on-surface/78">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-light-border bg-cream/70 py-10">
        <div className="container-nexora grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {templateStats.map((stat) => (
            <StatsCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      <section id="properties" className="section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Featured Properties"
            title="Curated Homes for Serious Buyers"
            subtitle="A refined selection of premium residences and investment-ready properties."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {templateProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/template-preview/luxury-agency/properties">
                View All Properties
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="buy" className="bg-surface-container-low section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Property Categories"
            title="Browse by Lifestyle and Investment Goal"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {propertyCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-space">
        <div className="container-nexora grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden rounded-[var(--radius-panel)] bg-charcoal shadow-luxury">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85)",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/12 p-5 text-inverse-on-surface backdrop-blur-md">
              <p className="text-sm font-semibold text-accent">Private Client Desk</p>
              <p className="mt-2 text-2xl font-semibold">
                Guided viewings, verified details, and clear communication.
              </p>
            </div>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Why Choose Us"
              title="A Calm, Capable Team for High-Value Property Decisions"
              subtitle="Every interaction is designed to feel discreet, informed, and efficient."
            />
            <div className="space-y-5">
              {whyChoosePoints.map((point, index) => {
                const icons = [ShieldCheck, Gem, KeyRound];
                const Icon = icons[index] ?? Sparkles;

                return (
                  <article
                    key={point.id}
                    className="flex gap-4 rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-5 shadow-low"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-on-surface">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                        {point.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" size="lg">
                <Link href="/template-preview/luxury-agency/about">
                  About Aurelia
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/template-preview/luxury-agency/faq">Read FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-container-low">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Company Pages"
            title="See How the Full Agency Website Comes Together"
            subtitle="Explore the about, mission, story, careers, and FAQ pages included in this template preview."
          />
          <CompanyQuickLinks />
        </div>
      </section>

      <section id="agents" className="bg-cream section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Meet Our Agents"
            title="Senior Advisors With Local Market Command"
            subtitle="Real people, direct accountability, and clear ownership from inquiry to closing."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {templateAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/template-preview/luxury-agency/agents">
                View Agent Directory
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Testimonials"
            title="Clients Trust the Process"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {templateTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-container-low">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Lead Capture Engine"
            title="Multiple Ways to Turn Visitors Into Qualified Leads"
            subtitle="The template includes visible conversion paths for viewings, seller valuations, inquiries, and market subscriptions."
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <NewsletterSubscription compact />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Book Viewings",
                  text: "Collect availability and property preference.",
                  href: "/template-preview/luxury-agency/schedule-viewing",
                  icon: CalendarDays,
                },
                {
                  title: "Value Homes",
                  text: "Capture seller intent before they list.",
                  href: "/template-preview/luxury-agency/valuation",
                  icon: Calculator,
                },
                {
                  title: "Contact Desk",
                  text: "Route general buyer, seller, and rental leads.",
                  href: "/template-preview/luxury-agency/contact",
                  icon: Mail,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="card-hover rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest p-5 shadow-low"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary text-on-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-on-surface">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                      {item.text}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open form
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="rent" className="px-4 py-6">
        <div className="container-nexora overflow-hidden rounded-[var(--radius-panel)] bg-charcoal p-8 text-inverse-on-surface shadow-luxury md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Private Viewings Available
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                Ready to tour the properties that actually fit your criteria?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-inverse-on-surface/70">
                Share your preferred area, budget, and timeline. Our advisors
                will prepare a focused shortlist before the first call.
              </p>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link href="/template-preview/luxury-agency/schedule-viewing">
                Start Consultation
                <Home aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
