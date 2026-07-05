"use client";

import { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  listingLocations,
  listingProperties,
  listingPropertyTypes,
  type ListingProperty,
} from "@/lib/real-estate-template";
import { cn } from "@/lib/utils";
import { ListingPropertyCard } from "./ListingPropertyCard";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

interface Filters {
  search: string;
  location: string;
  priceRange: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
}

const defaultFilters: Filters = {
  search: "",
  location: "All",
  priceRange: "Any",
  propertyType: "All",
  bedrooms: "Any",
  bathrooms: "Any",
};

const priceRanges = [
  { label: "Any", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Under NPR 2 Cr", min: 0, max: 20000000 },
  { label: "NPR 2 Cr - 5 Cr", min: 20000000, max: 50000000 },
  { label: "NPR 5 Cr - 8 Cr", min: 50000000, max: 80000000 },
  { label: "NPR 8 Cr+", min: 80000000, max: Number.POSITIVE_INFINITY },
];

const countOptions = ["Any", "1+", "2+", "3+", "4+", "5+"] as const;
const propertiesPerPage = 6;

export function PropertyListingsBrowser() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(defaultFilters);
    setSort("featured");
    setPage(1);
  }

  const filteredProperties = useMemo(() => {
    const activePrice =
      priceRanges.find((range) => range.label === filters.priceRange) ??
      priceRanges[0];

    return listingProperties
      .filter((property) => {
        const query = filters.search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          [property.title, property.address, property.location, property.type]
            .join(" ")
            .toLowerCase()
            .includes(query);
        const matchesLocation =
          filters.location === "All" || property.city === filters.location;
        const matchesPrice =
          property.priceValue >= activePrice.min &&
          property.priceValue <= activePrice.max;
        const matchesType =
          filters.propertyType === "All" ||
          property.type === filters.propertyType;
        const minBedrooms = parseFilterCount(filters.bedrooms);
        const minBathrooms = parseFilterCount(filters.bathrooms);
        const matchesBeds =
          minBedrooms === 0 || property.beds >= minBedrooms;
        const matchesBaths =
          minBathrooms === 0 || property.baths >= minBathrooms;

        return (
          matchesSearch &&
          matchesLocation &&
          matchesPrice &&
          matchesType &&
          matchesBeds &&
          matchesBaths
        );
      })
      .sort((a, b) => sortProperties(a, b, sort));
  }, [filters, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / propertiesPerPage)
  );
  const currentPage = Math.min(page, totalPages);
  const visibleProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-4 shadow-low md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded-[var(--radius-button)] border border-light-border bg-warm-white px-4">
            <Search className="size-5 text-primary" aria-hidden="true" />
            <input
              type="search"
              value={filters.search}
              onChange={(event) => updateFilter("search", event.target.value)}
              placeholder="Search by property, address, or area"
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
                onChange={(event) => {
                  setSort(event.target.value as SortOption);
                  setPage(1);
                }}
                className="bg-transparent text-sm font-semibold text-on-surface outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-5 shadow-low">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-on-surface">
                <Filter className="size-5 text-primary" aria-hidden="true" />
                Filters
              </h2>
              <button
                type="button"
                className="text-sm font-semibold text-primary hover:underline"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            <FilterFields filters={filters} onChange={updateFilter} />
          </div>
        </aside>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {filteredProperties.length} Properties Found
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-on-surface">
                Premium Listings
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {visibleProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProperties.map((property) => (
                <ListingPropertyCard
                  key={property.id}
                  property={property}
                  favorite={favorites.has(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-panel)] border border-light-border bg-surface-container-lowest p-10 text-center shadow-low">
              <h3 className="text-xl font-semibold text-on-surface">
                No matching properties
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Adjust filters or clear the search to view more listings.
              </p>
              <Button type="button" className="mt-5" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </section>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-charcoal/55"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-y-auto rounded-t-[var(--radius-panel)] bg-warm-white p-5 shadow-luxury">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-on-surface">
                <Filter className="size-5 text-primary" aria-hidden="true" />
                Filters
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
            <FilterFields filters={filters} onChange={updateFilter} />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button type="button" onClick={() => setDrawerOpen(false)}>
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterFields({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <SelectFilter
        label="Location"
        value={filters.location}
        options={listingLocations}
        onChange={(value) => onChange("location", value)}
      />
      <SelectFilter
        label="Price Range"
        value={filters.priceRange}
        options={priceRanges.map((range) => range.label)}
        onChange={(value) => onChange("priceRange", value)}
      />
      <SelectFilter
        label="Property Type"
        value={filters.propertyType}
        options={listingPropertyTypes}
        onChange={(value) => onChange("propertyType", value)}
      />
      <SelectFilter
        label="Bedrooms"
        value={filters.bedrooms}
        options={countOptions}
        onChange={(value) => onChange("bedrooms", value)}
      />
      <SelectFilter
        label="Bathrooms"
        value={filters.bathrooms}
        options={countOptions}
        onChange={(value) => onChange("bathrooms", value)}
      />
    </div>
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

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Property pagination"
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex size-9 items-center justify-center rounded-[var(--radius-button)] border text-sm font-semibold transition",
              page === currentPage
                ? "border-primary bg-primary text-on-primary"
                : "border-light-border bg-surface-container-lowest text-on-surface-variant hover:border-primary/40"
            )}
          >
            {page}
          </button>
        );
      })}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
}

function parseFilterCount(value: string) {
  if (value === "Any") return 0;
  return Number(value.replace("+", ""));
}

function sortProperties(
  a: ListingProperty,
  b: ListingProperty,
  sort: SortOption
) {
  if (sort === "newest") {
    return Date.parse(b.listedAt) - Date.parse(a.listedAt);
  }
  if (sort === "price-low") {
    return a.priceValue - b.priceValue;
  }
  if (sort === "price-high") {
    return b.priceValue - a.priceValue;
  }
  return Number(b.featured ?? false) - Number(a.featured ?? false);
}
