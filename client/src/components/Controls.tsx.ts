import React from 'react';
import { useGame } from '../context/GameContext';
import styles from '../styles/Header.module.css';

const Controls: React.FC = () => {
  const { dispatch } = useGame();
  
  // Handle refresh game
  const handleRefresh = () => {
    dispatch({ type: 'INIT_GAME' });
  };
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
  
  return (
    <div className={styles.controls}>
      <button 
        className={styles.controlBtn} 
        onClick={handleRefresh} 
        title="New Game"
      >
        🔄
      </button>
      <button 
        className={styles.controlBtn} 
        onClick={handleDarkModeToggle} 
        title="Toggle Dark Mode"
      >
        🌓
      </button>
    </div>
  );
};

export default Controls;
