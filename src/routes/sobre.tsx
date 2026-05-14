import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { Seal } from "@/components/site/Seal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Innover" },
      { name: "description", content: "Conheça a Innover, consultoria de comércio exterior fundada por Grace Moura, em Natal/RN." },
      { property: "og:title", content: "Sobre a Innover" },
      { property: "og:description", content: "Conheça a Innover e a fundadora Grace Moura — consultoria de comércio exterior em Natal/RN." },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / SOBRE</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-3xl tracking-[-0.02em]">
          Comércio exterior tirado do plano abstrato.
        </h1>
      </FadeIn>
      <RouteLine label="ROTA · NATAL → MUNDO" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        <FadeIn className="lg:col-span-4">
          <div className="aspect-[4/5] bg-mist relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop"
              alt="Grace Moura, fundadora da Innover"
              loading="lazy"
              className="w-full h-full object-cover duotone"
            />
          </div>
          <div className="mt-4 text-sm">
            <span className="font-semibold text-navy">Grace Moura</span>
            <span className="text-mute"> — Fundadora, especialista em comércio exterior</span>
          </div>
        </FadeIn>

        <FadeIn delay={150} className="lg:col-span-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-20">
            <div className="relative z-[2] space-y-5 text-ink/85 leading-[1.8] text-[17px]">
              <p>A Innover nasceu da percepção de que pequenas empresas brasileiras com produto de qualidade muitas vezes ficam fora do mercado internacional. Não por falta de capacidade, mas por falta de informação técnica.</p>
              <p>Importar e exportar exige domínio de regras aduaneiras, classificação fiscal, certificações sanitárias e adequação cultural a cada mercado. São assuntos que nenhum empreendedor precisa enfrentar sozinho, e que poucas consultorias se dispõem a explicar sem jargão.</p>
              <p>Nossa proposta é simples: tirar o comércio exterior do plano abstrato e transformar em um conjunto de etapas claras. Acompanhamos cada cliente desde a primeira pergunta ('meu produto pode ser exportado?') até o despacho aduaneiro efetivo.</p>
              <p>Atendemos empresas de todo o Brasil, com foco especial no setor de alimentos e bebidas, onde a expertise sanitária e regulatória é mais densa.</p>
            </div>

            {/* documento decorativo */}
            <div className="relative z-[1] justify-self-center lg:justify-self-end w-full max-w-[320px] lg:max-w-none lg:w-[360px] lg:self-start lg:sticky lg:top-[120px] bg-white border border-line shadow-xl p-5 stamp">
              <div className="label-mono">CERTIFICADO DE ORIGEM</div>
              <div className="mt-3 space-y-1 font-mono text-[10px] uppercase text-mute leading-relaxed">
                <div>No. INV-2025-001</div>
                <div>Origem: BRASIL</div>
                <div>Destino: [VARIADO]</div>
                <div>Emissor: INNOVER NEGÓCIOS INT.</div>
              </div>
              <div className="mt-4 h-px bg-line" />
              <div className="mt-4 flex justify-end"><Seal className="scale-75 origin-bottom-right" /></div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* VALORES */}
      <section className="mt-32 bg-warm p-10 lg:p-16">
        <FadeIn>
          <div className="label-mono mb-3">NOSSOS VALORES</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy">Três coisas pelas quais somos contratados.</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            { n: "01", title: "TÉCNICA", body: "Decisão baseada em regulação, não em achismo." },
            { n: "02", title: "CLAREZA", body: "Tudo é explicado em português comum, não em sopa de letras." },
            { n: "03", title: "ACOMPANHAMENTO", body: "Não entregamos relatório e somos embora." },
          ].map((v, i) => (
            <FadeIn key={v.n} delay={i * 80}>
              <div className="font-mono text-navy text-2xl">{v.n}</div>
              <div className="label-mono mt-3 text-navy">· {v.title}</div>
              <p className="mt-4 text-ink/80 leading-relaxed">{v.body}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
