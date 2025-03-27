
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarIconProps {
  position?: [number, number, number];
  color?: string;
}

export function CarIcon({ position = [0, 0, 0], color = "#C69C3F" }: CarIconProps) {
  const group = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Primary animation - floating and gentle rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
      
      // Add subtle "breathing" scaling effect
      const breathScale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      group.current.scale.set(breathScale, breathScale, breathScale);
    }
    
    // Cube rotation
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
      
      if (cubeRef.current.material) {
        // Subtle shine effect
        cubeRef.current.material.metalness = 0.8 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      }
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Simple gold cube to match the image */}
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
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
