"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export default function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- forces a full navigation to the API route, not a page
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-lg bg-black px-4 py-2 text-white text-body-xs"
    >
      Disable draft mode
    </a>
  );
}
