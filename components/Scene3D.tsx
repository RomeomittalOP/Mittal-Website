"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      // mouse parallax
      const px = state.pointer.x;
      const py = state.pointer.y;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, py * 0.5, 0.06);
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, px * 0.4, 0.06);
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.35;
      wire.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
        <Icosahedron args={[1.45, 12]}>
          <MeshDistortMaterial
            color="#cdd1da"
            roughness={0.2}
            metalness={0.75}
            distort={0.4}
            speed={1.7}
            envMapIntensity={1}
          />
        </Icosahedron>
        <mesh ref={wire} scale={1.72}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={2.6} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={1.8} color="#aeb6cc" />
      <pointLight position={[3, -3, 2]} intensity={1.1} color="#ffffff" />
      <Blob />
      <Sparkles count={70} scale={7} size={2.2} speed={0.4} opacity={0.5} color="#ffffff" />
    </Canvas>
  );
}
