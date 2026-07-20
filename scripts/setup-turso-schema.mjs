import { createClient } from "@libsql/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await db.execute(`
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

console.log("registrations table ready");
