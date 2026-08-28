import { NextRequest, NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { ensureRegistrationTable, getDb } from "@db/index";
import { registrations } from "@db/schema";
import { siteConfig } from "@/lib/site";

interface RegistrationBody {
  name?: string;
  email?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  workshops?: string[];
  teamStatus?: string;
  experience?: string;
  projectIdea?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegistrationBody;
    const { name, email, emergencyName, emergencyPhone, workshops, teamStatus, experience, projectIdea } = body;

    if (!name || !email || !teamStatus || !emergencyName || !emergencyPhone || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await ensureRegistrationTable();
    const db = getDb();
    await db.insert(registrations).values({
      name,
      email,
      emergencyName,
      emergencyPhone,
      workshops: JSON.stringify(workshops ?? []),
      teamStatus,
      experience,
      projectIdea: projectIdea ?? null,
      role: "hacker",
    });

    const [{ total }] = await db.select({ total: count() }).from(registrations);

    return NextResponse.json({
      ok: true,
      count: siteConfig.registrationCount + total,
    });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
