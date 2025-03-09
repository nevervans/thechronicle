import React from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import Controls from './components/Controls';
import GameContainer from './components/GameContainer';
import Footer from './components/Footer';
import styles from './styles/App.module.css';
import './styles/variables.css';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className={styles.container}>
        <Header />
        <Controls />
        <GameContainer />
        <Footer />
      </div>
    </GameProvider>
  );
};

export default App;
