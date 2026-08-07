"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, CalendarDays, Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SiteLink as Link, useAgencySite } from "@/components/real-estate/site/AgencySiteContext";
import { useLocalization } from "@/components/localization/LocalizationProvider";
import type { TranslationKey } from "@/lib/localization";

const navLinks = [
  { key: "buy", href: "/template-preview/luxury-agency/properties?purpose=sale" },
  { key: "rent", href: "/template-preview/luxury-agency/properties?purpose=rent" },
  { key: "properties", href: "/template-preview/luxury-agency/properties" },
  { key: "map", href: "/template-preview/luxury-agency/map" },
  { key: "agents", href: "/template-preview/luxury-agency/agents" },
  { key: "about", href: "/template-preview/luxury-agency/about" },
  { key: "faq", href: "/template-preview/luxury-agency/faq" },
  { key: "contact", href: "/template-preview/luxury-agency/contact" },
  { key: "portal", href: "/template-preview/luxury-agency/portal" },
] satisfies Array<{ key: TranslationKey; href: string }>;

export function RealEstateNavbar() {
  const [open, setOpen] = useState(false);
  const agency = useAgencySite()?.agency;
  const localization = useLocalization();
  const { t } = localization;

  const controls = (
    <div className="flex items-center gap-1" aria-label="Localization controls">
      <button type="button" onClick={() => localization.setLanguage(localization.language === "en" ? "ne" : "en")} className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 px-2 text-xs font-bold hover:bg-white/10" title={t("language")}>
        <Languages className="size-3.5" /> {localization.language === "en" ? "ने" : "EN"}
      </button>
      <button type="button" onClick={() => localization.setDateSystem(localization.dateSystem === "ad" ? "bs" : "ad")} className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/15 px-2 text-xs font-bold hover:bg-white/10" title={t("calendar")}>
        <CalendarDays className="size-3.5" /> {localization.dateSystem.toUpperCase()}
      </button>
      <button type="button" onClick={() => localization.setNepaliDigits(!localization.nepaliDigits)} className="h-8 rounded-lg border border-white/15 px-2 text-xs font-bold hover:bg-white/10" title={t("digits")}>
        {localization.nepaliDigits ? "१२३" : "123"}
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/95 text-inverse-on-surface backdrop-blur-md">
      <nav className="container-nexora flex h-16 items-center justify-between md:h-20">
        <Link
          href="/template-preview/luxury-agency"
          className="flex items-center gap-3"
          aria-label={`${agency?.name || "Aurelia Estates"} home`}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            {agency?.logo ? <Image src={agency.logo} alt="" width={28} height={28} unoptimized className="size-7 rounded-full object-cover" /> : <Building2 className="size-5" aria-hidden="true" />}
          </span>
          <span>
            <span className="block text-base font-bold leading-none">
              {agency?.name || "Aurelia Estates"}
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/60">
              {agency?.municipality || agency?.city || t("luxuryRealty")}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="text-sm font-semibold text-inverse-on-surface/75 transition hover:text-accent"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {controls}
          <Button asChild variant="accent" size="sm">
            <Link href="/template-preview/luxury-agency/schedule-viewing">
              {t("scheduleViewing")}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-[var(--radius-button)] border border-white/15 xl:hidden"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-white/10 bg-charcoal xl:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="container-nexora py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-3 text-sm font-semibold text-inverse-on-surface/80 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="accent" className="mt-3 w-full">
            <Link
              href="/template-preview/luxury-agency/schedule-viewing"
              onClick={() => setOpen(false)}
            >
              {t("scheduleViewing")}
            </Link>
          </Button>
          <div className="mt-3">{controls}</div>
        </div>
      </div>
    </header>
  );
}
