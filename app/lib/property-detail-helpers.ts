import {
  buildPropertyDetail,
  getPropertySlug,
  listingProperties,
  templateAgents,
  type Agent,
  type ListingProperty,
  type PropertyDetail,
} from "./real-estate-template";

export function getAllPropertyDetails(): PropertyDetail[] {
  return listingProperties.map((listing) =>
    buildPropertyDetail(listing, getPropertySlug(listing))
  );
}

export function getPropertyDetailBySlug(slug: string): PropertyDetail | undefined {
  const listing = listingProperties.find(
    (property) => getPropertySlug(property) === slug
  );
  if (!listing) return undefined;
  return buildPropertyDetail(listing, slug);
}

export function getSimilarProperties(
  property: PropertyDetail,
  limit = 3
): ListingProperty[] {
  return listingProperties
    .filter(
      (candidate) =>
        candidate.id !== property.id &&
        (candidate.type === property.type || candidate.city === property.city)
    )
    .sort((a, b) => {
      const aScore =
        (a.type === property.type ? 2 : 0) + (a.city === property.city ? 1 : 0);
      const bScore =
        (b.type === property.type ? 2 : 0) + (b.city === property.city ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function getAgentForProperty(property: PropertyDetail): Agent {
  return (
    templateAgents.find((agent) => agent.id === property.agentId) ??
    templateAgents[0]
  );
}

export function getAllPropertySlugs(): string[] {
  return listingProperties.map((property) => getPropertySlug(property));
}
