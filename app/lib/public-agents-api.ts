// ---------------------------------------------------------------------------
// Types — raw API response shape
// ---------------------------------------------------------------------------

export interface ApiAgent {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  profile_image: string;
  profile_image_url: string;
  designation: string;
  location: string;
  years_experience: number;
  /** Comma-separated string from the API, e.g. "English, Nepali" */
  languages: string;
  /** Comma-separated string from the API, e.g. "Luxury Villas, Negotiation" */
  specialties: string;
  bio: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  deals_closed: number;
  current_listing_ids: string[];
  sold_property_ids: string[];
  profile_completed: boolean;
}

// ---------------------------------------------------------------------------
// Mapper: ApiAgent → Agent (real-estate-template shape)
// ---------------------------------------------------------------------------

import type { Agent } from "@/lib/real-estate-template";

const PLACEHOLDER_AVATAR =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";

function splitCSV(value: string | string[] | null | undefined): string[] {
  if (!value) return [];
  // API may return an array already
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean);
  // Otherwise treat as comma-separated string
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function mapApiAgentToAgent(raw: ApiAgent): Agent {
  return {
    // Use numeric id as string — used for the profile URL slug
    id: String(raw.id),
    name: raw.full_name,
    role: raw.designation || "Property Advisor",
    location: raw.location || "Nepal",
    phone: raw.phone || "",
    email: raw.email || "",
    // Prefer the resolved URL, fall back to the raw path, then placeholder
    image: raw.profile_image_url || raw.profile_image || PLACEHOLDER_AVATAR,
    dealsClosed: raw.deals_closed ?? 0,
    // API does not expose a rating — default to a sensible display value
    rating: 0,
    yearsExperience: raw.years_experience ?? 0,
    languages: splitCSV(raw.languages),
    specialties: splitCSV(raw.specialties),
    biography: raw.bio || "",
    socialLinks: {
      linkedin: raw.linkedin_url || "",
      instagram: raw.instagram_url || "",
      facebook: raw.facebook_url || "",
    },
    currentListingIds: raw.current_listing_ids ?? [],
    reviews: [],
  };
}

// ---------------------------------------------------------------------------
// API fetch
// ---------------------------------------------------------------------------

const LICENSE_NUMBER = process.env.NEXT_PUBLIC_AGENCY_LICENSE_NUMBER;

function getLicenseNumber(): string {
  if (!LICENSE_NUMBER) {
    throw new Error("NEXT_PUBLIC_AGENCY_LICENSE_NUMBER is not defined");
  }

  return LICENSE_NUMBER;
}

export async function fetchPublicAgents(): Promise<Agent[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${getLicenseNumber()}/agents/`;

  const res = await fetch(url, {
    // Revalidate every 60 seconds via Next.js data cache
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch agents: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  // Handle both paginated { results: [] } and plain array responses
  const list: ApiAgent[] = Array.isArray(data) ? data : (data.results ?? []);

  return list.map(mapApiAgentToAgent);
}

// ---------------------------------------------------------------------------
// API fetch — single agent detail
// ---------------------------------------------------------------------------

export async function fetchPublicAgentById(id: number | string): Promise<Agent> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const url = `${baseUrl}/public/agencies/${getLicenseNumber()}/agents/${id}/`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch agent ${id}: ${res.status} ${res.statusText}`
    );
  }

  const data: ApiAgent = await res.json();
  return mapApiAgentToAgent(data);
}
