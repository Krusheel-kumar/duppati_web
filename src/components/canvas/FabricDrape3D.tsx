"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface FabricMeshProps {
  palette: "indigo" | "terracotta" | "rose" | "ivory";
}

const PALETTE_CONFIGS = {
  indigo: {
    color: "#1e3a8a",
    specular: "#60a5fa",
    wire: "#93c5fd",
    roughness: 0.35,
    metalness: 0.25,
    sparkleColor: "#93c5fd",
  },
  terracotta: {
    color: "#b45309",
    specular: "#f59e0b",
    wire: "#fde68a",
    roughness: 0.4,
    metalness: 0.15,
    sparkleColor: "#fde68a",
  },
  rose: {
    color: "#9d174d",
    specular: "#f472b6",
    wire: "#fbcfe8",
    roughness: 0.3,
    metalness: 0.3,
    sparkleColor: "#fbcfe8",
  },
  ivory: {
    color: "#e2e8f0",
    specular: "#fef08a",
    wire: "#cbd5e1",
    roughness: 0.5,
    metalness: 0.1,
    sparkleColor: "#fef08a",
  },
};

function WavingFabric({ palette }: FabricMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const config = PALETTE_CONFIGS[palette];

  const grid = useMemo(() => {
    const geo = new THREE.PlaneGeometry(3.6, 2.6, 40, 30);
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const position = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const u = position.getX(i);
      const v = position.getY(i);
      // Fluid wave simulation mimicking silk / mulmul cotton drape
      const waveX = Math.sin(u * 1.8 + time * 1.6) * 0.22;
      const waveY = Math.cos(v * 2.2 + time * 1.4) * 0.18;
      const ripple = Math.sin((u + v) * 2.5 + time * 2.0) * 0.08;
      position.setZ(i, waveX + waveY + ripple);
    }
    position.needsUpdate = true;

    // Smooth hover tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.pointer.x * 0.25,
      delta * 2
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -state.pointer.y * 0.25,
      delta * 2
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={grid} castShadow receiveShadow>
        <meshStandardMaterial
          color={config.color}
          roughness={config.roughness}
          metalness={config.metalness}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function FabricDrape3D() {
  const [currentPalette, setCurrentPalette] = useState<"indigo" | "terracotta" | "rose" | "ivory">(
    "indigo"
  );

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#f8f6f0] via-[#f1ede2] to-[#e8e2d2] border border-[#e2d9c8] shadow-xl">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 5]} intensity={2.2} color="#fffbeb" />
        <directionalLight position={[-6, -4, -3]} intensity={0.9} color="#e0f2fe" />
        <pointLight position={[0, 2, 3]} intensity={1.4} color="#fef08a" />

        <WavingFabric palette={currentPalette} />

        <Sparkles
          count={40}
          scale={5}
          size={2}
          speed={0.4}
          opacity={0.6}
          color={PALETTE_CONFIGS[currentPalette].sparkleColor}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.4}
          maxAzimuthAngle={Math.PI / 5}
          minAzimuthAngle={-Math.PI / 5}
        />
      </Canvas>

      {/* Floating Badge Header */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-stone-200/80 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
          <span className="text-xs font-serif font-medium text-stone-800 tracking-wide">
            Interactive Mulmul Silk Drape Simulation
          </span>
        </div>
      </div>

      {/* Interactive Swatch Selector on 3D Canvas */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-md">
        <span className="text-[11px] font-sans uppercase tracking-wider text-stone-500 mr-1 hidden sm:inline">
          Dye Tone:
        </span>
        <button
          onClick={() => setCurrentPalette("indigo")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition ${
            currentPalette === "indigo"
              ? "bg-[#1e3a8a] text-white shadow-sm font-medium"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] border border-white" />
          Royal Indigo
        </button>
        <button
          onClick={() => setCurrentPalette("terracotta")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition ${
            currentPalette === "terracotta"
              ? "bg-[#b45309] text-white shadow-sm font-medium"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#b45309] border border-white" />
          Terracotta
        </button>
        <button
          onClick={() => setCurrentPalette("rose")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition ${
            currentPalette === "rose"
              ? "bg-[#9d174d] text-white shadow-sm font-medium"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#9d174d] border border-white" />
          Rani Pink
        </button>
        <button
          onClick={() => setCurrentPalette("ivory")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition ${
            currentPalette === "ivory"
              ? "bg-stone-800 text-white shadow-sm font-medium"
              : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#f8fafc] border border-stone-400" />
          Ivory
        </button>
      </div>
    </div>
  );
}
