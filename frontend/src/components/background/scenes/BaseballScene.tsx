import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface BaseballSceneProps {
  searchTrigger?: boolean;
}

const BaseballScene: React.FC<BaseballSceneProps> = ({ searchTrigger }) => {
  const ballRef = useRef<THREE.Mesh>(null);
  
  // Load actual baseball model and clone once
  const { scene: ballModel } = useGLTF('/assets/models/baseball-ball.glb');
  const clonedBall = useMemo(() => ballModel.clone(), [ballModel]);
  const batRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const animationPhase = useRef(0); // 0: idle, 1: swinging, 2: ball flying

  useEffect(() => {
    if (searchTrigger && animationPhase.current === 0) {
      animationPhase.current = 1;
      const startTime = Date.now();
      const swingDuration = 300;
      
      // Bat swing animation
      const swingAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / swingDuration, 1);
        
        if (batRef.current) {
          batRef.current.rotation.z = progress * Math.PI * 0.5;
        }
        
        if (progress < 1) {
          requestAnimationFrame(swingAnimation);
        } else {
          // Start ball trajectory
          animationPhase.current = 2;
          const ballStartTime = Date.now();
          const ballDuration = 1200;
          
          const ballAnimation = () => {
            const ballElapsed = Date.now() - ballStartTime;
            const ballProgress = Math.min(ballElapsed / ballDuration, 1);
            const eased = 1 - Math.pow(1 - ballProgress, 3); // easeOut
            
            if (ballRef.current) {
              // Parabolic arc from left to right
              ballRef.current.position.x = -5 + (eased * 15);
              ballRef.current.position.y = -1 + (Math.sin(ballProgress * Math.PI) * 4);
            }
            
            if (ballProgress < 1) {
              requestAnimationFrame(ballAnimation);
            } else {
              // Reset
              animationPhase.current = 0;
              if (batRef.current) {
                batRef.current.rotation.z = 0;
              }
              if (ballRef.current) {
                ballRef.current.position.set(-5, -1, 0);
              }
            }
          };
          
          ballAnimation();
        }
      };
      
      swingAnimation();
    }
  }, [searchTrigger]);

  useFrame(() => {
    timeRef.current += 0.016;
    
    // Gentle floating when idle
    if (animationPhase.current === 0) {
      if (batRef.current) {
        batRef.current.position.y = -1 + Math.sin(timeRef.current * 2) * 0.05;
      }
    }
  });

  return (
    <group>
      {/* Baseball - actual 3D model */}
      <primitive 
        ref={ballRef}
        object={clonedBall} 
        position={[-5, -1, 0]} 
        scale={0.15}
      />
    </group>
  );
};

export default BaseballScene;

