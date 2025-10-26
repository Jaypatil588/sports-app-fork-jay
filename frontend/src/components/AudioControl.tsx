import React, { useState, useEffect } from 'react';
import { styles } from '../styles/appStyles';

const AudioControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Load audio preference from localStorage
    const savedMuted = localStorage.getItem('audioMuted');
    const savedVolume = localStorage.getItem('audioVolume');
    
    if (savedMuted !== null) {
      setIsMuted(savedMuted === 'true');
    }
    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('audioMuted', String(newMuted));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('audioVolume', String(newVolume));
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      localStorage.setItem('audioMuted', 'false');
    }
  };

  return (
    <div style={styles.audioControl}>
      <button
        style={styles.audioButton}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        style={{
          width: '80px',
          accentColor: '#0071e3',
        }}
        aria-label="Volume control"
      />
    </div>
  );
};

export default AudioControl;

