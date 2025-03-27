
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface APIIconProps {
  position?: [number, number, number];
  color?: string;
}

export function APIIcon({ position = [0, 0, 0], color = "#00559A" }: APIIconProps) {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Primary animation - floating and gentle rotation
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
      
      // Add subtle "breathing" scaling effect
      const breathScale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      group.current.scale.set(breathScale, breathScale, breathScale);
    }
    
    // Sphere color pulsing effect
    if (sphereRef.current && sphereRef.current.material) {
      // Subtle color shift
      const hue = (state.clock.getElapsedTime() * 0.1) % 1;
      const saturation = 0.7;
      const lightness = 0.5 + Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1;
      
      // Create temporary color
      const tempColor = new THREE.Color();
      tempColor.setHSL(hue, saturation, lightness);
      
      // Apply to emissive for glow effect
      sphereRef.current.material.emissive = tempColor;
      sphereRef.current.material.emissiveIntensity = 0.2 + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={group} position={position}>
      {/* Main API globe */}
      <mesh ref={sphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#C69C3F" 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Connection points around the sphere */}
      {[...Array(6)].map((_, i) => {
        const theta = (i / 6) * Math.PI * 2;
        const radius = 0.7;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}
      
      {/* Connection lines */}
      {[...Array(6)].map((_, i) => {
        const theta = (i / 6) * Math.PI * 2;
        const startRadius = 0.5;
        const endRadius = 0.7;
        const startX = Math.cos(theta) * startRadius;
        const startZ = Math.sin(theta) * startRadius;
        const endX = Math.cos(theta) * endRadius;
        const endZ = Math.sin(theta) * endRadius;
        
        // Create a custom geometry for each connection line
        return (
          <group key={`line-${i}`}>
            <mesh position={[(startX + endX) / 2, 0, (startZ + endZ) / 2]}>
              <cylinderGeometry 
                args={[
                  0.02, 0.02, 
                  Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2)),
                  8
                ]} 
                rotation={[Math.PI / 2, Math.atan2(endZ - startZ, endX - startX), 0]}
              />
              <meshStandardMaterial color="#C69C3F" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        )
      })}
    </group>
  );
}
