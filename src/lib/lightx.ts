/**
 * Server-side LightX API helpers for the AI Studio (sketch → image).
 * The API key lives only in the LIGHTX_API_KEY env var and never reaches the client.
 */

const BASE = "https://api.lightxeditor.com/external/api";

function apiKey(): string {
  const key = process.env.LIGHTX_API_KEY;
  if (!key) throw new Error("LIGHTX_API_KEY is not configured");
  return key;
}

async function lightxPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey() },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = await res.json();
  if (json?.statusCode !== 2000) {
    throw new Error(json?.message || json?.description || `LightX request failed (${path})`);
  }
  return json.body as T;
}

/** Upload a PNG buffer to LightX, returns the public image URL to feed into generation. */
export async function uploadImage(png: Buffer): Promise<string> {
  const { uploadImage: putUrl, imageUrl } = await lightxPost<{ uploadImage: string; imageUrl: string }>(
    "/v2/uploadImageUrl",
    { uploadType: "imageUrl", size: png.length, contentType: "image/png" },
  );

  const put = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": "image/png" },
    body: new Uint8Array(png),
  });
  if (!put.ok) throw new Error(`Image upload failed (${put.status})`);

  return imageUrl;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Kick off a sketch→image job. Returns the orderId to poll.
 * LightX's sketch2image endpoint intermittently returns a transient "FAIL"
 * (it throttles bursts), so we retry a few times with backoff before giving up.
 */
export async function startSketch2Image(opts: {
  imageUrl: string;
  textPrompt: string;
  strength?: number;
  styleStrength?: number;
}): Promise<string> {
  const payload = {
    imageUrl: opts.imageUrl,
    textPrompt: opts.textPrompt,
    strength: opts.strength ?? 0.6,
    styleStrength: opts.styleStrength ?? 0.5,
  };

  const delays = [0, 1500, 2500];
  let lastErr: unknown;
  for (const delay of delays) {
    if (delay) await sleep(delay);
    try {
      const { orderId } = await lightxPost<{ orderId: string }>("/v1/sketch2image", payload);
      return orderId;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("sketch2image failed");
}

export interface OrderStatus {
  status: "init" | "active" | "failed";
  output: string | null;
}

/** Check a generation job. When status is "active", `output` holds the image URL. */
export async function orderStatus(orderId: string): Promise<OrderStatus> {
  const body = await lightxPost<{ status: OrderStatus["status"]; output: string | null }>(
    "/v1/order-status",
    { orderId },
  );
  return { status: body.status, output: body.output ?? null };
}
