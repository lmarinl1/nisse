import { useEffect, useRef } from 'react'
import './research-network-atmosphere.css'

type Density = 'sparse' | 'medium'

type Props = {
  className?: string
  density?: Density
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

function nodeCount(density: Density): number {
  return density === 'medium' ? 64 : 48
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
  // Local draw boost toward a clearer lime without changing global tokens.
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

const FIELD_CENTER_X = 0.62
const FIELD_CENTER_Y = 0.48
/** ~60% of the shorter viewport side for the orbital field. */
const FIELD_SCALE = 0.6

/**
 * Contemplative orbital network atmosphere.
 * Non-interactive background motif for Speculative Research surfaces.
 */
export function ResearchNetworkAtmosphere({
  className,
  density = 'sparse',
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

    const count = nodeCount(density)
    const nodes: Node[] = Array.from({ length: count }, (_, i) => {
      const ring = (i % 5) + 1
      return {
        angle: Math.random() * Math.PI * 2,
        radius: 0.12 + ring * 0.12 + Math.random() * 0.04,
        speed: (0.00008 + Math.random() * 0.00012) * (i % 2 === 0 ? 1 : -1),
        size: 1.8 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
      }
    })
    const edges: Edge[] = []
    const maxEdges = density === 'medium' ? 36 : 24

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
      const cx = width * FIELD_CENTER_X
      const cy = height * FIELD_CENTER_Y
      const scale = Math.min(width, height) * FIELD_SCALE
      const wobble = Math.sin(performance.now() * 0.0004 + node.phase) * 0.012
      const r = (node.radius + wobble) * scale
      return {
        x: cx + Math.cos(node.angle) * r,
        y: cy + Math.sin(node.angle) * r * 0.92,
      }
    }

    const maybeSpawnEdge = () => {
      if (edges.length >= maxEdges || Math.random() > 0.045) {
        return
      }
      const a = Math.floor(Math.random() * nodes.length)
      let b = Math.floor(Math.random() * nodes.length)
      if (a === b) {
        b = (b + 1) % nodes.length
      }
      const pa = nodeXY(nodes[a])
      const pb = nodeXY(nodes[b])
      const dx = pa.x - pb.x
      const dy = pa.y - pb.y
      const dist = Math.hypot(dx, dy)
      if (dist > Math.min(width, height) * 0.38) {
        return
      }
      edges.push({
        a,
        b,
        life: 0,
        maxLife: 1800 + Math.random() * 2800,
        growing: true,
      })
    }

    const drawFrame = (moving: boolean) => {
      context.clearRect(0, 0, width, height)

      const cx = width * FIELD_CENTER_X
      const cy = height * FIELD_CENTER_Y
      const scale = Math.min(width, height) * FIELD_SCALE
      const now = performance.now()

      for (let ring = 1; ring <= 5; ring += 1) {
        context.beginPath()
        context.ellipse(
          cx,
          cy,
          scale * (0.12 + ring * 0.12),
          scale * (0.12 + ring * 0.12) * 0.92,
          0,
          0,
          Math.PI * 2,
        )
        context.strokeStyle = rgba(color, 0.16)
        context.lineWidth = 1.25
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

      for (const edge of edges) {
        const pa = nodeXY(nodes[edge.a])
        const pb = nodeXY(nodes[edge.b])
        const peak = edge.maxLife * 0.45
        const alpha =
          edge.growing
            ? Math.min(1, edge.life / peak) * 0.65
            : Math.max(0, edge.life / peak) * 0.65
        context.beginPath()
        context.moveTo(pa.x, pa.y)
        context.lineTo(pb.x, pb.y)
        context.strokeStyle = rgba(color, alpha)
        context.lineWidth = 1.25
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
        context.fillStyle = rgba(color, 0.5 + pulse * 0.35)
        context.fill()
      }

      const gradient = context.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        scale * 0.42,
      )
      gradient.addColorStop(0, rgba(color, 0.16))
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
      for (let i = 0; i < Math.min(10, maxEdges); i += 1) {
        edges.push({
          a: i,
          b: (i + 3) % nodes.length,
          life: 800,
          maxLife: 1600,
          growing: false,
        })
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
  }, [density])

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
