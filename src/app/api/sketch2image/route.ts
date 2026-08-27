import { NextResponse } from "next/server";
import { uploadImage, startSketch2Image } from "@/lib/lightx";

export const runtime = "nodejs";

/**
 * POST /api/sketch2image
 * body: { image: "data:image/png;base64,...", prompt: string, style?: string, strength?: number }
 * → { orderId }
 */
export async function POST(req: Request) {
  try {
    const { image, prompt, style, strength } = await req.json();

    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return NextResponse.json({ error: "A PNG data URL is required" }, { status: 400 });
    }

    const base64 = image.split(",")[1] ?? "";
    const png = Buffer.from(base64, "base64");
    if (png.length === 0) {
      return NextResponse.json({ error: "Empty image" }, { status: 400 });
    }

    // Combine the user's prompt with the chosen style preset.
    const cleanPrompt = (typeof prompt === "string" ? prompt : "").trim();
    const cleanStyle = (typeof style === "string" ? style : "").trim();
    const textPrompt = [cleanPrompt || "a creative artwork", cleanStyle && `${cleanStyle} style`]
      .filter(Boolean)
      .join(", ");

    const imageUrl = await uploadImage(png);
    const orderId = await startSketch2Image({
      imageUrl,
      textPrompt,
      strength: typeof strength === "number" ? strength : undefined,
    });

    return NextResponse.json({ orderId });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Generation failed";
    // LightX returns a generic "FAIL"/"Oops..." when its sketch endpoint is busy.
    const message = /fail|oops|something went wrong/i.test(raw)
      ? "The AI studio is busy right now. Give it a few seconds and try again."
      : raw;
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
