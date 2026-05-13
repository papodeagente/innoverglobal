import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n, WHATSAPP_URL } from "@/lib/i18n";
import { Menu, X } from "lucide-react";
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
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Innover Negócios Internacionais">
            <img src={logoFull} alt="Innover Negócios Internacionais" className="h-9 lg:h-10 w-auto" />
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="hidden md:inline label-mono hover:text-navy transition-colors"
              aria-label="Toggle language"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary items-center px-4 py-2 text-sm font-medium rounded-sm"
            >
              {t("nav.cta")}
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-navy"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-6 border-b border-line">
            <img src={logoFull} alt="Innover Negócios Internacionais" className="h-9 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6 text-navy" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-navy py-3 border-b border-line"
              >
                {t(n.key)}
              </Link>
            ))}
            <button
              onClick={() => { setLang(lang === "pt" ? "en" : "pt"); }}
              className="label-mono mt-6 self-start"
            >
              {lang === "pt" ? "Switch to EN" : "Mudar para PT"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-primary inline-flex items-center justify-center px-5 py-3 rounded-sm font-medium"
            >
              {t("nav.cta")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
