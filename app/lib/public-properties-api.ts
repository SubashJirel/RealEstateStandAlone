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
  status: "For Sale" | "For Rent" | "Sold";
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
  floorPlans: [];
  agent: LiveAgentDetail | null;
  yearBuilt: number | null;
  parkingSpaces: number | null;
  pricePerUnit: string | null;
  lotSize: string;
  furnishing: string | null;
  latitude: string;
  longitude: string;
  virtualTour: string;
  floors: number;
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
): "For Sale" | "For Rent" | "Sold" {
  if (purpose === "rent") return "For Rent";
  if (purpose === "sold") return "Sold";
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
  const primaryMedia =
    property.media?.find((m: any) => m.is_primary) ?? property.media?.[0];

  const image: string = primaryMedia?.file ?? PLACEHOLDER_IMAGE;

  const gallery: LiveGalleryItem[] = (property.media ?? []).map((m: any) => ({
    id: m.id,
    image: m.file,
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
      value: `${property.land_area_value} ${property.land_area_unit}`,
    },
    {
      label: "Built-up Area",
      value: `${property.built_up_area_value} ${property.built_up_area_unit}`,
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
      value: `${property.currency} ${property.price_per_sqft}`,
    },
  ];

  const amenities: string[] = property.amenities
    ? property.amenities.split(",").map((a: string) => a.trim())
    : [];

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
    city: property.city,
    location: property.location_display ?? `${property.neighbourhood}, ${property.city}`,
    featured: property.is_featured ?? false,
    listedAt: property.published_at ?? property.created_at,

    gallery,
    keyFeatures,
    amenities,
    floorPlans: [],

    agent: property.assigned_agent_detail ?? null,
    yearBuilt: property.year_built ?? null,
    parkingSpaces: property.parking_spaces ?? null,
    pricePerUnit: property.price_per_sqft
      ? `${property.currency} ${property.price_per_sqft} / sq.ft`
      : null,
    lotSize: `${property.land_area_value} ${property.land_area_unit}`,
    furnishing: property.furnishing_status_display ?? null,
    latitude: property.latitude ?? "",
    longitude: property.longitude ?? "",
    virtualTour: property.virtual_tour_url ?? "",
    floors: property.floors ?? 0,
  };
}

// ---------------------------------------------------------------------------
// API fetch — list
// ---------------------------------------------------------------------------

const LICENSE_NUMBER = "NR-001";

export async function fetchPublicProperties(): Promise<LiveListingProperty[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${LICENSE_NUMBER}/properties/`;

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
  payload: PropertyInquiryPayload
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${LICENSE_NUMBER}/properties/${propertyId}/inquire/`;

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
  payload: SiteVisitRequestPayload
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${LICENSE_NUMBER}/properties/${propertyId}/request-site-visit/`;

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
  id: number | string
): Promise<LiveListingProperty> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${LICENSE_NUMBER}/properties/${id}/`;

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
