"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Expand,
  Grid3X3,
  Heart,
  Home,
  ChevronRight as ChevronRightIcon,
  LucideIcon,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Ruler,
  Share2,
  Star,
  Car,
  Check,
  Dumbbell,
  Flame,
  Leaf,
  Shield,
  Sparkles,
  Trees,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { LiveListingProperty } from "@/lib/public-properties-api";

// ---------------------------------------------------------------------------
// Main layout
// ---------------------------------------------------------------------------

export function LivePropertyDetailView({
  property,
}: {
  property: LiveListingProperty;
}) {
  // Derive image array from gallery (fall back to the card thumbnail)
  const images =
    property.gallery.length > 0
      ? property.gallery.map((g) => g.image)
      : [property.image];

  return (
    <>
      <section className="py-6 md:py-10">
        <div className="container-nexora">
          <LiveBreadcrumb property={property} />
          <LiveImageGallery images={images} title={property.title} />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-nexora">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_420px]">
            <div className="space-y-12 md:space-y-16">
              <LiveOverview property={property} />
              <LiveKeyFeatures property={property} />
              <LiveAmenities property={property} />
              <LiveMapPlaceholder property={property} />
              <LiveDescription property={property} />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <LivePriceSection property={property} />
              {property.agent && (
                <LiveAgentInfo
                  agent={property.agent}
                  propertyTitle={property.title}
                />
              )}
              <LiveInquiryForm property={property} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

function LiveBreadcrumb({ property }: { property: LiveListingProperty }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-on-surface-variant">
        <li>
          <Link
            href="/template-preview/luxury-agency"
            className="inline-flex items-center gap-1.5 transition hover:text-primary"
          >
            <Home className="size-3.5" aria-hidden="true" />
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRightIcon className="size-3.5" />
        </li>
        <li>
          <Link
            href="/template-preview/luxury-agency/properties"
            className="transition hover:text-primary"
          >
            Properties
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRightIcon className="size-3.5" />
        </li>
        <li>
          <span className="font-medium text-on-surface" aria-current="page">
            {property.title}
          </span>
        </li>
      </ol>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Image Gallery
// ---------------------------------------------------------------------------

function LiveImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function goTo(index: number) {
    setActiveIndex((index + images.length) % images.length);
  }

  return (
    <>
      <div className="space-y-3">
        <div className="group relative overflow-hidden rounded-[var(--radius-panel)] bg-charcoal shadow-luxury">
          <div
            className="aspect-[16/9] bg-cover bg-center transition duration-700 md:aspect-[21/9]"
            style={{ backgroundImage: `url(${images[activeIndex]})` }}
            role="img"
            aria-label={`${title} — photo ${activeIndex + 1} of ${images.length}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-charcoal/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-inverse-on-surface backdrop-blur">
            <Grid3X3 className="size-3.5 text-accent" aria-hidden="true" />
            {activeIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/15 text-inverse-on-surface backdrop-blur transition hover:bg-white/25"
            aria-label="View full gallery"
          >
            <Expand className="size-4" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-inverse-on-surface backdrop-blur transition hover:bg-charcoal/70"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-charcoal/50 text-inverse-on-surface backdrop-blur transition hover:bg-charcoal/70"
                aria-label="Next photo"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 md:grid-cols-5 md:gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-[var(--radius-button)] border-2 bg-surface-container transition",
                  activeIndex === index
                    ? "border-accent shadow-low"
                    : "border-transparent opacity-80 hover:opacity-100"
                )}
                aria-label={`View photo ${index + 1}`}
                aria-current={activeIndex === index}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-inverse-on-surface transition hover:bg-white/10"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-inverse-on-surface"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <div
            className="max-h-[85vh] w-full max-w-6xl bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[activeIndex]})`,
              aspectRatio: "16/9",
            }}
            role="img"
            aria-label={`${title} — photo ${activeIndex + 1}`}
          />
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-inverse-on-surface"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

function formatListedDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

function LiveOverview({ property }: { property: LiveListingProperty }) {
  return (
    <section aria-labelledby="property-overview-heading">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={property.status === "For Rent" ? "secondary" : "accent"}>
          {property.status}
        </Badge>
        <Badge variant="outline">{property.type}</Badge>
        {property.featured && <Badge variant="default">Featured</Badge>}
        <span className="text-xs font-medium text-on-surface-variant">
          {property.displayPropertyId}
        </span>
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
          {property.address}
          {property.location && `, ${property.location}`}
        </span>
      </p>

      {property.summary && (
        <p className="body-lg mt-5 max-w-3xl text-on-surface-variant">
          {property.summary}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {property.beds > 0 && (
          <StatPill icon={BedDouble} label="Bedrooms" value={String(property.beds)} />
        )}
        {property.baths > 0 && (
          <StatPill icon={Bath} label="Bathrooms" value={String(property.baths)} />
        )}
        <StatPill icon={Ruler} label="Area" value={property.area} />
        <StatPill icon={Building2} label="Type" value={property.type} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-light-border pt-6 text-sm text-on-surface-variant">
        {property.listedAt && (
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-accent" aria-hidden="true" />
            Listed {formatListedDate(property.listedAt)}
          </span>
        )}
        {property.yearBuilt && (
          <span>Built in {property.yearBuilt}</span>
        )}
        {property.parkingSpaces != null && property.parkingSpaces > 0 && (
          <span>{property.parkingSpaces} parking spaces</span>
        )}
        {property.floors > 0 && (
          <span>{property.floors} floors</span>
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

// ---------------------------------------------------------------------------
// Key Features
// ---------------------------------------------------------------------------

function SectionTitle({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 id={id} className="headline-md mt-2 text-on-surface">
        {title}
      </h2>
    </div>
  );
}

function LiveKeyFeatures({ property }: { property: LiveListingProperty }) {
  if (property.keyFeatures.length === 0) return null;
  return (
    <section aria-labelledby="key-features-heading">
      <SectionTitle eyebrow="Highlights" title="Key Features" id="key-features-heading" />
      <div className="grid gap-3 sm:grid-cols-2">
        {property.keyFeatures.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest px-5 py-4"
          >
            <span className="text-sm text-on-surface-variant">{feature.label}</span>
            <span className="text-right text-sm font-semibold text-on-surface">
              {String(feature.value)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Amenities
// ---------------------------------------------------------------------------

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

function iconForAmenity(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("pool")) return AMENITY_ICONS.pool;
  if (lower.includes("park") || lower.includes("charging")) return AMENITY_ICONS.parking;
  if (lower.includes("garden") || lower.includes("landscape") || lower.includes("terrace"))
    return AMENITY_ICONS.garden;
  if (lower.includes("security") || lower.includes("cctv")) return AMENITY_ICONS.security;
  if (lower.includes("internet") || lower.includes("wifi")) return AMENITY_ICONS.internet;
  if (lower.includes("fitness")) return AMENITY_ICONS.fitness;
  if (lower.includes("ac") || lower.includes("hvac") || lower.includes("solar")) return AMENITY_ICONS.ac;
  if (lower.includes("fireplace")) return AMENITY_ICONS.fireplace;
  if (lower.includes("view") || lower.includes("himalaya") || lower.includes("vastu")) return AMENITY_ICONS.eco;
  return AMENITY_ICONS.premium;
}

function LiveAmenities({ property }: { property: LiveListingProperty }) {
  if (property.amenities.length === 0) return null;
  return (
    <section aria-labelledby="amenities-heading">
      <SectionTitle
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
              <Check className="ml-auto size-4 shrink-0 text-accent" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Map placeholder
// ---------------------------------------------------------------------------

function LiveMapPlaceholder({ property }: { property: LiveListingProperty }) {
  const mapsUrl =
    property.latitude && property.longitude
      ? `https://www.google.com/maps?q=${property.latitude},${property.longitude}`
      : `https://www.google.com/maps/search/${encodeURIComponent(property.address)}`;

  return (
    <section aria-labelledby="location-heading">
      <SectionTitle eyebrow="Neighborhood" title="Location" id="location-heading" />
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
                Property Location
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
            {property.location || `${property.city}, Nepal`}
          </p>
          <Button variant="outline" size="sm" className="shrink-0" asChild>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation aria-hidden="true" />
              Get Directions
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

function LiveDescription({ property }: { property: LiveListingProperty }) {
  if (!property.description) return null;
  const paragraphs = property.description.split("\n\n").filter(Boolean);
  return (
    <section aria-labelledby="description-heading">
      <SectionTitle
        eyebrow="About This Property"
        title="Description"
        id="description-heading"
      />
      <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 md:p-8">
        <div className="space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="body-md leading-7 text-on-surface-variant"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Price Section (sidebar)
// ---------------------------------------------------------------------------

function LivePriceSection({ property }: { property: LiveListingProperty }) {
  const priceLabel = property.status === "For Rent" ? "Monthly Rent" : "Asking Price";
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
        <p className="mt-2 text-sm text-on-surface-variant">{property.pricePerUnit}</p>
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
        <PriceRow label="Property ID" value={property.displayPropertyId} />
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

// ---------------------------------------------------------------------------
// Agent Info (sidebar)
// ---------------------------------------------------------------------------

import type { LiveAgentDetail } from "@/lib/public-properties-api";

function LiveAgentInfo({
  agent,
  propertyTitle,
}: {
  agent: LiveAgentDetail;
  propertyTitle: string;
}) {
  return (
    <section
      aria-labelledby="agent-info-heading"
      className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Your Advisor
        </p>
        <h2 id="agent-info-heading" className="headline-md mt-2 text-on-surface">
          Agent Information
        </h2>
      </div>

      <div className="flex items-start gap-4">
        <div
          className="size-20 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-surface-container"
          role="img"
          aria-label={agent.full_name}
          style={
            agent.profile_image
              ? {
                  backgroundImage: `url(${agent.profile_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {!agent.profile_image && (
            <div className="flex h-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
              {agent.full_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-on-surface">{agent.full_name}</h3>
          {agent.designation && (
            <p className="mt-1 text-sm text-on-surface-variant">{agent.designation}</p>
          )}
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent-foreground">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            Verified
          </span>
        </div>
      </div>

      {agent.bio && (
        <p className="mt-5 text-sm leading-6 text-on-surface-variant">{agent.bio}</p>
      )}

      {!agent.bio && (
        <p className="mt-5 text-sm leading-6 text-on-surface-variant">
          {agent.full_name} is your dedicated advisor for{" "}
          <span className="font-semibold text-on-surface">{propertyTitle}</span>.
          Reach out for private viewings, documentation, and offer guidance.
        </p>
      )}

      <div className="mt-5 flex gap-3">
        {agent.phone ? (
          <Button variant="primary" className="flex-1" asChild>
            <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
              <Phone aria-hidden="true" />
              Call
            </a>
          </Button>
        ) : (
          <Button variant="primary" className="flex-1" disabled>
            <Phone aria-hidden="true" />
            Call
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          aria-label={`Email ${agent.full_name}`}
          asChild
        >
          <a href={`mailto:${agent.email}`}>
            <Mail aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Inquiry Form (sidebar)
// ---------------------------------------------------------------------------

function LiveInquiryForm({ property }: { property: LiveListingProperty }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="inquiry-form-heading"
      className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Send a Message
        </p>
        <h2 id="inquiry-form-heading" className="headline-md mt-2 text-on-surface">
          Enquire Now
        </h2>
      </div>

      {submitted ? (
        <div className="rounded-[var(--radius-card)] bg-accent/10 p-5 text-center">
          <p className="font-semibold text-on-surface">Enquiry Sent!</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Our team will contact you shortly regarding{" "}
            <span className="font-medium">{property.title}</span>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="property_id" value={property.displayPropertyId} />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-on-surface">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="h-11 w-full rounded-[var(--radius-button)] border border-light-border bg-warm-white px-3 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-on-surface">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              required
              placeholder="+977 98XXXXXXXX"
              className="h-11 w-full rounded-[var(--radius-button)] border border-light-border bg-warm-white px-3 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-on-surface">
              Message
            </label>
            <textarea
              rows={3}
              placeholder={`I'm interested in ${property.title}…`}
              className="w-full rounded-[var(--radius-button)] border border-light-border bg-warm-white px-3 py-2.5 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Send Enquiry
          </Button>
        </form>
      )}
    </section>
  );
}
