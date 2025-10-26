import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SoccerSceneProps {
  searchTrigger?: boolean;
}

const SoccerScene: React.FC<SoccerSceneProps> = ({ searchTrigger }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  const hexagonsRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (searchTrigger && ballRef.current) {
      const startTime = Date.now();
      const duration = 1000;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        if (ballRef.current) {
          // Ball rolls from left to right
          ballRef.current.position.x = -6 + (eased * 12);
          ballRef.current.position.y = Math.sin(progress * Math.PI) * 2;
          ballRef.current.rotation.z = progress * Math.PI * 4; // Rolling effect
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset
          if (ballRef.current) {
            ballRef.current.position.set(-6, 0, 0);
            ballRef.current.rotation.z = 0;
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
      ballRef.current.position.y = Math.sin(timeRef.current * 2) * 0.1;
    }
    
    // Subtle hexagon pattern movement
    if (hexagonsRef.current) {
      hexagonsRef.current.rotation.z = timeRef.current * 0.1;
    }
  });

  return (
    <group>
      {/* Soccer ball */}
      <mesh ref={ballRef} position={[-6, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Pentagon/Hexagon pattern */}
      <group ref={hexagonsRef} position={[0, 0, -2]}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 3;
          return (
            <mesh 
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
              ]}
            >
              <circleGeometry args={[0.3, 6]} />
              <meshStandardMaterial 
                color="#10b981" 
                transparent 
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Field lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[15, 10, 10, 10]} />
        <meshStandardMaterial 
          color="#14532d" 
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default SoccerScene;

