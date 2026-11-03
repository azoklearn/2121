import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login endpoint and the login screen must stay reachable.
  if (pathname === "/api/admin/login") return NextResponse.next();

  const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  // /admin renders its own login form when unauthenticated.
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
