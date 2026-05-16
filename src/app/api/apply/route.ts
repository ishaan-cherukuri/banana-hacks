import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("Missing Google service account env vars");
  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, experience, teamStatus, projectIdea } = body;

    if (!name || !email || !role || !experience || !teamStatus) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID env var");

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          role,
          experience,
          teamStatus,
          projectIdea ?? "",
        ]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
