import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSession, safeEqual } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "ADMIN_PASSWORD n'est pas configuré." }, { status: 500 });
  }
  let password = "";
  try {
    password = String(((await req.json()) as { password?: string }).password ?? "");
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (!safeEqual(password, expected)) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }
  const session = await createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });
  return res;
}
