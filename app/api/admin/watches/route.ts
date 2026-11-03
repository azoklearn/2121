import { NextResponse } from "next/server";
import { readData, writeData, usesGitHub } from "@/lib/admin/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Read the live catalogue, with the sha that makes the next write conditional. */
export async function GET() {
  try {
    const file = await readData();
    return NextResponse.json({
      watches: JSON.parse(file.text),
      sha: file.sha,
      target: usesGitHub() ? "github" : "local",
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as { watches?: unknown; sha?: string; message?: string };
    if (!Array.isArray(body.watches)) {
      return NextResponse.json({ error: "Charge utile invalide." }, { status: 400 });
    }
    if (!body.sha) {
      return NextResponse.json({ error: "Référence de version manquante." }, { status: 400 });
    }
    const slugs = body.watches.map((w) => (w as { slug?: string }).slug);
    if (slugs.some((s) => !s)) {
      return NextResponse.json({ error: "Chaque montre doit avoir un identifiant." }, { status: 400 });
    }
    if (new Set(slugs).size !== slugs.length) {
      return NextResponse.json({ error: "Deux montres portent le même identifiant." }, { status: 400 });
    }
    const json = JSON.stringify(body.watches, null, 2) + "\n";
    const sha = await writeData(json, body.message || "Update catalogue via admin", body.sha);
    return NextResponse.json({ ok: true, sha });
  } catch (e) {
    if ((e as { conflict?: boolean }).conflict) {
      return NextResponse.json(
        { error: "Le catalogue a changé entre-temps. Recharge la page avant d'enregistrer.", conflict: true },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
