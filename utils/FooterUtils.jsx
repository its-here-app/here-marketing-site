import { client } from "../cms/lib/client";

/**
 * Get the singleton Footer document
 */
export async function getFooter() {
  const query = `*[_id == "footer"][0]`;
  return client.fetch(query);
}
