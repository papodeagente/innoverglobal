"use client"

import { Globe } from "@/components/ui/cobe-globe"

// Cidades estratégicas para a Innover (Brasil + parceiros internacionais)
const markers = [
  // Brasil (hub)
  { id: "saopaulo", location: [-23.5505, -46.6333] as [number, number], label: "São Paulo" },
  { id: "santos",   location: [-23.9533, -46.3344] as [number, number], label: "Santos" },
  // Américas
  { id: "miami",    location: [25.7617,  -80.1918] as [number, number], label: "Miami" },
  { id: "nyc",      location: [40.7128,  -74.006]  as [number, number], label: "Nova York" },
  { id: "buenos",   location: [-34.6037, -58.3816] as [number, number], label: "Buenos Aires" },
  // Europa
  { id: "rotterdam",location: [51.9244,   4.4777]  as [number, number], label: "Roterdã" },
  { id: "hamburg",  location: [53.5511,   9.9937]  as [number, number], label: "Hamburgo" },
  { id: "london",   location: [51.5074,  -0.1278]  as [number, number], label: "Londres" },
  // Ásia + Oriente Médio
  { id: "dubai",    location: [25.2048,  55.2708]  as [number, number], label: "Dubai" },
  { id: "shanghai", location: [31.2304, 121.4737]  as [number, number], label: "Shanghai" },
  { id: "hk",       location: [22.3193, 114.1694]  as [number, number], label: "Hong Kong" },
  { id: "tokyo",    location: [35.6762, 139.6503]  as [number, number], label: "Tóquio" },
]

// Arcos saindo do Brasil (São Paulo) para os principais hubs de comércio exterior
const SP: [number, number] = [-23.5505, -46.6333]
const arcs = [
  { id: "sp-miami",    from: SP, to: [25.7617,  -80.1918] as [number, number], label: "BR → Miami" },
  { id: "sp-nyc",      from: SP, to: [40.7128,  -74.006]  as [number, number], label: "BR → NY" },
  { id: "sp-rotterdam",from: SP, to: [51.9244,   4.4777]  as [number, number], label: "BR → Roterdã" },
  { id: "sp-london",   from: SP, to: [51.5074,  -0.1278]  as [number, number], label: "BR → Londres" },
  { id: "sp-dubai",    from: SP, to: [25.2048,  55.2708]  as [number, number], label: "BR → Dubai" },
  { id: "sp-shanghai", from: SP, to: [31.2304, 121.4737]  as [number, number], label: "BR → Shanghai" },
  { id: "sp-tokyo",    from: SP, to: [35.6762, 139.6503]  as [number, number], label: "BR → Tóquio" },
]

// Cores na escala 0-1, alinhadas ao tema do site
// navy   #0A2540 → [0.039, 0.145, 0.251]
// primary #1E5BFF → [0.118, 0.357, 1.000]
// mist   #F5F7FA → [0.961, 0.969, 0.980]
const PRIMARY: [number, number, number] = [0.118, 0.357, 1.0]
const MIST:    [number, number, number] = [0.961, 0.969, 0.98]
const WHITE:   [number, number, number] = [1, 1, 1]

export function HeroGlobe({ className }: { className?: string }) {
  return (
    <Globe
      className={className}
      markers={markers}
      arcs={arcs}
      markerColor={PRIMARY}
      baseColor={WHITE}
      arcColor={PRIMARY}
      glowColor={MIST}
      dark={0}
      mapBrightness={10}
      markerSize={0.025}
      markerElevation={0.01}
    />
  )
}
