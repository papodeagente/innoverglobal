import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio — Innover" },
      { name: "description", content: "Casos reais de empresas brasileiras atendidas pela Innover em operações de exportação e importação." },
      { property: "og:title", content: "Portfólio — Casos Innover" },
      { property: "og:description", content: "Casos reais de empresas brasileiras atendidas pela Innover." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

// SUBSTITUIR POR CASOS REAIS DA GRACE
const CASES = [
  {
    code: "CASE-01",
    sector: "ALIMENTOS · EXPORTAÇÃO",
    accent: "#1E5BFF",
    title: "Cachaça artesanal pernambucana entra em Portugal",
    body: [
      "Fabricante artesanal com produção de 12 mil garrafas/ano queria sair do mercado regional e atingir o público português, mas não tinha estrutura documental nem habilitação Radar.",
      "Conduzimos a empresa por classificação NCM, habilitação Radar Limitado, adequação de rotulagem ao Regulamento (UE) 2019/787, contato com importador parceiro em Lisboa e estruturação da primeira operação FOB.",
    ],
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&auto=format&fit=crop",
    metrics: [
      { v: "+47%", l: "margem por garrafa" },
      { v: "06", l: "meses até primeiro container" },
      { v: "100%", l: "documentação aprovada" },
    ],
  },
  {
    code: "CASE-02",
    sector: "ALIMENTOS · EXPORTAÇÃO",
    accent: "#1E5BFF",
    title: "Polpa de fruta cearense alcança os Emirados Árabes",
    body: [
      "Indústria de polpa de fruta congelada queria diversificar destinos e identificou demanda no mercado do Golfo. Faltava certificação Halal e adequação à legislação ESMA.",
      "Acompanhamos a empresa em obtenção do certificado Halal, adequação de rotulagem em árabe/inglês, registro junto ao Dubai Municipality e apoio à primeira operação CIF Jebel Ali.",
    ],
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=1200&auto=format&fit=crop",
    metrics: [
      { v: "03", l: "países do GCC alcançados" },
      { v: "12", l: "meses de operação contínua" },
      { v: "+38%", l: "faturamento exportador" },
    ],
  },
  {
    code: "CASE-03",
    sector: "BEBIDAS · IMPORTAÇÃO",
    accent: "#7A1F2B",
    title: "Importadora de azeite italiano regulariza linha completa",
    body: [
      "Distribuidora regional importava azeite italiano há dois anos com classificação NCM equivocada e sem registro Anvisa, gerando passivo tributário e risco de apreensão.",
      "Reclassificamos a NCM, regularizamos os registros sanitários junto à Anvisa, recuperamos créditos tributários referentes aos últimos 24 meses e estruturamos novo pleito de ex-tarifário para variedades premium.",
    ],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop",
    metrics: [
      { v: "R$ 280k", l: "créditos recuperados" },
      { v: "08", l: "SKUs regularizados" },
      { v: "-22%", l: "custo logístico final" },
    ],
  },
];

function PortfolioPage() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // intercept vertical wheel → horizontal scroll on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // only horizontalize when track is in view and has horizontal room
      const rect = el.getBoundingClientRect();
      const inView = rect.top < 100 && rect.bottom > window.innerHeight - 100;
      if (!inView) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= maxScroll - 1;

      // allow page to continue scrolling when reaching ends
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10">
        <FadeIn>
          <div className="label-mono">PÁGINA / PORTFÓLIO</div>
          <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-3xl tracking-[-0.02em]">
            Casos reais. Operações concluídas.
          </h1>
          <p className="text-mute mt-5 md:mt-6 max-w-xl">Empresas brasileiras de pequeno porte, mercados internacionais reais.</p>
        </FadeIn>
        <RouteLine label="ROTA · CASO 01 → CASO 03" />
      </div>

      {/* horizontal track on desktop, vertical on mobile */}
      <div
        ref={trackRef}
        className="md:flex md:overflow-x-auto md:snap-x md:snap-mandatory mt-8 md:mt-10 md:no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {CASES.map((c, i) => (
          <article
            key={c.code}
            className="md:min-w-[100vw] md:snap-start px-5 sm:px-6 lg:px-16 py-10 md:py-20"
          >
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8" style={{ background: c.accent }} />
                  <div className="label-mono">{c.code} · {c.sector}</div>
                </div>
                <h2 className="font-display h-fluid-h2 font-semibold text-navy leading-tight">{c.title}</h2>
                <div className="mt-5 md:mt-6 space-y-4 text-ink/80 leading-relaxed">
                  {c.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-line">
                  {c.metrics.map((m) => (
                    <div key={m.l}>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-navy">{m.v}</div>
                      <div className="label-mono mt-2 text-[10px]">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 aspect-[16/9] lg:aspect-[4/3] bg-mist overflow-hidden relative order-1 lg:order-2">
                <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover duotone" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 label-mono bg-white/90 px-3 py-1.5 backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 text-center mt-12 md:mt-16">
        <p className="text-mute hidden md:block">Em desktop, role a página: os casos avançam horizontalmente.</p>
      </div>
    </div>
  );
}
