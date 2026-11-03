import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";
import AdminApp from "./AdminApp";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin — 2121", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const authed = await verifySession(token).catch(() => false);
  return (
    <main className="min-h-screen bg-ivory text-ink">
      {authed ? <AdminApp /> : <LoginForm />}
    </main>
  );
}
