import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProblemCard } from "@/components/cards/ProblemCard";
import {
  AudienceCard,
  FeatureCard,
  FlowIcon,
  StepCard,
} from "@/components/cards/FeatureCard";
import { TemplateCard } from "@/components/cards/TemplateCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PlatformChip } from "@/components/ui/PlatformChip";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTASection } from "@/components/sections/CTASection";
import {
  AUDIENCES,
  FAQ_ITEMS,
  FEATURES,
  PLATFORMS,
  PROBLEMS,
  SETUP_STEPS,
  SOLUTION_FLOW,
  TEMPLATES,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-warm-white py-12 md:py-16 lg:py-20">
        <div className="container-nexora">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex rounded-full border border-light-border bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-deep-sage">
                Built for Nepali Real Estate
              </span>
              <h1 className="headline-xl mt-5 text-on-surface">
                Not Just a Website. A Complete Real-Estate Sales System.
              </h1>
              <p className="body-lg mt-5 text-on-surface-variant">
                Nexora RealtyOS helps agencies manage listings, leads, site
                visits, follow-ups, agents, social media, property videos, and
                deals from one platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/book-demo" size="lg">
                  Book a Free Demo
                </Button>
                <Button href="/pricing" variant="outline" size="lg">
                  View Pricing
                </Button>
                <Button href="/templates" variant="secondary" size="lg">
                  Choose Template
                </Button>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Setup in 30 Minutes",
                  "Smart Media & Videos",
                  "Listings, Leads & Deals",
                  "One Central Dashboard",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-medium text-on-surface-variant md:text-sm"
                  >
                    <span className="mt-0.5 text-deep-sage" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader
            title="Real-Estate Businesses Are Losing Leads Because Everything Is Scattered."
            subtitle="The traditional way of working is costing agencies serious buyers."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((problem) => (
              <ProblemCard key={problem.title} {...problem} />
            ))}
          </div>
        </div>
      </section>

      {/* Solution Flow */}
      <section id="how-it-works" className="py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader
            title="Nexora RealtyOS Brings Everything Into One System."
            subtitle="From the first property listing to the final deal, every step is connected inside one simple platform."
          />
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max items-center justify-center gap-2 px-4 md:gap-4 lg:min-w-0 lg:flex-wrap">
              {SOLUTION_FLOW.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-4">
                  <FlowIcon icon={step.icon} label={step.label} />
                  {index < SOLUTION_FLOW.length - 1 && (
                    <span
                      className="hidden text-xl text-sage md:inline"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="bg-cream/50 py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader
            title="Choose Your Website Template and Go Live Fast."
            subtitle="Beautifully crafted, SEO-optimized templates designed for the Nepali real-estate market."
          />

          <div className="flex gap-8 items-stretch">
            <div className="flex-shrink-0 w-full sm:w-96">
              {TEMPLATES.map((template) => (
                <TemplateCard key={template.id} {...template} showPreview />
              ))}
            </div>

            <div className="hidden lg:flex flex-1 rounded-xl border border-light-border bg-gradient-to-br from-cream to-warm-white p-8 flex-col justify-center">
              <p className="headline-lg text-on-surface">
                Specialized Templates Coming Soon
              </p>
              <p className="headline-sm text-on-surface-variant mt-4">
                Broker profiles, land developer sites, housing projects, rental 
                management, and premium developer showcases are launching soon to 
                serve every segment of the real estate industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader title="Everything Your Real-Estate Business Needs in One Place." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-nexora">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                title="Choose Your Template and Get Everything Set Up in 30 Minutes."
              />
              <div className="space-y-5">
                {SETUP_STEPS.map((step, index) => (
                  <StepCard key={step} step={index + 1} text={step} />
                ))}
              </div>
              <div className="mt-8">
                <Button href="/book-demo" size="lg">
                  Start Your Setup
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-light-border bg-surface-container-lowest p-8 shadow-low">
              <p className="text-sm font-semibold uppercase tracking-wide text-deep-sage">
                Core Message
              </p>
              <p className="headline-md mt-3 text-on-surface">
                Website Matra Haina  Complete Real-Estate Business System
              </p>
              <p className="body-md mt-4 text-on-surface-variant">
                Listings Dekhi Leads Samma, Leads Dekhi Deals Samma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 md:py-20">
        <div className="container-nexora">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              title="Control Social Media & Property Videos from One Entry Point."
              subtitle="Real-estate businesses often promote listings on Facebook, Instagram, TikTok, WhatsApp, and Viber separately. Nexora RealtyOS helps agencies organize property content, captions, videos, listing links, and lead tracking from one central system."
            />
            <div className="flex flex-wrap justify-center gap-3">
              {PLATFORMS.map((platform) => (
                <PlatformChip key={platform} label={platform} />
              ))}
            </div>
            <p className="headline-md mt-8 text-deep-sage">
              Add once. Promote everywhere. Track every lead.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="who-its-for" className="bg-surface-container-low py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader title="Built for Real-Estate Businesses in Nepal." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {AUDIENCES.map((audience) => (
              <AudienceCard key={audience.title} {...audience} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <section id="faq" className="bg-cream/40 py-16 md:py-20">
        <div className="container-nexora">
          <SectionHeader title="Frequently Asked Questions" />
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Final CTA */}
      <CTASection />
    </>
  );
}
