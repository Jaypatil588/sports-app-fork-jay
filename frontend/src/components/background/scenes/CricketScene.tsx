import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CricketSceneProps {
  searchTrigger?: boolean;
}

const CricketScene: React.FC<CricketSceneProps> = ({ searchTrigger }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const batRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const animationPhase = useRef(0);

  // Particle system for grass/dust
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 50;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = -2 + Math.random() * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useEffect(() => {
    if (searchTrigger && animationPhase.current === 0) {
      animationPhase.current = 1;
      const startTime = Date.now();
      const duration = 1000;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        // Bat swing
        if (batRef.current) {
          batRef.current.rotation.z = progress * Math.PI * 0.4;
        }
        
        // Ball trajectory left→right
        if (ballRef.current) {
          ballRef.current.position.x = -6 + (eased * 12);
          ballRef.current.position.y = -1 + (Math.sin(progress * Math.PI) * 3);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset
          animationPhase.current = 0;
          if (batRef.current) batRef.current.rotation.z = 0;
          if (ballRef.current) ballRef.current.position.set(-6, -1, 0);
        }
      };
      
      animate();
    }
  }, [searchTrigger]);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Gentle hover
    if (animationPhase.current === 0 && batRef.current) {
      batRef.current.position.y = -1.5 + Math.sin(timeRef.current * 2) * 0.05;
    }
    
    // Subtle particle movement
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 1] += Math.sin(timeRef.current + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Cricket bat */}
      <mesh ref={batRef} position={[-4, -1.5, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.1]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      
      {/* Cricket ball */}
      <mesh ref={ballRef} position={[-6, -1, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      {/* Grass/dust particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.05} color="#34d399" transparent opacity={0.4} />
      </points>
    </group>
  );
};

export default CricketScene;

