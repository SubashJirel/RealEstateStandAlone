import {
  Car,
  Check,
  Dumbbell,
  Flame,
  Leaf,
  LucideIcon,
  Shield,
  Sparkles,
  Trees,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import type { PropertyDetail } from "@/lib/real-estate-template";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyAmenitiesProps {
  property: PropertyDetail;
}

const AMENITY_ICONS: Record<string, LucideIcon> = {
  pool: Waves,
  parking: Car,
  garden: Trees,
  security: Shield,
  internet: Wifi,
  fitness: Dumbbell,
  ac: Wind,
  fireplace: Flame,
  eco: Leaf,
  premium: Sparkles,
};

function iconForAmenity(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("pool")) return AMENITY_ICONS.pool;
  if (lower.includes("park") || lower.includes("charging")) return AMENITY_ICONS.parking;
  if (lower.includes("garden") || lower.includes("landscape") || lower.includes("terrace"))
    return AMENITY_ICONS.garden;
  if (lower.includes("security") || lower.includes("cctv")) return AMENITY_ICONS.security;
  if (lower.includes("internet")) return AMENITY_ICONS.internet;
  if (lower.includes("fitness")) return AMENITY_ICONS.fitness;
  if (lower.includes("ac") || lower.includes("hvac")) return AMENITY_ICONS.ac;
  if (lower.includes("fireplace")) return AMENITY_ICONS.fireplace;
  if (lower.includes("view") || lower.includes("himalaya")) return AMENITY_ICONS.eco;
  return AMENITY_ICONS.premium;
}

export function PropertyAmenities({ property }: PropertyAmenitiesProps) {
  if (property.amenities.length === 0) return null;

  return (
    <section aria-labelledby="amenities-heading">
      <DetailSectionTitle
        eyebrow="Comfort & Convenience"
        title="Amenities"
        id="amenities-heading"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {property.amenities.map((amenity) => {
          const Icon = iconForAmenity(amenity);
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-light-border bg-cream px-4 py-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-on-surface">{amenity}</span>
              <Check
                className="ml-auto size-4 shrink-0 text-accent"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
