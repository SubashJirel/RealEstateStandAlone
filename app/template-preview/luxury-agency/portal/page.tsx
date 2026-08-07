import { redirect } from "next/navigation";

export default function PreviewPortalRedirect() {
  const slug = process.env.NEXT_PUBLIC_DEFAULT_AGENCY_SLUG;
  redirect(slug ? `/agency/${slug}/portal` : "/template-preview/luxury-agency");
}
