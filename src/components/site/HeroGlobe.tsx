"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Cidades estratégicas para a Innover (Brasil + parceiros internacionais)
const markers = [
  // Brasil (hub)
  { id: "saopaulo", lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  { id: "santos",   lat: -23.9533, lng: -46.3344, label: "Santos" },
  // Américas
  { id: "miami",    lat:  25.7617, lng: -80.1918, label: "Miami" },
  { id: "nyc",      lat:  40.7128, lng: -74.006,  label: "Nova York" },
  { id: "buenos",   lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
  // Europa
  { id: "rotterdam",lat:  51.9244, lng:   4.4777, label: "Roterdã" },
  { id: "hamburg",  lat:  53.5511, lng:   9.9937, label: "Hamburgo" },
  { id: "london",   lat:  51.5074, lng:  -0.1278, label: "Londres" },
  // Ásia + Oriente Médio
  { id: "dubai",    lat:  25.2048, lng:  55.2708, label: "Dubai" },
  { id: "shanghai", lat:  31.2304, lng: 121.4737, label: "Shanghai" },
  { id: "hk",       lat:  22.3193, lng: 114.1694, label: "Hong Kong" },
  { id: "tokyo",    lat:  35.6762, lng: 139.6503, label: "Tóquio" },
]

// Arcos saindo de São Paulo (BR) para os principais hubs internacionais
const SP = { lat: -23.5505, lng: -46.6333 }
const arcs = [
  { startLat: SP.lat, startLng: SP.lng, endLat:  25.7617, endLng: -80.1918, label: "BR → Miami" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  40.7128, endLng: -74.006,  label: "BR → NY" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  51.9244, endLng:   4.4777, label: "BR → Roterdã" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  51.5074, endLng:  -0.1278, label: "BR → Londres" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  25.2048, endLng:  55.2708, label: "BR → Dubai" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  31.2304, endLng: 121.4737, label: "BR → Shanghai" },
  { startLat: SP.lat, startLng: SP.lng, endLat:  35.6762, endLng: 139.6503, label: "BR → Tóquio" },
]

// Cores do tema do site
const PRIMARY = "#1E5BFF"   // azul (markers + arcs)
const NAVY    = "#0A2540"   // azul escuro
const MIST    = "#F5F7FA"   // base do globo (cinza-claro)

export function HeroGlobe({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const [GlobeCmp, setGlobeCmp] = useState<any>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Carrega react-globe.gl só no cliente (evita quebrar SSR/prerender)
  useEffect(() => {
    let cancelled = false
    import("react-globe.gl").then((mod) => {
      if (!cancelled) setGlobeCmp(() => mod.default)
    })
    return () => { cancelled = true }
  }, [])

  // Mede o container e atualiza tamanho ao redimensionar (responsivo, sem layout shift)
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth
      setSize({ w, h: w })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Configura controles e material do globo quando carrega
  useEffect(() => {
    if (!globeRef.current) return
    const g = globeRef.current
    // Auto-rotação suave
    const controls = g.controls?.()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.6
      controls.enableZoom = false
      controls.enablePan = false
      controls.rotateSpeed = 0.5
    }
    // POV inicial centrada no Atlântico (mostra Brasil + Europa + África)
    g.pointOfView?.({ lat: 15, lng: -20, altitude: 2.2 }, 0)
  }, [GlobeCmp, size.w])

  // Material custom: globo branco/claro com leve aspecto translúcido (look limpo,
  // sem textura de mapa). Mantém a estética minimalista da identidade do site.
  const globeMaterial = (() => {
    const m = new THREE.MeshPhongMaterial({
      color: new THREE.Color(MIST),
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.05,
      shininess: 12,
      transparent: true,
      opacity: 0.95,
    })
    return m
  })()

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full ${className ?? ""}`}
      style={{ touchAction: "none" }}
    >
      {GlobeCmp && size.w > 0 && (
        <GlobeCmp
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          rendererConfig={{ alpha: true, antialias: true }}
          globeMaterial={globeMaterial}
          showAtmosphere={true}
          atmosphereColor={PRIMARY}
          atmosphereAltitude={0.18}

          // Pontos (markers)
          pointsData={markers}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointAltitude={0.012}
          pointRadius={0.45}
          pointColor={() => PRIMARY}
          pointResolution={6}

          // Labels (texto) nos markers
          labelsData={markers}
          labelLat={(d: any) => d.lat}
          labelLng={(d: any) => d.lng}
          labelText={(d: any) => d.label}
          labelSize={0.45}
          labelDotRadius={0.0}
          labelAltitude={0.025}
          labelColor={() => NAVY}
          labelResolution={2}

          // Arcs (linhas saindo do Brasil) com efeito de "viagem"
          arcsData={arcs}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={() => PRIMARY}
          arcAltitudeAutoScale={0.5}
          arcStroke={0.35}
          arcDashLength={0.4}
          arcDashGap={1.5}
          arcDashAnimateTime={3500}
        />
      )}
    </div>
  )
}
