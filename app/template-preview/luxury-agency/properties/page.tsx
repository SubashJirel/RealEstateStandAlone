import { Building2 } from "lucide-react";
import { PropertyListingsBrowser } from "@/components/real-estate/listings/PropertyListingsBrowser";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Properties | Aurelia Estates Preview",
  description:
    "Browse premium real estate listings with responsive filters, sorting, favorites, and pagination.",
};

export default function LuxuryAgencyPropertiesPage() {
  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />

      <section className="relative overflow-hidden bg-charcoal py-14 text-inverse-on-surface md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=85)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/65" />
        <div className="container-nexora relative">
          <Badge variant="accent">Property Listings</Badge>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Explore Verified Premium Properties
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-inverse-on-surface/72 md:text-lg">
                Search homes, rental residences, land parcels, and commercial
                spaces with practical filters built for serious property
                discovery.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Building2 className="size-7 text-accent" aria-hidden="true" />
              <p className="mt-3 text-3xl font-bold">250+</p>
              <p className="mt-1 text-sm text-inverse-on-surface/65">
                Active verified listings
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-nexora">
          <PropertyListingsBrowser />
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
