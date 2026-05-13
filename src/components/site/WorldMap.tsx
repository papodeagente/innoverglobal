/** Abstract world-map silhouette + highlighted points per service variant */
type Variant = "export" | "import" | "sanitary" | "research" | "tariff" | "training";

const HIGHLIGHTS: Record<Variant, [number, number][]> = {
  export:   [[80, 60], [120, 50], [140, 70], [180, 65]], // Europe, Asia, US
  import:   [[55, 90]], // Brazil
  sanitary: [[35, 55], [120, 50]], // US + Europe
  research: [[35, 55], [120, 50], [140, 70], [180, 65], [55, 90], [165, 100]],
  tariff:   [[55, 90], [120, 50], [180, 65], [140, 70]],
  training: [[55, 90]],
};

export function WorldMap({ variant }: { variant: Variant }) {
  const points = HIGHLIGHTS[variant];
  return (
    <svg viewBox="0 0 220 130" className="w-full h-auto" aria-hidden>
      {/* very abstract continent silhouettes — schematic shapes */}
      <g fill="none" stroke="#0A2540" strokeWidth="0.8" strokeLinejoin="round" opacity="0.6">
        {/* North America */}
        <path d="M 10 30 L 30 25 L 50 35 L 55 60 L 35 75 L 20 65 Z" />
        {/* South America */}
        <path d="M 45 75 L 65 78 L 70 100 L 55 120 L 45 110 Z" />
        {/* Europe */}
        <path d="M 95 35 L 120 30 L 130 50 L 110 60 L 95 50 Z" />
        {/* Africa */}
        <path d="M 105 65 L 130 65 L 135 95 L 115 115 L 100 95 Z" />
        {/* Asia */}
        <path d="M 130 30 L 175 25 L 195 50 L 175 75 L 145 70 L 135 50 Z" />
        {/* Oceania */}
        <path d="M 175 100 L 195 98 L 200 112 L 180 115 Z" />
      </g>
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="#1E5BFF" opacity="0.25" className="pulse-node"
            style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${x}px ${y}px` }} />
          <circle cx={x} cy={y} r="1.6" fill="#1E5BFF" />
        </g>
      ))}
    </svg>
  );
}
