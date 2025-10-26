import React, { useState } from 'react';
import { styles } from './styles/appStyles';
import Dashboard from './components/Dashboard';
import SportPage from './components/SportPage';

const App: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  return (
    <div style={styles.container}>
      {!selectedSport ? (
        <Dashboard onSelectSport={setSelectedSport} />
      ) : (
        <SportPage sport={selectedSport} onBack={() => setSelectedSport(null)} />
      )}
    </div>
  );
};

export default App;
