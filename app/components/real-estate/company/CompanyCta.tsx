import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CompanyCtaProps {
  title?: string;
  text?: string;
}

export function CompanyCta({
  title = "Ready to see how this agency turns trust into qualified inquiries?",
  text = "Explore listings, meet the advisors, or schedule a private consultation from the same branded template experience.",
}: CompanyCtaProps) {
  return (
    <section className="px-4 py-6">
      <div className="container-nexora overflow-hidden rounded-[var(--radius-panel)] bg-charcoal p-8 text-inverse-on-surface shadow-luxury md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Private Advisory
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-inverse-on-surface/70">
              {text}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild variant="accent" size="lg">
              <Link href="/template-preview/luxury-agency/properties">
                View Listings
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="luxury" size="lg">
              <Link href="/template-preview/luxury-agency/contact">
                <Phone aria-hidden="true" />
                Contact Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
