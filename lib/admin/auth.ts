/** Session cookie signing. Edge-safe (Web Crypto only). */

export const SESSION_COOKIE = "2121_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12h

function secret(): string {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SECRET or ADMIN_PASSWORD must be set");
  return s;
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (const b of arr) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return b64url(sig);
}

/** Constant-time string compare. */
export function safeEqual(a: string, b: string): boolean {
  const ab = new TextEncoder().encode(a);
  const bb = new TextEncoder().encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export async function createSession(): Promise<{ value: string; maxAge: number }> {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(exp);
  return { value: `${payload}.${await sign(payload)}`, maxAge: MAX_AGE_SECONDS };
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i < 1) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = await sign(payload);
  if (!safeEqual(sig, expected)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}
