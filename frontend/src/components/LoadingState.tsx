import React from 'react';
import { styles } from '../styles/appStyles';

interface LoadingStateProps {
  sport: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ sport }) => {
  return (
    <div style={styles.loadingContainer}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
      <div style={{ fontSize: '1.2rem', color: '#475569', fontWeight: '600' }}>
        Analyzing {sport} data...
      </div>
      <div style={{ fontSize: '1rem', color: '#94a3b8', marginTop: '0.5rem' }}>
        This may take a few seconds
      </div>
    </div>
  );
};

export default LoadingState;

