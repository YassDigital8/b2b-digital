
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Sparkles } from '@react-three/drei';
import { AirplaneIcon } from './icons/AirplaneIcon';
import { CarIcon } from './icons/CarIcon';
import { InterlineIcon } from './icons/InterlineIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { HotelIcon } from './icons/HotelIcon';
import { PassportIcon } from './icons/PassportIcon';
import { FloatingPrimitive } from './icons/FloatingPrimitive';

type IconType = "cube" | "sphere" | "torus" | "airplane" | "car" | "interline" | "creditcard" | "hotel" | "passport";

interface ServiceSceneProps {
  color?: string;
  icon?: IconType;
}

export default function ServiceScene({ color = "#00559A", icon = "cube" }: ServiceSceneProps) {
  return (
    <div className="w-full h-full" style={{ height: '120px' }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight 
          position={[0, 5, 0]} 
          intensity={0.5} 
          angle={0.6} 
          penumbra={0.5} 
          castShadow 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate 
          autoRotateSpeed={3}
        />
        
        {/* Background particles */}
        <Sparkles 
          count={20} 
          scale={3} 
          size={0.4} 
          speed={0.3} 
          opacity={0.2} 
          color={color} 
        />
        
        <Float 
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.5}
          floatingRange={[-0.1, 0.1]}
        >
          {/* Render the appropriate icon based on the icon prop */}
          {(icon === "cube" || icon === "sphere" || icon === "torus") && (
            <FloatingPrimitive position={[0, 0, 0]} color={color} primitive={icon} />
          )}
          {icon === "airplane" && <AirplaneIcon position={[0, 0, 0]} color={color} />}
          {icon === "car" && <CarIcon position={[0, 0, 0]} color={color} />}
          {icon === "interline" && <InterlineIcon position={[0, 0, 0]} color={color} />}
          {icon === "creditcard" && <CreditCardIcon position={[0, 0, 0]} color={color} />}
          {icon === "hotel" && <HotelIcon position={[0, 0, 0]} color={color} />}
          {icon === "passport" && <PassportIcon position={[0, 0, 0]} color={color} />}
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
