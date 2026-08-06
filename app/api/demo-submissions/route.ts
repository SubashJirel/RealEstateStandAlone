import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/public-agency-api";

export async function POST(request: Request) {
  const agencySlug = process.env.NEXT_PUBLIC_DEFAULT_AGENCY_SLUG;
  if (!agencySlug) {
    return NextResponse.json({ error: "Demo submissions are not configured." }, { status: 503 });
  }
  const body = await request.json();
  const response = await fetch(`${getPublicApiBaseUrl()}/public/agencies/${agencySlug}/submissions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind: "demo",
      full_name: body.fullName,
      phone: body.phone,
      message: body.message,
      metadata: {
        agency_name: body.agencyName,
        location: body.location,
        plan: body.plan,
        contact_methods: body.contactMethods,
      },
      source_page: "/book-demo",
    }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ error: data?.detail || "Unable to submit demo request." }, { status: response.status });
  return NextResponse.json(data, { status: 201 });
}
