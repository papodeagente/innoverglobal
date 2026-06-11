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
      graticuleAlpha={0.18}    // grade discreta
      dotColor="#1E5BFF"       // primary (halftone dots)
      hint={false}
    />
  )
}
