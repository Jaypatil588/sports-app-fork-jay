import React from 'react';
import { styles } from '../styles/appStyles';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect }) => {
  return (
    <div style={styles.suggestionsContainer}>
      <div style={styles.suggestionsTitle}>💡 Popular Searches:</div>
      <div style={styles.suggestionChips}>
        {suggestions.map((suggestion, idx) => (
          <span
            key={idx}
            style={styles.suggestionChip}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e7ff';
              e.currentTarget.style.borderColor = '#c7d2fe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            {suggestion}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;

