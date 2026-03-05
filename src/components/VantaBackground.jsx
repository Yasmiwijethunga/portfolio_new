import { useEffect, useRef } from 'react'

/**
 * VantaBackground — pure-canvas NET particle animation.
 * No external deps, no import issues. Mimics Vanta NET exactly.
 */
const VantaBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight

    // ── resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // ── mouse ────────────────────────────────────────────────────────────────
    const mouse = { x: W / 2, y: H / 2 }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    // ── particles ────────────────────────────────────────────────────────────
    const COUNT   = 80
    const CONNECT = 160          // max px distance for a line
    const SPEED   = 0.4

    const particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 2 + 1.5,
    }))

    // ── draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // background
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, W, H)

      // update positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        // subtle pull toward mouse
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 250) {
          p.x += dx * 0.0012
          p.y += dy * 0.0012
        }
      }

      // draw lines between close particles
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT) {
            const alpha = (1 - dist / CONNECT) * 0.55
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`
            ctx.lineWidth   = 0.8
            ctx.stroke()
          }
        }
      }

      // draw dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(96,165,250,0.8)'
        ctx.shadowBlur  = 6
        ctx.shadowColor = '#3b82f6'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:   'absolute',
        inset:      0,
        width:      '100%',
        height:     '100%',
        display:    'block',
        background: '#0f172a',
        zIndex:     0,
      }}
    />
  )
}

export default VantaBackground




