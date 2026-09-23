import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// itshere.app's robots.txt is served by the product app that fronts the
// domain; this one is only ever reached on this zone's own *.vercel.app URL,
// which serves the same pages and must not be indexed alongside it.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const isCanonicalHost = host === "itshere.app" || host === "www.itshere.app";

  if (!isCanonicalHost) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/utility", "/studio"],
      },
    ],
    sitemap: "https://itshere.app/sitemap.xml",
  };
}
