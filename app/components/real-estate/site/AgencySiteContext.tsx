"use client";

import Link, { type LinkProps } from "next/link";
import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import type { PublicAgency } from "@/lib/public-agency-api";

const TEMPLATE_BASE_PATH = "/template-preview/luxury-agency";

interface AgencySiteValue {
  agency: PublicAgency;
  basePath: string;
}

const AgencySiteContext = createContext<AgencySiteValue | null>(null);

export function AgencySiteProvider({ agency, children }: { agency: PublicAgency; children: ReactNode }) {
  return (
    <AgencySiteContext.Provider value={{ agency, basePath: `/agency/${agency.slug}` }}>
      {children}
    </AgencySiteContext.Provider>
  );
}

export function useAgencySite(): AgencySiteValue | null {
  return useContext(AgencySiteContext);
}

export function useRequiredAgencySite(): AgencySiteValue {
  const value = useAgencySite();
  if (!value) throw new Error("This component must be rendered inside AgencySiteProvider.");
  return value;
}

type SiteLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function SiteLink({ href, ...props }: SiteLinkProps) {
  const site = useAgencySite();
  let resolvedHref = href;
  if (site && typeof href === "string" && href.startsWith(TEMPLATE_BASE_PATH)) {
    resolvedHref = `${site.basePath}${href.slice(TEMPLATE_BASE_PATH.length)}` || site.basePath;
  }
  return <Link href={resolvedHref} {...props} />;
}
