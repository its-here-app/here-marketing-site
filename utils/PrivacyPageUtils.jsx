import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/cms/lib/live";

const PRIVACY_PAGE_QUERY = defineQuery(`*[_id == "privacyPage"][0]`);

/**
 * Get the singleton Privacy Page document.
 * Server-only: resolves drafts automatically when Draft Mode is enabled.
 */
export async function getPrivacyPage() {
  const { data } = await sanityFetch({ query: PRIVACY_PAGE_QUERY });
  return data;
}
