import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/utility",
      },
    ],
    sitemap: "https://itshere.app/sitemap.xml",
  };
}
