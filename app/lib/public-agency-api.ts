export interface AgencyWebsiteConfig {
  hero_title?: string;
  hero_subtitle?: string;
  hero_eyebrow?: string;
  mission?: string;
  story?: string;
  statistics?: Array<{ label: string; value: string; helper?: string }>;
  testimonials?: Array<{
    name: string;
    role?: string;
    location?: string;
    quote: string;
    rating?: number;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export interface PublicAgency {
  id: number;
  name: string;
  license_number: string;
  slug: string;
  logo: string | null;
  cover_image: string | null;
  about: string;
  email: string | null;
  phone: string | null;
  address: string;
  province: string;
  district: string;
  city: string;
  municipality: string;
  ward_number: string;
  tole: string;
  business_hours: string;
  primary_color: string;
  seo_title: string;
  seo_description: string;
  custom_domain: string;
  website_template: string;
  website_config: AgencyWebsiteConfig;
  is_website_published: boolean;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  viber_number: string | null;
  default_language: "en" | "ne";
  default_date_system: "ad" | "bs";
  use_nepali_digits: boolean;
  timezone: "Asia/Kathmandu";
  address_display: string;
  phone_display: string;
}

export interface PublicSubmissionPayload {
  kind:
    | "contact"
    | "property_inquiry"
    | "valuation"
    | "newsletter"
    | "buyer_guide"
    | "career"
    | "demo"
    | "listing_report";
  full_name?: string;
  email?: string;
  phone?: string;
  message?: string;
  metadata?: Record<string, unknown>;
  source_page?: string;
  property?: number;
  agent?: number;
}

export function getPublicApiBaseUrl(): string {
  const baseUrl = typeof window === "undefined"
    ? process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  return baseUrl.replace(/\/$/, "");
}

async function readAgency(url: string): Promise<PublicAgency> {
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch agency: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function fetchPublicAgencyBySlug(slug: string): Promise<PublicAgency> {
  return readAgency(`${getPublicApiBaseUrl()}/public/agencies/by-slug/${encodeURIComponent(slug)}/`);
}

export function fetchPublicAgencyByDomain(domain: string): Promise<PublicAgency> {
  const query = new URLSearchParams({ domain });
  return readAgency(`${getPublicApiBaseUrl()}/public/agencies/by-domain/?${query}`);
}

export async function submitPublicSubmission(
  agencySlug: string,
  payload: PublicSubmissionPayload
): Promise<{ id: number; kind: string; message: string }> {
  const response = await fetch(
    `${getPublicApiBaseUrl()}/public/agencies/${encodeURIComponent(agencySlug)}/submissions/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const detail = data?.detail || Object.values(data || {}).flat().join(" ");
    throw new Error(detail || `Submission failed: ${response.status}`);
  }
  return response.json();
}

export async function submitAgentReview(
  agencySlug: string,
  agentId: number | string,
  payload: {
    reviewer_name: string;
    reviewer_email?: string;
    rating: number;
    title?: string;
    comment: string;
  }
): Promise<{ id: number; message: string }> {
  const response = await fetch(
    `${getPublicApiBaseUrl()}/public/agencies/${encodeURIComponent(agencySlug)}/agents/${agentId}/reviews/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) throw new Error(`Review submission failed: ${response.status}`);
  return response.json();
}
