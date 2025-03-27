
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarIconProps {
  position?: [number, number, number];
  color?: string;
}

export function CarIcon({ position = [0, 0, 0], color = "#00559A" }: CarIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Car top */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[0.25, -0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, -0.12, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, -0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, -0.12, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}
