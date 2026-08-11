import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Lazy — `createClient` throws immediately if projectId is missing, so
// constructing it eagerly at module scope would break every route that
// imports this file (even indirectly) before Sanity is configured. Callers
// must check isSanityConfigured first (see queries.ts).
let cached: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!projectId) throw new Error("Sanity is not configured");
  cached ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return cached;
}
