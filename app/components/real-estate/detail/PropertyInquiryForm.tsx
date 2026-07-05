"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PropertyDetail } from "@/lib/real-estate-template";
import {
  FormNotice,
  TextareaInput,
  TextInput,
  validateEmail,
  validatePhone,
  validateRequired,
} from "@/components/real-estate/leads/LeadFormControls";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyInquiryFormProps {
  property: PropertyDetail;
}

interface InquiryState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type InquiryErrors = Partial<Record<keyof InquiryState, string>>;

const initialState: InquiryState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function PropertyInquiryForm({ property }: PropertyInquiryFormProps) {
  const [form, setForm] = useState<InquiryState>({
    ...initialState,
    message: `I am interested in ${property.title} (${property.id.toUpperCase()}). Please share viewing availability and next steps.`,
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function updateField(field: keyof InquiryState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: InquiryErrors = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      message: validateRequired(form.message, "Message"),
    };

    setErrors(
      Object.fromEntries(
        Object.entries(nextErrors).filter(([, value]) => Boolean(value))
      ) as InquiryErrors
    );

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <section
      aria-labelledby="inquiry-form-heading"
      className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury"
    >
      <DetailSectionTitle
        eyebrow="Private Inquiry"
        title="Request Information"
        id="inquiry-form-heading"
      />

      <form noValidate onSubmit={submitInquiry}>
        <div className="space-y-4">
          <TextInput
            label="Full Name"
            id={`inquiry-name-${property.id}`}
            value={form.name}
            onChange={(value) => updateField("name", value)}
            placeholder="Your full name"
            error={errors.name}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Email"
              id={`inquiry-email-${property.id}`}
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              placeholder="you@example.com"
              error={errors.email}
              required
            />
            <TextInput
              label="Phone"
              id={`inquiry-phone-${property.id}`}
              type="tel"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              placeholder="+977 98..."
              error={errors.phone}
              required
            />
          </div>
          <TextareaInput
            label="Message"
            id={`inquiry-message-${property.id}`}
            rows={4}
            value={form.message}
            onChange={(value) => updateField("message", value)}
            placeholder="Share viewing preferences or questions."
            error={errors.message}
            required
          />
        </div>

        {status === "success" && (
          <FormNotice type="success" title="Inquiry received">
            Inquiry received for {property.title}. Connect this form to your CRM
            or email backend in production.
          </FormNotice>
        )}

        {status === "error" && (
          <FormNotice type="error" title="Check required fields">
            Some information is missing or invalid. Review the highlighted
            fields and submit again.
          </FormNotice>
        )}

        <Button type="submit" variant="accent" size="lg" className="mt-5 w-full">
          <Send aria-hidden="true" />
          Send Inquiry
        </Button>
      </form>
    </section>
  );
}
