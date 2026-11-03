"use client";

import { useRef, useState } from "react";
import { type Watch, type L, fr, en, makeL, slugify, emptyWatch } from "./types";
import { prepareFile } from "./prepareImage";

const label = "block text-[10px] tracking-widest uppercase opacity-50 mb-1.5";
const input =
  "w-full border hairline bg-ivory-soft px-3 py-2 text-[14px] outline-none focus:border-ink";

function Pair(props: {
  title: string;
  value: L | undefined;
  onChange: (v: L) => void;
  textarea?: boolean;
}) {
  const common = input;
  const frVal = fr(props.value);
  const enVal = en(props.value);
  return (
    <div className="mb-4">
      <span className={label}>{props.title}</span>
      <div className="grid md:grid-cols-2 gap-2">
        {props.textarea ? (
          <textarea
            rows={4}
            className={common}
            placeholder="Français"
            value={frVal}
            onChange={(e) => props.onChange(makeL(e.target.value, enVal))}
          />
        ) : (
          <input
            className={common}
            placeholder="Français"
            value={frVal}
            onChange={(e) => props.onChange(makeL(e.target.value, enVal))}
          />
        )}
        {props.textarea ? (
          <textarea
            rows={4}
            className={common}
            placeholder="English (optionnel)"
            value={enVal}
            onChange={(e) => props.onChange(makeL(frVal, e.target.value))}
          />
        ) : (
          <input
            className={common}
            placeholder="English (optionnel)"
            value={enVal}
            onChange={(e) => props.onChange(makeL(frVal, e.target.value))}
          />
        )}
      </div>
    </div>
  );
}

export default function WatchEditor(props: {
  initial: Watch | null;
  existingSlugs: string[];
  onCancel: () => void;
  onSave: (w: Watch) => void;
}) {
  const isNew = !props.initial;
  const [w, setW] = useState<Watch>(props.initial ?? emptyWatch());
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [progress, setProgress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<Watch>) => setW((prev) => ({ ...prev, ...patch }));

  function setBrandModel(patch: Partial<Watch>) {
    const next = { ...w, ...patch };
    if (isNew && !slugTouched) {
      next.slug = slugify(`${next.brand} ${next.model}`);
    }
    setW(next);
  }

  // Keep new assets next to the ones this watch already uses, instead of
  // scattering them into a second folder named after the slug.
  const existingFolder = (w.image || w.images[0] || "").match(/^\/montre\/([^/]+)\//)?.[1];
  const folder = existingFolder || w.slug || "nouveau";

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setUploadError("");
    const added: string[] = [];
    let video = "";
    const list = Array.from(files);
    for (const [n, original] of list.entries()) {
      setProgress(`${n + 1}/${list.length} · ${original.name}`);
      let file = original;
      try {
        file = await prepareFile(original);
      } catch {
        /* keep the original; the server will reject it if unsupported */
      }
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Envoi impossible.");
        if (/\.(mp4|mov)$/i.test(json.url)) video = json.url;
        else added.push(json.url);
      } catch (e) {
        setUploadError(`${original.name} : ${(e as Error).message}`);
      }
    }
    setW((prev) => {
      const images = [...prev.images, ...added];
      return { ...prev, images, image: prev.image || images[0] || "", video: video || prev.video };
    });
    setUploading(false);
    setProgress("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function moveImage(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= w.images.length) return;
    const images = [...w.images];
    [images[i], images[j]] = [images[j], images[i]];
    set({ images, image: images[0] });
  }

  function removeImage(i: number) {
    const images = w.images.filter((_, k) => k !== i);
    set({ images, image: images[0] ?? "" });
  }

  const slugConflict =
    !!w.slug && props.existingSlugs.filter((s) => s === w.slug).length > (isNew ? 0 : 1);
  const canSave = !!w.slug && !!w.brand && !!w.model && !slugConflict;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl">{isNew ? "Nouvelle montre" : w.model || w.slug}</h2>
        <button onClick={props.onCancel} className="min-h-[40px] px-2 text-[11px] tracking-widest uppercase opacity-60 hover:opacity-100">
          Annuler
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <span className={label}>Marque</span>
          <input className={input} value={w.brand} onChange={(e) => setBrandModel({ brand: e.target.value })} />
        </div>
        <div>
          <span className={label}>Modèle (titre de la carte)</span>
          <input className={input} value={w.model} onChange={(e) => setBrandModel({ model: e.target.value })} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <span className={label}>Identifiant (URL)</span>
          <input
            className={input}
            value={w.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set({ slug: slugify(e.target.value) });
            }}
          />
          {slugConflict && <p className="mt-1 text-[12px] text-red-700">Cet identifiant est déjà utilisé.</p>}
        </div>
        <div>
          <span className={label}>Prix</span>
          <input
            className={input}
            placeholder="12 200 €"
            value={w.price}
            onChange={(e) => set({ price: e.target.value })}
          />
          <p className="mt-1 text-[11px] opacity-50">
            Une montre vendue affiche « Vendue » automatiquement ; le prix reste conservé ici.
          </p>
        </div>
      </div>

      <Pair title="Référence" value={w.reference} onChange={(v) => set({ reference: v })} />
      <Pair title="Année / époque" value={w.year} onChange={(v) => set({ year: v })} />
      <Pair title="État" value={w.condition} onChange={(v) => set({ condition: v })} />
      <Pair title="Introduction" value={w.intro} onChange={(v) => set({ intro: v })} textarea />
      <Pair title="Description" value={w.description} onChange={(v) => set({ description: v })} textarea />

      {/* Médias */}
      <div className="mb-6 border-t hairline pt-6">
        <span className={label}>Photos et vidéo</span>
        <p className="text-[11px] opacity-50 mb-3">
          La première photo sert de visuel principal. Dossier : <code>public/montre/{folder}/</code>
        </p>
        <div className="space-y-2 mb-3">
          {w.images.map((src, i) => (
            <div key={src + i} className="flex items-center gap-3 border hairline bg-ivory-soft p-2">
              <div
                className="h-12 w-12 shrink-0 bg-cover bg-center bg-bone"
                style={{ backgroundImage: `url('${src}')` }}
              />
              <span className="flex-1 text-[12px] truncate opacity-70">{src}</span>
              {i === 0 && <span className="text-[9px] tracking-widest uppercase opacity-50">Principale</span>}
              <button onClick={() => moveImage(i, -1)} className="min-h-[40px] min-w-[40px] opacity-60 hover:opacity-100" aria-label="Monter">↑</button>
              <button onClick={() => moveImage(i, 1)} className="min-h-[40px] min-w-[40px] opacity-60 hover:opacity-100" aria-label="Descendre">↓</button>
              <button onClick={() => removeImage(i)} className="min-h-[40px] min-w-[40px] text-red-700 opacity-70 hover:opacity-100" aria-label="Retirer">✕</button>
            </div>
          ))}
          {w.video && (
            <div className="flex items-center gap-3 border hairline bg-ivory-soft p-2">
              <span className="text-[9px] tracking-widest uppercase opacity-50 w-12">Vidéo</span>
              <span className="flex-1 text-[12px] truncate opacity-70">{w.video}</span>
              <button onClick={() => set({ video: undefined })} className="min-h-[40px] min-w-[40px] text-red-700 opacity-70 hover:opacity-100" aria-label="Retirer la vidéo">✕</button>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          id="admin-upload"
          type="file"
          multiple
          // MIME types rather than extensions: iOS greys out the photo library otherwise.
          accept="image/*,video/*"
          onChange={(e) => upload(e.target.files)}
          className="sr-only"
          disabled={uploading || !w.slug}
        />
        <label
          htmlFor="admin-upload"
          aria-disabled={uploading || !w.slug}
          className={`flex min-h-[48px] items-center justify-center border hairline px-4 text-[11px] tracking-widest uppercase ${
            uploading || !w.slug ? "pointer-events-none opacity-40" : "cursor-pointer hover:bg-ivory"
          }`}
        >
          {uploading ? "Envoi en cours…" : "+ Ajouter photos ou vidéo"}
        </label>
        {!w.slug && <p className="mt-1 text-[11px] opacity-50">Renseigne la marque et le modèle d’abord.</p>}
        {uploading && progress && <p className="mt-2 text-[12px] opacity-60">{progress}</p>}
        {uploadError && <p className="mt-2 text-[12px] text-red-700">{uploadError}</p>}
      </div>

      {/* Spécifications */}
      <div className="mb-6 border-t hairline pt-6">
        <span className={label}>Spécifications</span>
        <div className="space-y-2 mt-2">
          {w.specs.map((sp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start border-b hairline pb-2 md:border-0 md:pb-0">
              <input
                className={input}
                placeholder="Intitulé (ex. Boîtier)"
                value={fr(sp.key)}
                onChange={(e) => {
                  const specs = [...w.specs];
                  specs[i] = { ...sp, key: makeL(e.target.value, en(sp.key)) };
                  set({ specs });
                }}
              />
              <input
                className={input}
                placeholder="Valeur"
                value={fr(sp.value)}
                onChange={(e) => {
                  const specs = [...w.specs];
                  specs[i] = { ...sp, value: makeL(e.target.value, en(sp.value)) };
                  set({ specs });
                }}
              />
              <button
                onClick={() => set({ specs: w.specs.filter((_, k) => k !== i) })}
                className="min-h-[40px] px-3 text-[10px] tracking-widest uppercase text-red-700 opacity-70 hover:opacity-100 md:text-[14px] md:tracking-normal"
                aria-label="Retirer cette ligne"
              >
                <span className="md:hidden">Retirer la ligne</span>
                <span className="hidden md:inline">✕</span>
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => set({ specs: [...w.specs, { key: "", value: "" }] })}
          className="mt-3 min-h-[44px] border hairline px-4 text-[11px] tracking-widest uppercase hover:bg-ivory-soft"
        >
          + Ligne
        </button>
        <p className="mt-2 text-[11px] opacity-50">
          Évite l’intitulé « Dimensions » : il se répète sous le titre de la carte. Utilise « Diamètre » ou
          « Dimensions boîtier ».
        </p>
      </div>

      <div className="flex gap-3 border-t hairline pt-6">
        <button
          onClick={() => props.onSave(w)}
          disabled={!canSave}
          className="bg-ink text-ivory px-6 py-3 text-[11px] tracking-widest uppercase disabled:opacity-40"
        >
          Valider
        </button>
        <button onClick={props.onCancel} className="px-6 py-3 text-[11px] tracking-widest uppercase opacity-60 hover:opacity-100">
          Annuler
        </button>
      </div>
    </div>
  );
}
