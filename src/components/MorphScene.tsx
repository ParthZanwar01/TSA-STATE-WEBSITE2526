import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MorphBlob from './MorphBlob';

const MorphScene = () => {
  return (
    <div className="absolute inset-0 morph-glow">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4c8" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8833ee" />
        <MorphBlob />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};

export default MorphScene;
