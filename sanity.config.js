import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
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
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Home Page is a singleton: no creating a second one via the global "+" menu,
    // no deleting/duplicating the only instance.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((template) => template.templateId !== "homePage")
        : prev,
    actions: (prev, { schemaType }) =>
      schemaType === "homePage"
        ? prev.filter(({ action }) => !["delete", "duplicate"].includes(action))
        : prev,
  },
});
