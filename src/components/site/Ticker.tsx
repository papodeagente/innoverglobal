/** Bloomberg-style ticker. Reads from data/ticker.json (static import). */
import tickerData from "@/data/ticker.json";

export function Ticker() {
  const items: string[] = tickerData.items;
  const text = items.join("   ·   ");
  // duplicate for seamless loop
  return (
    <div className="bg-navy text-white overflow-hidden h-8 flex items-center border-b border-white/10">
      <div className="flex whitespace-nowrap ticker-track font-mono text-[11px] uppercase tracking-wider">
        <span className="px-6 opacity-90">{text}</span>
        <span className="px-6 opacity-90">{text}</span>
      </div>
    </div>
  );
}
