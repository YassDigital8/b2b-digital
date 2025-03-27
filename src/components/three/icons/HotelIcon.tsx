
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HotelIconProps {
  position?: [number, number, number];
  color?: string;
}

export function HotelIcon({ position = [0, 0, 0], color = "#00559A" }: HotelIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Building base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 0.45, 0]}>
        <coneGeometry args={[0.5, 0.4, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, -0.15, 0.21]}>
        <boxGeometry args={[0.2, 0.4, 0.02]} />
        <meshStandardMaterial color="#333" metalness={0.3} roughness={0.5} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-0.2, 0.1, 0.21]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#88CCFF" metalness={0.7} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.2, 0.1, 0.21]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#88CCFF" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}
