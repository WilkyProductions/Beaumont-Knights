// Reads from environment variables — see .env.example. Until
// NEXT_PUBLIC_SANITY_PROJECT_ID is set (locally in .env.local, and in
// Vercel's Project Settings → Environment Variables), `projectId` is
// undefined and every fetch helper in src/sanity/queries.ts falls back to
// the static placeholder data instead of hitting the Sanity API.
export const apiVersion = "2024-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const isSanityConfigured = Boolean(projectId);
