import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      id={id}
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="headline-lg text-on-surface">{title}</h2>
      {subtitle && (
        <p className="body-lg mt-4 text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  );
}
