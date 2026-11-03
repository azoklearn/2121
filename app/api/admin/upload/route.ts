import { NextResponse } from "next/server";
import { assetExists, writeAsset } from "@/lib/admin/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel caps a serverless request body at ~4.5 MB.
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = /\.(jpe?g|png|webp|mp4|mov)$/i;

function slugifySegment(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const folder = slugifySegment(String(form.get("folder") || ""));
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }
    if (!folder) {
      return NextResponse.json({ error: "Dossier manquant." }, { status: 400 });
    }
    const name = slugifySegment(file.name);
    if (!ALLOWED.test(name)) {
      return NextResponse.json(
        { error: "Format non accepté (.jpg, .png, .webp, .mp4, .mov)." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `Trop lourd (${(file.size / 1024 / 1024).toFixed(1)} Mo). Limite : 4 Mo.`, tooLarge: true },
        { status: 413 }
      );
    }

    // Never clobber an existing asset: suffix until the path is free.
    const dot = name.lastIndexOf(".");
    const stem = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot) : "";
    let repoPath = `public/montre/${folder}/${name}`;
    for (let i = 2; await assetExists(repoPath); i++) {
      if (i > 50) return NextResponse.json({ error: "Trop de fichiers homonymes." }, { status: 409 });
      repoPath = `public/montre/${folder}/${stem}-${i}${ext}`;
    }

    await writeAsset(repoPath, new Uint8Array(await file.arrayBuffer()), `Add ${repoPath} via admin`);
    return NextResponse.json({ ok: true, url: "/" + repoPath.replace(/^public\//, "") });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
