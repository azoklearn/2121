/**
 * Persistence for the admin.
 *
 * In production everything goes through the GitHub Contents API, so a save is a
 * commit and Vercel redeploys. Locally, when no GITHUB_TOKEN is configured, the
 * same operations fall back to the working copy on disk — which makes `npm run
 * dev` a usable editor too. The fallback is never available in production.
 */
import { readFile as ghRead, writeFile as ghWrite, utf8ToBase64 } from "./github";

export const DATA_PATH = "data/watches.json";

export function usesGitHub(): boolean {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

function localAllowed(): boolean {
  return process.env.NODE_ENV !== "production";
}

async function fsMod() {
  return {
    fs: await import("node:fs/promises"),
    path: await import("node:path"),
  };
}

export async function readData(): Promise<{ text: string; sha: string }> {
  if (usesGitHub()) {
    const file = await ghRead(DATA_PATH);
    if (!file) throw new Error(`${DATA_PATH} est introuvable sur GitHub.`);
    return file;
  }
  if (!localAllowed()) throw new Error("GITHUB_TOKEN et GITHUB_REPO doivent être configurés.");
  const { fs, path } = await fsMod();
  const text = await fs.readFile(path.join(process.cwd(), DATA_PATH), "utf8");
  return { text, sha: "local" };
}

export async function writeData(json: string, message: string, sha: string): Promise<string> {
  if (usesGitHub()) {
    const saved = await ghWrite({
      path: DATA_PATH,
      contentBase64: utf8ToBase64(json),
      message,
      sha,
    });
    return saved.sha;
  }
  if (!localAllowed()) throw new Error("GITHUB_TOKEN et GITHUB_REPO doivent être configurés.");
  const { fs, path } = await fsMod();
  await fs.writeFile(path.join(process.cwd(), DATA_PATH), json, "utf8");
  return "local";
}

/** Returns true when the asset path is already taken. */
export async function assetExists(repoPath: string): Promise<boolean> {
  if (usesGitHub()) return Boolean(await ghRead(repoPath));
  const { fs, path } = await fsMod();
  try {
    await fs.access(path.join(process.cwd(), repoPath));
    return true;
  } catch {
    return false;
  }
}

export async function writeAsset(repoPath: string, bytes: Uint8Array, message: string) {
  if (usesGitHub()) {
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    await ghWrite({ path: repoPath, contentBase64: btoa(bin), message });
    return;
  }
  if (!localAllowed()) throw new Error("GITHUB_TOKEN et GITHUB_REPO doivent être configurés.");
  const { fs, path } = await fsMod();
  const abs = path.join(process.cwd(), repoPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, bytes);
}
