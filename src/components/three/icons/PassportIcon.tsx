
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PassportIconProps {
  position?: [number, number, number];
  color?: string;
}

export function PassportIcon({ position = [0, 0, 0], color = "#00559A" }: PassportIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Passport base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Passport cover design */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.6, 0.8, 0.01]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Emblem */}
      <mesh position={[0, 0.2, 0.07]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Text lines */}
      <mesh position={[0, -0.1, 0.07]}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
      </mesh>
      
      <mesh position={[0, -0.2, 0.07]}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
      </mesh>
      
      <mesh position={[0, -0.3, 0.07]}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}
