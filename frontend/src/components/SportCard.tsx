import React from 'react';
import { styles } from '../styles/appStyles';
import type { SportConfig } from '../types';

interface SportCardProps {
  sport: string;
  config: SportConfig;
  onSelect: (sport: string) => void;
}

const SportCard: React.FC<SportCardProps> = ({ sport, config, onSelect }) => {
  return (
    <div
      style={{
        ...styles.sportCard,
        background: config.gradient,
      }}
      onClick={() => onSelect(sport)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
      }}
    >
      <span style={styles.sportIcon}>{config.icon}</span>
      <div style={{ ...styles.sportName, color: '#ffffff' }}>{sport}</div>
      <div style={{ ...styles.sportSubtext, color: 'rgba(255, 255, 255, 0.9)' }}>
        Explore {sport.toLowerCase()} stats
      </div>
    </div>
  );
};

export default SportCard;

