import Link from "next/link";
import { ArrowRight, BarChart3, FileCheck2, Home } from "lucide-react";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import {
  HomeValuationForm,
  NewsletterSubscription,
} from "@/components/real-estate/leads/LeadForms";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Home Valuation | Aurelia Estates Preview",
  description:
    "Seller lead generation home valuation form for the real estate agency template.",
};

const valuationBenefits = [
  {
    title: "Seller intent captured",
    description: "Property address, size, type, and selling timeline qualify the lead.",
    icon: Home,
  },
  {
    title: "Valuation workflow ready",
    description: "A backend could trigger comps, agent assignment, and follow-up tasks.",
    icon: BarChart3,
  },
  {
    title: "Trust before contact",
    description: "Clear fields and validation make the form feel credible and low-friction.",
    icon: FileCheck2,
  },
];

export default function ValuationPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyHero
        eyebrow="Home Valuation"
        title="Capture Seller Leads Before They List"
        subtitle="A valuation request page gives property owners a reason to start the conversation before they are ready for a full listing consultation."
        image="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="py-12 md:py-16">
        <div className="container-nexora grid gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
          <HomeValuationForm />
          <aside className="space-y-6">
            <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
              <h2 className="text-2xl font-semibold text-on-surface">
                Why valuation forms matter
              </h2>
              <div className="mt-5 space-y-4">
                {valuationBenefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-on-surface">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button asChild variant="outline" className="mt-6 w-full">
                <Link href="/template-preview/luxury-agency/agents">
                  Meet Seller Advisors
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <NewsletterSubscription compact />
          </aside>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
