"use client";

import { useState } from "react";
import type { ElementType, FormEvent, ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Calculator,
  Home,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { listingProperties } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";
import {
  FormNotice,
  SelectInput,
  TextareaInput,
  TextInput,
  validateEmail,
  validatePhone,
  validateRequired,
} from "./LeadFormControls";

type Errors<T> = Partial<Record<keyof T, string>>;

interface FormShellProps {
  title: string;
  description: string;
  icon: ElementType;
  className?: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface ContactLeadState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface ScheduleViewingState {
  name: string;
  email: string;
  phone: string;
  property: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

interface PropertyInquiryState {
  name: string;
  email: string;
  phone: string;
  property: string;
  timeline: string;
  message: string;
}

interface NewsletterState {
  email: string;
  preference: string;
}

interface ValuationState {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  size: string;
  timeline: string;
}

interface LeadMagnetState {
  name: string;
  email: string;
  goal: string;
}

const propertyOptions = [
  "Select a property",
  ...listingProperties.slice(0, 8).map((property) => property.title),
];

export function ContactLeadForm({ className }: { className?: string }) {
  const [form, setForm] = useState<ContactLeadState>({
    name: "",
    email: "",
    phone: "",
    interest: "Buying a home",
    message: "",
  });
  const [errors, setErrors] = useState<Errors<ContactLeadState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function update(field: keyof ContactLeadState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<ContactLeadState> = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      message: validateRequired(form.message, "Message"),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <FormShell
      title="Contact the Advisory Desk"
      description="Capture buyer, seller, renter, and investor leads in one polished contact form."
      icon={Mail}
      className={className}
      onSubmit={submit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="lead-contact-name"
          label="Full Name"
          value={form.name}
          onChange={(value) => update("name", value)}
          placeholder="Aarati Sharma"
          error={errors.name}
          required
        />
        <TextInput
          id="lead-contact-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update("email", value)}
          placeholder="aarati@example.com"
          error={errors.email}
          required
        />
        <TextInput
          id="lead-contact-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(value) => update("phone", value)}
          placeholder="+977 9800000000"
          error={errors.phone}
          required
        />
        <SelectInput
          id="lead-contact-interest"
          label="Interest"
          value={form.interest}
          onChange={(value) => update("interest", value)}
          options={[
            "Buying a home",
            "Selling property",
            "Renting property",
            "Commercial investment",
            "Developer project",
          ]}
        />
      </div>
      <div className="mt-4">
        <TextareaInput
          id="lead-contact-message"
          label="Message"
          value={form.message}
          onChange={(value) => update("message", value)}
          placeholder="Share location, budget, timeline, or property details."
          error={errors.message}
          required
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Inquiry captured"
        successText="This demo lead is ready to route into a CRM, inbox, or automation workflow."
      />
      <Button type="submit" size="lg" className="mt-6 w-full">
        <Send aria-hidden="true" />
        Send Inquiry
      </Button>
    </FormShell>
  );
}

export function ScheduleViewingForm({ className }: { className?: string }) {
  const [form, setForm] = useState<ScheduleViewingState>({
    name: "",
    email: "",
    phone: "",
    property: "Select a property",
    date: "",
    time: "",
    guests: "1",
    message: "",
  });
  const [errors, setErrors] = useState<Errors<ScheduleViewingState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function update(field: keyof ScheduleViewingState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<ScheduleViewingState> = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      property:
        form.property === "Select a property"
          ? "Choose a property to view."
          : undefined,
      date: validateRequired(form.date, "Preferred date"),
      time: validateRequired(form.time, "Preferred time"),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <FormShell
      title="Schedule a Private Viewing"
      description="Collect viewing intent, availability, and property preference before an advisor responds."
      icon={CalendarDays}
      className={className}
      onSubmit={submit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="viewing-name"
          label="Full Name"
          value={form.name}
          onChange={(value) => update("name", value)}
          placeholder="Your full name"
          error={errors.name}
          required
        />
        <TextInput
          id="viewing-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update("email", value)}
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <TextInput
          id="viewing-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(value) => update("phone", value)}
          placeholder="+977 98..."
          error={errors.phone}
          required
        />
        <SelectInput
          id="viewing-property"
          label="Property"
          value={form.property}
          onChange={(value) => update("property", value)}
          options={propertyOptions}
          error={errors.property}
          required
        />
        <TextInput
          id="viewing-date"
          label="Preferred Date"
          type="date"
          value={form.date}
          onChange={(value) => update("date", value)}
          placeholder=""
          error={errors.date}
          required
        />
        <SelectInput
          id="viewing-time"
          label="Preferred Time"
          value={form.time}
          onChange={(value) => update("time", value)}
          options={["", "Morning", "Afternoon", "Evening", "Weekend"]}
          error={errors.time}
          required
        />
        <SelectInput
          id="viewing-guests"
          label="Guests"
          value={form.guests}
          onChange={(value) => update("guests", value)}
          options={["1", "2", "3", "4+"]}
        />
      </div>
      <div className="mt-4">
        <TextareaInput
          id="viewing-message"
          label="Notes"
          value={form.message}
          onChange={(value) => update("message", value)}
          placeholder="Share access needs, preferred agent, or alternate timing."
          helper="Optional"
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Viewing request prepared"
        successText="A production site could send this directly to the assigned agent calendar or CRM."
      />
      <Button type="submit" variant="accent" size="lg" className="mt-6 w-full">
        <CalendarDays aria-hidden="true" />
        Request Viewing
      </Button>
    </FormShell>
  );
}

export function PropertyInquiryLeadForm({ className }: { className?: string }) {
  const [form, setForm] = useState<PropertyInquiryState>({
    name: "",
    email: "",
    phone: "",
    property: "Select a property",
    timeline: "This month",
    message: "",
  });
  const [errors, setErrors] = useState<Errors<PropertyInquiryState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function update(field: keyof PropertyInquiryState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<PropertyInquiryState> = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      property:
        form.property === "Select a property"
          ? "Choose a property."
          : undefined,
      message: validateRequired(form.message, "Inquiry details"),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <FormShell
      title="Property Inquiry"
      description="Let visitors ask about pricing, documents, viewing windows, and next steps for a specific listing."
      icon={Home}
      className={className}
      onSubmit={submit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="property-inquiry-name"
          label="Full Name"
          value={form.name}
          onChange={(value) => update("name", value)}
          placeholder="Your full name"
          error={errors.name}
          required
        />
        <TextInput
          id="property-inquiry-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update("email", value)}
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <TextInput
          id="property-inquiry-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(value) => update("phone", value)}
          placeholder="+977 98..."
          error={errors.phone}
          required
        />
        <SelectInput
          id="property-inquiry-property"
          label="Property"
          value={form.property}
          onChange={(value) => update("property", value)}
          options={propertyOptions}
          error={errors.property}
          required
        />
        <SelectInput
          id="property-inquiry-timeline"
          label="Timeline"
          value={form.timeline}
          onChange={(value) => update("timeline", value)}
          options={["This month", "1-3 months", "3-6 months", "Just researching"]}
        />
      </div>
      <div className="mt-4">
        <TextareaInput
          id="property-inquiry-message"
          label="Inquiry Details"
          value={form.message}
          onChange={(value) => update("message", value)}
          placeholder="Ask about documents, viewings, negotiation, or financing."
          error={errors.message}
          required
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Property inquiry ready"
        successText="This frontend-only state demonstrates how qualified listing leads can be captured."
      />
      <Button type="submit" size="lg" className="mt-6 w-full">
        <Send aria-hidden="true" />
        Send Property Inquiry
      </Button>
    </FormShell>
  );
}

export function NewsletterSubscription({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<NewsletterState>({
    email: "",
    preference: "Luxury listings",
  });
  const [errors, setErrors] = useState<Errors<NewsletterState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<NewsletterState> = {
      email: validateEmail(form.email),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-low",
        compact && "bg-cream"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <Bell className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-on-surface">
            Market Newsletter
          </h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            Capture subscribers for listing alerts, market notes, and seller
            guides.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
        <TextInput
          id={compact ? "newsletter-email-compact" : "newsletter-email"}
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => {
            setForm((current) => ({ ...current, email: value }));
            setErrors({});
            setStatus("idle");
          }}
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <SelectInput
          id={compact ? "newsletter-pref-compact" : "newsletter-pref"}
          label="Preference"
          value={form.preference}
          onChange={(value) =>
            setForm((current) => ({ ...current, preference: value }))
          }
          options={[
            "Luxury listings",
            "Rental alerts",
            "Seller tips",
            "Investment notes",
          ]}
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Subscription saved"
        successText="The demo confirms how newsletter leads can be captured without leaving the page."
      />
      <Button type="submit" variant="outline" size="lg" className="mt-6 w-full">
        Subscribe
      </Button>
    </form>
  );
}

export function HomeValuationForm({ className }: { className?: string }) {
  const [form, setForm] = useState<ValuationState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "House",
    size: "",
    timeline: "Considering selling",
  });
  const [errors, setErrors] = useState<Errors<ValuationState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function update(field: keyof ValuationState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<ValuationState> = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      address: validateRequired(form.address, "Property address"),
      size: validateRequired(form.size, "Approximate size"),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <FormShell
      title="Home Valuation Request"
      description="Turn seller curiosity into a qualified valuation lead with property details and sale timing."
      icon={Calculator}
      className={className}
      onSubmit={submit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          id="valuation-name"
          label="Full Name"
          value={form.name}
          onChange={(value) => update("name", value)}
          placeholder="Property owner name"
          error={errors.name}
          required
        />
        <TextInput
          id="valuation-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update("email", value)}
          placeholder="owner@example.com"
          error={errors.email}
          required
        />
        <TextInput
          id="valuation-phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(value) => update("phone", value)}
          placeholder="+977 98..."
          error={errors.phone}
          required
        />
        <SelectInput
          id="valuation-type"
          label="Property Type"
          value={form.propertyType}
          onChange={(value) => update("propertyType", value)}
          options={["House", "Apartment", "Villa", "Commercial", "Land"]}
        />
        <TextInput
          id="valuation-address"
          label="Property Address"
          value={form.address}
          onChange={(value) => update("address", value)}
          placeholder="Street, area, city"
          error={errors.address}
          required
        />
        <TextInput
          id="valuation-size"
          label="Approximate Size"
          value={form.size}
          onChange={(value) => update("size", value)}
          placeholder="2,400 sq.ft or 8 anna"
          error={errors.size}
          required
        />
        <SelectInput
          id="valuation-timeline"
          label="Selling Timeline"
          value={form.timeline}
          onChange={(value) => update("timeline", value)}
          options={[
            "Considering selling",
            "Ready this month",
            "1-3 months",
            "Later this year",
          ]}
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Valuation request ready"
        successText="A production version could trigger a seller consultation workflow and valuation checklist."
      />
      <Button type="submit" variant="accent" size="lg" className="mt-6 w-full">
        <Calculator aria-hidden="true" />
        Request Valuation
      </Button>
    </FormShell>
  );
}

export function BuyerGuideLeadForm({ className }: { className?: string }) {
  const [form, setForm] = useState<LeadMagnetState>({
    name: "",
    email: "",
    goal: "Buying",
  });
  const [errors, setErrors] = useState<Errors<LeadMagnetState>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors<LeadMagnetState> = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
    };
    setErrors(stripEmpty(nextErrors));
    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <Mail className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-on-surface">
            Download Buyer Brief
          </h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            A gated guide is another lead magnet agencies can use for early
            buyer and seller intent.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4">
        <TextInput
          id="guide-name"
          label="Full Name"
          value={form.name}
          onChange={(value) => {
            setForm((current) => ({ ...current, name: value }));
            setErrors((current) => ({ ...current, name: undefined }));
            setStatus("idle");
          }}
          placeholder="Your name"
          error={errors.name}
          required
        />
        <TextInput
          id="guide-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => {
            setForm((current) => ({ ...current, email: value }));
            setErrors((current) => ({ ...current, email: undefined }));
            setStatus("idle");
          }}
          placeholder="you@example.com"
          error={errors.email}
          required
        />
        <SelectInput
          id="guide-goal"
          label="Goal"
          value={form.goal}
          onChange={(value) =>
            setForm((current) => ({ ...current, goal: value }))
          }
          options={["Buying", "Selling", "Renting", "Investing"]}
        />
      </div>
      <LeadStatus
        status={status}
        successTitle="Guide request captured"
        successText="The download CTA can become a nurturing entry point in production."
      />
      <Button type="submit" variant="accent" size="lg" className="mt-6 w-full">
        Get the Guide
      </Button>
    </form>
  );
}

function FormShell({
  title,
  description,
  icon: Icon,
  className,
  children,
  onSubmit,
}: FormShellProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn(
        "rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury md:p-8",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-on-surface">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </form>
  );
}

function LeadStatus({
  status,
  successTitle,
  successText,
}: {
  status: "idle" | "success" | "error";
  successTitle: string;
  successText: string;
}) {
  if (status === "success") {
    return (
      <FormNotice type="success" title={successTitle}>
        {successText}
      </FormNotice>
    );
  }

  if (status === "error") {
    return (
      <FormNotice type="error" title="Check required fields">
        Some information is missing or invalid. Review the highlighted fields
        and submit again.
      </FormNotice>
    );
  }

  return null;
}

function hasErrors<T extends Record<string, string | undefined>>(errors: T) {
  return Object.values(errors).some(Boolean);
}

function stripEmpty<T extends Record<string, string | undefined>>(errors: T) {
  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value))
  ) as T;
}
