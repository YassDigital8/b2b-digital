
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirplaneIconProps {
  position?: [number, number, number];
  color?: string;
}

export function AirplaneIcon({ position = [0, 0, 0], color = "#00559A" }: AirplaneIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Airplane body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.8, 8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.8, 0.3]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.2, 0.2, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}
