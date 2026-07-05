import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-light-border bg-warm-white">
      <div className="container-nexora py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="body-sm mt-4 text-on-surface-variant">
              Nepal&apos;s leading real-estate business system for agency growth
              and modern technology.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Features", href: "/#features" },
                { label: "Templates", href: "/templates" },
                { label: "Pricing", href: "/pricing" },
                { label: "Book Demo", href: "/book-demo" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-sm text-on-surface-variant hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {["Privacy Policy", "Terms of Service", "Support"].map(
                (item) => (
                  <li key={item}>
                    <span className="body-sm text-on-surface-variant">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-on-surface">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 body-sm text-on-surface-variant">
              <li>{SITE.location}</li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-light-border pt-6 text-center body-sm text-on-surface-variant">
          © 2026 Nexora RealtyOS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
