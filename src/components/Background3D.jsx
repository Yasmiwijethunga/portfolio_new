import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere = ({ position, scale, color }) => {
  const meshRef = useRef(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Sphere ref={meshRef} position={position} scale={scale} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        distort={0.3}
        speed={2}
        wireframe={false}
      />
    </Sphere>
  )
}

const Background3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2563EB" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#1e40af" />

        <AnimatedSphere position={[2, 2, 0]} scale={2} color="#2563EB" />
        <AnimatedSphere position={[-3, -2, -2]} scale={1.5} color="#1e40af" />
        <AnimatedSphere position={[1, -3, 1]} scale={1} color="#3b82f6" />
      </Canvas>
    </div>
  )
}

export default Background3D
