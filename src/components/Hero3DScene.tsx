"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function LarkMark() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.25, 0]} />
      <meshStandardMaterial color="#f7d58b" roughness={0.25} metalness={0.15} />
    </mesh>
  );
}

export default function Hero3DScene() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 52 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={1.2} />
        <LarkMark />
      </Canvas>
    </div>
  );
}
