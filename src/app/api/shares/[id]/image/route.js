import { getShareCardImage } from "@/lib/server/shareCardsStore";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const imageBuffer = await getShareCardImage(params.id);
  if (!imageBuffer) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
