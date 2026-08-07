"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useAgencySite } from "@/components/real-estate/site/AgencySiteContext";
import { submitAgentReview } from "@/lib/public-agency-api";

export function AgentReviewForm({ agentId }: { agentId: string }) {
  const site = useAgencySite();
  const [form, setForm] = useState({ reviewer_name: "", reviewer_email: "", rating: "5", title: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const agencySlug = site?.agency.slug;
  if (!agencySlug || !/^\d+$/.test(agentId)) return null;

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("submitting");
    try {
      await submitAgentReview(agencySlug!, agentId, { ...form, rating: Number(form.rating) });
      setForm({ reviewer_name: "", reviewer_email: "", rating: "5", title: "", comment: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-[var(--radius-panel)] border border-light-border bg-white p-6 shadow-low">
      <h2 className="text-xl font-semibold">Share your experience</h2>
      <p className="mt-1 text-sm text-on-surface-variant">Reviews are published after agency moderation.</p>
      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <ReviewInput label="Name" value={form.reviewer_name} onChange={(value) => setForm({ ...form, reviewer_name: value })} required />
        <ReviewInput label="Email" type="email" value={form.reviewer_email} onChange={(value) => setForm({ ...form, reviewer_email: value })} />
        <label className="text-xs font-medium">Rating<select value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} className="mt-1 h-11 w-full rounded-xl border border-light-border px-3">{[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select></label>
        <ReviewInput label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} />
        <label className="text-xs font-medium sm:col-span-2">Comment<textarea value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} required rows={4} className="mt-1 w-full rounded-xl border border-light-border p-3" /></label>
        {status === "success" && <p className="text-sm text-primary sm:col-span-2">Thank you. Your review is awaiting approval.</p>}
        {status === "error" && <p className="text-sm text-error sm:col-span-2">Unable to submit the review.</p>}
        <Button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit review"}</Button>
      </form>
    </section>
  );
}

function ReviewInput({ label, value, onChange, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="text-xs font-medium">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="mt-1 h-11 w-full rounded-xl border border-light-border px-3" /></label>;
}
