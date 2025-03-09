import React, { useState } from 'react';
import { HistoricalEvent } from '../types';
import EventItem from './EventItem';
import { useGame } from '../context/GameContext';
import styles from '../styles/EventItem.module.css';

const EventList: React.FC = () => {
  const { state, dispatch } = useGame();
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  
  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };
  
  // Handle drag enter (when an item is dragged over another)
  const handleDragEnter = (targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return;
    
    setOverIndex(targetIndex);
    
    // Reorder events when dragging over an item
    dispatch({
      type: 'REORDER_EVENTS', 
      dragIndex: draggingIndex, 
      dropIndex: targetIndex
    });
    
    // Update dragging index to new position
    setDraggingIndex(targetIndex);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setDraggingIndex(null);
    setOverIndex(null);
  };
  
  return (
    <ul className={styles.eventList}>
      {state.shuffledEvents.map((event, index) => (
        <EventItem
          key={event.id}
          event={event}
          index={index}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          isDragging={index === draggingIndex}
          isOver={index === overIndex}
        />
      ))}
    </ul>
  );
};

export default EventList;
