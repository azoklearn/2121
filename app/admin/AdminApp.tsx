"use client";

import { useEffect, useRef, useState } from "react";
import WatchEditor from "./WatchEditor";
import { type Watch, type Status, statusOf } from "./types";

const STATUS_LABEL: Record<Status, string> = {
  available: "Disponible",
  reserved: "Réservée",
  sold: "Vendue",
};

export default function AdminApp() {
  const [watches, setWatches] = useState<Watch[] | null>(null);
  const [sha, setSha] = useState("");
  const [dirty, setDirty] = useState(false);
  const [editing, setEditing] = useState<{ index: number | null } | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const dragFrom = useRef<number | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/admin/watches", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Chargement impossible.");
      setWatches(json.watches);
      setSha(json.sha);
      setDirty(false);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  // Warn before losing unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function mutate(next: Watch[]) {
    setWatches(next);
    setDirty(true);
    setNotice("");
  }

  function setStatus(i: number, status: Status) {
    const next = [...watches!];
    const w = { ...next[i] };
    delete w.sold;
    delete w.reserved;
    if (status === "sold") w.sold = true;
    if (status === "reserved") w.reserved = true;
    next[i] = w;
    mutate(next);
  }

  function move(i: number, j: number) {
    if (j < 0 || j >= watches!.length) return;
    const next = [...watches!];
    const [item] = next.splice(i, 1);
    next.splice(j, 0, item);
    mutate(next);
  }

  function remove(i: number) {
    const w = watches![i];
    if (!confirm(`Supprimer définitivement « ${w.brand} ${w.model} » du catalogue ?\n\nLes photos resteront dans le dépôt.`)) return;
    mutate(watches!.filter((_, k) => k !== i));
  }

  async function save() {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/admin/watches", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watches, sha, message: "Update catalogue via admin" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Enregistrement impossible.");
      setSha(json.sha);
      setDirty(false);
      setNotice("Enregistré. Le site se met à jour dans une minute environ.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  if (error && !watches) {
    return (
      <div className="max-w-xl mx-auto px-5 py-16">
        <p className="text-[14px] text-red-700 mb-4">{error}</p>
        <button onClick={load} className="border hairline px-4 py-2 text-[11px] tracking-widest uppercase">
          Réessayer
        </button>
      </div>
    );
  }

  if (!watches) {
    return <div className="px-5 py-16 text-[13px] opacity-60">Chargement du catalogue…</div>;
  }

  if (editing) {
    const index = editing.index;
    return (
      <WatchEditor
        initial={index === null ? null : watches[index]}
        existingSlugs={watches.map((w) => w.slug)}
        onCancel={() => setEditing(null)}
        onSave={(w) => {
          const next = [...watches];
          if (index === null) next.unshift(w);
          else next[index] = w;
          mutate(next);
          setEditing(null);
        }}
      />
    );
  }

  const available = watches.filter((w) => statusOf(w) === "available").length;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 pb-32">
      <header className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-2xl">Catalogue</h1>
        <button onClick={logout} className="min-h-[40px] px-2 text-[11px] tracking-widest uppercase opacity-50 hover:opacity-100">
          Déconnexion
        </button>
      </header>
      <p className="text-[12px] opacity-50 mb-6">
        {watches.length} pièces · {available} disponibles
      </p>

      <button
        onClick={() => setEditing({ index: null })}
        className="mb-6 w-full border hairline py-3 text-[11px] tracking-widest uppercase hover:bg-ivory-soft"
      >
        + Ajouter une montre
      </button>

      <ul className="space-y-2">
        {watches.map((w, i) => {
          const status = statusOf(w);
          return (
            <li
              key={w.slug}
              draggable
              onDragStart={() => (dragFrom.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragFrom.current !== null && dragFrom.current !== i) move(dragFrom.current, i);
                dragFrom.current = null;
              }}
              className="border hairline bg-ivory-soft p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-14 w-14 shrink-0 bg-cover bg-center bg-bone"
                  style={{ backgroundImage: `url('${w.image}')` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] tracking-widest uppercase opacity-50 truncate">{w.brand}</div>
                  <div className="font-serif text-[16px] truncate">{w.model}</div>
                  <div className="text-[12px] opacity-60">
                    {status === "sold" ? "Vendue" : w.price}
                    {status === "reserved" && " · Réservée"}
                  </div>
                </div>
              </div>

              {/* Statut — segmenté, pleine largeur pour rester cliquable au pouce */}
              <div className="mt-3 grid grid-cols-3 gap-1">
                {(["available", "reserved", "sold"] as Status[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(i, s)}
                    className={`min-h-[40px] px-1 text-[10px] tracking-widest uppercase border hairline ${
                      status === s ? "bg-ink text-ivory" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>

              <div className="mt-1 flex items-center gap-1">
                <button onClick={() => move(i, i - 1)} className="min-h-[40px] min-w-[40px] opacity-50 hover:opacity-100" aria-label="Monter">↑</button>
                <button onClick={() => move(i, i + 1)} className="min-h-[40px] min-w-[40px] opacity-50 hover:opacity-100" aria-label="Descendre">↓</button>
                <button onClick={() => move(i, 0)} className="min-h-[40px] px-2 text-[10px] tracking-widest uppercase opacity-50 hover:opacity-100">En tête</button>
                <span className="flex-1" />
                <button onClick={() => setEditing({ index: i })} className="min-h-[40px] px-3 text-[10px] tracking-widest uppercase border hairline hover:bg-ivory">Éditer</button>
                <button onClick={() => remove(i)} className="min-h-[40px] min-w-[40px] text-red-700 opacity-60 hover:opacity-100" aria-label="Supprimer">✕</button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t hairline bg-ivory/95 backdrop-blur px-5 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1 text-[12px]">
            {error && <span className="text-red-700">{error}</span>}
            {!error && notice && <span className="opacity-60">{notice}</span>}
            {!error && !notice && (
              <span className="opacity-50">{dirty ? "Modifications non enregistrées" : "À jour"}</span>
            )}
          </div>
          {dirty && (
            <button onClick={load} className="text-[11px] tracking-widest uppercase opacity-50 hover:opacity-100">
              Annuler
            </button>
          )}
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="bg-ink text-ivory px-6 py-3 text-[11px] tracking-widest uppercase disabled:opacity-30"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
