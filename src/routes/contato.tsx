import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { FadeIn } from "@/components/site/FadeIn";
import { RouteLine } from "@/components/site/RouteLine";
import { Seal } from "@/components/site/Seal";
import { WHATSAPP_URL } from "@/lib/i18n";
import { Mail, MapPin, Phone, Instagram, Linkedin, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Innover" },
      { name: "description", content: "Fale com a Innover. Conversa inicial gratuita de 30 minutos. WhatsApp, e-mail ou formulário." },
      { property: "og:title", content: "Contato — Innover" },
      { property: "og:description", content: "Conversa inicial gratuita. Sem compromisso." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z.string().trim().min(10, "Telefone inválido").max(20),
  empresa: z.string().trim().min(1, "Informe a empresa").max(120),
  intencao: z.enum(["importar", "exportar", "ambos", "indeciso"]),
  mensagem: z.string().trim().min(5, "Conte um pouco mais").max(1000),
});

function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [intencao, setIntencao] = useState<"importar" | "exportar" | "ambos" | "indeciso">("exportar");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      nome: fd.get("nome"),
      email: fd.get("email"),
      whatsapp: fd.get("whatsapp"),
      empresa: fd.get("empresa"),
      intencao,
      mensagem: fd.get("mensagem"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Verifique os campos do formulário.");
      return;
    }
    setErrors({});
    // TODO: integrar com email/WhatsApp da Grace.
    // Sugestões: Resend / Lovable Email para grace@innovernegocios.com.br,
    // ou redirecionar para wa.me com mensagem pré-formatada.
    const msg = encodeURIComponent(
      `Olá Grace! Sou ${parsed.data.nome} (${parsed.data.empresa}).\nQuero: ${parsed.data.intencao}\n\n${parsed.data.mensagem}\n\nE-mail: ${parsed.data.email} · WhatsApp: ${parsed.data.whatsapp}`
    );
    window.open(`https://wa.me/5584996051655?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-16 md:py-20">
      <Toaster />
      <FadeIn>
        <div className="label-mono">PÁGINA / CONTATO</div>
        <h1 className="font-display h-fluid-h1 font-semibold text-navy mt-3 max-w-4xl tracking-[-0.02em] leading-[1.05]">
          Vamos colocar sua empresa fora do Brasil.
        </h1>
        <p className="t-fluid-lead text-mute mt-5 md:mt-6 max-w-xl">
          Primeira conversa é gratuita e leva 30 minutos. Sem compromisso.
        </p>
      </FadeIn>
      <RouteLine label="ROTA · CONVERSA → OPERAÇÃO" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mt-10 md:mt-12">
        {/* form */}
        <FadeIn className="lg:col-span-7 order-2 lg:order-1">
          {sent ? (
            <div className="bg-mist border border-line p-8 md:p-12 text-center">
              <Check className="w-12 h-12 text-accent-blue mx-auto" strokeWidth={1.4} />
              <h3 className="font-display text-2xl text-navy mt-6">Mensagem enviada</h3>
              <p className="text-mute mt-3 max-w-sm mx-auto">Abrimos o WhatsApp pra você concluir o envio direto com a Grace.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
              <Field label="Nome" name="nome" error={errors.nome} />
              <Field label="E-mail" name="email" type="email" error={errors.email} />
              <Field label="WhatsApp" name="whatsapp" placeholder="(84) 99999-9999" error={errors.whatsapp} />
              <Field label="Empresa" name="empresa" error={errors.empresa} />

              <div>
                <label className="label-mono block mb-3">Você quer</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { v: "importar", l: "Importar" },
                    { v: "exportar", l: "Exportar" },
                    { v: "ambos", l: "Os dois" },
                    { v: "indeciso", l: "Ainda não sei" },
                  ].map((o) => (
                    <button
                      type="button"
                      key={o.v}
                      onClick={() => setIntencao(o.v as typeof intencao)}
                      className={`min-h-11 py-3 px-4 text-sm border transition-all ${intencao === o.v ? "bg-navy text-white border-navy" : "bg-white text-ink border-line hover:border-navy"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="label-mono block mb-2">Conta um pouco</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  maxLength={1000}
                  className="w-full border border-line bg-white px-4 py-3 text-base text-ink focus:border-navy outline-none transition-colors resize-none"
                />
                {errors.mensagem && <p className="text-destructive text-xs mt-1">{errors.mensagem}</p>}
              </div>

              <button type="submit" className="btn-primary inline-flex w-full sm:w-auto justify-center px-7 py-4 text-sm font-medium min-h-12">
                Enviar mensagem
              </button>
            </form>
          )}
        </FadeIn>

        {/* contact block */}
        <FadeIn delay={120} className="lg:col-span-5 order-1 lg:order-2">
          <div className="bg-navy text-white p-6 sm:p-8 lg:p-10">
            <div className="label-mono text-white/60">CONVERSA DIRETA</div>
            <h3 className="font-display text-2xl mt-3">WhatsApp da Grace</h3>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-white text-navy hover:bg-mist px-5 py-4 transition-colors min-h-12"
            >
              <MessageCircle className="w-5 h-5" /> Abrir WhatsApp
            </a>
          </div>

          <div className="border border-line p-8 lg:p-10 mt-6 space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent-blue mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <div className="label-mono">E-MAIL</div>
                <a href="mailto:grace@innovernegocios.com.br" className="text-navy hover:text-accent-blue">grace@innovernegocios.com.br</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent-blue mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <div className="label-mono">TELEFONE</div>
                <a href="tel:+5584996051655" className="text-navy hover:text-accent-blue">+55 (84) 99605-1655</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent-blue mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <div className="label-mono">ENDEREÇO</div>
                <span className="text-ink">Natal · Rio Grande do Norte · Brasil</span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3">
              <a href="https://instagram.com/eugracemoura" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-navy hover:text-accent-blue"><Instagram className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-navy hover:text-accent-blue"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="flex justify-end mt-8"><Seal /></div>
        </FadeIn>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", error, placeholder }: { label: string; name: string; type?: string; error?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label-mono block mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={255}
        className="w-full border border-line bg-white px-4 py-3 text-ink focus:border-navy outline-none transition-colors"
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}
