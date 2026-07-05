import { Mail, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Agent } from "@/lib/real-estate-template";
import { DetailSectionTitle } from "./PropertyKeyFeatures";

interface PropertyAgentInfoProps {
  agent: Agent;
  propertyTitle: string;
}

export function PropertyAgentInfo({ agent, propertyTitle }: PropertyAgentInfoProps) {
  return (
    <section
      aria-labelledby="agent-info-heading"
      className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-6 shadow-luxury"
    >
      <DetailSectionTitle
        eyebrow="Your Advisor"
        title="Agent Information"
        id="agent-info-heading"
      />

      <div className="flex items-start gap-4">
        <div
          className="size-20 shrink-0 overflow-hidden rounded-[var(--radius-card)] bg-surface-container"
          role="img"
          aria-label={agent.name}
          style={{
            backgroundImage: `url(${agent.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-on-surface">{agent.name}</h3>
          <p className="mt-1 text-sm text-on-surface-variant">{agent.role}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent-foreground">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            {agent.rating}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-cream p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-on-surface-variant">
            Area
          </p>
          <p className="mt-1 text-sm font-semibold text-on-surface">
            {agent.location}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-on-surface-variant">
            Closed
          </p>
          <p className="mt-1 text-sm font-semibold text-on-surface">
            {agent.dealsClosed} Deals
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-on-surface-variant">
        {agent.name} is your dedicated advisor for{" "}
        <span className="font-semibold text-on-surface">{propertyTitle}</span>.
        Reach out for private viewings, documentation, and offer guidance.
      </p>

      <div className="mt-5 flex gap-3">
        <Button variant="primary" className="flex-1" asChild>
          <a href={`tel:${agent.phone.replace(/\s/g, "")}`}>
            <Phone aria-hidden="true" />
            Call
          </a>
        </Button>
        <Button variant="outline" size="icon" aria-label={`Email ${agent.name}`} asChild>
          <a href={`mailto:${agent.email}`}>
            <Mail aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}
