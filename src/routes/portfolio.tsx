import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { Utensils, Stethoscope, Sparkles, Shirt, Package } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Segmentos Atendidos — Innover" },
      { name: "description", content: "Setores onde a Innover acumula experiência e know-how regulatório: alimentos e bebidas, equipamentos médicos, cosméticos, vestuário e bens de consumo." },
      { property: "og:title", content: "Segmentos Atendidos — Innover" },
      { property: "og:description", content: "Setores onde a Innover acumula experiência e know-how regulatório." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: SegmentosPage,
});

const SEGMENTS = [
  {
    tag: "SEGMENTO 01",
    title: "Alimentos e Bebidas",
    body: "Forte expertise sanitária e regulatória. Operações com certificações Anvisa, MAPA e órgãos equivalentes em mercados externos.",
    icon: Utensils,
  },
  {
    tag: "SEGMENTO 02",
    title: "Equipamentos e Produtos Médicos",
    body: "Atuação em registros sanitários, classificação de produtos e adequação a normativas internacionais de saúde.",
    icon: Stethoscope,
  },
  {
    tag: "SEGMENTO 03",
    title: "Cosméticos",
    body: "Operações com produtos sujeitos a regulação técnica e sanitária, com atenção a requisitos de cada mercado-alvo.",
    icon: Sparkles,
  },
  {
    tag: "SEGMENTO 04",
    title: "Vestuário e Moda",
    body: "Importação e exportação com domínio de classificação fiscal específica do setor e regimes especiais aplicáveis.",
    icon: Shirt,
  },
  {
    tag: "SEGMENTO 05",
    title: "Bens de Consumo Diversos",
    body: "Atendimento a empresas de variados segmentos com mercadorias de uso geral, ajustando o processo à realidade de cada produto.",
    icon: Package,
  },
];

function SegmentosPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / SEGMENTOS</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-3xl tracking-[-0.02em]">
          Segmentos Atendidos
        </h1>
        <p className="text-mute mt-5 md:mt-6 max-w-xl">
          Setores onde a Innover acumula experiência e know-how regulatório.
        </p>
      </FadeIn>
      <RouteLine label="ROTA · SEGMENTO 01 → 05" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 md:mt-12">
        {SEGMENTS.map((s, i) => {
          const Icon = s.icon;
          return (
            <FadeIn key={s.tag} delay={(i % 3) * 80}>
              <article className="border border-line bg-white p-6 sm:p-8 card-lift h-full flex flex-col">
                <div className="label-mono">{s.tag}</div>
                <div className="mt-5 text-navy">
                  <Icon className="w-9 h-9" strokeWidth={1.4} />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy mt-5 leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-ink/80 leading-relaxed flex-1">{s.body}</p>
              </article>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mt-20 md:mt-24 text-center bg-navy text-white py-12 md:py-16 px-5 sm:px-6">
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
          Não encontrou seu setor? Conversa com a gente. Atendemos micro, pequenas e médias empresas de todo o Brasil.
        </p>
        <a
          href="https://wa.me/5584996051655"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto justify-center items-center mt-6 md:mt-8 bg-white text-navy hover:bg-mist px-6 py-3.5 text-sm font-medium transition-colors min-h-11"
        >
          Falar pelo WhatsApp
        </a>
      </FadeIn>
    </div>
  );
}
