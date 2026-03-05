import { useRef, useState, useEffect, Component, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// ── Detect WebGL support ─────────────────────────────────────────────────────
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// ── Error boundary ───────────────────────────────────────────────────────────
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// ── CSS fallback ─────────────────────────────────────────────────────────────
const CSSFallback = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <motion.div
      className="absolute w-96 h-96 rounded-full bg-primary-600/20 filter blur-3xl"
      style={{ top: '10%', left: '60%' }}
      animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-80 h-80 rounded-full bg-blue-700/20 filter blur-3xl"
      style={{ top: '50%', left: '10%' }}
      animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-64 h-64 rounded-full bg-indigo-500/15 filter blur-3xl"
      style={{ bottom: '10%', right: '20%' }}
      animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
)

// ── Mouse-reactive camera rig ────────────────────────────────────────────────
const CameraRig = () => {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.03
    camera.position.y += (-mouse.current.y * 1.0 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Distorted sphere ─────────────────────────────────────────────────────────
const AnimatedSphere = ({ position, scale, color, speed = 2, distort = 0.35 }) => {
  const meshRef = useRef(null)
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.08
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.12
  })
  return (
    <Sphere ref={meshRef} position={position} scale={scale} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        distort={distort}
        speed={speed}
        transparent
        opacity={0.85}
        wireframe={false}
      />
    </Sphere>
  )
}

// ── Rotating torus ring ───────────────────────────────────────────────────────
const AnimatedTorus = ({ position, color }) => {
  const meshRef = useRef(null)
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.22
  })
  return (
    <Torus ref={meshRef} position={position} args={[2.2, 0.08, 16, 120]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.35}
      />
    </Torus>
  )
}

// ── Floating particle field ───────────────────────────────────────────────────
const Particles = ({ count = 120 }) => {
  const meshRef = useRef(null)

  const [positions, sizes] = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const size = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      size[i]        = Math.random() * 0.06 + 0.02
    }
    return [pos, size]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.015
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.008
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]}     />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

// ── Full scene ────────────────────────────────────────────────────────────────
const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 16], fov: 50 }}
    gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
    style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    onCreated={({ gl }) => gl.setClearColor('#0f172a', 0)}
  >
    <CameraRig />
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]}   intensity={1.2} color="#3b82f6" />
    <pointLight position={[-10, -8, 8]}   intensity={0.7} color="#1e40af" />
    <pointLight position={[0, -12, -4]}   intensity={0.4} color="#6366f1" />

    {/* Main focal spheres */}
    <AnimatedSphere position={[3.5, 2, -1]}  scale={2.4} color="#2563eb" speed={1.8} distort={0.4} />
    <AnimatedSphere position={[-4, -2, -3]}  scale={1.8} color="#1e40af" speed={2.2} distort={0.3} />
    <AnimatedSphere position={[1.5, -3.5, 1]} scale={1.2} color="#3b82f6" speed={2.8} distort={0.45}/>
    <AnimatedSphere position={[-2.5, 3, -2]} scale={0.9} color="#60a5fa" speed={3}   distort={0.5} />

    {/* Torus accent rings */}
    <AnimatedTorus position={[3, 1, -2]}  color="#3b82f6" />
    <AnimatedTorus position={[-3, -1, 0]} color="#6366f1" />

    {/* Particle field */}
    <Particles count={140} />
  </Canvas>
)

// ── Main export ───────────────────────────────────────────────────────────────
const Background3D = () => {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    setWebglSupported(isWebGLAvailable())
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      {webglSupported ? (
        <WebGLErrorBoundary fallback={<CSSFallback />}>
          <ThreeScene />
        </WebGLErrorBoundary>
      ) : (
        <CSSFallback />
      )}
    </div>
  )
}

export default Background3D

