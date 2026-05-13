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
      { title: "Innover — Consultoria em Comércio Exterior" },
      { name: "description", content: "Consultoria especializada em importação, exportação e acesso a mercados internacionais para empresas brasileiras." },
      { property: "og:title", content: "Innover — Consultoria em Comércio Exterior" },
      { property: "og:description", content: "Consultoria especializada em importação e exportação para empresas brasileiras de pequeno e médio porte." },
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
      <section className="min-h-[95vh] flex items-center px-6 lg:px-10 pt-10 pb-20 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <FadeIn>
              <div className="label-mono mb-6">{t("hero.label")}</div>
            </FadeIn>
            <FadeIn delay={100}>
              <h1 className="font-display font-bold text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-navy tracking-[-0.025em]">
                {t("hero.title")}
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="mt-6 text-lg text-mute max-w-xl leading-relaxed">{t("hero.sub")}</p>
            </FadeIn>
            <FadeIn delay={300}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-medium">
                  {t("hero.cta1")} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#servicos" className="btn-outline inline-flex items-center px-6 py-3 text-sm font-medium">
                  {t("hero.cta2")}
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={200} className="relative">
            <RouteNetwork className="w-full h-auto" />
            <div className="absolute -bottom-2 right-0">
              <Seal />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-mist/60">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* TODO: confirmar números reais com Grace */}
          <Stat value={50} prefix="+" label={t("stats.countries")} />
          <Stat value={8} pad={2} label={t("stats.years")} />
          <Stat value={100} suffix="%" label={t("stats.smb")} />
          <Stat value={24} suffix="h" label={t("stats.response")} />
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24">
        <FadeIn>
          <div className="label-mono mb-3">SEÇÃO 02 / DIFERENCIAIS</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy max-w-2xl">{t("why.title")}</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {[
            { icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.4} />, title: "ESPECIALIZAÇÃO REGULATÓRIA", body: "Domínio técnico de procedimentos aduaneiros, classificação fiscal e habilitações Radar." },
            { icon: <Wheat className="w-6 h-6" strokeWidth={1.4} />, title: "FOCO NO SETOR", body: "Experiência prática com alimentos e bebidas, incluindo certificações sanitárias e adequação a mercados específicos." },
            { icon: <MessagesSquare className="w-6 h-6" strokeWidth={1.4} />, title: "ATENDIMENTO CONSULTIVO", body: "Nada de pacote pronto. Cada operação parte da realidade da sua empresa, do seu produto e do seu mercado-alvo." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 80} className="p-8 border border-line bg-white card-lift">
              <div className="text-navy">{c.icon}</div>
              <div className="label-mono mt-6 text-navy">{c.title}</div>
              <p className="mt-3 text-ink/80 leading-relaxed">{c.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="servicos" className="bg-mist/60 border-y border-line">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24">
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="label-mono mb-3">SEÇÃO 03 / SERVIÇOS</div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy">{t("services.title")}</h2>
                <p className="text-mute mt-3 max-w-xl">{t("services.sub")}</p>
              </div>
              <Link to="/servicos" className="label-mono text-navy hover:text-accent-blue inline-flex items-center gap-2">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-28 text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] max-w-3xl mx-auto">
              {t("cta.title")}
            </h2>
            <p className="text-white/70 mt-6 text-lg">{t("cta.sub")}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 bg-white text-navy hover:bg-mist px-8 py-4 font-medium transition-colors"
            >
              {t("cta.btn")} <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-12 flex justify-center">
              <Seal className="text-white border-white/40" />
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
      <div className="font-display text-5xl md:text-6xl font-bold text-navy tracking-tight">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} pad={pad} />
      </div>
      <div className="label-mono mt-3">{label}</div>
    </FadeIn>
  );
}
