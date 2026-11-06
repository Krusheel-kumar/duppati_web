"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;
const PARTICLE_POSITIONS = (() => {
  const coords = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    coords[i * 3] = Math.sin(i * 12.9898 + 1) * 7.5;
    coords[i * 3 + 1] = Math.cos(i * 78.233 + 2) * 7.5;
    coords[i * 3 + 2] = Math.sin(i * 45.164 + 3) * 7.5;
  }
  return coords;
})();

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = PARTICLE_POSITIONS;

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      // Interactive subtle mouse parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        state.pointer.x * 0.8,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        state.pointer.y * 0.8,
        0.05
      );
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.15}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-[450px] relative pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={2.5} color="#c084fc" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#38bdf8" />

        <Suspense fallback={null}>
          <ParticleField />
          <FloatingOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
