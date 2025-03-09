export interface HistoricalEvent {
  id: number;
  text: string;
  year: number;
}

export type EventSet = HistoricalEvent[];

export interface GameState {
  currentEventSet: EventSet;
  shuffledEvents: EventSet;
  attemptCount: number;
  gameOver: boolean;
  streak: number;
  resultMessage: string | null;
  resultStatus: 'correct' | 'incorrect' | 'game-over' | null;
  isDarkMode: boolean;
}

export type GameAction =
  | { type: 'INIT_GAME' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'REORDER_EVENTS', dragIndex: number, dropIndex: number }
  | { type: 'CHECK_ORDER' }
  | { type: 'SET_RESULT', message: string, status: 'correct' | 'incorrect' | 'game-over' };
