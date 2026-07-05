"use client";

import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldError = string | undefined;

interface BaseControlProps {
  label: string;
  id: string;
  error?: FieldError;
  helper?: string;
  required?: boolean;
}

interface TextInputProps extends BaseControlProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}

interface SelectInputProps extends BaseControlProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

interface TextareaInputProps extends BaseControlProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}

interface FormNoticeProps {
  type: "success" | "error";
  title: string;
  children: ReactNode;
}

const inputClass =
  "w-full rounded-[var(--radius-button)] border bg-warm-white text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

export function TextInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  helper,
  required,
}: TextInputProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={fieldDescriptionId(id, error, helper)}
        className={cn(
          inputClass,
          "h-11 px-3",
          error ? "border-error" : "border-light-border"
        )}
      />
      <FieldMessage id={id} error={error} helper={helper} />
    </div>
  );
}

export function SelectInput({
  label,
  id,
  value,
  onChange,
  options,
  error,
  helper,
  required,
}: SelectInputProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={fieldDescriptionId(id, error, helper)}
        className={cn(
          inputClass,
          "h-11 px-3",
          error ? "border-error" : "border-light-border"
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldMessage id={id} error={error} helper={helper} />
    </div>
  );
}

export function TextareaInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  helper,
  required,
}: TextareaInputProps) {
  return (
    <div>
      <FieldLabel id={id} label={label} required={required} />
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={fieldDescriptionId(id, error, helper)}
        className={cn(
          inputClass,
          "resize-none px-3 py-3",
          error ? "border-error" : "border-light-border"
        )}
      />
      <FieldMessage id={id} error={error} helper={helper} />
    </div>
  );
}

export function FormNotice({ type, title, children }: FormNoticeProps) {
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={cn(
        "mt-5 flex gap-3 rounded-xl px-4 py-3 text-sm",
        type === "success"
          ? "bg-primary/10 text-primary"
          : "bg-error-container text-on-error-container"
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <div className="mt-1 leading-6">{children}</div>
      </div>
    </div>
  );
}

export function validateRequired(value: string, label: string) {
  return value.trim() ? undefined : `${label} is required.`;
}

export function validateEmail(value: string) {
  if (!value.trim()) return "Email is required.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? undefined
    : "Enter a valid email address.";
}

export function validatePhone(value: string) {
  if (!value.trim()) return "Phone number is required.";
  return value.replace(/[^\d]/g, "").length >= 7
    ? undefined
    : "Enter a valid phone number.";
}

function FieldLabel({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="mb-1.5 block text-sm font-semibold text-on-surface"
    >
      {label}
      {required ? <span className="text-error"> *</span> : null}
    </label>
  );
}

function FieldMessage({
  id,
  error,
  helper,
}: {
  id: string;
  error?: FieldError;
  helper?: string;
}) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-error">
        {error}
      </p>
    );
  }

  if (helper) {
    return (
      <p id={`${id}-helper`} className="mt-1.5 text-xs text-on-surface-variant">
        {helper}
      </p>
    );
  }

  return null;
}

function fieldDescriptionId(id: string, error?: string, helper?: string) {
  if (error) return `${id}-error`;
  if (helper) return `${id}-helper`;
  return undefined;
}
