import { useEffect, useRef, useState } from 'react'
import './research-network-atmosphere.css'

type Density = 'sparse' | 'medium'
type Layout = 'study' | 'auth'
type AtmosphereMode = 'orbital' | 'exploration'

type Props = {
  className?: string
  density?: Density
  layout?: Layout
  /** @deprecated Mode is derived from resolved theme (`data-theme`). */
  variant?: 'orbital'
}

type OrbitalNode = {
  angle: number
  radius: number
  speed: number
  size: number
  phase: number
}

type Edge = {
  a: number
  b: number
  life: number
  maxLife: number
  growing: boolean
}

type CoreParticle = {
  angle: number
  radius: number
  speed: number
  size: number
  phase: number
  life: number
  maxLife: number
  growing: boolean
}

/** Scatter particle for light exploration field (normalized 0–1 coords). */
type FieldParticle = {
  x: number
  y: number
  homeX: number
  homeY: number
  vx: number
  vy: number
  size: number
  phase: number
  life: number
  maxLife: number
  growing: boolean
}

const RING_COUNT = 9
const RING_INNER = 0.12
const RING_STEP = 0.085
const OUTER_RING = RING_INNER + (RING_COUNT - 1) * RING_STEP
const RING_STROKE = 0.65
const EDGE_STROKE = 0.7
const FIELD_SCALE = 0.6
const ORBIT_Y_FACTOR = 0.92

const LAYOUT_CENTER: Record<Layout, { x: number; y: number }> = {
  study: { x: 0.62, y: 0.48 },
  auth: { x: 0.5, y: 0.46 },
}

function readResolvedTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'dark'
  }
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'
}

function useAtmosphereMode(): AtmosphereMode {
  const [mode, setMode] = useState<AtmosphereMode>(() =>
    readResolvedTheme() === 'light' ? 'exploration' : 'orbital',
  )

  useEffect(() => {
    const sync = () => {
      setMode(readResolvedTheme() === 'light' ? 'exploration' : 'orbital')
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return mode
}

function nodeCount(density: Density): number {
  return density === 'medium' ? 264 : 216
}

function extraOrbitalCount(density: Density): number {
  return density === 'medium' ? 54 : 42
}

function coreParticleCount(density: Density): number {
  return density === 'medium' ? 180 : 140
}

function maxEdgeCount(density: Density): number {
  return density === 'medium' ? 156 : 126
}

function fieldParticleCount(density: Density): number {
  return density === 'medium' ? 96 : 70
}

function fieldMaxEdges(density: Density): number {
  return density === 'medium' ? 36 : 28
}

function ringRadius(ring: number): number {
  return RING_INNER + (ring - 1) * RING_STEP
}

function fairSharePerRing(density: Density): number {
  return Math.max(1, Math.round(nodeCount(density) / RING_COUNT))
}

function parseCssColor(value: string): { r: number; g: number; b: number } {
  const trimmed = value.trim()
  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1)
    const full =
      hex.length === 3
        ? hex
            .split('')
            .map((c) => c + c)
            .join('')
        : hex
    const n = Number.parseInt(full, 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
  }
  const rgb = trimmed.match(/rgba?\(([^)]+)\)/)
  if (rgb) {
    const [r, g, b] = rgb[1].split(',').map((p) => Number.parseFloat(p.trim()))
    return { r, g, b }
  }
  return { r: 232, g: 197, b: 71 }
}

function brightenDiscovery(color: {
  r: number
  g: number
  b: number
}): { r: number; g: number; b: number } {
  const lime = { r: 223, g: 255, b: 80 }
  const t = 0.45
  return {
    r: Math.round(color.r * (1 - t) + lime.r * t),
    g: Math.round(color.g * (1 - t) + lime.g * t),
    b: Math.round(color.b * (1 - t) + lime.b * t),
  }
}

function rgba(
  color: { r: number; g: number; b: number },
  alpha: number,
): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

function makeNodeOnRing(ring: number): OrbitalNode {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: ringRadius(ring) + Math.random() * 0.03,
    speed:
      (0.00007 + Math.random() * 0.00011) * (Math.random() > 0.5 ? 1 : -1),
    size: 0.53 + Math.random() * 0.73,
    phase: Math.random() * Math.PI * 2,
  }
}

function buildOrbitalNodes(density: Density): OrbitalNode[] {
  const n = nodeCount(density)
  const fair = fairSharePerRing(density)
  const innerPerRing = fair * 5
  const nodes: OrbitalNode[] = []
  for (let i = 0; i < innerPerRing; i += 1) {
    nodes.push(makeNodeOnRing(1))
  }
  for (let i = 0; i < innerPerRing; i += 1) {
    nodes.push(makeNodeOnRing(2))
  }
  const outerBudget = Math.max(0, n - 2 * fair)
  const outerRingSpan = RING_COUNT - 2
  for (let i = 0; i < outerBudget; i += 1) {
    const ring = 3 + (i % outerRingSpan)
    nodes.push(makeNodeOnRing(ring))
  }
  return nodes
}

function makeExtraOrbitalNode(i: number): OrbitalNode {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: OUTER_RING + 0.06 + Math.random() * 0.14,
    speed: (0.00005 + Math.random() * 0.00009) * (i % 2 === 0 ? -1 : 1),
    size: 0.47 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
  }
}

function makeCoreParticle(): CoreParticle {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: 0.012 + Math.pow(Math.random(), 2.1) * 0.14,
    speed: (0.0001 + Math.random() * 0.00018) * (Math.random() > 0.5 ? 1 : -1),
    size: 0.27 + Math.random() * 0.53,
    phase: Math.random() * Math.PI * 2,
    life: Math.random() * 600,
    maxLife: 1400 + Math.random() * 2200,
    growing: Math.random() > 0.35,
  }
}

function makeFieldParticle(): FieldParticle {
  const x = 0.08 + Math.random() * 0.84
  const y = 0.1 + Math.random() * 0.8
  return {
    x,
    y,
    homeX: x,
    homeY: y,
    vx: (Math.random() - 0.5) * 0.00004,
    vy: (Math.random() - 0.5) * 0.00004,
    size: 2.2 + Math.random() * 2.4,
    phase: Math.random() * Math.PI * 2,
    // Start many particles near peak so the field is visible immediately.
    life: 400 + Math.random() * 1200,
    maxLife: 2800 + Math.random() * 3600,
    growing: Math.random() > 0.35,
  }
}

/**
 * Theme-aware research network atmosphere.
 * Dark → orbital observatory. Light → exploration field of incomplete relations.
 */
export function ResearchNetworkAtmosphere({
  className,
  density = 'sparse',
  layout = 'study',
  variant = 'orbital',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mode = useAtmosphereMode()
  void variant

  useEffect(() => {
    const surface = canvasRef.current
    if (!surface) {
      return
    }
    const context = surface.getContext('2d')
    if (!context) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animate = !reducedMotion.matches
    let visible = document.visibilityState === 'visible'
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let pointerX = -1
    let pointerY = -1
    let lastCursorEdgeAt = 0

    const readOrbitalColor = () =>
      brightenDiscovery(
        parseCssColor(
          getComputedStyle(surface).getPropertyValue(
            '--color-discovery-primary',
          ) || '#e8c547',
        ),
      )

    const readExplorationColor = () =>
      parseCssColor(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--color-discovery-primary',
        ) || '#c9a227',
      )

    let color =
      mode === 'exploration' ? readExplorationColor() : readOrbitalColor()

    const center = LAYOUT_CENTER[layout]
    const edgeAlphaScale = layout === 'auth' ? 0.55 : 0.65

    // --- Orbital state ---
    const orbital = buildOrbitalNodes(density)
    const extras = Array.from({ length: extraOrbitalCount(density) }, (_, i) =>
      makeExtraOrbitalNode(i),
    )
    const orbitalNodes: OrbitalNode[] = [...orbital, ...extras]
    const cores: CoreParticle[] = Array.from(
      { length: coreParticleCount(density) },
      () => makeCoreParticle(),
    )
    const orbitalEdges: Edge[] = []
    const orbitalMaxEdges = maxEdgeCount(density)

    // --- Exploration state ---
    const fieldParticles: FieldParticle[] = Array.from(
      { length: fieldParticleCount(density) },
      () => makeFieldParticle(),
    )
    const fieldEdges: Edge[] = []
    const fieldEdgeCap = fieldMaxEdges(density)

    const fieldCenter = () => ({
      cx: width * center.x,
      cy: height * center.y,
      scale: Math.min(width, height) * FIELD_SCALE,
    })

    const resize = () => {
      const parent = surface.parentElement
      if (!parent) {
        return
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      surface.width = Math.max(1, Math.floor(width * dpr))
      surface.height = Math.max(1, Math.floor(height * dpr))
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      color =
        mode === 'exploration' ? readExplorationColor() : readOrbitalColor()
    }

    const nodeXY = (node: OrbitalNode) => {
      const { cx, cy, scale } = fieldCenter()
      const wobble = Math.sin(performance.now() * 0.0004 + node.phase) * 0.01
      const r = (node.radius + wobble) * scale
      return {
        x: cx + Math.cos(node.angle) * r,
        y: cy + Math.sin(node.angle) * r * ORBIT_Y_FACTOR,
      }
    }

    const coreXY = (particle: CoreParticle) => {
      const { cx, cy, scale } = fieldCenter()
      const wobble =
        Math.sin(performance.now() * 0.00055 + particle.phase) * 0.008
      const r = (particle.radius + wobble) * scale
      return {
        x: cx + Math.cos(particle.angle) * r,
        y: cy + Math.sin(particle.angle) * r * ORBIT_Y_FACTOR,
      }
    }

    const fieldXY = (p: FieldParticle) => ({
      x: p.x * width,
      y: p.y * height,
    })

    const maxEdgeLengthPx = () => fieldCenter().scale * RING_STEP

    const trySpawnOrbitalEdge = () => {
      if (orbitalEdges.length >= orbitalMaxEdges) {
        return false
      }
      const a = Math.floor(Math.random() * orbitalNodes.length)
      let b = Math.floor(Math.random() * orbitalNodes.length)
      if (a === b) {
        b = (b + 1) % orbitalNodes.length
      }
      const pa = nodeXY(orbitalNodes[a])
      const pb = nodeXY(orbitalNodes[b])
      const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y)
      if (dist > maxEdgeLengthPx()) {
        return false
      }
      orbitalEdges.push({
        a,
        b,
        life: 0,
        maxLife: 1600 + Math.random() * 2400,
        growing: true,
      })
      return true
    }

    const maybeSpawnOrbitalEdge = () => {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        if (orbitalEdges.length >= orbitalMaxEdges) {
          break
        }
        if (Math.random() > 0.35) {
          continue
        }
        trySpawnOrbitalEdge()
      }
    }

    const trySpawnFieldEdge = (
      preferNearCursor: boolean,
      branchFrom?: number,
    ) => {
      if (fieldEdges.length >= fieldEdgeCap) {
        return false
      }
      const n = fieldParticles.length
      let a =
        branchFrom !== undefined
          ? branchFrom
          : Math.floor(Math.random() * n)
      let b = Math.floor(Math.random() * n)

      if (preferNearCursor && pointerX >= 0 && pointerY >= 0) {
        const nearby: number[] = []
        const radius = Math.min(width, height) * 0.14
        for (let i = 0; i < n; i += 1) {
          const { x, y } = fieldXY(fieldParticles[i])
          if (Math.hypot(x - pointerX, y - pointerY) < radius) {
            nearby.push(i)
          }
        }
        if (nearby.length >= 2) {
          a = nearby[Math.floor(Math.random() * nearby.length)]
          b = nearby[Math.floor(Math.random() * nearby.length)]
        }
      }

      if (a === b) {
        b = (b + 1) % n
      }

      const pa = fieldXY(fieldParticles[a])
      const pb = fieldXY(fieldParticles[b])
      const maxDist = Math.min(width, height) * 0.26
      if (Math.hypot(pa.x - pb.x, pa.y - pb.y) > maxDist) {
        return false
      }

      const exists = fieldEdges.some(
        (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a),
      )
      if (exists) {
        return false
      }

      fieldEdges.push({
        a,
        b,
        life: 0,
        maxLife: 1400 + Math.random() * 1800,
        growing: true,
      })

      // Occasional 1-hop branch that will also dissolve.
      if (branchFrom === undefined && Math.random() < 0.22) {
        trySpawnFieldEdge(false, b)
      }
      return true
    }

    const maybeSpawnFieldEdge = () => {
      if (Math.random() > 0.42) {
        return
      }
      trySpawnFieldEdge(false)
    }

    const updateCores = (moving: boolean) => {
      if (!moving) {
        return
      }
      for (let i = 0; i < cores.length; i += 1) {
        const particle = cores[i]
        particle.angle += particle.speed * 16
        if (particle.growing) {
          particle.life += 16
          if (particle.life >= particle.maxLife * 0.55) {
            particle.growing = false
          }
        } else {
          particle.life -= 14
          if (particle.life <= 0) {
            cores[i] = makeCoreParticle()
            cores[i].life = 0
            cores[i].growing = true
          }
        }
      }
    }

    const updateFieldParticles = (moving: boolean) => {
      if (!moving) {
        return
      }
      const influence = Math.min(width, height) * 0.12
      for (let i = 0; i < fieldParticles.length; i += 1) {
        const p = fieldParticles[i]
        p.x += p.vx * 16
        p.y += p.vy * 16
        // Soft pull back to home (drift, not orbit).
        p.vx += (p.homeX - p.x) * 0.00002
        p.vy += (p.homeY - p.y) * 0.00002
        p.vx *= 0.99
        p.vy *= 0.99

        if (pointerX >= 0 && pointerY >= 0) {
          const { x, y } = fieldXY(p)
          const dx = pointerX - x
          const dy = pointerY - y
          const dist = Math.hypot(dx, dy)
          if (dist < influence && dist > 1) {
            const pull = ((influence - dist) / influence) * 0.000012
            p.vx += (dx / dist) * pull
            p.vy += (dy / dist) * pull
          }
        }

        p.x = Math.min(0.94, Math.max(0.06, p.x))
        p.y = Math.min(0.92, Math.max(0.08, p.y))

        if (p.growing) {
          p.life += 16
          if (p.life >= p.maxLife * 0.5) {
            p.growing = false
          }
        } else {
          p.life -= 8
          if (p.life <= 0) {
            fieldParticles[i] = makeFieldParticle()
            fieldParticles[i].life = 0
            fieldParticles[i].growing = true
          }
        }
      }
    }

    const drawOrbitalFrame = (moving: boolean) => {
      context.clearRect(0, 0, width, height)
      const { cx, cy, scale } = fieldCenter()
      const now = performance.now()

      for (let ring = 1; ring <= RING_COUNT; ring += 1) {
        const rr = ringRadius(ring)
        context.beginPath()
        context.ellipse(
          cx,
          cy,
          scale * rr,
          scale * rr * ORBIT_Y_FACTOR,
          0,
          0,
          Math.PI * 2,
        )
        context.strokeStyle = rgba(color, 0.12)
        context.lineWidth = RING_STROKE
        context.stroke()
      }

      if (moving) {
        maybeSpawnOrbitalEdge()
        for (let i = orbitalEdges.length - 1; i >= 0; i -= 1) {
          const edge = orbitalEdges[i]
          if (edge.growing) {
            edge.life += 16
            if (edge.life >= edge.maxLife * 0.45) {
              edge.growing = false
            }
          } else {
            edge.life -= 12
            if (edge.life <= 0) {
              orbitalEdges.splice(i, 1)
            }
          }
        }
      }

      updateCores(moving)

      for (const particle of cores) {
        const peak = particle.maxLife * 0.55
        const alpha =
          (particle.growing
            ? Math.min(1, particle.life / peak)
            : Math.max(0, particle.life / peak)) *
          (0.22 + (1 - particle.radius / 0.2) * 0.35)
        const { x, y } = coreXY(particle)
        context.beginPath()
        context.arc(x, y, particle.size, 0, Math.PI * 2)
        context.fillStyle = rgba(color, alpha)
        context.fill()
      }

      for (const edge of orbitalEdges) {
        const pa = nodeXY(orbitalNodes[edge.a])
        const pb = nodeXY(orbitalNodes[edge.b])
        const peak = edge.maxLife * 0.45
        const alpha =
          edge.growing
            ? Math.min(1, edge.life / peak) * edgeAlphaScale
            : Math.max(0, edge.life / peak) * edgeAlphaScale
        context.beginPath()
        context.moveTo(pa.x, pa.y)
        context.lineTo(pb.x, pb.y)
        context.strokeStyle = rgba(color, alpha)
        context.lineWidth = EDGE_STROKE
        context.stroke()
      }

      for (const node of orbitalNodes) {
        if (moving) {
          node.angle += node.speed * 16
        }
        const { x, y } = nodeXY(node)
        const pulse = 0.55 + Math.sin(now * 0.0015 + node.phase) * 0.25
        context.beginPath()
        context.arc(x, y, node.size, 0, Math.PI * 2)
        context.fillStyle = rgba(color, 0.48 + pulse * 0.35)
        context.fill()
      }

      const gradient = context.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        scale * 0.4,
      )
      gradient.addColorStop(0, rgba(color, 0.18))
      gradient.addColorStop(0.45, rgba(color, 0.06))
      gradient.addColorStop(1, rgba(color, 0))
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)
    }

    const drawExplorationFrame = (moving: boolean) => {
      context.clearRect(0, 0, width, height)
      if (width < 2 || height < 2) {
        return
      }
      const now = performance.now()
      const influence = Math.min(width, height) * 0.16

      if (moving) {
        maybeSpawnFieldEdge()
        maybeSpawnFieldEdge()
        if (
          pointerX >= 0 &&
          now - lastCursorEdgeAt > 320 &&
          Math.random() < 0.55
        ) {
          if (trySpawnFieldEdge(true)) {
            lastCursorEdgeAt = now
          }
        }

        for (let i = fieldEdges.length - 1; i >= 0; i -= 1) {
          const edge = fieldEdges[i]
          if (edge.growing) {
            edge.life += 16
            if (edge.life >= edge.maxLife * 0.4) {
              edge.growing = false
            }
          } else {
            edge.life -= 10
            if (edge.life <= 0) {
              fieldEdges.splice(i, 1)
            }
          }
        }
      }

      updateFieldParticles(moving)

      for (const edge of fieldEdges) {
        const pa = fieldXY(fieldParticles[edge.a])
        const pb = fieldXY(fieldParticles[edge.b])
        const peak = edge.maxLife * 0.4
        const alpha =
          (edge.growing
            ? Math.min(1, edge.life / peak)
            : Math.max(0, edge.life / peak)) * 0.55
        context.beginPath()
        context.moveTo(pa.x, pa.y)
        context.lineTo(pb.x, pb.y)
        context.strokeStyle = rgba(color, alpha)
        context.lineWidth = 1.15
        context.stroke()
      }

      for (const p of fieldParticles) {
        const peak = p.maxLife * 0.5
        let alpha =
          (p.growing
            ? Math.min(1, p.life / peak)
            : Math.max(0, p.life / peak)) * 0.62
        const { x, y } = fieldXY(p)
        if (pointerX >= 0) {
          const dist = Math.hypot(x - pointerX, y - pointerY)
          if (dist < influence) {
            alpha += ((influence - dist) / influence) * 0.28
          }
        }
        // Keep a readable floor so the field never goes blank.
        alpha = Math.max(0.22, Math.min(0.85, alpha))
        const pulse = 0.9 + Math.sin(now * 0.0012 + p.phase) * 0.12
        context.beginPath()
        context.arc(x, y, p.size * pulse, 0, Math.PI * 2)
        context.fillStyle = rgba(color, alpha)
        context.fill()
      }
    }

    const drawFrame = (moving: boolean) => {
      if (mode === 'exploration') {
        drawExplorationFrame(moving)
      } else {
        drawOrbitalFrame(moving)
      }
    }

    const loop = () => {
      if (!visible || !animate) {
        return
      }
      drawFrame(true)
      raf = window.requestAnimationFrame(loop)
    }

    const drawStatic = () => {
      if (mode === 'exploration') {
        fieldEdges.length = 0
        const cap = Math.min(8, fieldEdgeCap)
        for (let i = 0; i < cap; i += 1) {
          fieldEdges.push({
            a: i % fieldParticles.length,
            b: (i + 3) % fieldParticles.length,
            life: 700,
            maxLife: 1400,
            growing: false,
          })
        }
        for (const p of fieldParticles) {
          p.life = p.maxLife * 0.45
          p.growing = false
        }
      } else {
        orbitalEdges.length = 0
        for (let i = 0; i < Math.min(48, orbitalMaxEdges); i += 1) {
          orbitalEdges.push({
            a: i % orbitalNodes.length,
            b: (i + 2) % orbitalNodes.length,
            life: 800,
            maxLife: 1600,
            growing: false,
          })
        }
        for (const particle of cores) {
          particle.life = particle.maxLife * 0.4
          particle.growing = false
        }
      }
      drawFrame(false)
    }

    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      if (visible && animate) {
        raf = window.requestAnimationFrame(loop)
      } else {
        window.cancelAnimationFrame(raf)
      }
    }

    const onMotionChange = () => {
      animate = !reducedMotion.matches
      window.cancelAnimationFrame(raf)
      pointerX = -1
      pointerY = -1
      if (animate && visible) {
        raf = window.requestAnimationFrame(loop)
      } else {
        drawStatic()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!animate || mode !== 'exploration') {
        return
      }
      const parent = surface.parentElement
      if (!parent) {
        return
      }
      const rect = parent.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointerX = -1
      pointerY = -1
    }

    resize()
    // Seed a few incomplete clusters so the field is visible on first paint.
    if (mode === 'exploration' && width > 2) {
      for (let i = 0; i < Math.min(10, fieldEdgeCap); i += 1) {
        trySpawnFieldEdge(false)
      }
    }
    const observer = new ResizeObserver(() => {
      resize()
      if (!animate) {
        drawStatic()
      }
    })
    if (surface.parentElement) {
      observer.observe(surface.parentElement)
    }

    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    if (animate) {
      raf = window.requestAnimationFrame(loop)
    } else {
      drawStatic()
    }

    return () => {
      window.cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [density, layout, mode])

  return (
    <div
      className={['research-network-atmosphere', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
      data-atmosphere-mode={mode}
    >
      <canvas ref={canvasRef} className="research-network-atmosphere__canvas" />
    </div>
  )
}
