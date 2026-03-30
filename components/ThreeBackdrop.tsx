"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type OrbData = {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
};

function SceneCore({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const mainShape = useRef<THREE.Mesh>(null);

  const orbs = useMemo<OrbData[]>(
    () => [
      { position: [-2.4, 1.4, -1.8], scale: 0.42, color: "#5ea3ff", speed: 0.8 },
      { position: [2.3, -1.2, -1.3], scale: 0.56, color: "#ffb86b", speed: 1.1 },
      { position: [1.8, 1.8, -2.1], scale: 0.34, color: "#9ee493", speed: 0.7 },
      { position: [-1.5, -1.9, -2.4], scale: 0.3, color: "#f792c2", speed: 1.3 },
      { position: [0.1, 2.2, -1.6], scale: 0.26, color: "#8bd3dd", speed: 0.9 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!rig.current || !mainShape.current) {
      return;
    }

    const targetX = reducedMotion ? 0 : state.pointer.y * 0.22;
    const targetY = reducedMotion ? 0 : state.pointer.x * 0.22;

    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetX - progress * 0.05, 0.06);
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetY + progress * 0.4, 0.06);

    mainShape.current.rotation.x += delta * 0.12;
    mainShape.current.rotation.y += delta * 0.2;

    if (!reducedMotion) {
      rig.current.position.y = THREE.MathUtils.lerp(rig.current.position.y, -progress * 0.9, 0.04);
    }
  });

  return (
    <>
      <color attach="background" args={["#060a12"]} />
      <fog attach="fog" args={["#060a12", 4.2, 15]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 2]} intensity={1.1} color="#b8d7ff" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color="#ffcf96" />

      <group ref={rig}>
        <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.4}>
          <mesh ref={mainShape}>
            <icosahedronGeometry args={[1.35, 6]} />
            <meshPhysicalMaterial
              color="#c5ddff"
              roughness={0.15}
              metalness={0.3}
              transmission={0.65}
              thickness={0.9}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>
        </Float>

        {orbs.map((orb, index) => (
          <Float
            key={`orb-${index}`}
            speed={orb.speed}
            rotationIntensity={0.25}
            floatIntensity={0.5}
            position={orb.position}
          >
            <mesh scale={orb.scale}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={0.3} roughness={0.35} />
            </mesh>
          </Float>
        ))}

        <mesh position={[0, 0, -2.8]} rotation={[Math.PI / 3.4, 0, 0]}>
          <torusGeometry args={[3.1, 0.03, 20, 180]} />
          <meshBasicMaterial color="#9cb6d6" transparent opacity={0.35} />
        </mesh>
      </group>

      <Environment preset="city" />
    </>
  );
}

export default function ThreeBackdrop() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(151,196,255,0.22),transparent_38%),radial-gradient(circle_at_78%_72%,rgba(255,183,125,0.2),transparent_34%),linear-gradient(180deg,rgba(4,8,16,0.35),rgba(6,10,18,0.78))]" />
    </div>
  );
}