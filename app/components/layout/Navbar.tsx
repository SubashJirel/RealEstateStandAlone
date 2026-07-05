"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-light-border bg-warm-white/95 backdrop-blur-sm">
      <nav
        className="container-nexora flex h-16 items-center justify-between md:h-[72px]"
        aria-label="Main navigation"
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="body-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/book-demo" size="sm">
            Book a Demo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-light-border lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "border-t border-light-border bg-warm-white lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="container-nexora flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-3 body-md font-medium text-on-surface-variant hover:bg-cream"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button href="/book-demo" className="w-full">
              Book a Demo
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
