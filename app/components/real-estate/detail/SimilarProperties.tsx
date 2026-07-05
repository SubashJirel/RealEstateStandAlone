import Link from "next/link";
import { ArrowRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getPropertyDetailPath,
  type ListingProperty,
  type PropertyDetail,
} from "@/lib/real-estate-template";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface SimilarPropertiesProps {
  properties: ListingProperty[];
  currentProperty: PropertyDetail;
}

export function SimilarProperties({
  properties,
  currentProperty,
}: SimilarPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section aria-labelledby="similar-properties-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <DetailSectionTitle
          eyebrow="You May Also Like"
          title="Similar Properties"
          id="similar-properties-heading"
        />
        <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-auto">
          <Link href="/template-preview/luxury-agency/properties">
            View All Listings
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <SimilarPropertyCard
            key={property.id}
            property={property}
            currentId={currentProperty.id}
          />
        ))}
      </div>
    </section>
  );
}

function SimilarPropertyCard({
  property,
}: {
  property: ListingProperty;
  currentId: string;
}) {
  const href = getPropertyDetailPath(property);

  return (
    <article className="card-hover group overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest shadow-low">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${property.image})` }}
            role="img"
            aria-label={property.title}
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge
              variant={property.status === "For Rent" ? "secondary" : "accent"}
            >
              {property.status}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xl font-bold text-primary">{property.price}</p>
          <h3 className="mt-2 text-lg font-semibold leading-7 text-on-surface transition group-hover:text-primary">
            {property.title}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {property.location}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 border-t border-light-border pt-4 text-sm text-on-surface-variant">
            {property.beds > 0 && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="size-4 text-primary" aria-hidden="true" />
                {property.beds} Beds
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath className="size-4 text-primary" aria-hidden="true" />
                {property.baths} Baths
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Ruler className="size-4 text-primary" aria-hidden="true" />
              {property.area}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
