import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/cards/PricingCard";
import { PRICING_PLANS } from "@/lib/data";

interface PricingSectionProps {
  id?: string;
  showNote?: boolean;
}

export function PricingSection({ id = "pricing", showNote = true }: PricingSectionProps) {
  return (
    <section id={id} className="py-16 md:py-20 lg:py-24">
      <div className="container-nexora">
        <SectionHeader
          title="Simple, Transparent Pricing."
          subtitle="Choose the plan that fits your agency's current stage."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>

        {showNote && (
          <p className="body-sm mt-8 text-center text-on-surface-variant">
            Custom pricing is available for large agencies, land developers, and
            housing/apartment projects.{" "}
            <Link href="/book-demo" className="font-medium text-deep-sage hover:underline">
              Contact us
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
