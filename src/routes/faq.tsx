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
  { q: "Minha empresa é pequena. Vale a pena importar ou exportar?",
    a: "Sim. Boa parte dos nossos clientes são micro, pequenas e médias empresas que descobriram no comércio exterior um caminho viável de crescimento. O importante não é o tamanho da empresa, é a estrutura do projeto. Avaliamos viabilidade técnica, regulatória e tributária antes de qualquer operação." },
  { q: "Quanto tempo leva pra começar a importar ou exportar?",
    a: "Depende do produto, do mercado-alvo e do nível de preparação inicial da empresa. Em geral, operações de importação podem ser estruturadas em algumas semanas. Para exportação, o ciclo costuma ser mais longo, especialmente quando envolve adequação regulatória ou certificações sanitárias. Em todos os casos, o cronograma é definido no início do projeto." },
  { q: "O que é habilitação RADAR e por que eu preciso dela?",
    a: "RADAR é a habilitação da Receita Federal que permite uma empresa importar e exportar. Sem ela, sua empresa não pode operar diretamente no comércio exterior. A modalidade da habilitação varia conforme o porte e o histórico fiscal da empresa. Cuidamos de todo o processo de obtenção e manutenção." },
  { q: "Vocês fazem apenas consultoria ou também o despacho aduaneiro?",
    a: "Os dois. Grace Moura, diretora de projetos da Innover, é Despachante Aduaneiro autorizada pela Receita Federal do Brasil. Isso significa que executamos diretamente o registro e acompanhamento de DI, DUIMP, DUE, lidamos com órgãos anuentes e cuidamos da conferência aduaneira. Nada é terceirizado." },
  { q: "O que são DI, DUIMP e DUE?",
    a: "São declarações obrigatórias no comércio exterior brasileiro. DI (Declaração de Importação) e DUIMP (a versão mais moderna, em fase de substituição da DI) são usadas em operações de importação. DUE (Declaração Única de Exportação) consolida o registro de operações de exportação. Cuidamos dessas declarações por completo." },
  { q: "Quais segmentos a Innover atende?",
    a: "Temos forte atuação nos setores de alimentos e bebidas, equipamentos e produtos médicos, cosméticos, vestuário e moda, e bens de consumo diversos. Mesmo fora desses segmentos, é possível estruturar um projeto: avaliamos a viabilidade no primeiro contato." },
  { q: "Vocês atendem empresas fora do Rio Grande do Norte?",
    a: "Sim. Atendemos empresas de todo o Brasil. A operação é conduzida de forma híbrida (remota e presencial quando necessário), com reuniões online e visitas pontuais quando a complexidade do projeto exige." },
  { q: "Vocês ajudam com classificação fiscal (NCM) e formação de preço?",
    a: "Sim. Classificação fiscal correta é a base de qualquer operação de importação ou exportação. Erros nessa etapa geram custo, atraso e risco de autuação. Também desenvolvemos análises de custo total de importação e modelos de formação de preço para o cliente entender margem real antes de fechar a operação." },
  { q: "Vocês têm parceria com o Sebrae?",
    a: "Sim. Atuamos em parceria com o Sebrae e outras instituições estratégicas (agentes de carga, secretarias comerciais internacionais, distribuidores no exterior e consultores especializados). Essa rede fortalece a entrega para empresas que estão começando ou estruturando operações internacionais." },
  { q: "Vocês trabalham com regimes aduaneiros especiais?",
    a: "Sim. Avaliamos a aplicabilidade de regimes como drawback, admissão temporária, entreposto aduaneiro, RECOF e outros conforme a operação. A escolha correta do regime pode reduzir significativamente o custo tributário da operação." },
  { q: "Como funciona a interface com meus fornecedores internacionais?",
    a: "Conseguimos apoiar na comunicação estratégica com seu fornecedor, apoiando na coordenação com agentes de carga, transportadoras e seguradoras. A Innover atua como interface técnica entre sua empresa e o ecossistema internacional." },
  { q: "Quanto custa uma consultoria?",
    a: "Cada projeto tem escopo próprio e o valor é definido após uma conversa inicial gratuita, onde entendemos o objetivo, a complexidade da operação e o nível de envolvimento necessário. Não trabalhamos com pacote pronto justamente porque cada empresa tem uma realidade diferente." },
];

function FaqPage() {
  return (
    <div className="max-w-[920px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <FadeIn>
        <div className="label-mono">PÁGINA / FAQ</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 tracking-[-0.02em]">
          Perguntas que sempre nos fazem.
        </h1>
        <p className="text-mute mt-5 md:mt-6 max-w-xl">Respostas técnicas, sem rodeios.</p>
      </FadeIn>
      <RouteLine />

      <div className="mt-10 md:mt-12">
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((f, i) => (
            <FadeIn key={i} delay={i * 30}>
              <AccordionItem value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="py-5 md:py-6 text-left hover:no-underline group min-h-11">
                  <div className="flex items-start gap-3 sm:gap-4 pr-2 sm:pr-4">
                    <span className="label-mono pt-1.5 shrink-0 hidden sm:inline">FAQ-{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className="font-display font-semibold text-navy group-hover:text-accent-blue transition-colors"
                      style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}
                    >
                      {f.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:pl-[88px] pr-2 sm:pr-4 pb-8 text-ink/80 leading-relaxed text-[15px]">
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
