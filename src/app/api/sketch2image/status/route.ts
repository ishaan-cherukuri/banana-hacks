import { NextResponse } from "next/server";
import { orderStatus } from "@/lib/lightx";

export const runtime = "nodejs";

/**
 * GET /api/sketch2image/status?orderId=...
 * → { status: "init" | "active" | "failed", output: string | null }
 */
export async function GET(req: Request) {
  try {
    const orderId = new URL(req.url).searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }
    const result = await orderStatus(orderId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Status check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
