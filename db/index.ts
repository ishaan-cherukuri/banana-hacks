import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let client: Client | null = null;

/**
 * Lazily-created Turso client. Creating it at module scope meant `next build`
 * crashed while collecting page data for /api/apply on any machine without
 * the secrets — the client is created on first use instead, so a missing
 * secret surfaces as a 500 on the route that needs it, not a broken build.
 */
function getClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) throw new Error("TURSO_DATABASE_URL is not configured");
  if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not configured");

  client = createClient({ url, authToken });
  return client;
}

let registrationTableReady: Promise<unknown> | null = null;

export function ensureRegistrationTable() {
  registrationTableReady ??= getClient().execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      emergency_name TEXT NOT NULL,
      emergency_phone TEXT NOT NULL,
      workshops TEXT NOT NULL DEFAULT '[]',
      team_status TEXT NOT NULL,
      experience TEXT NOT NULL,
      project_idea TEXT,
      role TEXT NOT NULL DEFAULT 'hacker',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return registrationTableReady;
}

export function getDb() {
  return drizzle(getClient(), { schema });
}
