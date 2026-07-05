import Link from "next/link";
import { Mail, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAgentProfilePath, type Agent } from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const href = getAgentProfilePath(agent);

  return (
    <article
      className={cn(
        "card-hover overflow-hidden rounded-[var(--radius-card)] border border-light-border bg-surface-container-lowest shadow-low",
        className
      )}
    >
      <Link href={href} className="block aspect-[5/4] overflow-hidden bg-surface-container">
        <div
          role="img"
          aria-label={agent.name}
          className="h-full w-full bg-cover bg-center transition duration-500 hover:scale-105"
          style={{ backgroundImage: `url(${agent.image})` }}
        />
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={href}
              className="text-xl font-semibold text-on-surface transition hover:text-primary"
            >
              {agent.name}
            </Link>
            <p className="mt-1 text-sm text-on-surface-variant">
              {agent.role}
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-sm font-semibold text-accent-foreground">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            {agent.rating}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-cream p-4">
          <div>
            <p className="text-xs uppercase text-on-surface-variant">Area</p>
            <p className="mt-1 text-sm font-semibold text-on-surface">
              {agent.location}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase text-on-surface-variant">Closed</p>
            <p className="mt-1 text-sm font-semibold text-on-surface">
              {agent.dealsClosed} Deals
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button asChild variant="primary" className="flex-1">
            <Link href={href}>View Profile</Link>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label={`Call ${agent.name}`}>
            <a href={`tel:${agent.phone.replaceAll(" ", "")}`}>
              <Phone aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label={`Email ${agent.name}`}>
            <a href={`mailto:${agent.email}`}>
              <Mail aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
