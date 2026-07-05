import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  LucideIcon,
  MapPin,
  Ruler,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { PropertyDetail } from "@/lib/real-estate-template";

interface PropertyOverviewProps {
  property: PropertyDetail;
}

function formatListedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <section aria-labelledby="property-overview-heading">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={property.status === "For Rent" ? "secondary" : "accent"}>
          {property.status}
        </Badge>
        <Badge variant="outline">{property.type}</Badge>
        {property.featured && <Badge variant="default">Featured</Badge>}
      </div>

      <h1
        id="property-overview-heading"
        className="headline-xl mt-4 text-on-surface"
      >
        {property.title}
      </h1>

      <p className="mt-3 flex items-start gap-2 text-base text-on-surface-variant md:text-lg">
        <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
        <span>
          {property.address}, {property.city}
        </span>
      </p>

      <p className="body-lg mt-5 max-w-3xl text-on-surface-variant">
        {property.summary}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {property.beds > 0 && (
          <StatPill
            icon={BedDouble}
            label="Bedrooms"
            value={String(property.beds)}
          />
        )}
        {property.baths > 0 && (
          <StatPill
            icon={Bath}
            label="Bathrooms"
            value={String(property.baths)}
          />
        )}
        <StatPill icon={Ruler} label="Area" value={property.area} />
        <StatPill icon={Building2} label="Type" value={property.type} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-light-border pt-6 text-sm text-on-surface-variant">
        <span className="flex items-center gap-2">
          <CalendarDays className="size-4 text-accent" aria-hidden="true" />
          Listed {formatListedDate(property.listedAt)}
        </span>
        {property.yearBuilt && (
          <span>Built in {property.yearBuilt}</span>
        )}
        {property.parkingSpaces !== undefined && property.parkingSpaces > 0 && (
          <span>{property.parkingSpaces} parking spaces</span>
        )}
      </div>
    </section>
  );
}

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-light-border bg-cream px-4 py-4">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold text-on-surface">{value}</p>
    </div>
  );
}
