import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./cms/env";
import { schemaTypes } from "./cms/schemaTypes";
import { structure } from "./cms/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          privacyPage: defineLocations({
            resolve: () => ({
              locations: [{ title: "Privacy page", href: "/privacy" }],
            }),
          }),
          termsPage: defineLocations({
            resolve: () => ({
              locations: [{ title: "Terms page", href: "/terms" }],
            }),
          }),
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Home Page, Privacy Page, and Terms Page are singletons: no creating a
    // second one via the global "+" menu, no deleting/duplicating the only instance.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(
            (template) => !["homePage", "privacyPage", "termsPage"].includes(template.templateId)
          )
        : prev,
    actions: (prev, { schemaType }) =>
      ["homePage", "privacyPage", "termsPage"].includes(schemaType)
        ? prev.filter(({ action }) => !["delete", "duplicate"].includes(action))
        : prev,
  },
});
