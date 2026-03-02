import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getShareCardRecord, isValidShareCardId } from "@/lib/server/shareCardsStore";

export const dynamic = "force-dynamic";

async function resolveOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";

  if (!host) return "https://anonbox.com";
  return `${proto}://${host}`;
}

export async function generateMetadata({ params }) {
  const id = params?.id;
  if (!isValidShareCardId(id)) {
    return { title: "Partage introuvable | AnonBox" };
  }

  const record = await getShareCardRecord(id);
  if (!record) {
    return { title: "Partage introuvable | AnonBox" };
  }

  const origin = await resolveOrigin();
  const pageUrl = `${origin}/share/${id}`;
  const imageUrl = `${origin}/api/shares/${id}/image`;
  const title = record.title ?? "Partage AnonBox";
  const description = record.description ?? "Réponds anonymement sur AnonBox.";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: pageUrl,
      title,
      description,
      images: [{ url: imageUrl, width: 1080, height: 1080, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }) {
  const id = params?.id;
  if (!isValidShareCardId(id)) notFound();

  const record = await getShareCardRecord(id);
  if (!record) notFound();

  return (
    <main className="min-h-screen bg-[#f1f2f6] text-[#1e272e] px-4 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#57606f]">
            Partage AnonBox
          </p>
          <h1 className="text-3xl font-black">Réponds anonymement</h1>
          <p className="text-sm text-[#57606f]">
            Ouvre le lien pour répondre à la question en toute discrétion.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md">
          <img
            src={`/api/shares/${id}/image`}
            alt={record.title ?? "Carte de partage AnonBox"}
            className="w-full h-auto block"
          />
        </div>

        {record.targetUrl ? (
          <a
            href={record.targetUrl}
            className="block w-full text-center rounded-2xl px-6 py-4 font-bold text-white bg-[#ff4757] hover:bg-[#ff6b81] transition"
          >
            Répondre à cette question
          </a>
        ) : (
          <Link
            href="/"
            className="block w-full text-center rounded-2xl px-6 py-4 font-bold text-white bg-[#ff4757] hover:bg-[#ff6b81] transition"
          >
            Ouvrir AnonBox
          </Link>
        )}
      </div>
    </main>
  );
}
