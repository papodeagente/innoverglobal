import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Seal } from "./Seal";

export function Footer() {
  const { t } = useI18n();

  // mini stylised "map" for footer signature
  const dots: [number, number][] = [
    [20, 30], [60, 25], [100, 40], [140, 30], [180, 50], [220, 35],
    [40, 70], [90, 80], [150, 75], [200, 90], [80, 110], [170, 110],
  ];

  return (
    <footer className="bg-ink text-white/80 mt-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display font-bold text-3xl text-white">Innover</div>
            <div className="label-mono mt-2 text-white/50">NEGÓCIOS INTERNACIONAIS</div>
            <p className="mt-6 text-sm text-white/60 max-w-md leading-relaxed">
              Consultoria especializada em comércio exterior para micro e pequenas empresas brasileiras.
              Foco em alimentos e bebidas, importação e exportação.
            </p>

            {/* mini route map */}
            <svg viewBox="0 0 240 130" className="mt-8 w-[240px] opacity-40" aria-hidden>
              {dots.map(([x, y], i) =>
                dots.slice(i + 1, i + 3).map(([x2, y2], j) => (
                  <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="#1E5BFF" strokeWidth="0.5" />
                ))
              )}
              {dots.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2" fill="#1E5BFF" />
              ))}
            </svg>
          </div>

          <div>
            <div className="label-mono text-white/50 mb-4">NAVEGAÇÃO</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">{t("nav.home")}</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors">{t("nav.services")}</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">{t("nav.portfolio")}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">{t("nav.faq")}</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="label-mono text-white/50 mb-4">CONTATO</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" /><span>Natal/RN · Brasil</span></li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" /><a href="mailto:grace@innovernegocios.com.br" className="hover:text-white">grace@innovernegocios.com.br</a></li>
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" /><a href="https://wa.me/5584996051655" className="hover:text-white">+55 (84) 99605-1655</a></li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com/eugracemoura" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            </div>

            {/* placeholder badges */}
            <div className="flex items-center gap-3 mt-8">
              {/* TODO: substituir por selos reais (AEB, RADAR) quando disponíveis */}
              <div className="border border-white/15 px-3 py-2 label-mono text-white/60">MEMBRO AEB</div>
              <div className="border border-white/15 px-3 py-2 label-mono text-white/60">RADAR</div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-xs text-white/40 space-y-1">
            <div>INNOVER NEGÓCIOS INTERNACIONAIS LTDA.</div>
            {/* TODO: inserir CNPJ real */}
            <div>CNPJ: 00.000.000/0001-00 · © {new Date().getFullYear()} · {t("footer.rights")}</div>
          </div>
          <Seal variant="white" className="opacity-90" />
        </div>
      </div>

      {/* discreet cookie bar */}
      <CookieBar />
    </footer>
  );
}

function CookieBar() {
  // discreet, dismissible
  if (typeof window === "undefined") return null;
  return null;
}
