import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export function RealEstateFooter() {
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
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold">Aurelia Estates</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-inverse-on-surface/70">
              A premium real estate agency website template for luxury listings,
              trusted advisors, and high-intent property inquiries.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  Rent
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/properties"
                  className="hover:text-accent"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/agents"
                  className="hover:text-accent"
                >
                  Agents
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/contact"
                  className="hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/about"
                  className="hover:text-accent"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/mission"
                  className="hover:text-accent"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/story"
                  className="hover:text-accent"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/careers"
                  className="hover:text-accent"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/faq"
                  className="hover:text-accent"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li>
                <Link
                  href="/template-preview/luxury-agency/schedule-viewing"
                  className="hover:text-accent"
                >
                  Schedule Viewing
                </Link>
              </li>
              <li>
                <Link
                  href="/template-preview/luxury-agency/valuation"
                  className="hover:text-accent"
                >
                  Home Valuation
                </Link>
              </li>
              <li>Buyer Advisory</li>
              <li>Seller Representation</li>
              <li>Developer Sales</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-inverse-on-surface/72">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                Durbar Marg, Kathmandu
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                +977 9800000000
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                hello@aurelia.example
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-inverse-on-surface/55">
          Copyright 2026 Aurelia Estates. Demo template content.
        </div>
      </div>
    </footer>
  );
}
