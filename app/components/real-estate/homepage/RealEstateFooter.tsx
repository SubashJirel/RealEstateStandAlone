"use client";

import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { SiteLink as Link, useAgencySite } from "@/components/real-estate/site/AgencySiteContext";
import { useLocalization } from "@/components/localization/LocalizationProvider";
import { formatNepalAddress } from "@/lib/localization";

export function RealEstateFooter() {
  const agency = useAgencySite()?.agency;
  const name = agency?.name || "Aurelia Estates";
  const localization = useLocalization();
  const { t } = localization;
  const address = agency?.address_display || formatNepalAddress(agency) || "Kathmandu, Nepal";
  return (
    <footer id="contact" className="bg-charcoal text-inverse-on-surface">
      <div className="container-nexora py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/template-preview/luxury-agency"
              className="flex items-center gap-3"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                {agency?.logo ? <Image src={agency.logo} alt="" width={28} height={28} unoptimized className="size-7 rounded-full object-cover" /> : <Building2 className="size-5" aria-hidden="true" />}
              </span>
              <span className="text-lg font-bold">{name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-inverse-on-surface/70">
              {agency?.about || t("trustedAdvisors")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {t("explore")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  {t("buy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  {t("rent")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  {t("properties")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/agents"
                  className="hover:text-accent"
                >
                  {t("agents")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/contact"
                  className="hover:text-accent"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {t("company")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/about"
                  className="hover:text-accent"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/mission"
                  className="hover:text-accent"
                >
                  {t("ourMission")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/story"
                  className="hover:text-accent"
                >
                  {t("ourStory")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/careers"
                  className="hover:text-accent"
                >
                  {t("careers")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/faq"
                  className="hover:text-accent"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {t("services")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/schedule-viewing"
                  className="hover:text-accent"
                >
                  {t("scheduleViewing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/valuation"
                  className="hover:text-accent"
                >
                  {t("homeValuation")}
                </Link>
              </li>
              <li>{t("buyerAdvisory")}</li>
              <li>{t("sellerRepresentation")}</li>
              <li>{t("developerSales")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {t("contact")}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                {localization.nepaliDigits ? address.replace(/\d/g, (digit) => "०१२३४५६७८९"[Number(digit)]) : address}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                {localization.phone(agency?.phone || "+977 9800000000")}
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                {agency?.email || "hello@aurelia.example"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-inverse-on-surface/55">
          Copyright {localization.number(new Date().getFullYear())} {name}. {t("rightsReserved")}
        </div>
      </div>
    </footer>
  );
}
