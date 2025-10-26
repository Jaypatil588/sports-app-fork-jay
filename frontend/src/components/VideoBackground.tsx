import React, { useState } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
  style?: React.CSSProperties;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  opacity = 0.5,
  style = {}
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          opacity: opacity,
          zIndex: 0,
          ...style
        }}
        onLoadedData={() => setIsReady(true)}
        onError={(e) => {
          console.error('Video failed to load:', videoSrc);
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Overlay for better readability only if video not yet ready */}
      {!isReady && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
          zIndex: 1,
        }} />
      )}
    </>
  );
};

export default VideoBackground;

