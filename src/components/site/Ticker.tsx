/** Bloomberg-style ticker. Reads from data/ticker.json (static import). */
import tickerData from "@/data/ticker.json";

export function Ticker() {
  const items: string[] = tickerData.items;
  const text = items.join("   ·   ");
  // duplicate for seamless loop
  return (
    <div className="bg-navy text-white overflow-hidden h-10 md:h-8 flex items-center border-b border-white/10">
      <div
        className="flex whitespace-nowrap ticker-track font-mono uppercase tracking-wider"
        style={{ fontSize: "clamp(11px, 2.5vw, 13px)", animationDuration: "45s" }}
      >
        <span className="px-6 opacity-90">{text}</span>
        <span className="px-6 opacity-90">{text}</span>
      </div>
    </div>
  );
}
