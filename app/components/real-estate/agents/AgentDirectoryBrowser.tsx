"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  agentLocations,
  agentSpecialties,
  templateAgents,
  type Agent,
} from "@/lib/real-estate-template";
import { AgentDirectoryCard } from "./AgentDirectoryCard";

type SortOption = "rating" | "sold" | "experience";

interface AgentFilters {
  search: string;
  location: string;
  specialty: string;
}

const defaultFilters: AgentFilters = {
  search: "",
  location: "All",
  specialty: "All",
};

export function AgentDirectoryBrowser() {
  const [filters, setFilters] = useState<AgentFilters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("rating");
  const [drawerOpen, setDrawerOpen] = useState(false);

  function updateFilter(key: keyof AgentFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSort("rating");
  }

  const filteredAgents = useMemo(() => {
    return templateAgents
      .filter((agent) => {
        const query = filters.search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          [
            agent.name,
            agent.role,
            agent.location,
            agent.email,
            ...agent.specialties,
            ...agent.languages,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);
        const matchesLocation =
          filters.location === "All" ||
          agent.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesSpecialty =
          filters.specialty === "All" ||
          agent.specialties.some((specialty) =>
            specialty.toLowerCase().includes(filters.specialty.toLowerCase())
          );

        return matchesSearch && matchesLocation && matchesSpecialty;
      })
      .sort((a, b) => sortAgents(a, b, sort));
  }, [filters, sort]);

  return (
    <div>
      <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-4 shadow-low md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] border border-light-border bg-warm-white px-4">
            <Search className="size-5 text-primary" aria-hidden="true" />
            <input
              type="search"
              value={filters.search}
              onInput={(event) =>
                updateFilter("search", event.currentTarget.value)
              }
              placeholder="Search by name, specialty, area, or language"
              className="w-full bg-transparent text-sm font-medium text-on-surface outline-none placeholder:text-on-surface-variant/70"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            <Button
              type="button"
              variant="outline"
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal aria-hidden="true" />
              Filters
            </Button>
            <label className="flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] border border-light-border bg-warm-white px-4">
              <span className="text-sm font-semibold text-on-surface-variant">
                Sort
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="bg-transparent text-sm font-semibold text-on-surface outline-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="sold">Most Sold</option>
                <option value="experience">Most Experienced</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 hidden grid-cols-2 gap-3 lg:grid">
          <DirectoryFilters filters={filters} onChange={updateFilter} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
            {filteredAgents.length} Agents Found
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-on-surface">
            Trusted Property Advisors
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          onClick={resetFilters}
        >
          <Star className="size-4" aria-hidden="true" />
          Reset directory
        </button>
      </div>

      {filteredAgents.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAgents.map((agent) => (
            <AgentDirectoryCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-10 text-center shadow-low">
          <h3 className="text-xl font-semibold text-on-surface">
            No agents match that search
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            Try another area, specialty, language, or clear the filters.
          </p>
          <Button type="button" className="mt-5" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-charcoal/55"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[82vh] overflow-y-auto rounded-t-[var(--radius-panel)] bg-warm-white p-5 shadow-luxury">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-on-surface">
                Agent Filters
              </h2>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-light-border"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-4">
              <DirectoryFilters filters={filters} onChange={updateFilter} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button type="button" onClick={() => setDrawerOpen(false)}>
                Show Agents
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DirectoryFilters({
  filters,
  onChange,
}: {
  filters: AgentFilters;
  onChange: (key: keyof AgentFilters, value: string) => void;
}) {
  return (
    <>
      <SelectFilter
        label="Location"
        value={filters.location}
        options={agentLocations}
        onChange={(value) => onChange("location", value)}
      />
      <SelectFilter
        label="Specialty"
        value={filters.specialty}
        options={agentSpecialties}
        onChange={(value) => onChange("specialty", value)}
      />
    </>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-on-surface">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[var(--radius-button)] border border-light-border bg-warm-white px-3 text-sm font-medium text-on-surface outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function sortAgents(a: Agent, b: Agent, sort: SortOption) {
  if (sort === "sold") {
    return b.dealsClosed - a.dealsClosed;
  }
  if (sort === "experience") {
    return b.yearsExperience - a.yearsExperience;
  }
  return b.rating - a.rating;
}
