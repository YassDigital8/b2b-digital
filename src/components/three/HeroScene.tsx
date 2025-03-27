
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function PlaneModel({ position = [0, 0, 0], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} position={position as [number, number, number]} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#C69C3F" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position = [0, 0, 0], color = "#00559A", scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      mesh.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position as [number, number, number]} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          transparent 
          opacity={0.6} 
          roughness={0.1} 
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.5}
        />
      </mesh>
    </Float>
  );
}

function RotatingCube({ position = [0, 0, 0], color = "#C69C3F", scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={mesh} position={position as [number, number, number]} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

function Torus({ position = [0, 0, 0], color = "#00559A", scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={position as [number, number, number]} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
      
      <PlaneModel position={[0, 0, 0]} scale={0.7} />
      <GlassSphere position={[1.5, 1, -1]} scale={0.5} color="#C69C3F" />
      <GlassSphere position={[-1.5, -1, -0.5]} scale={0.7} color="#00559A" />
      <RotatingCube position={[-1, 1, 1]} scale={0.4} />
      <Torus position={[1, -0.5, 1]} scale={0.5} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <Scene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
