import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 2000 }) {
  const ref = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere-like shape with some clustering
      const radius = Math.random() * 4 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = radius * Math.cos(phi)

      sizes[i] = Math.random() * 1.5 + 0.5
    }

    return [positions, sizes]
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (ref.current) {
      // Slow organic rotation
      ref.current.rotation.y = time * 0.04
      ref.current.rotation.x = Math.sin(time * 0.02) * 0.1

      // Mouse parallax — subtle
      ref.current.rotation.y += state.mouse.x * 0.002
      ref.current.rotation.x += state.mouse.y * 0.002
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6EE7F7"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function RingAccent() {
  const ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.z = time * 0.08
      ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.1) * 0.1
    }
  })

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 256; i++) {
      const angle = (i / 256) * Math.PI * 2
      const r = 2.8 + Math.sin(i * 0.3) * 0.05
      pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
    }
    return pts
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#6EE7F7" transparent opacity={0.12} />
    </line>
  )
}

export default function Scene({ reducedMotion = false }) {
  const particleCount = reducedMotion ? 600 : 2000

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField count={particleCount} />
      <RingAccent />
    </Canvas>
  )
}
