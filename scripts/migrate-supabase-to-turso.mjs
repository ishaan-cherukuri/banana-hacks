import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createTursoClient } from "@libsql/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const turso = createTursoClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const { data: rows, error } = await supabase.from("registrations").select("*");

if (error) {
  console.error("Failed to read from Supabase:", error);
  process.exit(1);
}

console.log(`Found ${rows.length} registrations in Supabase`);

for (const row of rows) {
  await turso.execute({
    sql: `INSERT INTO registrations
      (name, email, emergency_name, emergency_phone, workshops, team_status, experience, project_idea, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      row.name,
      row.email,
      row.emergency_name,
      row.emergency_phone,
      JSON.stringify(row.workshops ?? []),
      row.team_status,
      row.experience,
      row.project_idea ?? null,
      row.role ?? "hacker",
      row.created_at ?? new Date().toISOString(),
    ],
  });
}

console.log(`Migrated ${rows.length} registrations to Turso`);
