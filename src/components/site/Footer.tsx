import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Seal } from "./Seal";
import logoMark from "@/assets/innover-mark.png";

export function Footer() {
  const { t } = useI18n();

  // mini stylised "map" for footer signature
  const dots: [number, number][] = [
    [20, 30], [60, 25], [100, 40], [140, 30], [180, 50], [220, 35],
    [40, 70], [90, 80], [150, 75], [200, 90], [80, 110], [170, 110],
  ];

  return (
    <footer className="bg-ink text-white/80 mt-24 md:mt-32">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              <img
                src={logoMark}
                alt="Innover"
                className="h-12 md:h-14 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <div className="font-display font-bold text-2xl md:text-3xl text-white leading-none">Innover</div>
                <div className="label-mono mt-2 text-white/50">NEGÓCIOS INTERNACIONAIS</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/60 max-w-md leading-relaxed">
              Consultoria especializada em comércio exterior para micro e pequenas empresas brasileiras.
              Foco em alimentos e bebidas, importação e exportação.
            </p>

            {/* mini route map */}
            <svg viewBox="0 0 240 130" className="mt-8 w-[160px] md:w-[240px] mx-auto md:mx-0 opacity-40" aria-hidden>
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
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.home")}</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.about")}</Link></li>
              <li><Link to="/servicos" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.services")}</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.portfolio")}</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.faq")}</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors inline-flex items-center min-h-11">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="label-mono text-white/50 mb-4">CONTATO</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" />
                <address className="not-italic leading-relaxed">
                  Espaço empresarial SEAHUB<br />
                  Av. Eng. Roberto Freire, 1962<br />
                  Seaway Shopping, Loja 13<br />
                  Capim Macio · Natal/RN<br />
                  CEP 59082-095
                </address>
              </li>
              <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" /><a href="mailto:grace@innovernegocios.com.br" className="hover:text-white break-all">grace@innovernegocios.com.br</a></li>
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-accent-blue" /><a href="https://wa.me/5584996051655" className="hover:text-white">+55 (84) 99605-1655</a></li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://instagram.com/eugracemoura" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white inline-flex items-center justify-center min-h-11 min-w-11"><Instagram className="w-7 h-7 md:w-5 md:h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white inline-flex items-center justify-center min-h-11 min-w-11"><Linkedin className="w-7 h-7 md:w-5 md:h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="font-mono uppercase tracking-wider space-y-1.5" style={{ fontSize: "10px", color: "#6B7280" }}>
            <div>INNOVER NEGÓCIOS INTERNACIONAIS LTDA. · CNPJ 23.181.133/0001-07 · INSCRIÇÃO MUNICIPAL 2266005 · NATAL/RN/BR</div>
            <div>DESPACHANTE ADUANEIRO AUTORIZADA PELA RECEITA FEDERAL DO BRASIL · 12 ANOS DE ATUAÇÃO</div>
            <div className="text-white/30 normal-case tracking-normal pt-1" style={{ fontFamily: "inherit" }}>© {new Date().getFullYear()} · {t("footer.rights")}</div>
          </div>
          <Seal variant="white" className="opacity-90" withCertification />
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
