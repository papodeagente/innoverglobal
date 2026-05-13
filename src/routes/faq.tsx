import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Innover" },
      { name: "description", content: "Perguntas frequentes sobre comércio exterior, exportação, importação, RADAR e consultoria Innover." },
      { property: "og:title", content: "FAQ — Innover" },
      { property: "og:description", content: "Dúvidas comuns sobre exportação, importação e a consultoria Innover." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

const FAQ = [
  { q: "Minha empresa é pequena. Vale a pena exportar?",
    a: "Sim — e talvez seja o melhor momento. O cenário regulatório atual permite que micro e pequenas empresas exportem com habilitação Radar Limitado, com volumes a partir de US$ 50 mil ao ano. O ganho não é só financeiro: exportar profissionaliza a operação interna como um todo." },
  { q: "Quanto tempo leva pra começar a exportar?",
    a: "De 60 a 120 dias para a primeira operação concluída, considerando habilitação Radar, classificação NCM, adequação documental e estruturação logística. Depende do produto e do mercado-alvo. Não trabalhamos com prazos otimistas: trabalhamos com cronogramas técnicos." },
  { q: "O que é habilitação RADAR e por que eu preciso dela?",
    a: "RADAR é o cadastro junto à Receita Federal que autoriza pessoas jurídicas a operar comércio exterior no SISCOMEX. Sem RADAR, sua empresa não consegue importar nem exportar legalmente. Existem três modalidades — Limitado, Ilimitado e Expresso — e a habilitação correta depende do volume previsto." },
  { q: "Qual a diferença entre exportar direto e exportar via trading?",
    a: "Exportar direto significa operar no próprio CNPJ, com habilitação Radar e responsabilidade integral pela operação. Exportar via trading é vender o produto à trading no mercado interno, e ela exporta. É mais rápido para começar, mas reduz margem e impede construção de marca no exterior." },
  { q: "Vocês atendem empresas fora do RN?",
    a: "Sim. Atendemos empresas de todo o Brasil. A maior parte do trabalho é remota (videoconferência, troca documental segura). Quando há necessidade presencial — visita técnica à fábrica, acompanhamento de despacho — viajamos." },
  { q: "Como funcionam os pagamentos da consultoria?",
    a: "Variam conforme o escopo: projetos pontuais (ex.: habilitação Radar, classificação NCM) têm valor fechado; consultoria contínua é mensalidade; acompanhamento de operação específica pode ser por sucesso. Tudo é definido em contrato após a conversa inicial gratuita." },
  { q: "Vocês cuidam também da parte tributária?",
    a: "Atuamos na tributação aduaneira (II, IPI, PIS/COFINS-Importação, ICMS sobre importação, drawback, ex-tarifário) e na recuperação de créditos. Para tributação geral da empresa (folha, IRPJ etc.), trabalhamos com escritório contábil parceiro." },
  { q: "Posso começar com importação se nunca operei comex?",
    a: "Pode, sim. Importação é frequentemente a porta de entrada — exige menos estrutura do lado do cliente. O risco está em escolher fornecedor errado, classificar incorretamente o produto ou ignorar regimes especiais que reduziriam o custo. Por isso, consultoria nos primeiros embarques se paga sozinha." },
  { q: "Vocês acompanham o despacho aduaneiro presencialmente?",
    a: "Trabalhamos em parceria com despachantes aduaneiros credenciados nos principais portos e aeroportos brasileiros. Acompanhamos o despacho remotamente em tempo real e, em operações sensíveis, podemos estar presencialmente." },
  { q: "Quanto custa uma consultoria completa?",
    a: "Uma consultoria de exportação completa para uma micro/pequena empresa varia de R$ 8 mil a R$ 25 mil, dependendo do produto, do mercado-alvo e do número de SKUs. A primeira conversa de 30 minutos é gratuita e já permite estimar o investimento real." },
];

function FaqPage() {
  return (
    <div className="max-w-[920px] mx-auto px-6 lg:px-10 py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / FAQ</div>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy mt-3 tracking-[-0.02em]">
          Perguntas que sempre nos fazem.
        </h1>
        <p className="text-mute mt-6 max-w-xl">Respostas técnicas, sem rodeios.</p>
      </FadeIn>
      <RouteLine />

      <div className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <FadeIn key={i} delay={i * 30}>
              <AccordionItem value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="py-6 text-left hover:no-underline group">
                  <div className="flex items-start gap-4 pr-4">
                    <span className="label-mono pt-1.5 shrink-0">FAQ-{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display font-semibold text-lg md:text-xl text-navy group-hover:text-accent-blue transition-colors">{f.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-[88px] pr-4 pb-6 text-ink/80 leading-relaxed text-[15px]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </FadeIn>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
