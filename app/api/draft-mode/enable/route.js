import { client } from "@/cms/lib/client";
import { token } from "@/cms/env";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
