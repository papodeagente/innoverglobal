/** "Carimbo" institutional seal — simulates customs document stamp */
export function Seal({
  className = "",
  variant = "navy",
  withCertification = false,
}: {
  className?: string;
  variant?: "navy" | "white";
  withCertification?: boolean;
}) {
  const colorClasses =
    variant === "white"
      ? "border-white/50 text-white"
      : "border-navy text-navy";
  const subColor = variant === "white" ? "text-white/80" : "text-navy/80";
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className={`inline-flex flex-col items-center justify-center w-[88px] h-[88px] border ${colorClasses} font-mono uppercase text-[9px] leading-tight tracking-wider px-2 text-center`}
      >
        <span className="font-bold text-[10px]">INNOVER</span>
        <span className="mt-1">COMEX · 2025</span>
        <span className="mt-0.5">NATAL/RN/BR</span>
      </div>
      {withCertification && (
        <div className={`mt-2 font-mono uppercase text-[10px] leading-tight tracking-wider text-center ${subColor}`}>
          <div className="w-[88px] h-px bg-current opacity-40 mx-auto mb-2" />
          <div>Despachante</div>
          <div>Aduaneiro RFB</div>
          <div className="font-bold">Autorizada</div>
        </div>
      )}
    </div>
  );
}
