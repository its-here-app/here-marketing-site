import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/cms/lib/live";

const TERMS_PAGE_QUERY = defineQuery(`*[_id == "termsPage"][0]`);

/**
 * Get the singleton Terms Page document.
 * Server-only: resolves drafts automatically when Draft Mode is enabled.
 */
export async function getTermsPage() {
  const { data } = await sanityFetch({ query: TERMS_PAGE_QUERY });
  return data;
}
