
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

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
  icon?: "cube" | "sphere" | "torus";
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
          <FloatingIcon position={[0, 0, 0]} color={color} icon={icon} />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
