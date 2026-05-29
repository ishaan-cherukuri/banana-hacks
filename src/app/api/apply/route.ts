import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, emergencyName, emergencyPhone, workshops, teamStatus, experience, projectIdea } = body;

    if (!name || !email || !teamStatus || !emergencyName || !emergencyPhone || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabase.from("registrations").insert({
      name,
      email,
      emergency_name: emergencyName,
      emergency_phone: emergencyPhone,
      workshops: workshops ?? [],
      team_status: teamStatus,
      experience,
      project_idea: projectIdea ?? null,
      role: "hacker",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Submission failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
