import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PropertyDetail } from "@/lib/real-estate-template";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyMapPlaceholderProps {
  property: PropertyDetail;
}

export function PropertyMapPlaceholder({ property }: PropertyMapPlaceholderProps) {
  return (
    <section aria-labelledby="location-heading">
      <DetailSectionTitle
        eyebrow="Neighborhood"
        title="Location"
        id="location-heading"
      />

      <div className="overflow-hidden rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest shadow-low">
        <div className="relative aspect-[16/7] bg-charcoal">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #153c3b 0%, #263238 50%, #153c3b 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c6a15b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-luxury">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-inverse-on-surface/70">
                Interactive Map
              </p>
              <p className="mt-2 max-w-xs text-lg font-semibold text-inverse-on-surface">
                {property.address}
              </p>
              <p className="mt-1 text-sm text-inverse-on-surface/65">
                {property.city}, Nepal
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-light-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-surface-variant">
            Map integration placeholder  connect Google Maps or Mapbox in
            production.
          </p>
          <Button variant="outline" size="sm" className="shrink-0">
            <Navigation aria-hidden="true" />
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
}
