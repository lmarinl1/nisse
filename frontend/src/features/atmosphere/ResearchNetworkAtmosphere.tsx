import { useEffect, useRef } from 'react'
import './research-network-atmosphere.css'

type Density = 'sparse' | 'medium'
type Layout = 'study' | 'auth'

type Props = {
  className?: string
  density?: Density
  layout?: Layout
  variant?: 'orbital'
}

type Node = {
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

const RING_COUNT = 9
const RING_INNER = 0.12
const RING_STEP = 0.085
const OUTER_RING = RING_INNER + (RING_COUNT - 1) * RING_STEP
const RING_STROKE = 0.65
const EDGE_STROKE = 0.7
const FIELD_SCALE = 0.6
/** Vertical squash on orbital ellipses — used when converting ring step to pixels. */
const ORBIT_Y_FACTOR = 0.92

const LAYOUT_CENTER: Record<Layout, { x: number; y: number }> = {
  study: { x: 0.62, y: 0.48 },
  auth: { x: 0.5, y: 0.46 },
}

function nodeCount(density: Density): number {
  // ×3 vs pre-micro densification; sparse/medium ratio preserved.
  return density === 'medium' ? 264 : 216
}

function extraOrbitalCount(density: Density): number {
  return density === 'medium' ? 54 : 42
}

function coreParticleCount(density: Density): number {
  // Mild bump over prior micro-node nucleus (~+25%).
  return density === 'medium' ? 180 : 140
}

function maxEdgeCount(density: Density): number {
  return density === 'medium' ? 156 : 126
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

function makeNodeOnRing(ring: number): Node {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: ringRadius(ring) + Math.random() * 0.03,
    speed:
      (0.00007 + Math.random() * 0.00011) * (Math.random() > 0.5 ? 1 : -1),
    size: 0.53 + Math.random() * 0.73,
    phase: Math.random() * Math.PI * 2,
  }
}

/** Rings 1–2 get ×5 of a fair per-ring share; remaining fill rings 3–9. */
function buildOrbitalNodes(density: Density): Node[] {
  const n = nodeCount(density)
  const fair = fairSharePerRing(density)
  const innerPerRing = fair * 5
  const nodes: Node[] = []
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

function makeExtraOrbitalNode(i: number): Node {
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
    // Tighter nucleus for denser center dust.
    radius: 0.012 + Math.pow(Math.random(), 2.1) * 0.14,
    speed: (0.0001 + Math.random() * 0.00018) * (Math.random() > 0.5 ? 1 : -1),
    size: 0.27 + Math.random() * 0.53,
    phase: Math.random() * Math.PI * 2,
    life: Math.random() * 600,
    maxLife: 1400 + Math.random() * 2200,
    growing: Math.random() > 0.35,
  }
}

/**
 * Contemplative orbital network atmosphere.
 * Non-interactive background motif for Speculative Research surfaces.
 */
export function ResearchNetworkAtmosphere({
  className,
  density = 'sparse',
  layout = 'study',
  variant = 'orbital',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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
    let color = brightenDiscovery(
      parseCssColor(
        getComputedStyle(surface).getPropertyValue('--color-discovery-primary') ||
          '#e8c547',
      ),
    )

    const center = LAYOUT_CENTER[layout]
    const orbital = buildOrbitalNodes(density)
    const extras = Array.from({ length: extraOrbitalCount(density) }, (_, i) =>
      makeExtraOrbitalNode(i),
    )
    const nodes: Node[] = [...orbital, ...extras]
    const cores: CoreParticle[] = Array.from(
      { length: coreParticleCount(density) },
      () => makeCoreParticle(),
    )
    const edges: Edge[] = []
    const maxEdges = maxEdgeCount(density)
    const edgeAlphaScale = layout === 'auth' ? 0.55 : 0.65

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
      color = brightenDiscovery(
        parseCssColor(
          getComputedStyle(surface).getPropertyValue(
            '--color-discovery-primary',
          ) || '#e8c547',
        ),
      )
    }

    const nodeXY = (node: Node) => {
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

    /** Max edge length = radial distance between two consecutive orbits. */
    const maxEdgeLengthPx = () => fieldCenter().scale * RING_STEP

    const trySpawnOneEdge = () => {
      if (edges.length >= maxEdges) {
        return false
      }
      const a = Math.floor(Math.random() * nodes.length)
      let b = Math.floor(Math.random() * nodes.length)
      if (a === b) {
        b = (b + 1) % nodes.length
      }
      const pa = nodeXY(nodes[a])
      const pb = nodeXY(nodes[b])
      const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y)
      if (dist > maxEdgeLengthPx()) {
        return false
      }
      edges.push({
        a,
        b,
        life: 0,
        maxLife: 1600 + Math.random() * 2400,
        growing: true,
      })
      return true
    }

    const maybeSpawnEdge = () => {
      // More attempts: short inter-orbit edges reject often; keep the concurrent cap filled.
      for (let attempt = 0; attempt < 6; attempt += 1) {
        if (edges.length >= maxEdges) {
          break
        }
        if (Math.random() > 0.35) {
          continue
        }
        trySpawnOneEdge()
      }
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

    const drawFrame = (moving: boolean) => {
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
        maybeSpawnEdge()
        for (let i = edges.length - 1; i >= 0; i -= 1) {
          const edge = edges[i]
          if (edge.growing) {
            edge.life += 16
            if (edge.life >= edge.maxLife * 0.45) {
              edge.growing = false
            }
          } else {
            edge.life -= 12
            if (edge.life <= 0) {
              edges.splice(i, 1)
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

      for (const edge of edges) {
        const pa = nodeXY(nodes[edge.a])
        const pb = nodeXY(nodes[edge.b])
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

      for (const node of nodes) {
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

    const loop = () => {
      if (!visible || !animate) {
        return
      }
      drawFrame(true)
      raf = window.requestAnimationFrame(loop)
    }

    const drawStatic = () => {
      edges.length = 0
      for (let i = 0; i < Math.min(48, maxEdges); i += 1) {
        edges.push({
          a: i % nodes.length,
          b: (i + 2) % nodes.length,
          life: 800,
          maxLife: 1600,
          growing: false,
        })
      }
      for (const particle of cores) {
        particle.life = particle.maxLife * 0.4
        particle.growing = false
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
      if (animate && visible) {
        raf = window.requestAnimationFrame(loop)
      } else {
        drawStatic()
      }
    }

    resize()
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
    }
  }, [density, layout])

  return (
    <div
      className={['research-network-atmosphere', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="research-network-atmosphere__canvas" />
    </div>
  )
}
