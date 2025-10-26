import React from 'react';
import { styles } from '../styles/appStyles';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  const buttons: { mode: ViewMode; icon: string; label: string }[] = [
    { mode: 'all', icon: '📊📋🎥', label: 'All' },
    { mode: 'chart', icon: '📊', label: 'Charts' },
    { mode: 'table', icon: '📋', label: 'Table' },
    { mode: 'videos', icon: '🎥', label: 'Videos' },
  ];

  return (
    <div style={styles.viewToggleContainer}>
      {buttons.map(({ mode, icon, label }) => (
        <button
          key={mode}
          style={{
            ...styles.viewToggleButton,
            ...(viewMode === mode ? styles.viewToggleButtonActive : {}),
          }}
          onClick={() => setViewMode(mode)}
        >
          {icon} {label}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;

