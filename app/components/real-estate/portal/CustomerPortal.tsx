"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Heart, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteLink, useRequiredAgencySite } from "@/components/real-estate/site/AgencySiteContext";
import {
  createAppointment,
  createSavedSearch,
  getAvailability,
  getCustomerSession,
  getSavedProperties,
  getSavedSearches,
  loginCustomer,
  registerCustomer,
  setCustomerSession,
  type AvailabilitySlot,
  type CustomerSession,
  type SavedProperty,
  type SavedSearch,
} from "@/lib/public-customer-api";

interface PortalOption { id: number; name: string }

export function CustomerPortal({
  agents,
  properties,
}: {
  agents: PortalOption[];
  properties: PortalOption[];
}) {
  const { agency, basePath } = useRequiredAgencySite();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [auth, setAuth] = useState({ full_name: "", phone: "", email: "", password: "" });
  const [saved, setSaved] = useState<SavedProperty[]>([]);
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [searchForm, setSearchForm] = useState({ name: "", location: "", property_type: "", price_max: "" });
  const [appointment, setAppointment] = useState({ agent: "", property: "", starts_at: "", notes: "" });

  const loadPortal = useCallback(async () => {
    const [savedItems, savedSearches, slots] = await Promise.all([
      getSavedProperties(agency.slug),
      getSavedSearches(agency.slug),
      getAvailability(agency.slug),
    ]);
    setSaved(savedItems);
    setSearches(savedSearches);
    setAvailability(slots);
  }, [agency.slug]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const current = getCustomerSession(agency.slug);
      setSession(current);
      if (current) void loadPortal().catch((value) => setError(value.message));
    });
    return () => {
      active = false;
    };
  }, [agency.slug, loadPortal]);

  async function authenticate(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = mode === "login"
        ? await loginCustomer(agency.slug, { email: auth.email, password: auth.password })
        : await registerCustomer(agency.slug, auth);
      setCustomerSession(agency.slug, result);
      setSession(result);
      await loadPortal();
    } catch (value) {
      setError(value instanceof Error ? value.message : "Unable to authenticate.");
    } finally {
      setBusy(false);
    }
  }

  async function saveSearch(event: FormEvent) {
    event.preventDefault();
    const filters = Object.fromEntries(
      Object.entries(searchForm).filter(([key, value]) => key !== "name" && value)
    );
    await createSavedSearch(agency.slug, { name: searchForm.name, filters, alerts_enabled: true });
    setSearchForm({ name: "", location: "", property_type: "", price_max: "" });
    await loadPortal();
  }

  async function book(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    const start = new Date(appointment.starts_at);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    await createAppointment(agency.slug, {
      agent: Number(appointment.agent),
      property: appointment.property ? Number(appointment.property) : undefined,
      full_name: session.full_name,
      email: session.email,
      phone: session.phone,
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
      notes: appointment.notes,
    });
    setAppointment({ agent: "", property: "", starts_at: "", notes: "" });
    setError("Appointment request submitted.");
  }

  if (!session) {
    return (
      <main className="container-nexora py-16">
        <div className="mx-auto max-w-md rounded-[var(--radius-panel)] border border-light-border bg-white p-7 shadow-luxury">
          <h1 className="text-3xl font-bold text-on-surface">Customer portal</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Save properties, create alerts, and book appointments with {agency.name}.</p>
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-cream p-1">
            <button type="button" onClick={() => setMode("login")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "login" ? "bg-white shadow" : ""}`}>Sign in</button>
            <button type="button" onClick={() => setMode("register")} className={`rounded-lg py-2 text-sm font-semibold ${mode === "register" ? "bg-white shadow" : ""}`}>Create account</button>
          </div>
          <form onSubmit={authenticate} className="mt-5 space-y-4">
            {mode === "register" && <>
              <PortalInput label="Full name" value={auth.full_name} onChange={(value) => setAuth({ ...auth, full_name: value })} required />
              <PortalInput label="Phone" value={auth.phone} onChange={(value) => setAuth({ ...auth, phone: value })} />
            </>}
            <PortalInput label="Email" type="email" value={auth.email} onChange={(value) => setAuth({ ...auth, email: value })} required />
            <PortalInput label="Password" type="password" value={auth.password} onChange={(value) => setAuth({ ...auth, password: value })} required />
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container-nexora space-y-8 py-12">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-sm text-on-surface-variant">Welcome back</p><h1 className="text-3xl font-bold">{session.full_name}</h1></div>
        <Button variant="ghost" onClick={() => { setCustomerSession(agency.slug, null); setSession(null); }}><LogOut />Sign out</Button>
      </div>
      {error && <p className="rounded-xl bg-cream p-3 text-sm">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-2">
        <PortalCard title="Saved properties" icon={Heart}>
          <div className="space-y-3">
            {saved.map((item) => <SiteLink key={item.id} href={`/template-preview/luxury-agency/properties/${item.property}`} className="flex justify-between rounded-xl border border-light-border p-3 text-sm"><b>{item.property_title}</b><span>{Number(item.property_price).toLocaleString()}</span></SiteLink>)}
            {!saved.length && <p className="text-sm text-on-surface-variant">Use the heart on a property to save it here.</p>}
          </div>
        </PortalCard>
        <PortalCard title="Saved search alerts" icon={Search}>
          <form onSubmit={saveSearch} className="grid gap-3 sm:grid-cols-2">
            <PortalInput label="Alert name" value={searchForm.name} onChange={(value) => setSearchForm({ ...searchForm, name: value })} required />
            <PortalInput label="Location" value={searchForm.location} onChange={(value) => setSearchForm({ ...searchForm, location: value })} />
            <PortalInput label="Property type" value={searchForm.property_type} onChange={(value) => setSearchForm({ ...searchForm, property_type: value })} />
            <PortalInput label="Maximum price" type="number" value={searchForm.price_max} onChange={(value) => setSearchForm({ ...searchForm, price_max: value })} />
            <Button type="submit">Save alert</Button>
          </form>
          <div className="mt-4 space-y-2">{searches.map((item) => <div key={item.id} className="rounded-xl bg-cream p-3 text-sm"><b>{item.name}</b><p className="mt-1 text-xs">{Object.entries(item.filters).map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`).join(" · ")}</p></div>)}</div>
        </PortalCard>
      </div>
      <PortalCard title="Book an appointment" icon={CalendarDays}>
        <form onSubmit={book} className="grid gap-4 sm:grid-cols-2">
          <PortalSelect label="Agent" value={appointment.agent} onChange={(value) => setAppointment({ ...appointment, agent: value })} options={agents} required />
          <PortalInput label="Preferred date and time" type="datetime-local" value={appointment.starts_at} onChange={(value) => setAppointment({ ...appointment, starts_at: value })} required />
          <PortalSelect label="Property (optional)" value={appointment.property} onChange={(value) => setAppointment({ ...appointment, property: value })} options={properties} />
          <PortalInput label="Notes" value={appointment.notes} onChange={(value) => setAppointment({ ...appointment, notes: value })} />
          <Button type="submit">Request appointment</Button>
        </form>
        <p className="mt-4 text-xs text-on-surface-variant">{availability.length ? `${availability.length} recurring availability window(s) published by the team.` : "The agency will confirm a suitable time after your request."}</p>
      </PortalCard>
      <SiteLink href={`${basePath}/properties`} className="text-sm font-semibold text-primary">Continue browsing properties →</SiteLink>
    </main>
  );
}

function PortalCard({ title, icon: Icon, children }: { title: string; icon: typeof Heart; children: React.ReactNode }) {
  return <section className="rounded-[var(--radius-panel)] border border-light-border bg-white p-6 shadow-low"><h2 className="mb-5 flex items-center gap-2 text-xl font-semibold"><Icon className="size-5" />{title}</h2>{children}</section>;
}

function PortalInput({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="text-xs font-medium">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-1 h-11 w-full rounded-xl border border-light-border px-3 text-sm" /></label>;
}

function PortalSelect({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (value: string) => void; options: PortalOption[]; required?: boolean }) {
  return <label className="text-xs font-medium">{label}<select value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-1 h-11 w-full rounded-xl border border-light-border px-3 text-sm"><option value="">Choose</option>{options.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>;
}
