"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, type ShaderMaterial } from "three";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type HeroScene3DProps = {
  progress: number;
  particleCount: number;
  flatShader: boolean;
  cursorParallax: boolean;
};

type BirdData = {
  start: Float32Array;
  target: Float32Array;
  wing: Float32Array;
  delay: Float32Array;
};

const createBirdPoints = (count: number): BirdData => {
  const start = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const wing = new Float32Array(count);
  const delay = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const side = Math.random() > 0.5 ? 1 : -1;
    const t = Math.random();
    const bodyBias = Math.random();

    const spread = 2.4;
    start[i3] = (Math.random() - 0.5) * spread * 2.2;
    start[i3 + 1] = (Math.random() - 0.5) * spread * 1.6;
    start[i3 + 2] = (Math.random() - 0.5) * spread;

    let x = 0;
    let y = 0;
    let z = 0;

    if (bodyBias < 0.68) {
      x = side * (0.6 + t * 1.6);
      y = 0.35 + Math.sin(t * Math.PI) * 0.42 - t * 0.14;
      z = (Math.random() - 0.5) * 0.45;
      wing[i] = 1;
    } else {
      x = side * (Math.random() * 0.36);
      y = -0.22 + Math.random() * 0.55;
      z = (Math.random() - 0.5) * 0.55;
      wing[i] = 0;
    }

    if (Math.random() > 0.92) {
      x = side * (1.7 + Math.random() * 0.32);
      y = -0.25 + Math.random() * 0.2;
      wing[i] = 1;
    }

    target[i3] = x;
    target[i3 + 1] = y;
    target[i3 + 2] = z;
    delay[i] = Math.random() * 0.6 - 0.3;
  }

  return { start, target, wing, delay };
};

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function ParticleBird({
  progress,
  particleCount,
  flatShader,
  cursorParallax,
}: HeroScene3DProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const startedAt = useRef<number | null>(null);

  const data = useMemo(() => createBirdPoints(particleCount), [particleCount]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.start.slice(0), 3));
    g.setAttribute("aTarget", new THREE.BufferAttribute(data.target, 3));
    g.setAttribute("aWing", new THREE.BufferAttribute(data.wing, 1));
    g.setAttribute("aDelay", new THREE.BufferAttribute(data.delay, 1));
    return g;
  }, [data]);

  useFrame((state) => {
    if (!startedAt.current) startedAt.current = state.clock.getElapsedTime();

    const elapsed = state.clock.getElapsedTime() - startedAt.current;
    const assemblyDuration = 2.5;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const targetAttr = geometry.getAttribute("aTarget") as THREE.BufferAttribute;
    const wingAttr = geometry.getAttribute("aWing") as THREE.BufferAttribute;
    const delayAttr = geometry.getAttribute("aDelay") as THREE.BufferAttribute;

    for (let i = 0; i < attr.count; i += 1) {
      const d = delayAttr.getX(i);
      const t = Math.min(1, Math.max(0, (elapsed - d) / assemblyDuration));
      const eased = easeOutCubic(t);

      const sx = data.start[i * 3];
      const sy = data.start[i * 3 + 1];
      const sz = data.start[i * 3 + 2];
      const tx = targetAttr.getX(i);
      const ty = targetAttr.getY(i);
      const tz = targetAttr.getZ(i);

      const wingOffset = t >= 1 ? Math.sin(state.clock.elapsedTime * 1.65 + tx * 1.4) * 0.04 * wingAttr.getX(i) : 0;

      attr.setXYZ(
        i,
        sx + (tx - sx) * eased,
        sy + (ty - sy) * eased + wingOffset,
        sz + (tz - sz) * eased,
      );
    }

    attr.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uAssembled.value = Math.min(1, elapsed / assemblyDuration);
      materialRef.current.uniforms.uProgress.value = progress;
    }

    state.camera.position.y = 0.25 + progress * 0.9;
    state.camera.position.z = 4.4 + progress * 1.8;
    if ("fov" in state.camera) {
      state.camera.fov = 39 + progress * 8;
      state.camera.updateProjectionMatrix();
    }

    if (groupRef.current && cursorParallax) {
      const rx = ((state.pointer.y * -1) * Math.PI) / 24;
      const ry = (state.pointer.x * Math.PI) / 24;
      groupRef.current.rotation.x = rx;
      groupRef.current.rotation.y = ry;
    }
  });

  return (
    <group ref={groupRef} position={[-0.8, 0.12, 0]}>
      <mesh position={[0, -0.15, -2.2]}>
        <planeGeometry args={[16, 10]} />
        <shaderMaterial
          uniforms={{
            uProgress: { value: progress },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uProgress;
            vec3 c1 = vec3(0.070, 0.102, 0.227);
            vec3 c2 = vec3(0.184, 0.365, 0.341);
            vec3 c3 = vec3(0.969, 0.662, 0.247);
            void main() {
              float blend = smoothstep(0.0, 1.0, uProgress);
              vec3 top = mix(c1, c2, blend);
              float horizon = smoothstep(0.65, 0.1, vUv.y);
              vec3 color = mix(top, mix(c2, c3, 0.35), horizon * 0.5);
              gl_FragColor = vec4(color, 0.98);
            }
          `}
        />
      </mesh>
      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uAssembled: { value: 0 },
            uProgress: { value: progress },
            uColor: { value: new Color("#E8A93F") },
          }}
          vertexShader={`
            attribute float aWing;
            varying float vWing;
            varying float vAssembled;
            uniform float uAssembled;
            void main() {
              vWing = aWing;
              vAssembled = uAssembled;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = ${flatShader ? "2.6" : "4.2"} * (350.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            varying float vAssembled;
            void main() {
              vec2 p = gl_PointCoord - vec2(0.5);
              float dist = dot(p, p);
              float alpha = ${flatShader ? "step(dist, 0.25)" : "smoothstep(0.25, 0.01, dist)"};
              vec3 color = uColor * (0.75 + vAssembled * 0.35);
              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}

export default function HeroScene3D(props: HeroScene3DProps) {
  return (
    <Canvas aria-hidden="true" camera={{ position: [0, 0.2, 4.4], fov: 39 }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, -1, 2]} intensity={0.3} />
      <ParticleBird {...props} />
    </Canvas>
  );
}
