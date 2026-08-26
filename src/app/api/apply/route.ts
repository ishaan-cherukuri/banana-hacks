import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, emergencyName, emergencyPhone, workshops, teamStatus, experience, projectIdea } = body;

    if (!name || !email || !teamStatus || !emergencyName || !emergencyPhone || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await getDb().execute({
      sql: `INSERT INTO registrations
        (name, email, emergency_name, emergency_phone, workshops, team_status, experience, project_idea, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        name,
        email,
        emergencyName,
        emergencyPhone,
        JSON.stringify(workshops ?? []),
        teamStatus,
        experience,
        projectIdea ?? null,
        "hacker",
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
