// Server-side redirect: your number lives in the OSCAR_PHONE env var, never in the page's code.
export const dynamic = "force-dynamic";

export function GET(req) {
  const phone = (process.env.OSCAR_PHONE || "").replace(/[^\d+]/g, "");
  if (!phone) return new Response("Set OSCAR_PHONE in your environment variables.", { status: 501 });
  const via = new URL(req.url).searchParams.get("via");
  const text = encodeURIComponent("I said YES 💖 — Anne");
  const to = via === "wa" ? `https://wa.me/${phone.replace("+", "")}?text=${text}` : `sms:${phone}?&body=${text}`;
  return new Response(null, { status: 307, headers: { Location: to } });
}
