import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BasketballSceneProps {
  searchTrigger?: boolean;
}

const BasketballScene: React.FC<BasketballSceneProps> = ({ searchTrigger }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const hoopRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Dust particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 50;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = -2 + Math.random() * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useEffect(() => {
    if (searchTrigger && ballRef.current) {
      const startTime = Date.now();
      const duration = 1500;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (ballRef.current) {
          // Arc shot trajectory
          ballRef.current.position.x = -6 + (eased * 10);
          ballRef.current.position.y = -2 + (Math.sin(progress * Math.PI) * 5);
          ballRef.current.rotation.x = progress * Math.PI * 4;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset
          if (ballRef.current) {
            ballRef.current.position.set(-6, -2, 0);
            ballRef.current.rotation.x = 0;
          }
        }
      };
      
      animate();
    }
  }, [searchTrigger]);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Gentle floating
    if (ballRef.current) {
      ballRef.current.position.y += Math.sin(timeRef.current * 2) * 0.003;
    }
    
    // Subtle hoop sway
    if (hoopRef.current) {
      hoopRef.current.rotation.z = Math.sin(timeRef.current) * 0.02;
    }
    
    // Dust movement
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] += Math.sin(timeRef.current + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Basketball */}
      <mesh ref={ballRef} position={[-6, -2, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      
      {/* Hoop */}
      <group ref={hoopRef} position={[4, 1, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.03, 8, 16]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
      </group>
      
      {/* Court floor particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={0.04} 
          color="#d4a574" 
          transparent 
          opacity={0.5}
        />
      </points>
    </group>
  );
};

export default BasketballScene;

