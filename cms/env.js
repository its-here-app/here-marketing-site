export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "81mbvj3d";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-10-26";
// Viewer-rights token, server-only. Required for draft-mode preview (Presentation tool).
export const token = process.env.SANITY_API_READ_TOKEN;
