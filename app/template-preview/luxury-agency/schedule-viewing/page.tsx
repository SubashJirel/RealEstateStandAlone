import Link from "next/link";
import { ArrowRight, Clock, KeyRound, UsersRound } from "lucide-react";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import {
  BuyerGuideLeadForm,
  ScheduleViewingForm,
} from "@/components/real-estate/leads/LeadForms";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Schedule Viewing | Aurelia Estates Preview",
  description:
    "Accessible schedule viewing form for the real estate agency template.",
};

const viewingSteps = [
  {
    title: "Choose a property",
    description: "Select a listing or share what type of home you want to tour.",
    icon: KeyRound,
  },
  {
    title: "Share availability",
    description: "Capture preferred date, time window, and guest count.",
    icon: Clock,
  },
  {
    title: "Advisor follow-up",
    description: "A production flow can assign the lead to the right agent.",
    icon: UsersRound,
  },
];

export default function ScheduleViewingPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyHero
        eyebrow="Schedule Viewing"
        title="A Focused Booking Flow for High-Intent Property Leads"
        subtitle="The viewing form shows how the template can capture availability and listing preference before an agent confirms a private tour."
        image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="py-12 md:py-16">
        <div className="container-nexora grid gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
          <ScheduleViewingForm />
          <aside className="space-y-6">
            <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
              <h2 className="text-2xl font-semibold text-on-surface">
                How this converts
              </h2>
              <div className="mt-5 space-y-4">
                {viewingSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-on-surface">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button asChild className="mt-6 w-full" variant="outline">
                <Link href="/template-preview/luxury-agency/properties">
                  Browse Listings
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <BuyerGuideLeadForm />
          </aside>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
