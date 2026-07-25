import { client } from "../cms/lib/client";

/**
 * Get the singleton Home Page document
 */
export async function getHomePage() {
  const query = `*[_id == "homePage"][0]`;
  return client.fetch(query);
}
