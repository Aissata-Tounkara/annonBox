import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const STORE_DIR = path.join(process.cwd(), ".share-cards");
const ID_RE = /^[a-f0-9]{24}$/;

function normalizeText(value, fallback, maxLength = 240) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return fallback;
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function normalizeUrl(value) {
  try {
    const parsed = new URL(String(value ?? "").trim());
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function imagePathFor(id) {
  return path.join(STORE_DIR, `${id}.png`);
}

function metadataPathFor(id) {
  return path.join(STORE_DIR, `${id}.json`);
}

function createId() {
  return randomBytes(12).toString("hex");
}

export function isValidShareCardId(id) {
  return ID_RE.test(String(id ?? ""));
}

export async function createShareCardRecord({
  imageBuffer,
  cardText,
  shareText,
  targetUrl,
  isMessage,
}) {
  if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
    throw new Error("Invalid image buffer");
  }

  const id = createId();
  const title = isMessage
    ? "Message anonyme AnonBox"
    : "Question anonyme AnonBox";
  const description = normalizeText(shareText, "Réponds anonymement sur AnonBox.");
  const metadata = {
    id,
    title,
    description,
    cardText: normalizeText(cardText, "", 500),
    targetUrl: normalizeUrl(targetUrl),
    isMessage: Boolean(isMessage),
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(imagePathFor(id), imageBuffer);
  await fs.writeFile(metadataPathFor(id), JSON.stringify(metadata), "utf8");

  return metadata;
}

export async function getShareCardRecord(id) {
  if (!isValidShareCardId(id)) return null;

  try {
    const raw = await fs.readFile(metadataPathFor(id), "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getShareCardImage(id) {
  if (!isValidShareCardId(id)) return null;

  try {
    return await fs.readFile(imagePathFor(id));
  } catch {
    return null;
  }
}
