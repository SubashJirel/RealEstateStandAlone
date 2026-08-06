import { getPublicApiBaseUrl } from "@/lib/public-agency-api";

export interface CustomerSession {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  access_token: string;
}

export interface SavedProperty {
  id: number;
  property: number;
  property_title: string;
  property_price: string;
  created_at: string;
}

export interface SavedSearch {
  id: number;
  name: string;
  filters: Record<string, string | number>;
  alerts_enabled: boolean;
}

export interface AvailabilitySlot {
  id: number;
  agent: number;
  agent_name: string;
  weekday: number;
  start_time: string;
  end_time: string;
  slot_minutes: number;
}

function storageKey(slug: string) {
  return `nexora_customer_${slug}`;
}

export function getCustomerSession(slug: string): CustomerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(storageKey(slug));
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setCustomerSession(slug: string, session: CustomerSession | null) {
  if (typeof window === "undefined") return;
  if (session) window.localStorage.setItem(storageKey(slug), JSON.stringify(session));
  else window.localStorage.removeItem(storageKey(slug));
  window.dispatchEvent(new CustomEvent("nexora-customer-session", { detail: { slug } }));
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getPublicApiBaseUrl()}${path}`, init);
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const detail = data?.detail || Object.values(data || {}).flat().join(" ");
    throw new Error(detail || `Request failed: ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

function customerHeaders(slug: string): HeadersInit {
  const token = getCustomerSession(slug)?.access_token;
  return {
    "Content-Type": "application/json",
    ...(token ? { "X-Customer-Token": token } : {}),
  };
}

export function registerCustomer(
  slug: string,
  payload: { full_name: string; email: string; phone?: string; password: string }
) {
  return request<CustomerSession>(`/public/agencies/${slug}/customers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function loginCustomer(slug: string, payload: { email: string; password: string }) {
  return request<CustomerSession>(`/public/agencies/${slug}/customers/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function getSavedProperties(slug: string) {
  return request<SavedProperty[]>(`/public/agencies/${slug}/customer/saved-properties/`, {
    headers: customerHeaders(slug),
  });
}

export function toggleSavedProperty(slug: string, property: number) {
  return request<SavedProperty | void>(`/public/agencies/${slug}/customer/saved-properties/`, {
    method: "POST",
    headers: customerHeaders(slug),
    body: JSON.stringify({ property }),
  });
}

export function getSavedSearches(slug: string) {
  return request<SavedSearch[]>(`/public/agencies/${slug}/customer/saved-searches/`, {
    headers: customerHeaders(slug),
  });
}

export function createSavedSearch(
  slug: string,
  payload: { name: string; filters: Record<string, string | number>; alerts_enabled?: boolean }
) {
  return request<SavedSearch>(`/public/agencies/${slug}/customer/saved-searches/`, {
    method: "POST",
    headers: customerHeaders(slug),
    body: JSON.stringify(payload),
  });
}

export function getAvailability(slug: string) {
  return request<AvailabilitySlot[]>(`/public/agencies/${slug}/appointments/`);
}

export function createAppointment(
  slug: string,
  payload: {
    agent: number;
    property?: number;
    full_name: string;
    email: string;
    phone?: string;
    starts_at: string;
    ends_at: string;
    notes?: string;
  }
) {
  return request(`/public/agencies/${slug}/appointments/`, {
    method: "POST",
    headers: customerHeaders(slug),
    body: JSON.stringify(payload),
  });
}
