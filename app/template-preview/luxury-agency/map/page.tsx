import { redirect } from "next/navigation";

export default function PreviewMapRedirect() {
  const slug = process.env.NEXT_PUBLIC_DEFAULT_AGENCY_SLUG;
  redirect(slug ? `/agency/${slug}/map` : "/template-preview/luxury-agency/properties");
}
