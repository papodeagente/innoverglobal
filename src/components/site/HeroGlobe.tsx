"use client"

import { useEffect, useState } from "react"

// Lazy load do globo no cliente — evita problemas no prerender (d3 + canvas
// dependem de window) e mantém o bundle inicial leve. O componente pesado
// só é baixado quando o usuário entra na home.
export function HeroGlobe({ className }: { className?: string }) {
  const [Cmp, setCmp] = useState<any>(null)

  useEffect(() => {
    let cancelled = false
    import("@/components/ui/wireframe-dotted-globe").then((mod) => {
      if (!cancelled) setCmp(() => mod.default)
    })
    return () => { cancelled = true }
  }, [])

  // Placeholder com mesmo aspect-ratio enquanto o módulo carrega — evita layout shift
  if (!Cmp) {
    return <div className={`relative aspect-square w-full ${className ?? ""}`} aria-hidden />
  }

  return (
    <Cmp
      className={`w-full ${className ?? ""}`}
      // Paleta alinhada ao tema do site (fundo claro)
      oceanFill="#ffffff"      // esfera branca
      outlineColor="#0A2540"   // navy (contornos e grade)
      graticuleAlpha={0.32}    // grade mais presente
      dotColor="#1E5BFF"       // primary (halftone dots)
      // Ajustes para reforçar a presença visual do globo
      dotSize={1.5}            // dots maiores (era 1.2)
      dotSpacing={13}          // menos espaço entre dots = mais denso (era 16)
      outlineWidth={1.2}       // contornos de terra mais fortes
      sphereOutlineWidth={1.8} // contorno da esfera mais marcado
      hint={false}
    />
  )
}
