import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface SportAnimationProps {
  sport: string;
  icon: string;
  onComplete?: () => void;
}

// --- Main Component ---
export const SportAnimation: React.FC<SportAnimationProps> = ({ sport, icon, onComplete }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Reduced Motion: Simple Static Icon
  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onAnimationComplete={onComplete}
        style={{ fontSize: '120px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {icon}
      </motion.div>
    );
  }

  // F1: Car + Smoke
  if (sport === 'F1') {
    return (
      <React.Fragment>
        <motion.div
          initial={{ x: 200, scale: 0.7, opacity: 0 }}
          animate={{ 
            x: -200, 
            scale: [0.7, 1.2, 1], 
            opacity: [0, 1, 1, 0],
            rotate: [5, -5]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.0, 
            ease: "easeOut"
          }}
          onAnimationComplete={onComplete}
          style={{ fontSize: '120px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {icon}
        </motion.div>
        {/* Smoke Trail */}
        <motion.div
          initial={{ opacity: 0, x: 100, scaleX: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0],
            x: -100,
            scaleX: [0.5, 1, 0.8]
          }}
          transition={{ duration: 1.0, delay: 0.1, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '150px',
            height: '40px',
            background: 'linear-gradient(90deg, transparent, rgba(200, 200, 200, 0.4), transparent)',
            filter: 'blur(15px)',
            borderRadius: '50%',
            zIndex: -1,
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'right center'
          }}
        />
      </React.Fragment>
    );
  }

  // Cricket: Bat + Ball
  if (sport === 'Cricket') {
    return (
      <React.Fragment>
        <motion.div
          initial={{ rotate: -120, scale: 0.8, opacity: 0 }}
          animate={{
            rotate: [-120, -60, 30, 90, 120],
            scale: [0.8, 1, 1.3, 1.1, 0.9],
            opacity: [0, 1, 1, 0.8, 0]
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          style={{ 
            fontSize: '120px', 
            position: 'absolute', 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)',
            transformOrigin: '20% 100%'
          }}
        >
          🏏
        </motion.div>
        <motion.div
          initial={{ x: -40, y: -30, scale: 0, opacity: 0 }}
          animate={{
            x: [0, 150, 400],
            y: [0, -250, -50],
            scale: [0, 1.5, 0.5],
            opacity: [0, 1, 0],
            rotate: [0, 180, 720]
          }}
          transition={{
            duration: 1.0,
            delay: 0.35,
            ease: 'easeOut'
          }}
          onAnimationComplete={onComplete}
          style={{ fontSize: '60px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          🔴
        </motion.div>
      </React.Fragment>
    );
  }

  // Basketball: Ball + Hoop
  if (sport === 'Basketball') {
    return (
      <React.Fragment>
        <motion.div
          initial={{ x: -100, y: -100, scale: 1 }}
          animate={{
            x: [0, 50, 100, 150],
            y: [-100, -180, -30, -50],
            rotate: 720
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
          onAnimationComplete={onComplete}
          style={{ fontSize: '120px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          🏀
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.3, 1],
            opacity: [0, 0.7, 0.5, 0.3, 0]
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            left: 'calc(50% + 150px)',
            top: 'calc(50% - 50px)',
            fontSize: '80px',
            transform: 'translate(-50%, -50%) rotate(-10deg)',
            zIndex: 1
          }}
        >
          🥅
        </motion.div>
      </React.Fragment>
    );
  }

  // Swimming: Swimmer + Splash
  if (sport === 'Swimming') {
    return (
      <React.Fragment>
        <motion.div
          initial={{ y: -150, opacity: 0 }}
          animate={{
            y: 150,
            opacity: [0, 1, 1, 0.5, 0],
            rotateZ: [0, 8, -8, 8, 0, -8, 0]
          }}
          transition={{
            duration: 1.8,
            ease: "easeOut"
          }}
          style={{ fontSize: '120px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          🏊
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 2.5],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: "easeOut"
          }}
          onAnimationComplete={onComplete}
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% + 50px)',
            fontSize: '150px',
            color: '#06b6d4',
            zIndex: -1,
            transform: 'translate(-50%, -50%)'
          }}
        >
          💦
        </motion.div>
      </React.Fragment>
    );
  }

  // Default animations for other sports
  const getAnimationProps = () => {
    switch (sport) {
      case 'Baseball':
        return {
          initial: { x: -50, y: 0, scale: 1, rotate: 0 },
          animate: {
            x: [0, 100, 250, 400],
            y: [0, -150, -200, -120],
            scale: [1, 1.3, 1.5, 1.2],
            rotate: [0, 180, 360, 540],
            opacity: [1, 1, 1, 0.8, 0]
          },
          transition: {
            duration: 1.5,
            ease: "easeOut"
          }
        };
      
      case 'Soccer':
        return {
          initial: { x: -50, rotateY: 0, scale: 1 },
          animate: {
            x: [0, 80, 180, 300, 500],
            rotateY: [0, 360, 720, 1080, 1800],
            scale: [1, 1.2, 1.4, 1.5, 0.5],
            opacity: [1, 1, 1, 0.7, 0]
          },
          transition: {
            duration: 1.4,
            ease: "easeOut"
          }
        };
      
      case 'Tennis':
        return {
          initial: { x: 0, y: 0, scale: 1, rotate: 0 },
          animate: {
            x: [0, 100, 200, 300, 400, 500],
            y: [0, -120, 0, -80, 0, -40],
            scale: [1, 0.8, 1.2, 0.9, 1.1, 0.7],
            rotate: [0, 180, 360, 540, 720, 900],
            opacity: [1, 1, 1, 1, 0.8, 0]
          },
          transition: {
            duration: 1.2,
            ease: "easeOut"
          }
        };
      
      case 'Chess':
        return {
          initial: { x: 0, y: 0, scale: 1, rotate: 0 },
          animate: {
            x: [0, 20, 120, 220, 300],
            y: [0, -60, -100, -60, 0],
            scale: [1, 1.2, 1.4, 1.3, 1],
            rotate: [0, 15, 30, 20, 0]
          },
          transition: {
            duration: 1.3,
            ease: "easeOut"
          }
        };
      
      default:
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5 }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onComplete}
      style={{ fontSize: '120px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
    >
      {sport === 'Baseball' ? '⚾' :
       sport === 'Soccer' ? '⚽' :
       sport === 'Tennis' ? '🎾' :
       sport === 'Chess' ? '♘' :
       icon}
    </motion.div>
  );
};