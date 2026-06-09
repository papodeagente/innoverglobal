import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n, WHATSAPP_URL } from "@/lib/i18n";
import { LogIn, Menu, X } from "lucide-react";
import logoFull from "@/assets/innover-logo-full.png";
import logoMark from "@/assets/innover-mark.png";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/sobre", key: "nav.about" },
  { to: "/servicos", key: "nav.services" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/faq", key: "nav.faq" },
  { to: "/contato", key: "nav.contact" },
] as const;

// URL do sistema Innover OS. Sobrescreve via VITE_SYSTEM_URL no build se mudar o domínio.
const SYSTEM_LOGIN_URL =
  (import.meta as { env?: { VITE_SYSTEM_URL?: string } }).env?.VITE_SYSTEM_URL ??
  "https://os.innovernegocios.com.br/login";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10001] focus:bg-navy focus:text-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_var(--line)]"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 h-[64px] md:h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Innover Negócios Internacionais">
            <img src={logoMark} alt="Innover" className="h-8 md:h-10 lg:h-12 w-auto" />
            <span className="label-mono hidden xl:inline">/ COMEX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="text-sm text-ink/80 hover:text-navy transition-colors font-medium"
                activeProps={{ className: "text-navy font-semibold" }}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="hidden md:inline label-mono hover:text-navy transition-colors min-h-11 px-2"
              aria-label="Toggle language"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <a
              href={SYSTEM_LOGIN_URL}
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-medium text-navy border border-navy hover:bg-navy hover:text-white transition-colors px-4 py-2 rounded-sm"
            >
              <LogIn className="w-4 h-4" />
              Acessar Sistema
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex btn-primary items-center px-4 py-2 text-sm font-medium rounded-sm"
            >
              {t("nav.cta")}
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-navy inline-flex items-center justify-center min-h-11 min-w-11"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-right duration-300 flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <img src={logoFull} alt="Innover Negócios Internacionais" className="h-9 w-auto" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center min-h-11 min-w-11 text-navy"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4 gap-1 flex-1 overflow-y-auto">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-[28px] font-semibold text-navy py-4 border-b border-line"
              >
                {t(n.key)}
              </Link>
            ))}
            <button
              onClick={() => { setLang(lang === "pt" ? "en" : "pt"); }}
              className="label-mono mt-6 self-start min-h-11 px-2"
            >
              {lang === "pt" ? "Switch to EN" : "Mudar para PT"}
            </button>
          </nav>
          <div className="px-5 pb-6 pt-2 border-t border-line space-y-2">
            <a
              href={SYSTEM_LOGIN_URL}
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-4 rounded-sm font-medium border border-navy text-navy"
            >
              <LogIn className="w-4 h-4" />
              Acessar Sistema
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex w-full items-center justify-center px-5 py-4 rounded-sm font-medium"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
