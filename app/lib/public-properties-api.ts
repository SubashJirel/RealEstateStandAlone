/* External API payloads are normalized at this boundary before entering typed UI code. */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPublicApiBaseUrl } from "./public-agency-api";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LiveGalleryItem {
  id: number;
  image: string;
  title: string;
  isPrimary: boolean;
}

export interface LiveAgentDetail {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  designation: string | null;
  bio: string | null;
  profile_image: string | null;
}

export interface LiveKeyFeature {
  label: string;
  value: string | number;
}

/** The shape consumed by components — mirrors ListingProperty closely so the
 *  existing card and detail UI requires minimal changes. */
export interface LiveListingProperty {
  // Core identity
  id: number;
  displayPropertyId: string;
  slug: string; // derived from title for URL routing

  // Display
  title: string;
  summary: string;
  description: string;

  // Card display fields  (mirrors ListingProperty)
  image: string; // primary media image, or placeholder
  price: string; // formatted: "NPR 3.85 Cr"
  priceRaw: number; // numeric value for sorting/filtering
  currency: string;
  status: "For Sale" | "For Rent" | "For Lease";
  type: string; // capitalised property_type
  beds: number;
  baths: number;
  area: string; // built_up_area_value + unit
  address: string;
  city: string;
  location: string; // location_display
  featured: boolean;
  listedAt: string; // published_at ISO string

  // Rich detail fields
  gallery: LiveGalleryItem[];
  keyFeatures: LiveKeyFeature[];
  amenities: string[];
  floorPlans: LiveGalleryItem[];
  agent: LiveAgentDetail | null;
  yearBuilt: number | null;
  parkingSpaces: number | null;
  pricePerUnit: string | null;
  lotSize: string;
  furnishing: string | null;
  latitude: string;
  longitude: string;
  virtualTour: string;
  videoTour: string;
  shareSlug: string;
  floors: number;
  classification: string;
  verificationLevel: string;
  verificationLabel: string;
  fullyVerified: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function purposeToStatus(
  purpose: string
): "For Sale" | "For Rent" | "For Lease" {
  if (purpose === "rent") return "For Rent";
  if (purpose === "lease") return "For Lease";
  return "For Sale";
}

function formatPrice(price: string, currency: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return `${currency} ${price}`;

  if (currency === "NPR") {
    if (num >= 10_000_000) {
      return `NPR ${(num / 10_000_000).toFixed(2)} Cr`;
    }
    if (num >= 100_000) {
      return `NPR ${(num / 100_000).toFixed(2)} L`;
    }
    return `NPR ${num.toLocaleString()}`;
  }

  return `${currency} ${num.toLocaleString()}`;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

// ---------------------------------------------------------------------------
// Mapper
// ---------------------------------------------------------------------------

export function mapProperty(property: any): LiveListingProperty {
  const imageMedia = (property.media ?? []).filter((m: any) => m.media_type === "image");
  const primaryMedia = imageMedia.find((m: any) => m.is_primary) ?? imageMedia[0];

  const image: string = primaryMedia?.file ?? primaryMedia?.external_url ?? PLACEHOLDER_IMAGE;

  const gallery: LiveGalleryItem[] = imageMedia.map((m: any) => ({
    id: m.id,
    image: m.file || m.external_url || m.thumbnail,
    title: m.title,
    isPrimary: m.is_primary,
  }));

  const priceRaw = parseFloat(property.price ?? "0");
  const price = formatPrice(property.price, property.currency);

  const builtUpArea =
    property.built_up_area_value && property.built_up_area_unit
      ? `${property.built_up_area_value} ${property.built_up_area_unit}`
      : property.land_area_value && property.land_area_unit
        ? `${property.land_area_value} ${property.land_area_unit}`
        : "N/A";

  const keyFeatures: LiveKeyFeature[] = [
    { label: "Property Type", value: capitalize(property.property_type) },
    { label: "Year Built", value: property.year_built ?? "N/A" },
    {
      label: "Land Area",
      value: property.land_area_value && property.land_area_unit
        ? `${property.land_area_value} ${property.land_area_unit}`
        : "N/A",
    },
    {
      label: "Built-up Area",
      value: property.built_up_area_value && property.built_up_area_unit
        ? `${property.built_up_area_value} ${property.built_up_area_unit}`
        : "N/A",
    },
    {
      label: "Parking",
      value: property.parking_spaces
        ? `${property.parking_spaces} ${property.parking_type ?? ""}`.trim()
        : "N/A",
    },
    {
      label: "Furnishing",
      value: property.furnishing_status_display ?? "N/A",
    },
    {
      label: "Facing",
      value: property.facing_direction_display ?? "N/A",
    },
    {
      label: "Price per sq.ft",
      value: property.price_per_sqft ? `${property.currency} ${property.price_per_sqft}` : "N/A",
    },
    { label: "Classification", value: titleCase(property.land_use_classification) },
    { label: "Road", value: property.road_access_value ? `${property.road_access_value} ${property.road_access_unit} · ${titleCase(property.road_type)}` : titleCase(property.road_type) },
    { label: "Plot Shape", value: titleCase(property.plot_shape) },
    { label: "Mohada × Pichhad", value: property.mohada_value || property.pichhad_value ? `${property.mohada_value ?? "—"} × ${property.pichhad_value ?? "—"} ${property.plot_dimension_unit}` : "N/A" },
    { label: "Nearby Route", value: property.major_road_distance_value ? `${property.major_road_distance_value} ${property.major_road_distance_unit} to ${property.nearest_major_road || titleCase(property.major_road_type)}` : "N/A" },
    { label: "Price / Aana", value: property.price_per_aana ? formatPrice(property.price_per_aana, property.currency) : "N/A" },
    { label: "Price / Dhur", value: property.price_per_dhur ? formatPrice(property.price_per_dhur, property.currency) : "N/A" },
    { label: "Price / Kattha", value: property.price_per_kattha ? formatPrice(property.price_per_kattha, property.currency) : "N/A" },
    { label: "Land price / sq.ft", value: property.price_per_land_sqft ? formatPrice(property.price_per_land_sqft, property.currency) : "N/A" },
    { label: "Utilities", value: [[property.has_water_supply,"Water"],[property.has_electricity,"Electricity"],[property.has_drainage,"Drainage"],[property.has_sewage,"Sewage"]].filter(([available]) => available === true).map(([, label]) => label).join(", ") || "Not confirmed" },
    { label: "Verification", value: property.verification_summary?.label ?? "Not verified" },
    { label: "Documents resolved", value: property.verification_summary ? `${property.verification_summary.approved_documents}/${property.verification_summary.total_documents}` : "0/10" },
  ];

  const amenities: string[] = Array.isArray(property.amenities)
    ? property.amenities.map((item: unknown) => String(item).trim()).filter(Boolean)
    : typeof property.amenities === "string"
      ? property.amenities.split(",").map((item: string) => item.trim()).filter(Boolean)
      : [];
  const floorPlans: LiveGalleryItem[] = (property.media ?? [])
    .filter((item: any) => item.media_type === "floor_plan")
    .map((item: any) => ({
      id: item.id,
      image: item.file || item.external_url || item.thumbnail,
      title: item.title || "Floor plan",
      isPrimary: item.is_primary,
    }));

  return {
    id: property.id,
    displayPropertyId: property.display_property_id,
    slug: slugify(property.title),

    title: property.title,
    summary: property.short_description ?? "",
    description: property.description ?? "",

    image,
    price,
    priceRaw,
    currency: property.currency,
    status: purposeToStatus(property.purpose),
    type: capitalize(property.property_type),
    beds: property.bedrooms ?? 0,
    baths: property.bathrooms ?? 0,
    area: builtUpArea,
    address: property.address,
    city: property.municipality || property.city,
    location: property.location_display ?? `${property.neighbourhood}, ${property.city}`,
    featured: property.is_featured ?? false,
    listedAt: property.published_at ?? property.created_at,

    gallery,
    keyFeatures,
    amenities,
    floorPlans,

    agent: property.assigned_agent_detail ?? null,
    yearBuilt: property.year_built ?? null,
    parkingSpaces: property.parking_spaces ?? null,
    pricePerUnit: property.price_per_sqft
      ? `${property.currency} ${property.price_per_sqft} / sq.ft`
      : null,
    lotSize: property.land_area_value && property.land_area_unit
      ? `${property.land_area_value} ${property.land_area_unit}`
      : "N/A",
    furnishing: property.furnishing_status_display ?? null,
    latitude: property.latitude ?? "",
    longitude: property.longitude ?? "",
    virtualTour: property.virtual_tour_url ?? "",
    videoTour: property.video_tour_url ?? "",
    shareSlug: property.share_slug ?? "",
    floors: property.floors ?? 0,
    classification: titleCase(property.land_use_classification),
    verificationLevel: property.verification_summary?.level ?? "unverified",
    verificationLabel: property.verification_summary?.label ?? "Not verified",
    fullyVerified: Boolean(property.verification_summary?.is_fully_verified),
  };
}

// ---------------------------------------------------------------------------
// API fetch — list
// ---------------------------------------------------------------------------

const LICENSE_NUMBER = process.env.NEXT_PUBLIC_AGENCY_LICENSE_NUMBER;

function getLicenseNumber(licenseNumber?: string): string {
  const resolved = licenseNumber || LICENSE_NUMBER;
  if (!resolved) {
    throw new Error("NEXT_PUBLIC_AGENCY_LICENSE_NUMBER is not defined");
  }

  return resolved;
}

function titleCase(str: string): string {
  return str ? str.split("_").map(capitalize).join(" ") : "N/A";
}

export interface PublicPropertyQuery {
  search?: string;
  location?: string;
  property_type?: string;
  purpose?: string;
  price_min?: string | number;
  price_max?: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  ordering?: string;
  featured?: boolean;
  municipality?: string;
  ward_number?: string | number;
  land_use_classification?: string;
  road_type?: string;
  plot_shape?: string;
  land_area_min?: string | number;
  land_area_max?: string | number;
  land_area_unit?: string;
}

export interface PublicPropertyFilterOptions {
  property_types: Array<{ value: string; label: string }>;
  purposes: Array<{ value: string; label: string }>;
  locations: Array<{ value: string; label: string; type: string }>;
  land_use_classifications?: Array<{ value: string; label: string }>;
  area_units?: Array<{ value: string; label: string }>;
  road_types?: Array<{ value: string; label: string }>;
  plot_shapes?: Array<{ value: string; label: string }>;
}

export async function fetchPublicPropertyFilterOptions(
  licenseNumber?: string
): Promise<PublicPropertyFilterOptions> {
  const baseUrl = getPublicApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/filter-options/`,
    { next: { revalidate: 300 } }
  );
  if (!response.ok) throw new Error(`Failed to fetch property filters: ${response.status}`);
  return response.json();
}

export async function fetchPublicProperties(
  licenseNumber?: string,
  query: PublicPropertyQuery = {}
): Promise<LiveListingProperty[]> {
  const baseUrl = getPublicApiBaseUrl();

  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "All" && value !== "Any") {
      search.set(key, String(value));
    }
  });
  const suffix = search.size ? `?${search}` : "";
  const url = `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${suffix}`;

  const res = await fetch(url, {
    // Revalidate every 60 seconds in Next.js cache
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch properties: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  // Handle both paginated { results: [] } and plain array responses
  const list: any[] = Array.isArray(data) ? data : (data.results ?? []);

  return list.map(mapProperty);
}

// ---------------------------------------------------------------------------
// API — request site visit
// ---------------------------------------------------------------------------

export interface SiteVisitRequestPayload {
  full_name: string;
  phone: string;
  email: string;
  preferred_datetime: string; // ISO 8601
  message: string;
}

export interface PropertyInquiryPayload {
  full_name: string;
  phone: string;
  email: string;
  message: string;
}

export async function inquireProperty(
  propertyId: number | string,
  payload: PropertyInquiryPayload,
  licenseNumber?: string
): Promise<void> {
  const baseUrl = getPublicApiBaseUrl();

  const url = `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${propertyId}/inquire/`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Property inquiry failed: ${res.status} ${res.statusText}`);
  }
}

export async function requestSiteVisit(
  propertyId: number | string,
  payload: SiteVisitRequestPayload,
  licenseNumber?: string
): Promise<void> {
  const baseUrl = getPublicApiBaseUrl();

  const url = `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${propertyId}/request-site-visit/`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(
      `Site visit request failed: ${res.status} ${res.statusText}`
    );
  }
}

// ---------------------------------------------------------------------------
// API fetch — single property detail
// ---------------------------------------------------------------------------

export async function fetchPublicPropertyById(
  id: number | string,
  licenseNumber?: string
): Promise<LiveListingProperty> {
  const baseUrl = getPublicApiBaseUrl();

  const url = `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${id}/`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch property ${id}: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  // The endpoint may return a single object or a 1-element array
  const raw = Array.isArray(data) ? data[0] : data;

  return mapProperty(raw);
}

export async function fetchSimilarProperties(
  id: number | string,
  licenseNumber?: string
): Promise<LiveListingProperty[]> {
  const baseUrl = getPublicApiBaseUrl();
  const response = await fetch(
    `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${id}/similar/`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) throw new Error(`Failed to fetch similar properties: ${response.status}`);
  const data = await response.json();
  return (Array.isArray(data) ? data : data.results ?? []).map(mapProperty);
}

export async function trackPropertyEvent(
  id: number | string,
  eventType: "view" | "whatsapp_click" | "viber_click" | "call_click",
  licenseNumber?: string,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  const baseUrl = getPublicApiBaseUrl();
  await fetch(
    `${baseUrl}/public/agencies/${getLicenseNumber(licenseNumber)}/properties/${id}/events/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: eventType, metadata }),
      keepalive: true,
    }
  );
}
