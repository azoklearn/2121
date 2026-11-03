/**
 * Normalise a picked file before upload.
 *
 * Phones hand us HEIC (which browsers other than Safari cannot display) and
 * 3–8 MB originals (the upload route caps at 4 MB). Re-encoding to JPEG in the
 * browser solves both. Videos are passed through untouched — they cannot be
 * transcoded here.
 */

const MAX_EDGE = 2400;
const QUALITY = 0.9;
const RE_ENCODE_OVER = 1.5 * 1024 * 1024;

function isVideo(file: File) {
  return file.type.startsWith("video/") || /\.(mp4|mov)$/i.test(file.name);
}

function needsReEncoding(file: File) {
  const friendly = /^image\/(jpeg|png|webp)$/.test(file.type);
  return !friendly || file.size > RE_ENCODE_OVER;
}

async function decode(file: File): Promise<CanvasImageSource & { width: number; height: number }> {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(file);
    } catch {
      /* fall through to <img>, e.g. older Safari */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image illisible."));
      img.src = url;
    });
    return img as HTMLImageElement & { width: number; height: number };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function prepareFile(file: File): Promise<File> {
  if (isVideo(file) || !needsReEncoding(file)) return file;

  const source = await decode(file);
  const { width, height } = source;
  if (!width || !height) return file;

  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY)
  );
  if (!blob) return file;

  const stem = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${stem}.jpg`, { type: "image/jpeg" });
}
