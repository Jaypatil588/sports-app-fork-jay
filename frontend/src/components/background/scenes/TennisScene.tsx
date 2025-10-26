import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TennisSceneProps {
  searchTrigger?: boolean;
}

const TennisScene: React.FC<TennisSceneProps> = ({ searchTrigger }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const courtRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Bouncing arc particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 40;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = Math.random() * 5 - 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useEffect(() => {
    if (searchTrigger && ballRef.current) {
      const startTime = Date.now();
      const duration = 1200;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (ballRef.current) {
          // Tennis serve trajectory
          ballRef.current.position.x = -5 + (progress * 10);
          // Bouncing parabola
          const bouncePhase = (progress * 2) % 1;
          ballRef.current.position.y = Math.abs(Math.sin(bouncePhase * Math.PI)) * 3;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset
          if (ballRef.current) {
            ballRef.current.position.set(-5, 0, 0);
          }
        }
      };
      
      animate();
    }
  }, [searchTrigger]);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Gentle hover
    if (ballRef.current) {
      ballRef.current.position.y += Math.sin(timeRef.current * 3) * 0.002;
    }
    
    // Particle bounce effect
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3 + 1] = Math.sin(timeRef.current * 2 + i) * 2;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Tennis ball */}
      <mesh ref={ballRef} position={[-5, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Arc particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={0.05} 
          color="#fbbf24" 
          transparent 
          opacity={0.6}
        />
      </points>
    </group>
  );
};

export default TennisScene;

