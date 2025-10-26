import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

// Lazy-load sport scenes
const CricketScene = React.lazy(() => import('./scenes/CricketScene'));
const SoccerScene = React.lazy(() => import('./scenes/SoccerScene'));
const TennisScene = React.lazy(() => import('./scenes/TennisScene'));
const F1Scene = React.lazy(() => import('./scenes/F1Scene'));
const BasketballScene = React.lazy(() => import('./scenes/BasketballScene'));
const BaseballScene = React.lazy(() => import('./scenes/BaseballScene'));
const SwimmingScene = React.lazy(() => import('./scenes/SwimmingScene'));
const ChessScene = React.lazy(() => import('./scenes/ChessScene'));

interface BackgroundStageProps {
  sportId: string;
  onSearchTrigger?: boolean;
  isPaused?: boolean;
}

const BackgroundStage: React.FC<BackgroundStageProps> = ({
  sportId,
  onSearchTrigger = false,
  isPaused = false,
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Add small delay to prevent rapid mounting/unmounting
  useEffect(() => {
    if (!isPaused && !prefersReducedMotion) {
      const timer = setTimeout(() => setShouldRender(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [isPaused, prefersReducedMotion]);

  // Don't render 3D if reduced motion is preferred or paused
  if (prefersReducedMotion || !shouldRender) {
    return null;
  }

  const renderScene = () => {
    switch (sportId) {
      case 'cricket':
        return <CricketScene searchTrigger={onSearchTrigger} />;
      case 'soccer':
        return <SoccerScene searchTrigger={onSearchTrigger} />;
      case 'tennis':
        return <TennisScene searchTrigger={onSearchTrigger} />;
      case 'f1':
        return null; // F1 video will be added later
      case 'basketball':
        return <BasketballScene searchTrigger={onSearchTrigger} />;
      case 'baseball':
        return <BaseballScene searchTrigger={onSearchTrigger} />;
      case 'swimming':
        return <SwimmingScene searchTrigger={onSearchTrigger} />;
      case 'chess':
        return <ChessScene searchTrigger={onSearchTrigger} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: isPaused ? 0.3 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {!isPaused && (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {renderScene()}
        </Suspense>
      </Canvas>
      )}
    </div>
  );
};

export default BackgroundStage;

