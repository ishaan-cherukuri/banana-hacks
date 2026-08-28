import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { ensureRegistrationTable, getDb } from "@db/index";
import { registrations } from "@db/schema";
import { siteConfig } from "@/lib/site";

export async function GET() {
  try {
    await ensureRegistrationTable();
    const db = getDb();
    const [{ total }] = await db.select({ total: count() }).from(registrations);

    return NextResponse.json(
      { count: siteConfig.registrationCount + total },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("registration count route error:", error);
    return NextResponse.json(
      { count: siteConfig.registrationCount },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
