import Link from "next/link";
import {
  CalendarDays,
  Calculator,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import {
  BuyerGuideLeadForm,
  ContactLeadForm,
  NewsletterSubscription,
  PropertyInquiryLeadForm,
} from "@/components/real-estate/leads/LeadForms";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Contact Us | Aurelia Estates Preview",
  description:
    "Lead generation contact page with inquiry, newsletter, and buyer guide forms.",
};

const contactMethods = [
  {
    label: "Call",
    value: "+977 9800000000",
    icon: Phone,
  },
  {
    label: "Email",
    value: "hello@aurelia.example",
    icon: Mail,
  },
  {
    label: "Office",
    value: "Durbar Marg, Kathmandu",
    icon: MapPin,
  },
];

export default function LeadContactPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyHero
        eyebrow="Contact Us"
        title="Turn Website Visitors Into Qualified Property Leads"
        subtitle="This lead hub demonstrates how the template can capture buyer inquiries, seller intent, newsletter subscribers, viewing requests, and consultation leads without backend integration."
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=85"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <div
                key={method.label}
                className="rounded-[var(--radius-card)] border border-white/12 bg-white/10 p-5 backdrop-blur"
              >
                <Icon className="size-5 text-accent" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-inverse-on-surface/55">
                  {method.label}
                </p>
                <p className="mt-2 font-semibold text-inverse-on-surface">
                  {method.value}
                </p>
              </div>
            );
          })}
        </div>
      </CompanyHero>

      <section className="py-12 md:py-16">
        <div className="container-nexora grid gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
          <ContactLeadForm />
          <aside className="space-y-6">
            <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
              <ShieldCheck className="size-8 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold text-on-surface">
                Lead routing examples
              </h2>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                In production these forms could route to an agent inbox, CRM,
                calendar, newsletter list, or seller valuation workflow.
              </p>
              <div className="mt-5 grid gap-3">
                <Button asChild variant="outline">
                  <Link href="/template-preview/luxury-agency/schedule-viewing">
                    <CalendarDays aria-hidden="true" />
                    Schedule Viewing
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/template-preview/luxury-agency/valuation">
                    <Calculator aria-hidden="true" />
                    Request Valuation
                  </Link>
                </Button>
              </div>
            </div>
            <NewsletterSubscription compact />
          </aside>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="More Lead Capture"
            title="Multiple Conversion Paths for Different Visitor Intent"
            subtitle="Some visitors are ready to book a viewing. Others need market alerts or a helpful guide before speaking to an agent."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <PropertyInquiryLeadForm />
            <BuyerGuideLeadForm />
          </div>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
