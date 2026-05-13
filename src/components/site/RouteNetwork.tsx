/** Animated SVG global trade route network for hero */
export function RouteNetwork({ className = "" }: { className?: string }) {
  // 8 abstract nodes (Brazil + parceiros)
  const nodes = [
    { id: "br", x: 220, y: 320, label: "BR" },
    { id: "us", x: 140, y: 180, label: "US" },
    { id: "eu", x: 340, y: 150, label: "EU" },
    { id: "uk", x: 300, y: 120, label: "UK" },
    { id: "ae", x: 420, y: 220, label: "AE" },
    { id: "cn", x: 500, y: 200, label: "CN" },
    { id: "jp", x: 540, y: 240, label: "JP" },
    { id: "ar", x: 200, y: 400, label: "AR" },
  ];
  // routes from BR to others
  const br = nodes[0];
  const curve = (a: typeof nodes[0], b: typeof nodes[0]) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - 60;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <svg viewBox="0 0 600 480" className={className} aria-hidden>
      {/* faint grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="600" height="480" fill="url(#grid)" opacity="0.6" />

      {/* curves */}
      {nodes.slice(1).map((n) => (
        <path
          key={`c-${n.id}`}
          d={curve(br, n)}
          fill="none"
          stroke="#1E5BFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.55"
          className="flow-line"
        />
      ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r="6"
            fill="#1E5BFF"
            opacity="0.18"
            className="pulse-node"
            style={{ animationDelay: `${i * 0.25}s`, transformOrigin: `${n.x}px ${n.y}px` }}
          />
          <circle cx={n.x} cy={n.y} r="3" fill="#0A2540" />
          <text x={n.x + 10} y={n.y - 8} className="font-mono" fontSize="9" fill="#6B7280" letterSpacing="1">
            {n.label}
          </text>
        </g>
      ))}

      {/* center emphasis on BR */}
      <circle cx={br.x} cy={br.y} r="14" fill="none" stroke="#1E5BFF" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
