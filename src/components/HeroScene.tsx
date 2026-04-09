import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Suspense } from "react";

const AnimatedSphere = () => (
  <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
    <mesh scale={2.2}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#38d9a9"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  </Float>
);

const HeroScene = () => (
  <div className="absolute inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6c63ff" />
        <AnimatedSphere />
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
