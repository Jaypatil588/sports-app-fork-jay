import React from 'react';
import { styles } from '../styles/appStyles';

interface InterestingFactProps {
  fact: string;
}

const InterestingFact: React.FC<InterestingFactProps> = ({ fact }) => {
  return (
    <div
      style={{
        ...styles.interestingFact,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '2rem',
          flexShrink: 0,
        }}
      >
        💡
      </div>
      <div>
        <h4
          style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
          }}
        >
          Did You Know?
        </h4>
        <p
          style={{
            fontSize: '1rem',
            color: '#cccccc',
            lineHeight: '1.6',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          {fact}
        </p>
      </div>
    </div>
  );
};

export default InterestingFact;

