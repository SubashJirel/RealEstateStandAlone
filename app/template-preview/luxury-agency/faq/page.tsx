import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { CompanyBreadcrumb } from "@/components/real-estate/company/CompanyBreadcrumb";
import { CompanyCta } from "@/components/real-estate/company/CompanyCta";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { CompanyPageNav } from "@/components/real-estate/company/CompanyPageNav";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { companyFaqs } from "@/lib/real-estate-company";

export const metadata = {
  title: "FAQ | Aurelia Estates Preview",
  description:
    "FAQ page for the Aurelia Estates real estate agency website template.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyBreadcrumb current="FAQ" />
      <CompanyPageNav activeHref="/template-preview/luxury-agency/faq" />
      <CompanyHero
        eyebrow="FAQ"
        title="Answers That Help Clients Move Forward"
        subtitle="The FAQ page removes friction before inquiry by answering common buyer, seller, renter, and investor questions in the agency brand voice."
        image="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-space">
        <div className="container-nexora grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside>
            <div className="sticky top-24 rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low">
              <HelpCircle className="size-8 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold text-on-surface">
                Need an advisor?
              </h2>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                Visitors can browse agents, view current listings, or contact
                the agency after reading answers.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href="/template-preview/luxury-agency/agents">
                  Meet Agents
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </aside>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Common Questions"
              title="Everything a Serious Property Client Expects to Ask"
            />
            <FAQAccordion items={companyFaqs} />
          </div>
        </div>
      </section>

      <CompanyCta title="Turn common questions into confident inquiries." />
      <RealEstateFooter />
    </div>
  );
}
