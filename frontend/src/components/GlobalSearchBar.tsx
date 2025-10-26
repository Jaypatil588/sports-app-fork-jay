import React, { useState } from 'react';

interface GlobalSearchBarProps {
  onSearch: (query: string, sport?: string) => void;
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 20,
      width: '90%',
      maxWidth: '700px',
      animation: 'fadeInScale 0.8s cubic-bezier(0.28, 0.11, 0.32, 1)',
    }}>
      <div style={{
        display: 'flex',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '8px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any sport, player, team, or stats..."
          style={{
            flex: 1,
            padding: '20px 28px',
            fontSize: '19px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#1d1d1f',
            fontWeight: '400',
          }}
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: '20px 40px',
            background: '#0071e3',
            color: '#ffffff',
            border: 'none',
            borderRadius: '18px',
            fontSize: '17px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.28, 0.11, 0.32, 1)',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0077ed';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0071e3';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Search
        </button>
      </div>
      
      <p style={{
        textAlign: 'center',
        marginTop: '20px',
        color: '#ffffff',
        fontSize: '15px',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}>
        Or scroll down to browse sports
      </p>
    </form>
  );
};

export default GlobalSearchBar;

