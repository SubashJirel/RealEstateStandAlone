"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getAgentProfilePath,
  type Agent,
} from "@/lib/real-estate-template";

interface AgentDirectoryCardProps {
  agent: Agent;
}

export function AgentDirectoryCard({ agent }: AgentDirectoryCardProps) {
  const href = getAgentProfilePath(agent);

  return (
    <article className="card-hover group overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest shadow-low">
      <Link href={href} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-surface-container">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${agent.image})` }}
            role="img"
            aria-label={agent.name}
          />
          <div className="absolute left-4 top-4">
            <Badge variant="accent">{agent.location}</Badge>
          </div>
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-charcoal shadow-low backdrop-blur">
            <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
            {agent.rating}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-on-surface transition group-hover:text-primary">
                {agent.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-on-surface-variant">
                {agent.role}
              </p>
            </div>
            <ArrowRight
              className="mt-1 size-5 text-primary opacity-0 transition group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {agent.specialties.slice(0, 2).map((specialty) => (
              <span
                key={specialty}
                className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-on-surface-variant"
              >
                {specialty}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-cream p-4">
            <div>
              <p className="text-xs uppercase text-on-surface-variant">Sold</p>
              <p className="mt-1 text-sm font-semibold text-on-surface">
                {agent.dealsClosed} Properties
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-on-surface-variant">
                Experience
              </p>
              <p className="mt-1 text-sm font-semibold text-on-surface">
                {agent.yearsExperience} Years
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-on-surface-variant">
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {agent.phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              {agent.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              {agent.location}
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t border-light-border p-5 pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>
            <BriefcaseBusiness aria-hidden="true" />
            View Profile
          </Link>
        </Button>
      </div>
    </article>
  );
}
