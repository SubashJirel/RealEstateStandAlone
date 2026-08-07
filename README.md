# Nexora RealtyOS Storefront

Multi-tenant Next.js storefront for agencies managed by Nexora RealtyOS. Agency content, branding, properties, agents, reviews, and customer activity are loaded from the Django public API.

## Features

- Dynamic agency websites at `/agency/{agencySlug}` and custom-domain routing at `/`
- Agency-controlled branding, SEO, hero content, statistics, testimonials, FAQs, mission, and story
- Live property listings, filters, detail pages, similar properties, floor plans, tours, map links, and conversion analytics
- Live agent directory, assigned listings, rating summaries, and moderated review submission
- Contact, property inquiry, valuation, newsletter, buyer-guide, career, demo, and viewing forms
- Customer registration/login, saved properties, saved searches, availability, and appointment booking
- Standalone Docker output and separate internal/server and public/browser API URLs

## Local development

Copy `.env.example` to `.env.local`, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/agency/{agencySlug}`. The Django API should be available at the URLs configured below.

| Variable | Purpose |
| --- | --- |
| `API_BASE_URL` | Server-side API URL; use the Docker service name in Compose |
| `NEXT_PUBLIC_API_BASE_URL` | Browser-visible API URL |
| `NEXT_PUBLIC_DEFAULT_AGENCY_SLUG` | Agency used when localhost has no custom-domain match |
| `NEXT_PUBLIC_AGENCY_LICENSE_NUMBER` | License used by static template-preview routes |

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit
```

The backend Compose stack builds and starts this project as the `storefront` service on port `3000`.
