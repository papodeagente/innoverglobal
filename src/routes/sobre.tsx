import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import gracePhoto from "@/assets/grace-moura.png";

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
              src={gracePhoto}
              alt="Grace Moura, fundadora da Innover"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 text-sm">
            <span className="font-semibold text-navy">Grace Moura</span>
            <span className="text-mute"> — Fundadora, especialista em comércio exterior</span>
          </div>
        </FadeIn>

        <FadeIn delay={150} className="lg:col-span-8">
          <div className="max-w-[720px] space-y-5 text-ink/85 leading-[1.8] text-[17px]">
            <p>A Innover Negócios Internacionais é uma consultoria especializada em Comércio Exterior, com mais de 12 anos de experiência na estruturação, operação e otimização de processos de importação e exportação. Atende empresas brasileiras de diferentes portes e segmentos, com atuação estratégica e operacional integrada.</p>
            <p>Grace Kelly Lula de Moura, diretora de projetos e fundadora da Innover, atua como Despachante Aduaneiro autorizada pela Receita Federal do Brasil. Essa combinação rara, consultoria estratégica somada à execução aduaneira direta, permite oferecer ao cliente uma visão completa da cadeia internacional: do planejamento comercial e regulatório até a liberação aduaneira e entrega da mercadoria.</p>
            <p>Nossa atuação é orientada à redução de riscos, conformidade regulatória, eficiência logística e viabilidade econômica das operações. Trabalhamos com linguagem clara, orientação prática e foco em tomada de decisão, sem jargão técnico vazio.</p>
            <p>Atendemos empresas de todo o Brasil, com forte presença nos segmentos de alimentos e bebidas, equipamentos e produtos médicos, cosméticos, vestuário e moda, e bens de consumo diversos.</p>
          </div>
        </FadeIn>
      </div>

      {/* VALORES */}
      <section className="mt-20 md:mt-32 bg-warm p-6 sm:p-10 lg:p-16">
        <FadeIn>
          <div className="label-mono mb-3">NOSSOS VALORES</div>
          <h2 className="font-display h-fluid-h2 font-semibold text-navy">Três coisas pelas quais somos contratados.</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 md:mt-12">
          {[
            { n: "01", title: "CREDIBILIDADE", body: "Clientes satisfeitos nos recomendam no Brasil e no exterior. Clientes novos apostam e constatam." },
            { n: "02", title: "PREVENÇÃO", body: "Foco em mitigar riscos antes que virem custo." },
            { n: "03", title: "CLAREZA", body: "Tudo é explicado em português comum, não em sopa de letras." },
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
