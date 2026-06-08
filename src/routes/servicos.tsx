import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { Seal } from "@/components/site/Seal";
import { WHATSAPP_URL } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Innover" },
      { name: "description", content: "Consultoria em comércio exterior, despacho aduaneiro autorizado pela Receita Federal e estruturação completa de operações de importação." },
      { property: "og:title", content: "Serviços de Comércio Exterior — Innover" },
      { property: "og:description", content: "Consultoria, despacho aduaneiro e importação executados pela mesma equipe." },
      { property: "og:url", content: "/servicos" },
    ],
    links: [{ rel: "canonical", href: "/servicos" }],
  }),
  component: ServicosPage,
});

type Service = {
  code: string;
  title: string;
  short: string;
  items: string[];
  buttonLabel: string;
  badgeColor: string;
  whatsappMessage: string;
};

const SERVICES: Service[] = [
  {
    code: "INV-001",
    title: "Consultoria em Comércio Exterior",
    short: "Suporte estratégico e técnico para empresas que querem acessar, expandir ou estruturar sua atuação em mercados internacionais.",
    items: [
      "Planejamento estratégico de importação e exportação",
      "Estudos de viabilidade técnica, regulatória e tributária",
      "Classificação fiscal (NCM/SH) e análise de custos",
      "Formação de preço de importação",
      "Avaliação de mercados internacionais e requisitos de acesso",
      "Preparação para negociações internacionais",
      "Apoio em processos de internacionalização",
    ],
    buttonLabel: "Falar sobre consultoria",
    badgeColor: "#1B5E3F",
    whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre consultoria em comércio exterior — preciso entender melhor sobre planejamento estratégico, viabilidade ou acesso a mercados internacionais.",
  },
  {
    code: "INV-002",
    title: "Despacho Aduaneiro",
    short: "Atuação direta como Despachante Aduaneiro autorizada pela Receita Federal do Brasil, com gestão completa do desembaraço.",
    items: [
      "Registro e acompanhamento de DI, DUIMP e DUE",
      "Atuação junto à Receita Federal e órgãos anuentes",
      "Gestão de exigências, canais de parametrização e conferência aduaneira",
      "Regularização documental",
      "Mitigação de riscos fiscais e aduaneiros",
      "Assessoria em regimes aduaneiros especiais",
    ],
    buttonLabel: "Falar sobre despacho aduaneiro",
    badgeColor: "#1E5BFF",
    whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre despacho aduaneiro — tenho dúvidas sobre DI, DUIMP, DUE ou regimes aduaneiros especiais.",
  },
  {
    code: "INV-003",
    title: "Importação de Mercadorias",
    short: "Estruturação e execução completa da operação de importação, do fornecedor internacional até a entrega final.",
    items: [
      "Estruturação completa da operação de importação",
      "Interface com fornecedores internacionais",
      "Definição de Incoterms e modais logísticos",
      "Análise de licenças, registros e autorizações prévias",
      "Coordenação com agentes de carga, transportadores e seguradoras",
      "Acompanhamento do desembaraço até a entrega final",
    ],
    buttonLabel: "Falar sobre importação",
    badgeColor: "#B8860B",
    whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre importação de mercadorias — preciso estruturar uma operação ou tenho dúvidas sobre Incoterms, fornecedores e logística internacional.",
  },
];

function ServicosPage() {
  const [openService, setOpenService] = useState<Service | null>(null);

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / SERVIÇOS</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-3xl tracking-[-0.02em]">
          Três frentes, uma metodologia.
        </h1>
        <p className="mt-5 md:mt-6 t-fluid-lead text-mute max-w-2xl">
          Consultoria estratégica, despacho aduaneiro autorizado pela Receita Federal e execução completa da operação de importação, sob o mesmo teto.
        </p>
      </FadeIn>
      <RouteLine label="ROTA · DIAGNÓSTICO → OPERAÇÃO" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-10 md:mt-12">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.code} delay={i * 80}>
            <article className="border border-line bg-white p-6 sm:p-8 card-lift h-full flex flex-col group">
              <div className="flex items-start justify-between">
                <div className="label-mono group-hover:text-accent-blue transition-colors">{s.code}</div>
                <div className="w-2 h-2 rounded-full" style={{ background: s.badgeColor }} />
              </div>
              <h3 className="font-display h-fluid-h3 font-semibold text-navy mt-5 leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">{s.short}</p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-ink/85 leading-snug">
                    <span className="mt-2 w-1 h-1 rounded-full bg-navy/60 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setOpenService(s)}
                className="mt-7 inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 text-sm text-accent-blue hover:gap-3 transition-all min-h-11 border sm:border-0 border-line sm:px-0 px-4"
              >
                {s.buttonLabel} <ArrowRight className="w-3 h-3" />
              </button>
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-20 md:mt-24 text-center bg-mist py-12 md:py-16 px-5 sm:px-6">
        <p className="text-lg md:text-xl text-navy max-w-2xl mx-auto">
          Não encontrou o que precisa? Toda operação na Innover começa com uma conversa.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center mt-6 md:mt-8 px-6 py-3.5 text-sm font-medium min-h-11">
          Conversar pelo WhatsApp
        </a>
        <div className="flex justify-center mt-10 md:mt-12">
          <Seal withCertification />
        </div>
      </FadeIn>

      <Sheet open={!!openService} onOpenChange={(o) => !o && setOpenService(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto p-5 sm:p-6"
        >
          {openService && (
            <>
              <SheetHeader>
                <div className="label-mono">{openService.code}</div>
                <SheetTitle className="font-display text-2xl sm:text-3xl text-navy text-left">{openService.title}</SheetTitle>
              </SheetHeader>
              <p className="mt-6 text-ink/85 leading-relaxed">{openService.short}</p>
              <ul className="mt-6 space-y-2.5 pb-24 sm:pb-0">
                {openService.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-ink/85 leading-snug">
                    <span className="mt-2 w-1 h-1 rounded-full bg-navy/60 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/5584996051655?text=${encodeURIComponent(openService.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary fixed sm:static left-0 right-0 bottom-0 sm:mt-8 inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium min-h-12"
              >
                {openService.buttonLabel} <ArrowRight className="w-4 h-4" />
              </a>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
