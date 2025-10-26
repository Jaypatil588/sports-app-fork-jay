import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ChessSceneProps {
  searchTrigger?: boolean;
}

const ChessScene: React.FC<ChessSceneProps> = ({ searchTrigger }) => {
  const boardRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  // Piece outline particles - memoized
  const { particlesGeometry, targetPositions } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 60;
    const positions = new Float32Array(particlesCount * 3);
    const targets = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Start scattered
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Target: form a chess piece outline (simplified king)
      const angle = (i / particlesCount) * Math.PI * 2;
      const radius = 1.5;
      targets[i * 3] = Math.cos(angle) * radius;
      targets[i * 3 + 1] = Math.sin(i / particlesCount * Math.PI * 4) * 2;
      targets[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { particlesGeometry: geometry, targetPositions: targets };
  }, []);

  useEffect(() => {
    if (searchTrigger && particlesRef.current) {
      const startTime = Date.now();
      const duration = 800;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const startPositions = new Float32Array(positions);
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const particlesCount = 60;
        for (let i = 0; i < particlesCount; i++) {
          positions[i * 3] = startPositions[i * 3] + (targetPositions[i * 3] - startPositions[i * 3]) * eased;
          positions[i * 3 + 1] = startPositions[i * 3 + 1] + (targetPositions[i * 3 + 1] - startPositions[i * 3 + 1]) * eased;
          positions[i * 3 + 2] = startPositions[i * 3 + 2] + (targetPositions[i * 3 + 2] - startPositions[i * 3 + 2]) * eased;
        }
        
        if (particlesRef.current) {
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset after a moment
          setTimeout(() => {
            for (let i = 0; i < particlesCount; i++) {
              positions[i * 3] = (Math.random() - 0.5) * 10;
              positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
              positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }
            if (particlesRef.current) {
              particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }
          }, 1000);
        }
      };
      
      animate();
    }
  }, [searchTrigger]);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Gentle board rotation
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.05;
      boardRef.current.rotation.x = -Math.PI / 6 + Math.sin(timeRef.current * 0.3) * 0.02;
    }
  });

  return (
    <group>
      {/* Piece outline particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={0.06} 
          color="#6366f1" 
          transparent 
          opacity={0.8}
        />
      </points>
    </group>
  );
};

export default ChessScene;

