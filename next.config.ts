import type { NextConfig } from "next";

// This app is a Next.js multi-zone behind here-app, which routes itshere.app.
// assetPrefix namespaces this zone's JS/CSS under /marketing-static/_next/...
// so they can't collide with the router zone's own /_next/* — here-app has a
// matching rewrite pointing /marketing-static/* back here. Next 15+ serves
// the prefixed path itself, so no extra rewrite is needed on this side.
// Note: files in public/ are NOT covered by assetPrefix and still need their
// own rewrite rules in here-app.
const nextConfig: NextConfig = {
  assetPrefix: "/marketing-static",
};

export default nextConfig;
