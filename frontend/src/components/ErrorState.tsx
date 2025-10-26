import React from 'react';
import { styles } from '../styles/appStyles';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div style={styles.errorMessage}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
      {message}
    </div>
  );
};

export default ErrorState;

