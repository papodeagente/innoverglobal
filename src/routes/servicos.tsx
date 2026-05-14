import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { WorldMap } from "@/components/site/WorldMap";
import { Seal } from "@/components/site/Seal";
import { WHATSAPP_URL } from "@/lib/i18n";
import { ArrowRight, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Innover" },
      { name: "description", content: "Consultoria em exportação, importação, certificação sanitária, pesquisa de mercado, assessoria tarifária e treinamento in-company." },
      { property: "og:title", content: "Serviços de Comércio Exterior — Innover" },
      { property: "og:description", content: "Seis serviços de comex desenhados para a realidade da sua empresa." },
      { property: "og:url", content: "/servicos" },
    ],
    links: [{ rel: "canonical", href: "/servicos" }],
  }),
  component: ServicosPage,
});

type Service = {
  code: string;
  variant: "export" | "import" | "sanitary" | "research" | "tariff" | "training";
  title: string;
  short: string;
  long: string;
  badgeColor: string;
  whatsappMessage: string;
};

const SERVICES: Service[] = [
  { code: "INV-001", variant: "export", title: "Consultoria em Exportação", short: "Planejamento de exportação, habilitação Radar e seleção de mercado-alvo.", long: "Conduzimos sua empresa pelo caminho completo: avaliação de aptidão exportadora, escolha do mercado de destino, classificação NCM, habilitação RADAR junto à Receita Federal, estruturação documental (CO, packing list, invoice) e suporte à primeira operação.", badgeColor: "#1B5E3F", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre exportação — preciso entender como começar a vender meu produto fora do Brasil." },
  { code: "INV-002", variant: "import", title: "Consultoria em Importação", short: "Despacho aduaneiro, classificação fiscal e regimes especiais.", long: "Da pesquisa de fornecedor à liberação na alfândega: classificação fiscal, simulação de tributos, INCOTERMS, escolha do regime aduaneiro (drawback, RECOF, ex-tarifário), licenciamento de importação e acompanhamento do despacho.", badgeColor: "#1E5BFF", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre importação — preciso de orientação sobre despacho aduaneiro, classificação fiscal e regimes especiais." },
  { code: "INV-003", variant: "sanitary", title: "Certificação Sanitária", short: "Anvisa, MAPA e certificações internacionais para alimentos e bebidas.", long: "Foco em alimentos e bebidas: registros junto a Anvisa e MAPA, FCE/SID, rotulagem para mercados específicos (UE, EUA, Mercosul, países árabes), Halal, Kosher, BRC, e adequação a normas estrangeiras.", badgeColor: "#1B5E3F", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre certificação sanitária — preciso entender as exigências da Anvisa, MAPA e órgãos internacionais pro meu produto." },
  { code: "INV-004", variant: "research", title: "Pesquisa de Mercado Internacional", short: "Identificação de oportunidades por país e por produto.", long: "Estudo quantitativo + qualitativo do mercado-alvo: tarifas aplicadas, concorrência, canais de distribuição, preferências de consumo, exigências regulatórias e barreiras não-tarifárias. Entrega em formato de dossiê executivo.", badgeColor: "#1E5BFF", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre pesquisa de mercado internacional — quero identificar oportunidades pro meu produto em outros países." },
  { code: "INV-005", variant: "tariff", title: "Assessoria Tarifária e Fiscal", short: "NCM, drawback, ex-tarifário e benefícios fiscais.", long: "Reclassificação NCM, recuperação de créditos tributários, aplicação de drawback (suspensão, isenção, restituição), pleitos de ex-tarifário e mapeamento de benefícios fiscais estaduais e federais.", badgeColor: "#B8860B", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre assessoria tarifária e fiscal — preciso de orientação sobre NCM, drawback, ex-tarifário e regimes fiscais especiais." },
  { code: "INV-006", variant: "training", title: "Treinamento In-Company", short: "Capacitação de equipes internas em comércio exterior.", long: "Trilhas de capacitação personalizadas para equipes de compras, vendas, jurídico e financeiro. Conteúdo prático, ancorado em casos reais da sua operação. Formato presencial em Natal/RN ou online.", badgeColor: "#0A2540", whatsappMessage: "Oi Grace, vim pelo site da Innover. Quero conversar sobre treinamento in-company — quero capacitar minha equipe interna em comércio exterior." },
];

function ServicosPage() {
  const [openService, setOpenService] = useState<Service | null>(null);

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / SERVIÇOS</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-3xl tracking-[-0.02em]">
          Seis serviços, uma metodologia.
        </h1>
        <p className="mt-5 md:mt-6 t-fluid-lead text-mute max-w-2xl">
          Toda operação na Innover começa com diagnóstico. Nada de pacote pronto.
        </p>
      </FadeIn>
      <RouteLine label="ROTA · DIAGNÓSTICO → OPERAÇÃO" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 md:mt-12">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.code} delay={(i % 3) * 60}>
            <article className="border border-line bg-white p-6 sm:p-7 card-lift h-full flex flex-col group">
              <div className="flex items-start justify-between">
                <div className="label-mono group-hover:text-accent-blue transition-colors">{s.code}</div>
                <div className="w-2 h-2 rounded-full" style={{ background: s.badgeColor }} />
              </div>
              <div className="mt-5 -mx-2 mx-auto sm:mx-0 max-w-[160px] sm:max-w-none w-full group-hover:scale-[1.03] transition-transform">
                <WorldMap variant={s.variant} />
              </div>
              <h3 className="font-display h-fluid-h3 font-semibold text-navy mt-5">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed flex-1">{s.short}</p>
              <button
                onClick={() => setOpenService(s)}
                className="mt-6 inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 text-sm text-accent-blue hover:gap-3 transition-all min-h-11 border sm:border-0 border-line sm:px-0 px-4"
              >
                Saber mais <ArrowRight className="w-3 h-3" />
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
          <Seal />
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
              <div className="mt-6 -mx-2 max-w-[220px] sm:max-w-none mx-auto"><WorldMap variant={openService.variant} /></div>
              <p className="mt-6 text-ink/85 leading-relaxed pb-24 sm:pb-0">{openService.long}</p>
              <a
                href={`https://wa.me/5584996051655?text=${encodeURIComponent(openService.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary fixed sm:static left-0 right-0 bottom-0 sm:mt-8 inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium min-h-12"
              >
                Falar pelo WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
