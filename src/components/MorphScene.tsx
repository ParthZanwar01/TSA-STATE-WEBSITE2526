import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import MorphBlob from './MorphBlob';

interface MorphSceneProps {
  color1?: [number, number, number];
  color2?: [number, number, number];
  color3?: [number, number, number];
  size?: number;
  className?: string;
  interactive?: boolean;
}

const MorphScene = ({
  color1,
  color2,
  color3,
  size = 2,
  className = '',
  interactive = true,
}: MorphSceneProps) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#D4A843" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#1B2A4A" />
        <pointLight position={[0, 10, -5]} intensity={0.3} color="#7733CC" />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <MorphBlob color1={color1} color2={color2} color3={color3} size={size} />
        </Float>
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        )}
      </Canvas>
    </div>
  );
};

export default MorphScene;
