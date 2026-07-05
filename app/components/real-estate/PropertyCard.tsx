import Link from "next/link";
import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getPropertyDetailPath, type Property } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <article
      className={cn(
        "card-hover overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest shadow-low",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
        <div
          role="img"
          aria-label={property.title}
          className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{ backgroundImage: `url(${property.image})` }}
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant={property.status === "Sold" ? "sold" : "accent"}>
            {property.status}
          </Badge>
          {property.featured && <Badge variant="default">Featured</Badge>}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-accent">{property.type}</p>
            <h3 className="mt-1 text-xl font-semibold leading-7 text-on-surface">
              {property.title}
            </h3>
          </div>
          <p className="shrink-0 text-right text-lg font-bold text-primary">
            {property.price}
          </p>
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm text-on-surface-variant">
          <MapPin className="size-4" aria-hidden="true" />
          {property.location}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-light-border py-4 text-sm text-on-surface-variant">
          <span className="flex items-center gap-2">
            <BedDouble className="size-4 text-primary" aria-hidden="true" />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-2">
            <Bath className="size-4 text-primary" aria-hidden="true" />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-2">
            <Ruler className="size-4 text-primary" aria-hidden="true" />
            {property.area}
          </span>
        </div>

        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href={getPropertyDetailPath(property)}>View Details</Link>
        </Button>
      </div>
    </article>
  );
}
