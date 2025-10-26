import React from 'react';
import { styles } from '../styles/appStyles';
import SearchSuggestions from './SearchSuggestions';
import SearchHistory from './SearchHistory';
import type { SearchHistory as SearchHistoryType } from '../types';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query?: string) => void;
  isLoading: boolean;
  suggestions: string[];
  history: SearchHistoryType[];
  sport: string;
  showHistory?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  isLoading,
  suggestions,
  history,
  sport,
  showHistory = true,
}) => {
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleHistorySelect = (historyQuery: string) => {
    setQuery(historyQuery);
    onSearch(historyQuery);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        style={styles.searchBar}
        placeholder={`Search ${sport} stats, players, teams...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, styles.searchBarFocus);
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, styles.searchBar);
        }}
      />
      <button
        style={{
          ...styles.searchButton,
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        onClick={() => onSearch()}
        disabled={isLoading}
        onMouseEnter={(e) => {
          if (!isLoading) {
            Object.assign(e.currentTarget.style, styles.searchButtonHover);
          }
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, styles.searchButton);
        }}
      >
        {isLoading ? '🔍 Searching...' : '🔍 Search'}
      </button>

      <SearchSuggestions suggestions={suggestions} onSelect={handleSuggestionSelect} />

      {showHistory && <SearchHistory history={history} onSelect={handleHistorySelect} />}
    </div>
  );
};

export default SearchBar;

