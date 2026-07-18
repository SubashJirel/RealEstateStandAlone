import { notFound } from "next/navigation";
import { RealEstateFooter } from "@/components/real-estate/homepage/RealEstateFooter";
import { RealEstateNavbar } from "@/components/real-estate/homepage/RealEstateNavbar";

// Live API imports
import {
  fetchPublicPropertyById,
  fetchPublicProperties,
} from "@/lib/public-properties-api";
import { LivePropertyDetailView } from "@/components/real-estate/detail/LivePropertyDetailView";

// Mock data imports (keep working for existing slug-based routes)
import { PropertyAgentInfo } from "@/components/real-estate/detail/PropertyAgentInfo";
import { PropertyAmenities } from "@/components/real-estate/detail/PropertyAmenities";
import { PropertyDescription } from "@/components/real-estate/detail/PropertyDescription";
import { PropertyDetailBreadcrumb } from "@/components/real-estate/detail/PropertyDetailBreadcrumb";
import { PropertyFloorPlans } from "@/components/real-estate/detail/PropertyFloorPlans";
import { PropertyImageGallery } from "@/components/real-estate/detail/PropertyImageGallery";
import { PropertyInquiryForm } from "@/components/real-estate/detail/PropertyInquiryForm";
import { PropertyKeyFeatures } from "@/components/real-estate/detail/PropertyKeyFeatures";
import { PropertyMapPlaceholder } from "@/components/real-estate/detail/PropertyMapPlaceholder";
import { PropertyOverview } from "@/components/real-estate/detail/PropertyOverview";
import { PropertyPriceSection } from "@/components/real-estate/detail/PropertyPriceSection";
import { SimilarProperties } from "@/components/real-estate/detail/SimilarProperties";
import {
  getAgentForProperty,
  getAllPropertySlugs,
  getPropertyDetailBySlug,
  getSimilarProperties,
} from "@/lib/property-detail-helpers";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// Static params — include both mock slugs AND live numeric IDs
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  // Mock data slugs
  const mockSlugs = getAllPropertySlugs().map((slug) => ({ slug }));

  // Live API IDs — best-effort; fall back to empty on error
  let liveIds: { slug: string }[] = [];
  try {
    const properties = await fetchPublicProperties();
    liveIds = properties.map((p) => ({ slug: String(p.id) }));
  } catch {
    // API unavailable at build time — pages will be rendered on demand
  }

  return [...mockSlugs, ...liveIds];
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { slug } = await params;

  // Numeric → live API property
  if (/^\d+$/.test(slug)) {
    try {
      const property = await fetchPublicPropertyById(slug);
      return {
        title: `${property.title} | Aurelia Estates`,
        description: property.summary,
      };
    } catch {
      return { title: "Property Not Found | Aurelia Estates" };
    }
  }

  // String slug → mock data property
  const property = getPropertyDetailBySlug(slug);
  if (!property) return { title: "Property Not Found | Aurelia Estates" };
  return {
    title: `${property.title} | Aurelia Estates Preview`,
    description: property.summary,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;

  // ── Live API path (numeric ID) ────────────────────────────────────────────
  if (/^\d+$/.test(slug)) {
    let property;
    try {
      property = await fetchPublicPropertyById(slug);
    } catch {
      notFound();
    }

    return (
      <div className="min-h-screen bg-warm-white text-on-surface">
        <RealEstateNavbar />
        <LivePropertyDetailView property={property} />
        <RealEstateFooter />
      </div>
    );
  }

  // ── Mock data path (text slug) ────────────────────────────────────────────
  const property = getPropertyDetailBySlug(slug);
  if (!property) notFound();

  const agent = getAgentForProperty(property);
  const similarProperties = getSimilarProperties(property);

  return (
    <div className="min-h-screen bg-warm-white text-on-surface">
      <RealEstateNavbar />

      <section className="py-6 md:py-10">
        <div className="container-nexora">
          <PropertyDetailBreadcrumb property={property} />
          <PropertyImageGallery property={property} />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-nexora">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12 xl:grid-cols-[1fr_420px]">
            <div className="space-y-12 md:space-y-16">
              <PropertyOverview property={property} />
              <PropertyKeyFeatures property={property} />
              <PropertyAmenities property={property} />
              <PropertyFloorPlans property={property} />
              <PropertyMapPlaceholder property={property} />
              <PropertyDescription property={property} />
              <SimilarProperties
                properties={similarProperties}
                currentProperty={property}
              />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <PropertyPriceSection property={property} />
              <PropertyAgentInfo agent={agent} propertyTitle={property.title} />
              <PropertyInquiryForm property={property} />
            </aside>
          </div>
        </div>
      </section>

      <RealEstateFooter />
    </div>
  );
}
