import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n, WHATSAPP_URL } from "@/lib/i18n";
import { RouteNetwork } from "@/components/site/RouteNetwork";
import { Seal } from "@/components/site/Seal";
import { FadeIn } from "@/components/site/FadeIn";
import { AnimatedNumber } from "@/components/site/AnimatedNumber";
import { ShieldCheck, Wheat, MessagesSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Innover Negócios Internacionais — Consultoria Comex e Despacho Aduaneiro" },
      { name: "description", content: "Consultoria especializada em comércio exterior, despacho aduaneiro, importação e exportação. Atuação integrada para micro, pequenas e médias empresas brasileiras. Despachante Aduaneiro autorizada pela Receita Federal. 12 anos de experiência." },
      { name: "keywords", content: "comércio exterior, despachante aduaneiro, consultoria comex, importação, exportação, DI DUIMP DUE, NCM, RADAR, drawback, regime aduaneiro especial, classificação fiscal, formação de preço importação, alimentos exportação, equipamentos médicos importação, cosméticos comex, vestuário importação" },
      { property: "og:title", content: "Innover Negócios Internacionais — Consultoria Comex e Despacho Aduaneiro" },
      { property: "og:description", content: "Consultoria estratégica e operacional em importação, exportação e despacho aduaneiro. Despachante Aduaneiro autorizada pela RFB. 12 anos de atuação." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="lg:min-h-[95vh] flex items-center px-5 sm:px-6 lg:px-10 pt-16 pb-16 lg:pt-10 lg:pb-20 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          <div>
            <FadeIn>
              <div className="label-mono mb-5 md:mb-6">{t("hero.label")}</div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="font-display font-bold h-fluid-hero text-navy tracking-[-0.025em]">
                {t("hero.title")}
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="mt-5 md:mt-6 t-fluid-lead text-mute max-w-xl leading-relaxed">{t("hero.sub")}</p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:flex-wrap">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3.5 text-sm font-medium min-h-11">
                  {t("hero.cta1")} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#servicos" className="btn-outline inline-flex w-full sm:w-auto justify-center items-center px-6 py-3.5 text-sm font-medium min-h-11">
                  {t("hero.cta2")}
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={200} className="relative">
            <RouteNetwork className="w-full h-auto max-h-[280px] sm:max-h-[420px] lg:max-h-none" />
            <div className="absolute -bottom-2 right-0 hidden sm:block">
              <Seal withCertification />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-mist/60">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-14 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <StatStatic value="12" suffix=" ANOS" label={t("stats.years")} />
          <StatStatic value="+ DE 50" label={t("stats.countries")} />
          <StatStatic value="MPME" label={t("stats.smb")} />
          <StatStatic value="RFB" label={t("stats.response")} />
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-24">
        <FadeIn>
          <div className="label-mono mb-3">SEÇÃO 02 / DIFERENCIAIS</div>
          <h2 className="font-display h-fluid-h2 font-semibold text-navy max-w-2xl">{t("why.title")}</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-14">
          {[
            { icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.4} />, title: "ATUAÇÃO INTEGRADA", body: "Consultoria estratégica e despacho aduaneiro sob o mesmo teto. Acompanhamos a operação do planejamento até a entrega final da mercadoria, sem terceirização de etapas críticas." },
            { icon: <Wheat className="w-6 h-6" strokeWidth={1.4} />, title: "VISÃO COMPLETA DA CADEIA", body: "Domínio técnico do fluxo logístico, regulatório, fiscal e documental. Cada decisão é tomada com base na cadeia inteira, não em etapas isoladas." },
            { icon: <MessagesSquare className="w-6 h-6" strokeWidth={1.4} />, title: "FOCO EM MITIGAÇÃO DE RISCOS", body: "Atuação preventiva em conformidade regulatória, classificação fiscal e regimes aduaneiros. Reduzimos exposição a multas, autuações e prejuízos operacionais." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 80} className="p-6 md:p-8 border border-line bg-white card-lift">
              <div className="text-navy flex md:block justify-center">{c.icon}</div>
              <div className="label-mono mt-5 md:mt-6 text-navy text-center md:text-left">{c.title}</div>
              <p className="mt-3 text-ink/80 leading-relaxed text-center md:text-left">{c.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="servicos" className="bg-mist/60 border-y border-line">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-24">
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-12">
              <div>
                <div className="label-mono mb-3">SEÇÃO 03 / SERVIÇOS</div>
                <h2 className="font-display h-fluid-h2 font-semibold text-navy">{t("services.title")}</h2>
                <p className="text-mute mt-3 max-w-xl">{t("services.sub")}</p>
              </div>
              <Link to="/servicos" className="label-mono text-navy hover:text-accent-blue inline-flex items-center gap-2 min-h-11">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "INV-001", name: "Exportação" },
              { code: "INV-002", name: "Importação" },
              { code: "INV-003", name: "Certificação Sanitária" },
              { code: "INV-004", name: "Pesquisa de Mercado" },
            ].map((s, i) => (
              <FadeIn key={s.code} delay={i * 60}>
                <Link to="/servicos" className="block p-6 bg-white border border-line card-lift h-full">
                  <div className="label-mono">{s.code}</div>
                  <div className="font-display text-xl font-semibold text-navy mt-3">{s.name}</div>
                  <div className="mt-8 text-accent-blue inline-flex items-center gap-2 text-sm">
                    Saber mais <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10 py-20 md:py-28 text-center">
          <FadeIn>
            <h2 className="font-display h-fluid-h2 font-semibold leading-[1.1] max-w-3xl mx-auto">
              {t("cta.title")}
            </h2>
            <p className="text-white/70 mt-5 md:mt-6 t-fluid-lead">{t("cta.sub")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 mt-8 md:mt-10 bg-white text-navy hover:bg-mist px-8 py-4 font-medium transition-colors min-h-11"
            >
              {t("cta.btn")} <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-10 md:mt-12 flex justify-center">
              <Seal variant="white" />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function Stat({ value, prefix, suffix, pad, label }: { value: number; prefix?: string; suffix?: string; pad?: number; label: string }) {
  return (
    <FadeIn className="">
      <div className="font-display font-bold text-navy tracking-tight" style={{ fontSize: "clamp(2.5rem, 12vw, 4rem)", lineHeight: 1 }}>
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} pad={pad} />
      </div>
      <div className="label-mono mt-3 leading-snug">{label}</div>
    </FadeIn>
  );
}
