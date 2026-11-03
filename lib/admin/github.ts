/** Minimal GitHub Contents API client — the admin's persistence layer. */

const API = "https://api.github.com";

type RepoConfig = { repo: string; branch: string; token: string };

export function repoConfig(): RepoConfig {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  if (!repo) throw new Error("GITHUB_REPO is not set (expected 'owner/name')");
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  return { repo, branch: process.env.GITHUB_BRANCH || "main", token };
}

async function gh(path: string, init: RequestInit = {}) {
  const { token } = repoConfig();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  return res;
}

/** Read a UTF-8 file. Returns null when it does not exist. */
export async function readFile(path: string): Promise<{ text: string; sha: string } | null> {
  const { repo, branch } = repoConfig();
  const res = await gh(`/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  const json = await res.json();
  const text = new TextDecoder().decode(
    Uint8Array.from(atob(String(json.content).replace(/\n/g, "")), (c) => c.charCodeAt(0))
  );
  return { text, sha: json.sha as string };
}

/**
 * Create or update a file. `sha` makes the write conditional, so a concurrent
 * change elsewhere is rejected instead of being silently overwritten.
 */
export async function writeFile(opts: {
  path: string;
  contentBase64: string;
  message: string;
  sha?: string;
}): Promise<{ sha: string; commit: string }> {
  const { repo, branch } = repoConfig();
  const res = await gh(`/repos/${repo}/contents/${encodeURI(opts.path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch,
      ...(opts.sha ? { sha: opts.sha } : {}),
    }),
  });
  if (res.status === 409 || res.status === 422) {
    throw Object.assign(new Error("conflict"), { conflict: true });
  }
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  const json = await res.json();
  return { sha: json.content?.sha as string, commit: json.commit?.sha as string };
}

export async function deleteFile(opts: { path: string; sha: string; message: string }) {
  const { repo, branch } = repoConfig();
  const res = await gh(`/repos/${repo}/contents/${encodeURI(opts.path)}`, {
    method: "DELETE",
    body: JSON.stringify({ message: opts.message, sha: opts.sha, branch }),
  });
  if (!res.ok) throw new Error(`GitHub delete failed (${res.status}): ${await res.text()}`);
}

export function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
