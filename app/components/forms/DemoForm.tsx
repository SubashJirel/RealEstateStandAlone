"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CONTACT_METHODS, DEMO_PLANS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface FormData {
  fullName: string;
  phone: string;
  agencyName: string;
  location: string;
  plan: string;
  contactMethods: string[];
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  agencyName?: string;
  location?: string;
  plan?: string;
  contactMethods?: string;
}

interface DemoFormProps {
  className?: string;
}

export function DemoForm({ className }: DemoFormProps) {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    agencyName: "",
    location: "",
    plan: "",
    contactMethods: [],
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!form.agencyName.trim())
      nextErrors.agencyName = "Agency name is required";
    if (!form.location.trim()) nextErrors.location = "Location is required";
    if (!form.plan) nextErrors.plan = "Please select a plan";
    if (form.contactMethods.length === 0)
      nextErrors.contactMethods = "Select at least one contact method";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/demo-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(result?.error || "We could not submit your request.");
      }

      setSubmitted(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not submit your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleContactMethod = (method: string) => {
    setForm((prev) => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(method)
        ? prev.contactMethods.filter((m) => m !== method)
        : [...prev.contactMethods, method],
    }));
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-light-border bg-surface-container-lowest p-8 text-center shadow-high md:p-10",
          className
        )}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-container text-2xl text-deep-sage">
          ✓
        </div>
        <h2 className="headline-md text-on-surface">Thank You!</h2>
        <p className="body-md mt-3 text-on-surface-variant">
          Demo request submitted successfully. Our team will contact you soon.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setForm({
              fullName: "",
              phone: "",
              agencyName: "",
              location: "",
              plan: "",
              contactMethods: [],
              message: "",
            });
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <div
          role="status"
          className="animate-fade-in-up fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-on-primary shadow-high"
        >
          Demo request submitted successfully. Our team will contact you soon.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-2xl border border-light-border bg-surface-container-lowest p-6 shadow-high md:p-8",
          className
        )}
        noValidate
      >
        <h2 className="headline-md text-on-surface">Request a Free Demo</h2>
        <p className="body-md mt-2 text-on-surface-variant">
          See how Nexora can transform your agency&apos;s sales flow from lead
          capture to final closing.
        </p>

        <div className="mt-6 space-y-4">
          <Field
            label="Full Name"
            id="fullName"
            placeholder="E.g. Rajesh Hamal"
            value={form.fullName}
            error={errors.fullName}
            onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
          />
          <Field
            label="Phone Number"
            id="phone"
            placeholder="+977 98..."
            type="tel"
            value={form.phone}
            error={errors.phone}
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
          />
          <Field
            label="Agency Name"
            id="agencyName"
            placeholder="Your Real Estate Company"
            value={form.agencyName}
            error={errors.agencyName}
            onChange={(v) => setForm((p) => ({ ...p, agencyName: v }))}
          />
          <Field
            label="Location"
            id="location"
            placeholder="Kathmandu, Nepal"
            value={form.location}
            error={errors.location}
            onChange={(v) => setForm((p) => ({ ...p, location: v }))}
          />

          <div>
            <label htmlFor="plan" className="mb-1.5 block text-sm font-medium text-on-surface">
              Interested Plan
            </label>
            <select
              id="plan"
              value={form.plan}
              onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))}
              className={cn(
                "w-full rounded-lg border bg-warm-white px-4 py-3 body-md text-on-surface focus:border-deep-sage focus:outline-none focus:ring-2 focus:ring-deep-sage/20",
                errors.plan ? "border-error" : "border-light-border"
              )}
            >
              <option value="">Select a plan</option>
              {DEMO_PLANS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            {errors.plan && <ErrorText>{errors.plan}</ErrorText>}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-on-surface">
              Preferred Contact Method
            </legend>
            <div className="flex flex-wrap gap-3">
              {CONTACT_METHODS.map((method) => (
                <label
                  key={method}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-light-border px-4 py-2.5 text-sm has-[:checked]:border-deep-sage has-[:checked]:bg-secondary-container/30"
                >
                  <input
                    type="checkbox"
                    checked={form.contactMethods.includes(method)}
                    onChange={() => toggleContactMethod(method)}
                    className="accent-deep-sage"
                  />
                  {method}
                </label>
              ))}
            </div>
            {errors.contactMethods && (
              <ErrorText>{errors.contactMethods}</ErrorText>
            )}
          </fieldset>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-on-surface">
              Message <span className="text-on-surface-variant">(optional)</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your current workflow challenges..."
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              className="w-full resize-none rounded-lg border border-light-border bg-warm-white px-4 py-3 body-md text-on-surface focus:border-deep-sage focus:outline-none focus:ring-2 focus:ring-deep-sage/20"
            />
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request Demo"}
        </Button>
        {submitError && (
          <p className="mt-3 text-center text-sm text-error">{submitError}</p>
        )}
        <p className="body-sm mt-4 text-center text-on-surface-variant">
          No credit card required. Our team typically responds within 2 business
          hours.
        </p>
      </form>
    </>
  );
}

function Field({
  label,
  id,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-on-surface">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border bg-warm-white px-4 py-3 body-md text-on-surface focus:border-deep-sage focus:outline-none focus:ring-2 focus:ring-deep-sage/20",
          error ? "border-error" : "border-light-border"
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-error">{children}</p>;
}
