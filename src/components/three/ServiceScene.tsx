
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Airplane icon made with 3D primitives
function AirplaneIcon({ position = [0, 0, 0], color = "#00559A" }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position as [number, number, number]}>
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

// Car icon made with 3D primitives
function CarIcon({ position = [0, 0, 0], color = "#00559A" }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position as [number, number, number]}>
      {/* Car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Car top */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[0.25, -0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, -0.12, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, -0.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, -0.12, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Interline icon (connecting flights)
function InterlineIcon({ position = [0, 0, 0], color = "#00559A" }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position as [number, number, number]}>
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

// Credit card icon for Account Top Up
function CreditCardIcon({ position = [0, 0, 0], color = "#00559A" }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <group ref={group} position={position as [number, number, number]}>
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

// Original generic floating icon 
function FloatingIcon({ position = [0, 0, 0], color = "#00559A", icon = "cube" }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + position[1];
    }
  });

  return (
    <mesh ref={mesh} position={position as [number, number, number]}>
      {icon === "cube" && <boxGeometry args={[0.8, 0.8, 0.8]} />}
      {icon === "sphere" && <sphereGeometry args={[0.5, 32, 32]} />}
      {icon === "torus" && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

interface ServiceSceneProps {
  color?: string;
  icon?: "cube" | "sphere" | "torus" | "airplane" | "car" | "interline" | "creditcard";
}

export default function ServiceScene({ color = "#00559A", icon = "cube" }: ServiceSceneProps) {
  return (
    <div className="w-full h-full" style={{ height: '120px' }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate 
          autoRotateSpeed={3}
        />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {icon === "cube" && <FloatingIcon position={[0, 0, 0]} color={color} icon="cube" />}
          {icon === "sphere" && <FloatingIcon position={[0, 0, 0]} color={color} icon="sphere" />}
          {icon === "torus" && <FloatingIcon position={[0, 0, 0]} color={color} icon="torus" />}
          {icon === "airplane" && <AirplaneIcon position={[0, 0, 0]} color={color} />}
          {icon === "car" && <CarIcon position={[0, 0, 0]} color={color} />}
          {icon === "interline" && <InterlineIcon position={[0, 0, 0]} color={color} />}
          {icon === "creditcard" && <CreditCardIcon position={[0, 0, 0]} color={color} />}
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
