import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://innovernegocios.com.br";

const ENTRIES = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/sobre", priority: "0.8", changefreq: "monthly" as const },
  { path: "/servicos", priority: "0.9", changefreq: "monthly" as const },
  { path: "/portfolio", priority: "0.8", changefreq: "monthly" as const },
  { path: "/faq", priority: "0.7", changefreq: "monthly" as const },
  { path: "/contato", priority: "0.7", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
