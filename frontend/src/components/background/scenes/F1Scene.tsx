import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface F1SceneProps {
  searchTrigger?: boolean;
}

const F1Scene: React.FC<F1SceneProps> = ({ searchTrigger }) => {
  const groupRef = useRef<THREE.Group>(null);
  const carRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const animationPhase = useRef(0); // 0: entering, 1: idle, 2: zooming

  // Load actual 3D model and clone once
  const { scene: carModel } = useGLTF('/assets/models/f1-car.glb');
  const clonedCar = useMemo(() => carModel.clone(), [carModel]);
  useEffect(() => {
    if (carRef.current) {
      // Start from left side
      carRef.current.position.x = -10;
      carRef.current.position.y = 0;
      
      // Animation entering from left to center
      const startTime = Date.now();
      const duration = 800;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // power4.out
        
        if (carRef.current) {
          carRef.current.position.x = -10 + (eased * 10); // Move to center (0)
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          animationPhase.current = 1;
        }
      };
      
      animate();
    }
  }, []);

  // Zoom burst on search
  useEffect(() => {
    if (searchTrigger && carRef.current && animationPhase.current === 1) {
      animationPhase.current = 2;
      const startPos = carRef.current.position.x;
      const startTime = Date.now();
      const duration = 600;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2; // easeInOutCubic
        
        if (carRef.current) {
          carRef.current.position.x = startPos + (eased * 15); // Zoom to right
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          animationPhase.current = 1;
          // Reset position
          if (carRef.current) {
            carRef.current.position.x = -10;
            // Re-enter
            const resetStart = Date.now();
            const resetDuration = 800;
            const resetAnimate = () => {
              const resetElapsed = Date.now() - resetStart;
              const resetProgress = Math.min(resetElapsed / resetDuration, 1);
              const resetEased = 1 - Math.pow(1 - resetProgress, 4);
              
              if (carRef.current) {
                carRef.current.position.x = -10 + (resetEased * 10);
              }
              
              if (resetProgress < 1) {
                requestAnimationFrame(resetAnimate);
              }
            };
            resetAnimate();
          }
        }
      };
      
      animate();
    }
  }, [searchTrigger]);

  // Speed lines particles - memoized
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Animate speed lines
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const particlesCount = 100;
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] -= 0.2; // Move left (speed lines)
        if (positions[i * 3] < -10) {
          positions[i * 3] = 10;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Subtle hover effect
    if (carRef.current && animationPhase.current === 1) {
      carRef.current.position.y = Math.sin(timeRef.current * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Actual 3D F1 Car Model */}
      <primitive 
        ref={carRef}
        object={clonedCar} 
        position={[0, 0, 0]} 
        scale={0.5}
      />
      
      {/* Speed lines */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial size={0.05} color="#ff6b6b" transparent opacity={0.6} />
      </points>
    </group>
  );
};

export default F1Scene;

