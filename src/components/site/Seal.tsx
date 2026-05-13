/** "Carimbo" institutional seal — simulates customs document stamp */
export function Seal({ className = "", variant = "navy" }: { className?: string; variant?: "navy" | "white" }) {
  const colorClasses =
    variant === "white"
      ? "border-white/50 text-white"
      : "border-navy text-navy";
  return (
    <div
      className={`inline-flex flex-col items-center justify-center w-[88px] h-[88px] border ${colorClasses} font-mono uppercase text-[9px] leading-tight tracking-wider px-2 text-center ${className}`}
    >
      <span className="font-bold text-[10px]">INNOVER</span>
      <span className="mt-1">COMEX · 2025</span>
      <span className="mt-0.5">NATAL/RN/BR</span>
    </div>
  );
}
