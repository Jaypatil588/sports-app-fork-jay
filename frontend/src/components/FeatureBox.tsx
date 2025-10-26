import React from 'react';

interface FeatureBoxProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => {
  return (
    <div
      style={{
        padding: '2rem',
        background: 'rgba(102, 126, 234, 0.05)',
        border: '1px solid rgba(102, 126, 234, 0.1)',
        borderRadius: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.borderColor = 'rgba(102, 126, 234, 0.4)';
        target.style.background = 'rgba(102, 126, 234, 0.1)';
        target.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.borderColor = 'rgba(102, 126, 234, 0.1)';
        target.style.background = 'rgba(102, 126, 234, 0.05)';
        target.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>
        {icon}
      </div>
      <h3
        style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: '0.5rem',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.95rem',
          color: '#aaaaaa',
          margin: 0,
          lineHeight: '1.5',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureBox;

