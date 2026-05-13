import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "pt" | "en";

type Dict = Record<string, { pt: string; en: string }>;

const DICT: Dict = {
  "nav.home": { pt: "Home", en: "Home" },
  "nav.about": { pt: "Sobre", en: "About" },
  "nav.services": { pt: "Serviços", en: "Services" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "nav.faq": { pt: "FAQ", en: "FAQ" },
  "nav.contact": { pt: "Contato", en: "Contact" },
  "nav.cta": { pt: "Fale conosco", en: "Talk to us" },

  "hero.label": { pt: "CONSULTORIA COMEX · NATAL/RN", en: "FOREIGN TRADE CONSULTING · NATAL/RN" },
  "hero.title": { pt: "Comércio exterior, sem fricção.", en: "Foreign trade, without friction." },
  "hero.sub": {
    pt: "Consultoria especializada em importação, exportação e acesso a mercados internacionais para empresas brasileiras de pequeno e médio porte.",
    en: "Specialized consulting in import, export and access to international markets for small and mid-sized Brazilian companies.",
  },
  "hero.cta1": { pt: "Agendar conversa", en: "Schedule a call" },
  "hero.cta2": { pt: "Conhecer serviços", en: "Explore services" },

  "stats.countries": { pt: "mercados atendidos", en: "markets served" },
  "stats.years": { pt: "de atuação em comex", en: "in foreign trade" },
  "stats.smb": { pt: "micro e pequenas empresas", en: "micro and small businesses" },
  "stats.response": { pt: "tempo médio de resposta", en: "avg. first response" },

  "why.title": { pt: "Por que Innover", en: "Why Innover" },
  "services.title": { pt: "Serviços", en: "Services" },
  "services.sub": { pt: "Operações desenhadas a partir da realidade da sua empresa.", en: "Operations designed around your company's reality." },

  "cta.title": { pt: "Pronto pra colocar sua empresa fora do Brasil?", en: "Ready to take your company beyond Brazil?" },
  "cta.sub": { pt: "Conversa inicial gratuita por 30 minutos.", en: "Free 30-minute initial conversation." },
  "cta.btn": { pt: "Agendar pelo WhatsApp", en: "Schedule via WhatsApp" },

  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "pt",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && (localStorage.getItem("innover.lang") as Lang)) || null;
    if (stored === "pt" || stored === "en") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("innover.lang", l);
  };
  const t = (k: string) => DICT[k]?.[lang] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useI18n = () => useContext(LangCtx);

export const WHATSAPP_URL =
  "https://wa.me/5584996051655?text=" +
  encodeURIComponent("Oi Grace, vim pelo site da Innover e queria conversar sobre exportação/importação");
