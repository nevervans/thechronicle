import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState, GameAction, EventSet } from '../types';
import { getRandomEventSet, shuffleArray } from '../data/eventSets';

// Initial state
const initialState: GameState = {
  currentEventSet: [],
  shuffledEvents: [],
  attemptCount: 1,
  gameOver: false,
  streak: 0,
  resultMessage: null,
  resultStatus: null,
  isDarkMode: false,
};

// Create context
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

// Sound effects
const playSound = (type: 'drag' | 'drop' | 'correct' | 'incorrect') => {
  // Only play if sound is enabled
  if (localStorage.getItem('soundEnabled') === 'false') return;
  
  // Different sound for different actions
  let frequency, duration;
  
  switch(type) {
    case 'drag':
      frequency = 300;
      duration = 50;
      break;
    case 'drop':
      frequency = 400;
      duration = 50;
      break;
    case 'correct':
      frequency = 600;
      duration = 200;
      break;
    case 'incorrect':
      frequency = 200;
      duration = 200;
      break;
    default:
      frequency = 400;
      duration = 100;
  }
  
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.1;
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      context.close();
    }, duration);
  } catch (e) {
    console.log('Web Audio API not supported');
  }
};

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'INIT_GAME': {
      const currentEventSet = getRandomEventSet();
      const shuffledEvents = shuffleArray([...currentEventSet]);
      
      return {
        ...state,
        currentEventSet,
        shuffledEvents,
        attemptCount: 1,
        gameOver: false,
        resultMessage: null,
        resultStatus: null,
      };
    }
    
    case 'TOGGLE_DARK_MODE': {
      const isDarkMode = !state.isDarkMode;
      
      if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
        document.body.classList.add('dark-mode');
      } else {
        localStorage.setItem('darkMode', 'disabled');
        document.body.classList.remove('dark-mode');
      }
      
      playSound('drop');
      
      return {
        ...state,
        isDarkMode,
      };
    }
    
    case 'REORDER_EVENTS': {
      const { dragIndex, dropIndex } = action;
      const newShuffledEvents = [...state.shuffledEvents];
      const [movedEvent] = newShuffledEvents.splice(dragIndex, 1);
      newShuffledEvents.splice(dropIndex, 0, movedEvent);
      
      playSound('drop');
      
      return {
        ...state,
        shuffledEvents: newShuffledEvents,
      };
    }
    
    case 'CHECK_ORDER': {
      // Sort years to get correct order
      const currentOrder = state.shuffledEvents.map(event => event.year);
      const correctOrder = [...currentOrder].sort((a, b) => a - b);
      
      // Check if order is correct
      let isCorrect = true;
      for (let i = 0; i < currentOrder.length; i++) {
        if (currentOrder[i] !== correctOrder[i]) {
          isCorrect = false;
          break;
        }
      }
      
      if (isCorrect) {
        // Update streak in localStorage
        const newStreak = state.streak + 1;
        localStorage.setItem('streak', newStreak.toString());
        
        playSound('correct');
        
        return {
          ...state,
          streak: newStreak,
          gameOver: true,
          resultMessage: 'Congratulations! You got the correct order!',
          resultStatus: 'correct',
        };
      } else {
        if (state.attemptCount < 5) {
          playSound('incorrect');
          
          return {
            ...state,
            attemptCount: state.attemptCount + 1,
            resultMessage: `Incorrect. Try again! (${6 - (state.attemptCount + 1)} attempts remaining)`,
            resultStatus: 'incorrect',
          };
        } else {
          // Game over after 5 attempts
          // Reset streak
          localStorage.setItem('streak', '0');
          
          // Generate correct order message
          const correctOrder = [...state.currentEventSet].sort((a, b) => a.year - b.year);
          let correctOrderText = 'The correct order was:<br>';
          correctOrder.forEach((event, index) => {
            correctOrderText += `${index + 1}. ${event.text}<br>`;
          });
          
          playSound('incorrect');
          
          return {
            ...state,
            streak: 0,
            gameOver: true,
            resultMessage: `Game over! You've used all 5 attempts.<br>${correctOrderText}`,
            resultStatus: 'game-over',
          };
        }
      }
    }
    
    case 'SET_RESULT': {
      return {
        ...state,
        resultMessage: action.message,
        resultStatus: action.status,
      };
    }
    
    default:
      return state;
  }
};

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Initialize game on mount
  useEffect(() => {
    dispatch({ type: 'INIT_GAME' });
    
    // Load streak from localStorage
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      const streak = parseInt(savedStreak);
      state.streak = streak;
    }
    
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      state.isDarkMode = true;
    }
  }, []);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
