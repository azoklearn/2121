"use client";

import { useRef, useState } from "react";
import { type Watch, type L, fr, slugify, emptyWatch } from "./types";
import { prepareFile } from "./prepareImage";

const label = "block text-[10px] tracking-widest uppercase opacity-50 mb-1.5";
const input =
  "w-full border hairline bg-ivory-soft px-3 py-2 text-[14px] outline-none focus:border-ink";

/**
 * One field, French only. The site falls back to French when a value carries no
 * English, so editing simply drops any previous translation rather than leaving
 * a stale one behind.
 */
function Field(props: {
  title: string;
  value: L | undefined;
  onChange: (v: L) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  const value = fr(props.value);
  return (
    <div className="mb-4">
      <span className={label}>{props.title}</span>
      {props.textarea ? (
        <textarea
          rows={4}
          className={input}
          placeholder={props.placeholder}
          value={value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ) : (
        <input
          className={input}
          placeholder={props.placeholder}
          value={value}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
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
  // scattering them into a second folder named after the slug. A watch that has
  // neither photos nor a name yet gets a throwaway folder, so photos can be
  // added before anything is typed; the first upload freezes the choice, so the
  // rest of the batch lands beside it even if the model is typed afterwards.
  const chosenFolder = useRef<string | null>(
    (props.initial?.image || props.initial?.images[0] || "").match(/^\/montre\/([^/]+)\//)?.[1] ?? null
  );
  const fallbackFolder = useRef(`ajout-${Date.now().toString(36)}`);
  const folder = chosenFolder.current || w.slug || fallbackFolder.current;

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    chosenFolder.current = folder;
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

      <p className="mb-6 border hairline bg-ivory-soft px-3 py-2 text-[11px] leading-relaxed opacity-60">
        Saisie en français uniquement. Les visiteurs anglophones voient le texte
        français. Modifier un champ remplace son ancienne traduction anglaise.
      </p>

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

      <Field title="Référence" value={w.reference} onChange={(v) => set({ reference: v })} />
      <Field title="Année / époque" value={w.year} onChange={(v) => set({ year: v })} />
      <Field title="État" value={w.condition} onChange={(v) => set({ condition: v })} />
      <Field title="Introduction" value={w.intro} onChange={(v) => set({ intro: v })} textarea />
      <Field title="Description" value={w.description} onChange={(v) => set({ description: v })} textarea />

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
        {/*
          The input is the button: it sits transparent over the label text and
          fills it. Hiding it and clicking through a <label> looks tidier but
          Safari — on the Mac and on the iPhone — often refuses to open the
          picker for an input it cannot hit-test.
        */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (!uploading) void upload(e.dataTransfer.files);
          }}
          className={`relative flex min-h-[56px] items-center justify-center border hairline px-4 text-center text-[11px] tracking-widest uppercase ${
            uploading ? "opacity-40" : "hover:bg-ivory"
          }`}
        >
          <span>
            {uploading ? "Envoi en cours…" : "+ Ajouter photos ou vidéo"}
            {!uploading && (
              <span className="hidden md:inline opacity-50"> · ou glisser-déposer</span>
            )}
          </span>
          <input
            ref={fileRef}
            type="file"
            multiple
            // MIME types rather than extensions: iOS greys out the photo library otherwise.
            accept="image/*,video/*"
            onChange={(e) => upload(e.target.files)}
            disabled={uploading}
            aria-label="Ajouter des photos ou une vidéo"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
          />
        </div>
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
                  specs[i] = { ...sp, value: sp.value, key: e.target.value };
                  set({ specs });
                }}
              />
              <input
                className={input}
                placeholder="Valeur"
                value={fr(sp.value)}
                onChange={(e) => {
                  const specs = [...w.specs];
                  specs[i] = { ...sp, value: e.target.value };
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
