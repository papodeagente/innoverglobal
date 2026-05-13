import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/lib/i18n";
import { SiteLayout } from "@/components/site/SiteLayout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-mute">A página que você procura não existe ou foi movida.</p>
        <div className="mt-6">
          <Link to="/" className="btn-primary inline-flex px-5 py-2.5 text-sm font-medium">
            Voltar pra home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Algo não carregou</h1>
        <p className="mt-2 text-sm text-mute">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 btn-primary inline-flex px-5 py-2.5 text-sm font-medium"
        >
          Tentar de novo
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Innover — Consultoria em Comércio Exterior" },
      {
        name: "description",
        content:
          "Consultoria especializada em importação, exportação e acesso a mercados internacionais para empresas brasileiras. Atendimento técnico, personalizado e regulatório.",
      },
      { name: "keywords", content: "comércio exterior, exportação, importação, consultoria comex, RADAR, classificação fiscal, alimentos exportação, bebidas exportação" },
      { name: "author", content: "Innover Negócios Internacionais" },
      { property: "og:title", content: "Innover — Consultoria em Comércio Exterior" },
      { property: "og:description", content: "Consultoria especializada em importação, exportação e acesso a mercados internacionais para empresas brasileiras." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Innover" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A2540" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Innover Negócios Internacionais",
          url: "https://innovernegocios.com.br",
          logo: "https://innovernegocios.com.br/favicon.svg",
          description: "Consultoria especializada em comércio exterior para empresas brasileiras.",
          areaServed: "BR",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Natal",
            addressRegion: "RN",
            addressCountry: "BR",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+55-84-99605-1655",
            contactType: "customer support",
            email: "grace@innovernegocios.com.br",
            availableLanguage: ["Portuguese", "English"],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SiteLayout>
          <Outlet />
        </SiteLayout>
      </I18nProvider>
    </QueryClientProvider>
  );
}
