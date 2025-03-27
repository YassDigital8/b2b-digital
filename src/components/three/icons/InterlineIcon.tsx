
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InterlineIconProps {
  position?: [number, number, number];
  color?: string;
}

export function InterlineIcon({ position = [0, 0, 0], color = "#00559A" }: InterlineIconProps) {
  const group = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Primary animation - floating and gentle rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
      
      // Add subtle "breathing" scaling effect
      const breathScale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      group.current.scale.set(breathScale, breathScale, breathScale);
    }
    
    // Torus continuous rotation
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.z += 0.005;
      
      if (torusRef.current.material) {
        // Subtle shine effect
        torusRef.current.material.metalness = 0.8 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      }
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Blue torus to match the image */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.15, 32, 100]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}
