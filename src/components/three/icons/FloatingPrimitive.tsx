
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingPrimitiveProps {
  position?: [number, number, number];
  color?: string;
  primitive: "cube" | "sphere" | "torus";
}

export function FloatingPrimitive({ position = [0, 0, 0], color = "#00559A", primitive = "cube" }: FloatingPrimitiveProps) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      {primitive === "cube" && <boxGeometry args={[0.8, 0.8, 0.8]} />}
      {primitive === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {primitive === "torus" && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}
