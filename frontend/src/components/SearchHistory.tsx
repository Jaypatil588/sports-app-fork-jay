import React from 'react';
import { styles } from '../styles/appStyles';
import type { SearchHistory as SearchHistoryType } from '../types';

interface SearchHistoryProps {
  history: SearchHistoryType[];
  onSelect: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div style={styles.historyContainer}>
      <div style={styles.historyTitle}>🕐 Recent Searches:</div>
      {history.map((item, idx) => (
        <div
          key={idx}
          style={styles.historyItem}
          onClick={() => onSelect(item.query)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e7ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}
        >
          <span style={styles.historyQuery}>{item.query}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;

