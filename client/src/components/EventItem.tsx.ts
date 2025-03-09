import React, { useRef } from 'react';
import { HistoricalEvent } from '../types';
import styles from '../styles/EventItem.module.css';

interface EventItemProps {
  event: HistoricalEvent;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isOver: boolean;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
  isOver,
}) => {
  const itemRef = useRef<HTMLLIElement>(null);
  
  // Touch handling variables
  const touchStartTime = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  // Handle drag events
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    onDragStart(index);
    
    // Set drag image (optional for better UX)
    if (itemRef.current) {
      const dragImage = itemRef.current.cloneNode(true) as HTMLElement;
      dragImage.style.opacity = '0.5';
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }
  };
  
  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLLIElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    onDragStart(index);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLLIElement>) => {
    const touchY = e.touches[0].clientY;
    const elementUnderTouch = document.elementFromPoint(
      e.touches[0].clientX,
      touchY
    );
    
    if (!elementUnderTouch) return;
    
    const closestItem = elementUnderTouch.closest(`.${styles.eventItem}`);
    
    if (closestItem && closestItem !== itemRef.current) {
      const itemElements = Array.from(document.querySelectorAll(`.${styles.eventItem}`));
      const targetIndex = itemElements.indexOf(closestItem as HTMLElement);
      if (targetIndex !== -1) {
        onDragEnter(targetIndex);
      }
    }
  };
  
  const handleTouchEnd = () => {
    onDragEnd();
  };
  
  // Combine class names
  const classNames = [
    styles.eventItem,
    isDragging ? styles.dragging : '',
    isOver ? styles.dragOver : '',
  ].join(' ');
  
  return (
    <li
      ref={itemRef}
      className={classNames}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <span className={styles.handle}>⋮⋮</span>
      <span className={styles.eventText}>{event.text}</span>
    </li>
  );
};

export default EventItem;
