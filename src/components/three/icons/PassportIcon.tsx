
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PassportIconProps {
  position?: [number, number, number];
  color?: string;
}

export function PassportIcon({ position = [0, 0, 0], color = "#00559A" }: PassportIconProps) {
  const group = useRef<THREE.Group>(null);
  const emblemRef = useRef<THREE.Mesh>(null);
  const textLinesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Primary animation - floating and gentle rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
      
      // Add subtle page-flipping effect
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
    }
    
    // Emblem shimmer effect
    if (emblemRef.current) {
      emblemRef.current.rotation.y += 0.01;
      
      // Pulsing gold effect
      const pulseIntensity = 0.7 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      emblemRef.current.material.metalness = pulseIntensity;
      
      // Change color slightly
      const hue = (state.clock.getElapsedTime() * 0.1) % 1;
      emblemRef.current.material.color.setHSL(0.12, 0.8, 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1);
    }
    
    // Text lines animation
    if (textLinesRef.current) {
      textLinesRef.current.children.forEach((line, i) => {
        const mesh = line as THREE.Mesh;
        // Staggered sliding animation
        mesh.position.x = Math.sin(state.clock.getElapsedTime() * 0.5 + i * 0.2) * 0.05;
        
        // Brightness pulsing
        mesh.material.emissiveIntensity = 0.2 + Math.sin(state.clock.getElapsedTime() * 0.8 + i * 0.3) * 0.2;
      });
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
      
      {/* Emblem with animation */}
      <mesh ref={emblemRef} position={[0, 0.2, 0.07]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.8} 
          roughness={0.1} 
          emissive="#AA8822" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* Text lines group for animation */}
      <group ref={textLinesRef}>
        <mesh position={[0, -0.1, 0.07]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            metalness={0.8} 
            roughness={0.1} 
            emissive="#AA8822" 
            emissiveIntensity={0.3} 
          />
        </mesh>
        
        <mesh position={[0, -0.2, 0.07]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            metalness={0.8} 
            roughness={0.1} 
            emissive="#AA8822" 
            emissiveIntensity={0.3} 
          />
        </mesh>
        
        <mesh position={[0, -0.3, 0.07]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            metalness={0.8} 
            roughness={0.1} 
            emissive="#AA8822" 
            emissiveIntensity={0.3} 
          />
        </mesh>
      </group>
    </group>
  );
}
