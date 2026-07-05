import Link from "next/link";
import { CalendarCheck, Heart, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PropertyDetail } from "@/lib/real-estate-template";

interface PropertyPriceSectionProps {
  property: PropertyDetail;
}

export function PropertyPriceSection({ property }: PropertyPriceSectionProps) {
  const priceLabel =
    property.status === "For Rent" ? "Monthly Rent" : "Asking Price";

  return (
    <section
      aria-labelledby="property-price-heading"
      className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {priceLabel}
      </p>
      <h2
        id="property-price-heading"
        className="mt-2 text-3xl font-bold text-primary md:text-4xl"
      >
        {property.price}
      </h2>

      {property.pricePerUnit && (
        <p className="mt-2 text-sm text-on-surface-variant">
          {property.pricePerUnit}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Button asChild variant="accent" size="lg" className="w-full">
          <Link href="/template-preview/luxury-agency/schedule-viewing">
            <CalendarCheck aria-hidden="true" />
            Schedule Viewing
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          <Phone aria-hidden="true" />
          Call Advisor
        </Button>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="ghost" size="sm" className="flex-1">
          <Heart aria-hidden="true" />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 aria-hidden="true" />
          Share
        </Button>
      </div>

      <dl className="mt-6 space-y-3 border-t border-light-border pt-6 text-sm">
        <PriceRow label="Status" value={property.status} />
        <PriceRow label="Property ID" value={property.id.toUpperCase()} />
        {property.lotSize && <PriceRow label="Lot Size" value={property.lotSize} />}
        {property.furnishing && (
          <PriceRow label="Furnishing" value={property.furnishing} />
        )}
      </dl>
    </section>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className="font-semibold text-on-surface">{value}</dd>
    </div>
  );
}
