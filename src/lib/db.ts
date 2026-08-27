import { createClient, type Client } from "@libsql/client";

/**
 * Lazily-created Turso client.
 *
 * `createClient` throws if the connection env vars are missing. Calling it at
 * module scope meant `next build` crashed while collecting page data for
 * /api/apply on any machine without the secrets, a clone of this repo could
 * not be built at all. Creating the client on first use moves that failure to
 * request time, where it belongs: the build stays green, and a missing secret
 * surfaces as a 500 on the one route that needs it rather than as a broken
 * deploy.
 */
let client: Client | null = null;

export function getDb(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("TURSO_DATABASE_URL is not configured");
  if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not configured");

  client = createClient({ url, authToken });
  return client;
}
