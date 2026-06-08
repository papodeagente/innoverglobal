// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// SPA mode + prerender for SEO. Gera HTML estático para cada rota durante o build
// permitindo deploy como site estático (nginx servindo dist/client) sem runtime SSR.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    spa: { enabled: true },
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});
