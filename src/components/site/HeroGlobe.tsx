"use client"

import { useEffect, useState } from "react"
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

// Cores na escala 0-1 (do tema do site)
// navy   #0A2540 → [0.039, 0.145, 0.251]
// primary #1E5BFF → [0.118, 0.357, 1.000]
// mist   #F5F7FA → [0.961, 0.969, 0.980]
const PRIMARY: [number, number, number] = [0.118, 0.357, 1.0]
const MIST: [number, number, number] = [0.961, 0.969, 0.98]
const WHITE: [number, number, number] = [1, 1, 1]

export function HeroGlobe({ className }: { className?: string }) {
  // Garante que o canvas WebGL só inicialize após hidratação no cliente.
  // Evita erros e layout shift durante o prerender (SSR) do TanStack Start.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Placeholder do mesmo aspect-ratio para não causar layout shift
    return <div className={`relative aspect-square ${className ?? ""}`} aria-hidden />
  }

  return (
    <Globe
      className={className}
      markers={markers}
      baseColor={WHITE}
      markerColor={PRIMARY}
      glowColor={MIST}
      dark={0}
      mapBrightness={6}
      markerSize={0.04}
      markerElevation={0.02}
      diffuse={1.25}
      mapSamples={18000}
      speed={0.0025}
    />
  )
}
