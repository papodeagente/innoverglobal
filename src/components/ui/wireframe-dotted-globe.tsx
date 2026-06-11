"use client"

import { useEffect, useRef, useState } from "react"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  // Cores (tema do site)
  oceanFill?: string         // cor da esfera (oceano)
  outlineColor?: string      // contorno da esfera, terras e grade
  graticuleAlpha?: number    // opacidade da grade (graticule)
  dotColor?: string          // cor dos halftone dots (terras)
  dotSize?: number           // raio base dos halftone dots
  dotSpacing?: number        // espacamento entre dots (menor = mais denso)
  outlineWidth?: number      // espessura base dos contornos de terra
  sphereOutlineWidth?: number // espessura do contorno da esfera
  hint?: boolean             // mostra "Drag to rotate"
  hintColor?: string
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  oceanFill = "#ffffff",
  outlineColor = "#0A2540",
  graticuleAlpha = 0.18,
  dotColor = "#1E5BFF",
  dotSize = 1.2,
  dotSpacing = 16,
  outlineWidth = 0.9,
  sphereOutlineWidth = 1.5,
  hint = false,
  hintColor = "#0A2540",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Mede o container e ajusta o tamanho do canvas (responsivo, sem layout shift)
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const ro = new ResizeObserver(() => {
      const w = Math.min(width, el.clientWidth)
      const h = Math.min(height, el.clientWidth) // aspect-square pelo width
      setSize({ w, h })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, height])

  useEffect(() => {
    if (!canvasRef.current || size.w === 0 || size.h === 0) return

    let stopped = false
    let cleanupFns: (() => void)[] = []

    ;(async () => {
      const canvas = canvasRef.current!
      const context = canvas.getContext("2d")
      if (!context) return

      const containerWidth = size.w
      const containerHeight = size.h
      const radius = Math.min(containerWidth, containerHeight) / 2.5

      const dpr = window.devicePixelRatio || 1
      canvas.width = containerWidth * dpr
      canvas.height = containerHeight * dpr
      canvas.style.width = `${containerWidth}px`
      canvas.style.height = `${containerHeight}px`
      context.scale(dpr, dpr)

      // Lazy load d3 só no cliente (mantém o initial bundle menor)
      const d3 = await import("d3")
      if (stopped) return

      const projection = d3
        .geoOrthographic()
        .scale(radius)
        .translate([containerWidth / 2, containerHeight / 2])
        .clipAngle(90)

      const path = d3.geoPath().projection(projection).context(context)

      const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
        const [x, y] = point
        let inside = false
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [xi, yi] = polygon[i]
          const [xj, yj] = polygon[j]
          if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
            inside = !inside
          }
        }
        return inside
      }

      const pointInFeature = (point: [number, number], feature: any): boolean => {
        const geometry = feature.geometry
        if (geometry.type === "Polygon") {
          const coordinates = geometry.coordinates
          if (!pointInPolygon(point, coordinates[0])) return false
          for (let i = 1; i < coordinates.length; i++) {
            if (pointInPolygon(point, coordinates[i])) return false
          }
          return true
        } else if (geometry.type === "MultiPolygon") {
          for (const polygon of geometry.coordinates) {
            if (pointInPolygon(point, polygon[0])) {
              let inHole = false
              for (let i = 1; i < polygon.length; i++) {
                if (pointInPolygon(point, polygon[i])) {
                  inHole = true
                  break
                }
              }
              if (!inHole) return true
            }
          }
          return false
        }
        return false
      }

      const generateDotsInPolygon = (feature: any) => {
        const dots: [number, number][] = []
        const bounds = d3.geoBounds(feature)
        const [[minLng, minLat], [maxLng, maxLat]] = bounds
        const stepSize = dotSpacing * 0.08
        for (let lng = minLng; lng <= maxLng; lng += stepSize) {
          for (let lat = minLat; lat <= maxLat; lat += stepSize) {
            const point: [number, number] = [lng, lat]
            if (pointInFeature(point, feature)) {
              dots.push(point)
            }
          }
        }
        return dots
      }

      interface DotData { lng: number; lat: number }
      const allDots: DotData[] = []
      let landFeatures: any = null

      const render = () => {
        context.clearRect(0, 0, containerWidth, containerHeight)
        const currentScale = projection.scale()
        const scaleFactor = currentScale / radius

        // Esfera (oceano)
        context.beginPath()
        context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
        context.fillStyle = oceanFill
        context.fill()
        context.strokeStyle = outlineColor
        context.lineWidth = sphereOutlineWidth * scaleFactor
        context.stroke()

        if (landFeatures) {
          // Graticule (grade)
          const graticule = d3.geoGraticule()
          context.beginPath()
          path(graticule())
          context.strokeStyle = outlineColor
          context.lineWidth = 0.8 * scaleFactor
          context.globalAlpha = graticuleAlpha
          context.stroke()
          context.globalAlpha = 1

          // Contornos de terra
          context.beginPath()
          landFeatures.features.forEach((feature: any) => path(feature))
          context.strokeStyle = outlineColor
          context.lineWidth = outlineWidth * scaleFactor
          context.stroke()

          // Halftone dots
          allDots.forEach((dot) => {
            const projected = projection([dot.lng, dot.lat])
            if (
              projected &&
              projected[0] >= 0 &&
              projected[0] <= containerWidth &&
              projected[1] >= 0 &&
              projected[1] <= containerHeight
            ) {
              context.beginPath()
              context.arc(projected[0], projected[1], dotSize * scaleFactor, 0, 2 * Math.PI)
              context.fillStyle = dotColor
              context.fill()
            }
          })
        }
      }

      try {
        // Servido localmente em /data/ — sem fetch externo (mais rápido e confiável)
        const response = await fetch("/data/ne_110m_land.json")
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json()
        if (stopped) return

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature)
          dots.forEach(([lng, lat]) => allDots.push({ lng, lat }))
        })

        render()
      } catch {
        setError("Falha ao carregar dados do globo")
        return
      }

      // Rotação automática + interação
      const rotation: [number, number, number] = [0, 0, 0]
      let autoRotate = true
      const rotationSpeed = 0.35 // graus por tick

      const rotationTimer = d3.timer(() => {
        if (autoRotate) {
          rotation[0] += rotationSpeed
          projection.rotate(rotation)
          render()
        }
      })

      const handleMouseDown = (event: MouseEvent) => {
        autoRotate = false
        const startX = event.clientX
        const startY = event.clientY
        const startRotation: [number, number, number] = [rotation[0], rotation[1], rotation[2]]

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const sensitivity = 0.5
          const dx = moveEvent.clientX - startX
          const dy = moveEvent.clientY - startY
          rotation[0] = startRotation[0] + dx * sensitivity
          rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - dy * sensitivity))
          projection.rotate(rotation)
          render()
        }

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", handleMouseUp)
          setTimeout(() => { autoRotate = true }, 10)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
      }

      // Touch suport
      const handleTouchStart = (event: TouchEvent) => {
        if (event.touches.length !== 1) return
        autoRotate = false
        const t = event.touches[0]
        const startX = t.clientX
        const startY = t.clientY
        const startRotation: [number, number, number] = [rotation[0], rotation[1], rotation[2]]

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length !== 1) return
          e.preventDefault()
          const tm = e.touches[0]
          const sensitivity = 0.5
          rotation[0] = startRotation[0] + (tm.clientX - startX) * sensitivity
          rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (tm.clientY - startY) * sensitivity))
          projection.rotate(rotation)
          render()
        }
        const handleTouchEnd = () => {
          document.removeEventListener("touchmove", handleTouchMove)
          document.removeEventListener("touchend", handleTouchEnd)
          setTimeout(() => { autoRotate = true }, 10)
        }
        document.addEventListener("touchmove", handleTouchMove, { passive: false })
        document.addEventListener("touchend", handleTouchEnd)
      }

      canvas.addEventListener("mousedown", handleMouseDown)
      canvas.addEventListener("touchstart", handleTouchStart, { passive: true })

      cleanupFns.push(() => {
        rotationTimer.stop()
        canvas.removeEventListener("mousedown", handleMouseDown)
        canvas.removeEventListener("touchstart", handleTouchStart)
      })
    })()

    return () => {
      stopped = true
      cleanupFns.forEach((fn) => fn())
    }
  }, [size.w, size.h, oceanFill, outlineColor, graticuleAlpha, dotColor, dotSize, dotSpacing, outlineWidth, sphereOutlineWidth])

  if (error) {
    return (
      <div ref={containerRef} className={`relative aspect-square ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative aspect-square ${className}`} style={{ touchAction: "none" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto block cursor-grab active:cursor-grabbing"
        style={{ maxWidth: "100%" }}
      />
      {hint && (
        <div
          className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/70 backdrop-blur"
          style={{ color: hintColor, border: `1px solid ${hintColor}30` }}
        >
          Arraste para girar
        </div>
      )}
    </div>
  )
}
