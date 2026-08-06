import { SiteLink as Link } from "@/components/real-estate/site/AgencySiteContext";
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { LiveListingProperty } from "@/lib/public-properties-api";

interface LiveListingPropertyCardProps {
  property: LiveListingProperty;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const PROPERTY_BASE_PATH =
  "/template-preview/luxury-agency/properties";

export function LiveListingPropertyCard({
  property,
  favorite,
  onToggleFavorite,
}: LiveListingPropertyCardProps) {
  const href = `${PROPERTY_BASE_PATH}/${property.id}`;
  const id = String(property.id);

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
            <Badge variant="outline">{property.type}</Badge>
          </div>
          <button
            type="button"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggleFavorite(id);
            }}
            className={cn(
              "absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/85 text-charcoal shadow-low backdrop-blur transition hover:bg-white",
              favorite && "bg-accent text-accent-foreground"
            )}
          >
            <Heart
              className={cn("size-5", favorite && "fill-current")}
              aria-hidden="true"
            />
          </button>

          {property.featured && (
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-xl font-bold text-primary">{property.price}</p>
          <p className="mt-0.5 text-xs font-medium text-on-surface-variant">
            {property.displayPropertyId}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-7 text-on-surface transition group-hover:text-primary">
            {property.title}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-on-surface-variant">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {property.address}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-light-border pt-4 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4 text-primary" aria-hidden="true" />
              {property.beds > 0 ? `${property.beds} Beds` : "Studio"}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="size-4 text-primary" aria-hidden="true" />
              {property.baths} Baths
            </span>
            <span className="flex items-center gap-1.5 truncate">
              <Ruler className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {property.area}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
