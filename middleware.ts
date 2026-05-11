import { next } from "@vercel/edge";

export const config = {
  matcher: "/invite",
};

const SITE_ORIGIN = "https://wedding.hieutien.life";
const DEFAULT_NAME_VI = "bạn";

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const rawTo = url.searchParams.get("to") ?? "";

  let decoded = rawTo;
  try {
    decoded = decodeURIComponent(rawTo);
  } catch {
    decoded = rawTo;
  }

  const name = escapeHtml(decoded.trim()) || DEFAULT_NAME_VI;
  const canonicalUrl = decoded.trim()
    ? `${SITE_ORIGIN}/invite?to=${encodeURIComponent(decoded.trim())}`
    : `${SITE_ORIGIN}/invite`;

  const title = `Lễ Báo Hỷ: Hiếu & Tiên — Thân Mời ${name}`;

  const originRes = await fetch(new URL("/index.html", url.origin), {
    headers: { "x-middleware-bypass": "1" },
  });

  if (!originRes.ok) {
    return next();
  }

  let html = await originRes.text();

  html = replaceMeta(html, 'name="title"', title);
  html = replaceMeta(html, 'property="og:url"', canonicalUrl);
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="twitter:url"', canonicalUrl);
  html = replaceMeta(html, 'property="twitter:title"', title);
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`,
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}

function replaceMeta(html: string, attr: string, value: string): string {
  const escaped = attr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(<meta\\s+${escaped}\\s+content=")[^"]*(")`,
    "i",
  );
  return html.replace(re, `$1${value}$2`);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return c;
    }
  });
}
