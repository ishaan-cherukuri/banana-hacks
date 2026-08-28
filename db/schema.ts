import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emergencyName: text("emergency_name").notNull(),
  emergencyPhone: text("emergency_phone").notNull(),
  workshops: text("workshops").notNull().default("[]"),
  teamStatus: text("team_status").notNull(),
  experience: text("experience").notNull(),
  projectIdea: text("project_idea"),
  role: text("role").notNull().default("hacker"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});
