"use client";

import { useState } from "react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Connexion impossible.");
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-serif text-3xl mb-1">2121</h1>
        <p className="text-[11px] tracking-widest uppercase opacity-50 mb-8">Administration</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border hairline bg-ivory-soft px-4 py-3 text-[15px] outline-none focus:border-ink"
        />
        {error && <p className="mt-3 text-[13px] text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-4 w-full bg-ink text-ivory py-3 text-[11px] tracking-widest uppercase disabled:opacity-40"
        >
          {busy ? "Connexion…" : "Entrer"}
        </button>
      </form>
    </div>
  );
}
