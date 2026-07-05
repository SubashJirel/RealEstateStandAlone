import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanyBreadcrumb } from "@/components/real-estate/company/CompanyBreadcrumb";
import { CompanyIconCard, CompanyStatCard } from "@/components/real-estate/company/CompanyCards";
import { CompanyCta } from "@/components/real-estate/company/CompanyCta";
import { CompanyHero } from "@/components/real-estate/company/CompanyHero";
import { CompanyPageNav } from "@/components/real-estate/company/CompanyPageNav";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  aboutHighlights,
  companyStats,
  companyValues,
} from "@/lib/real-estate-company";

export const metadata = {
  title: "About Us | Aurelia Estates Preview",
  description:
    "Company overview page for the Aurelia Estates real estate agency template.",
};

export default function AboutCompanyPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />
      <CompanyBreadcrumb current="About Us" />
      <CompanyPageNav activeHref="/template-preview/luxury-agency/about" />
      <CompanyHero
        eyebrow="About Aurelia Estates"
        title="A Premium Agency Built Around Verified Property Decisions"
        subtitle="Aurelia Estates is a modern real estate agency template for teams that want to present trust, local expertise, premium listings, and clear client pathways from the first page."
        image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <CompanyStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </CompanyHero>

      <section className="section-space">
        <div className="container-nexora grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Company Profile"
              title="Designed for Agencies That Sell With Calm Authority"
              subtitle="The template gives real estate teams a complete brand presence, from high-value listings to people, process, and company credibility."
            />
            <Button asChild variant="outline" size="lg">
              <Link href="/template-preview/luxury-agency/mission">
                Read Our Mission
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {aboutHighlights.map((item) => (
              <CompanyIconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream">
        <div className="container-nexora">
          <SectionHeader
            eyebrow="Operating Values"
            title="A Better Standard for Buyers, Sellers, and Investors"
            subtitle="Every page is shaped around trust signals that a serious real estate client expects to see."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {companyValues.map((value) => (
              <CompanyIconCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <CompanyCta />
      <RealEstateFooter />
    </div>
  );
}
