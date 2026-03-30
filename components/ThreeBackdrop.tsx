"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Ambient particle cloud ─────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 900;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#8b5cf6"),  // violet
      new THREE.Color("#06b6d4"),  // cyan
      new THREE.Color("#d946ef"),  // fuchsia
      new THREE.Color("#f59e0b"),  // amber
      new THREE.Color("#4f8eff"),  // blue
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.022;
      ref.current.rotation.x += delta * 0.007;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── DNA double helix ────────────────────────────────────────────────────────
function DNAHelix({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const count = 100;

  const [geo1, geo2, connGeo] = useMemo(() => {
    const pos1 = new Float32Array(count * 3);
    const pos2 = new Float32Array(count * 3);
    const connArr: number[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const r = 0.65;
      const y = (i / count) * 5 - 2.5;
      pos1[i * 3]     = Math.cos(t) * r;
      pos1[i * 3 + 1] = y;
      pos1[i * 3 + 2] = Math.sin(t) * r;
      pos2[i * 3]     = Math.cos(t + Math.PI) * r;
      pos2[i * 3 + 1] = y;
      pos2[i * 3 + 2] = Math.sin(t + Math.PI) * r;
      if (i % 8 === 0) {
        connArr.push(
          Math.cos(t) * r, y, Math.sin(t) * r,
          Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r,
        );
      }
    }
    const g1 = new THREE.BufferGeometry();
    g1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));
    const g2 = new THREE.BufferGeometry();
    g2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    const gC = new THREE.BufferGeometry();
    gC.setAttribute("position", new THREE.BufferAttribute(new Float32Array(connArr), 3));
    return [g1, g2, gC];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.55;
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        -progress * 1.8,
        0.05,
      );
    }
  });

  return (
    <group ref={ref} position={[-3.2, 0.5, -4.5]}>
      <points geometry={geo1}>
        <pointsMaterial size={0.07} color="#06b6d4" transparent opacity={0.85} sizeAttenuation />
      </points>
      <points geometry={geo2}>
        <pointsMaterial size={0.07} color="#d946ef" transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments geometry={connGeo}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

// ─── Spinning wireframe cube ─────────────────────────────────────────────────
function WireframeCube({
  position,
  speed,
  scale,
  color = "#8b5cf6",
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.4;
      ref.current.rotation.y += delta * speed * 0.6;
      ref.current.rotation.z += delta * speed * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

// ─── Animated orbit ring ─────────────────────────────────────────────────────
function OrbitRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const t = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
    t.current += delta * speed * 2;
    if (dotRef.current) {
      dotRef.current.position.x = Math.cos(t.current) * radius;
      dotRef.current.position.z = Math.sin(t.current) * radius;
    }
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.015, 12, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.30} />
      </mesh>
      {/* Orbiting glowing dot */}
      <mesh ref={dotRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

// ─── Core scene ──────────────────────────────────────────────────────────────
type OrbData = {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
};

function SceneCore({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const rig       = useRef<THREE.Group>(null);
  const mainShape = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const orbs = useMemo<OrbData[]>(
    () => [
      { position: [-2.4,  1.4, -1.8], scale: 0.38, color: "#8b5cf6", speed: 0.8 },
      { position: [ 2.3, -1.2, -1.3], scale: 0.52, color: "#f59e0b", speed: 1.1 },
      { position: [ 1.8,  1.8, -2.1], scale: 0.30, color: "#06b6d4", speed: 0.7 },
      { position: [-1.5, -1.9, -2.4], scale: 0.28, color: "#d946ef", speed: 1.3 },
      { position: [ 0.1,  2.2, -1.6], scale: 0.22, color: "#10b981", speed: 0.9 },
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!rig.current || !mainShape.current) return;

    const targetX = reducedMotion ? 0 : state.pointer.y * 0.22;
    const targetY = reducedMotion ? 0 : state.pointer.x * 0.22;

    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x, targetX - progress * 0.05, 0.06,
    );
    rig.current.rotation.y = THREE.MathUtils.lerp(
      rig.current.rotation.y, targetY + progress * 0.4, 0.06,
    );

    mainShape.current.rotation.x += delta * 0.10;
    mainShape.current.rotation.y += delta * 0.18;

    if (!reducedMotion) {
      rig.current.position.y = THREE.MathUtils.lerp(
        rig.current.position.y, -progress * 0.9, 0.04,
      );
      // Scroll-driven camera zoom
      (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.lerp(
        (camera as THREE.PerspectiveCamera).position.z,
        6 - progress * 1.4,
        0.04,
      );
    }
  });

  return (
    <>
      <color attach="background" args={["#030712"]} />
      <fog attach="fog" args={["#030712", 5, 20]} />

      {/* Rich neon lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 2]} intensity={1.0} color="#c4b5fd" />
      <pointLight position={[-3, -2, 2]} intensity={1.6} color="#f59e0b" distance={12} />
      <pointLight position={[3,  3, -2]} intensity={1.0} color="#8b5cf6" distance={10} />
      <pointLight position={[0, -4,  3]} intensity={0.8} color="#06b6d4" distance={10} />
      <pointLight position={[-2, 2,  4]} intensity={0.6} color="#d946ef" distance={8}  />

      {/* Background particles */}
      {!reducedMotion && <ParticleField />}

      {/* DNA helix */}
      {!reducedMotion && <DNAHelix progress={progress} />}

      {/* Wireframe accent cubes */}
      {!reducedMotion && (
        <>
          <WireframeCube position={[ 3.8, -1.5, -3.5]} speed={0.50} scale={0.60} color="#8b5cf6" />
          <WireframeCube position={[-4.0,  2.0, -5.0]} speed={0.35} scale={0.80} color="#06b6d4" />
          <WireframeCube position={[ 4.5,  2.5, -6.0]} speed={0.45} scale={0.50} color="#d946ef" />
        </>
      )}

      <group ref={rig}>
        {/* Main glass icosahedron */}
        <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.4}>
          <mesh ref={mainShape}>
            <icosahedronGeometry args={[1.35, 6]} />
            <meshPhysicalMaterial
              color="#c4b5fd"
              roughness={0.08}
              metalness={0.40}
              transmission={0.65}
              thickness={1.20}
              clearcoat={1}
              clearcoatRoughness={0.04}
              envMapIntensity={1.4}
            />
          </mesh>
        </Float>

        {/* Outer wireframe shell */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh>
            <icosahedronGeometry args={[1.7, 1]} />
            <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.10} />
          </mesh>
        </Float>

        {/* Floating orbs */}
        {orbs.map((orb, index) => (
          <Float
            key={`orb-${index}`}
            speed={orb.speed}
            rotationIntensity={0.25}
            floatIntensity={0.5}
            position={orb.position}
          >
            <mesh scale={orb.scale}>
              <sphereGeometry args={[1, 24, 24]} />
              <meshStandardMaterial
                color={orb.color}
                emissive={orb.color}
                emissiveIntensity={0.60}
                roughness={0.25}
                metalness={0.2}
              />
            </mesh>
          </Float>
        ))}

        {/* Animated orbit rings with glowing dots */}
        {!reducedMotion && (
          <>
            <OrbitRing
              radius={3.1}
              color="#8b5cf6"
              speed={0.28}
              tilt={[Math.PI / 3.4, 0, 0]}
            />
            <OrbitRing
              radius={2.5}
              color="#06b6d4"
              speed={0.40}
              tilt={[Math.PI / 2, Math.PI / 4, 0]}
            />
            <OrbitRing
              radius={3.7}
              color="#d946ef"
              speed={0.18}
              tilt={[0.3, Math.PI / 3, Math.PI / 6]}
            />
          </>
        )}
      </group>
    </>
  );
}

export default function ThreeBackdrop() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion   = () => setReducedMotion(media.matches);
    const updateProgress = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setProgress(window.scrollY / maxScroll);
    };

    updateMotion();
    updateProgress();
    media.addEventListener("change", updateMotion);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      media.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <SceneCore progress={progress} reducedMotion={reducedMotion} />
      </Canvas>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(139,92,246,0.14),transparent_35%),radial-gradient(circle_at_78%_72%,rgba(6,182,212,0.10),transparent_32%),linear-gradient(180deg,rgba(3,7,18,0.20),rgba(3,7,18,0.68))]" />
    </div>
  );
}