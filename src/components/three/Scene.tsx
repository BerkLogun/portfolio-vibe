'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated floating particles
const Particles = ({ count = 100, color = '#8352FD' }) => {
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  // Create a new array of random positions
  const dummy = new THREE.Object3D()
  const particles = Array.from({ length: count }, () => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ],
    scale: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.01 + 0.002
  }))

  useFrame(() => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const t = Date.now() * particle.speed
        const [x, y, z] = particle.position
        
        dummy.position.set(
          x + Math.sin(t / 1000) * 2,
          y + Math.cos(t / 1000) * 2,
          z + Math.sin(t / 1000) * 2
        )
        dummy.scale.set(particle.scale, particle.scale, particle.scale)
        dummy.updateMatrix()
        
        if (mesh.current) {
          mesh.current.setMatrixAt(i, dummy.matrix)
        }
      })
      
      if (mesh.current) {
        mesh.current.instanceMatrix.needsUpdate = true
      }
    }
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  )
}

// Animated blob
const AnimatedBlob = ({ position = [0, 0, 0], color = '#8352FD' }) => {
  const blobRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (blobRef.current) {
      blobRef.current.rotation.y = clock.getElapsedTime() * 0.1
      blobRef.current.rotation.z = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Sphere args={[1.5, 64, 64]} position={position as [number, number, number]} ref={blobRef}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

// Main scene component
const Scene = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedBlob position={[0, 0, 0]} color="#8352FD" />
        <Particles count={200} color="#ffffff" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

export default Scene 