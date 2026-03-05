import { useEffect, useRef } from 'react'

/**
 * CursorEffect
 * ─────────────────────────────────────────────
 * Two layered effects:
 *  1. Smooth radial cursor glow  (lerp-chased, mix-blend-mode: screen)
 *  2. Bubble particles on mousemove (canvas-based, RAF-driven)
 *
 * Desktop only – both effects are disabled on touch/mobile devices.
 */
const CursorEffect = () => {
  const glowRef   = useRef(null)  // the glow div
  const canvasRef = useRef(null)  // particle canvas
  const rafRef    = useRef(null)

  useEffect(() => {
    // ── Bail out on touch devices ──
    if (window.matchMedia('(hover: none)').matches) return

    const glow   = glowRef.current
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // ── Resize canvas to viewport ──
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Shared cursor position ──
    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2

    // ── Glow lerp state ──
    let glowX = mx
    let glowY = my
    const LERP = 0.08  // 0–1, lower = lazier follow

    // ── Particle pool ──
    const MAX_PARTICLES = 60
    const particles     = []

    let throttle = 0   // mousemove throttle counter

    // ── Particle factory ──
    const spawnParticle = (x, y) => {
      if (particles.length >= MAX_PARTICLES) return
      const size    = 3 + Math.random() * 5          // 3–8 px radius
      const opacity = 0.2 + Math.random() * 0.3      // 0.2–0.5
      const angle   = Math.random() * Math.PI * 2
      const speed   = 0.4 + Math.random() * 0.6      // px per frame
      const life    = 700 + Math.random() * 300       // ms

      particles.push({
        x,
        y,
        size,
        opacity,
        baseOpacity: opacity,
        vx: Math.cos(angle) * speed * 0.5,
        vy: -speed,                                   // float upward
        born: performance.now(),
        life,
      })
    }

    // ── mousemove handler ──
    const onMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY

      // Throttle: spawn roughly every 3rd event
      throttle++
      if (throttle % 3 !== 0) return
      spawnParticle(mx, my)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Main RAF loop ──
    const loop = (now) => {
      // — Lerp glow toward cursor —
      glowX += (mx - glowX) * LERP
      glowY += (my - glowY) * LERP
      if (glow) {
        glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`
      }

      // — Clear canvas —
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // — Update & draw particles —
      for (let i = particles.length - 1; i >= 0; i--) {
        const p        = particles[i]
        const elapsed  = now - p.born
        const progress = elapsed / p.life            // 0→1

        if (progress >= 1) {
          particles.splice(i, 1)
          continue
        }

        // Ease-out fade
        const eased = 1 - progress * progress
        p.opacity = p.baseOpacity * eased

        p.x += p.vx
        p.y += p.vy

        // Draw bubble
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)

        // Soft glow via shadow
        ctx.shadowBlur  = p.size * 3
        ctx.shadowColor = `rgba(59, 130, 246, ${p.opacity * 0.8})`

        // Semi-transparent fill
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`
        ctx.fill()

        // Thin bright rim
        ctx.strokeStyle = `rgba(147, 197, 253, ${p.opacity * 0.6})`
        ctx.lineWidth   = 0.5
        ctx.stroke()
        ctx.shadowBlur  = 0
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* ── Radial cursor glow ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          '480px',
          height:         '480px',
          borderRadius:   '50%',
          pointerEvents:  'none',
          zIndex:         9998,
          background:
            'radial-gradient(circle, rgba(37,99,235,0.13) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)',
          mixBlendMode:   'screen',
          filter:         'blur(2px)',
          willChange:     'transform',
        }}
      />

      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          zIndex:        9999,
        }}
      />
    </>
  )
}

export default CursorEffect
