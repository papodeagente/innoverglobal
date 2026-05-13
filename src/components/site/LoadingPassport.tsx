import { useEffect, useState } from "react";
import logoFull from "@/assets/innover-logo-full.png";

/** Loading screen: animação de "passaporte sendo carimbado" */
export function LoadingPassport() {
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("innover.loaded");
    if (seen) {
      setDone(true);
      setHide(true);
      return;
    }
    const t1 = setTimeout(() => setDone(true), 1200);
    const t2 = setTimeout(() => {
      setHide(true);
      sessionStorage.setItem("innover.loaded", "1");
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-opacity duration-500 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="relative">
        {/* "passaporte" */}
        <div className="w-[300px] h-[200px] border border-line bg-mist relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-3 left-3 label-mono">PASSPORT · INNOVER</div>
          <img src={logoFull} alt="Innover" className="w-[210px] h-auto" />
          <div className="absolute bottom-3 left-3 right-3 h-px bg-navy/20" />
          <div className="absolute bottom-6 left-3 label-mono">NATAL/RN/BR</div>
        </div>
        {/* carimbo circular */}
        <div
          className="absolute -right-4 -bottom-4 w-[110px] h-[110px] rounded-full border-2 border-navy text-navy flex flex-col items-center justify-center font-mono uppercase text-[9px] leading-tight"
          style={{
            transform: done ? "rotate(-12deg) scale(1)" : "rotate(60deg) scale(0)",
            opacity: done ? 1 : 0,
            transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
          }}
        >
          <span className="font-bold text-[11px]">INNOVER</span>
          <span>COMEX</span>
          <span>2025</span>
        </div>
      </div>
    </div>
  );
}
