import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import EventList from './EventList';
import styles from '../styles/GameContainer.module.css';

const GameContainer: React.FC = () => {
  const { state, dispatch } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for celebration animation
  useEffect(() => {
    if (state.resultStatus === 'correct' && containerRef.current) {
      containerRef.current.classList.add('celebrating');
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove('celebrating');
        }
      }, 500);
    }
  }, [state.resultStatus]);
  
  // Handle submit button click
  const handleSubmit = () => {
    if (state.gameOver) {
      dispatch({ type: 'INIT_GAME' });
    } else {
      dispatch({ type: 'CHECK_ORDER' });
    }
  };
  
  return (
    <div className={styles.gameContainer} ref={containerRef}>
      <div className={styles.attemptsCounter}>
        Attempt: <span>{state.attemptCount}</span>/5
      </div>
      <div className={styles.streakCounter}>
        Current Streak: <span>{state.streak}</span>
      </div>
      
      <div className={styles.gameInstructions}>
        <p>Arrange these 6 historical events in chronological order (oldest to most recent).</p>
        <p>Drag and drop the events to reorder them. You have 5 attempts.</p>
      </div>
      
      <p className={styles.dragInstructions}>Drag events to reorder them ↕️</p>
      
      <EventList />
      
      <button 
        className={styles.submitBtn} 
        onClick={handleSubmit}
      >
        {state.gameOver ? 'Play Again' : 'Submit Order'}
      </button>
      
      {state.resultMessage && (
        <div 
          className={`${styles.resultMessage} ${state.resultStatus ? styles[state.resultStatus] : ''}`}
          dangerouslySetInnerHTML={{ __html: state.resultMessage }}
        />
      )}
    </div>
  );
};

export default GameContainer;
