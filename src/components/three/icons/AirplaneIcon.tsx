
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirplaneIconProps {
  position?: [number, number, number];
  color?: string;
}

export function AirplaneIcon({ position = [0, 0, 0], color = "#00559A" }: AirplaneIconProps) {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Primary animation - floating and gentle rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
      
      // Add subtle "breathing" scaling effect
      const breathScale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      group.current.scale.set(breathScale, breathScale, breathScale);
    }
    
    // Body material shine effect
    if (bodyRef.current && bodyRef.current.material) {
      bodyRef.current.material.metalness = 0.7 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Airplane body - more rounded, metallic look */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Flight trail effect */}
      <group position={[-0.7, 0, 0]}>
        {[...Array(3)].map((_, i) => {
          const offset = i * 0.2;
          return (
            <mesh key={i} position={[-offset, 0, 0]}>
              <sphereGeometry args={[0.15 - (i * 0.04), 16, 16]} />
              <meshStandardMaterial 
                color={color} 
                transparent={true} 
                opacity={0.7 - (i * 0.2)} 
                metalness={0.3} 
                roughness={0.7}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  );
}
