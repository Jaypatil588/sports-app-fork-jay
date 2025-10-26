import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SwimmingSceneProps {
  searchTrigger?: boolean;
}

const SwimmingScene: React.FC<SwimmingSceneProps> = () => {
  const waterRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Bubble particles - memoized
  const { particlesGeometry, velocities } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 80;
    const positions = new Float32Array(particlesCount * 3);
    const vels = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 8 - 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vels[i] = 0.01 + Math.random() * 0.03;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { particlesGeometry: geometry, velocities: vels };
  }, []);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Animated water caustics effect
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(timeRef.current) * 0.2;
    }
    
    // Bubble animation
    if (bubblesRef.current) {
      const positions = bubblesRef.current.geometry.attributes.position.array as Float32Array;
      const particlesCount = 80;
      for (let i = 0; i < particlesCount; i++) {
        // Rise up
        positions[i * 3 + 1] += velocities[i];
        
        // Wavy horizontal motion
        positions[i * 3] += Math.sin(timeRef.current + i) * 0.01;
        
        // Reset if bubble reaches top
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4;
          positions[i * 3] = (Math.random() - 0.5) * 15;
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Bubbles */}
      <points ref={bubblesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={0.08} 
          color="#ffffff" 
          transparent 
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default SwimmingScene;

