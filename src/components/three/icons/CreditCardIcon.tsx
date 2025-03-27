
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CreditCardIconProps {
  position?: [number, number, number];
  color?: string;
}

export function CreditCardIcon({ position = [0, 0, 0], color = "#00559A" }: CreditCardIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Card base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Chip */}
      <mesh position={[-0.2, 0.04, 0]}>
        <boxGeometry args={[0.15, 0.03, 0.15]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Magnetic strip */}
      <mesh position={[0, 0.035, -0.2]}>
        <boxGeometry args={[0.7, 0.02, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}
