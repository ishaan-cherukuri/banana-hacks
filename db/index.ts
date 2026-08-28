import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

function getD1() {
  if (!env.DB) {
    throw new Error("Cloudflare D1 binding `DB` is unavailable");
  }

  return env.DB;
}

let registrationTableReady: Promise<unknown> | null = null;

export function ensureRegistrationTable() {
  registrationTableReady ??= getD1()
    .prepare(`
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
    `)
    .run();

  return registrationTableReady;
}

export function getDb() {
  return drizzle(getD1(), { schema });
}
