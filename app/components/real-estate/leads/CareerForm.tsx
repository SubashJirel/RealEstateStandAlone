"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useAgencySite } from "@/components/real-estate/site/AgencySiteContext";
import { submitPublicSubmission } from "@/lib/public-agency-api";

export function CareerForm() {
  const site = useAgencySite();
  const [form, setForm] = useState({ name: "", email: "", role: "Property Advisor", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      await submitPublicSubmission(site?.agency.slug || process.env.NEXT_PUBLIC_DEFAULT_AGENCY_SLUG || "", {
        kind: "career",
        full_name: form.name,
        email: form.email,
        message: form.message,
        metadata: { role: form.role },
        source_page: typeof window === "undefined" ? "" : window.location.pathname,
      });
      setStatus("success");
      setForm({ name: "", email: "", role: "Property Advisor", message: "" });
    } catch { setStatus("error"); }
  }
  return <section className="rounded-[var(--radius-panel)] border border-light-border bg-white p-6 shadow-low"><h2 className="text-2xl font-semibold">Apply to join the team</h2><form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2"><CareerInput label="Full name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required /><CareerInput label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required /><CareerInput label="Role of interest" value={form.role} onChange={(value) => setForm({ ...form, role: value })} required /><label className="text-xs font-medium md:col-span-2">Introduction<textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-light-border p-3" /></label>{status === "success" && <p className="text-sm text-primary md:col-span-2">Application received.</p>}{status === "error" && <p className="text-sm text-error md:col-span-2">Unable to submit application.</p>}<Button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit application"}</Button></form></section>;
}

function CareerInput({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="text-xs font-medium">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-1 h-11 w-full rounded-xl border border-light-border px-3" /></label>;
}
