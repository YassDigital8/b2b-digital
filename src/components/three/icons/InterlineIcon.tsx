
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InterlineIconProps {
  position?: [number, number, number];
  color?: string;
}

export function InterlineIcon({ position = [0, 0, 0], color = "#00559A" }: InterlineIconProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Connection node 1 */}
      <mesh position={[-0.3, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Connection line */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Connection node 2 */}
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Small plane 1 */}
      <mesh position={[-0.3, 0.15, 0]} rotation={[0, 0, Math.PI / 4]} scale={0.3}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Small plane 2 */}
      <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, -Math.PI / 4]} scale={0.3}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}
