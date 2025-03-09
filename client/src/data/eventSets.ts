import { EventSet } from '../types';

export const allEventSets: EventSet[] = [
  [
    { id: 1, text: "Signing of the Declaration of Independence (1776)", year: 1776 },
    { id: 2, text: "Fall of the Berlin Wall (1989)", year: 1989 },
    { id: 3, text: "First Moon Landing (1969)", year: 1969 },
    { id: 4, text: "Beginning of World War I (1914)", year: 1914 },
    { id: 5, text: "Columbus reaches the Americas (1492)", year: 1492 },
    { id: 6, text: "Construction of the Great Pyramid of Giza (2560 BCE)", year: -2560 }
  ],
  [
    { id: 1, text: "Invention of the Printing Press (1440)", year: 1440 },
    { id: 2, text: "The French Revolution Begins (1789)", year: 1789 },
    { id: 3, text: "The Renaissance Period Begins (1400)", year: 1400 },
    { id: 4, text: "The Industrial Revolution Starts (1760)", year: 1760 },
    { id: 5, text: "The First Crusade (1096)", year: 1096 },
    { id: 6, text: "The Internet is Made Public (1993)", year: 1993 }
  ],
  [
    { id: 1, text: "First iPhone Released (2007)", year: 2007 },
    { id: 2, text: "End of World War II (1945)", year: 1945 },
    { id: 3, text: "The Black Death Ravages Europe (1347)", year: 1347 },
    { id: 4, text: "First Human Heart Transplant (1967)", year: 1967 },
    { id: 5, text: "Wright Brothers' First Flight (1903)", year: 1903 },
    { id: 6, text: "Founding of the Roman Empire (27 BCE)", year: -27 }
  ],
  [
    { id: 1, text: "American Civil War Begins (1861)", year: 1861 },
    { id: 2, text: "Completion of the Great Wall of China (1644)", year: 1644 },
    { id: 3, text: "Sputnik, First Satellite Launched (1957)", year: 1957 },
    { id: 4, text: "Discovery of Penicillin (1928)", year: 1928 },
    { id: 5, text: "First Olympic Games in Greece (776 BCE)", year: -776 },
    { id: 6, text: "Construction of the Colosseum in Rome (80 CE)", year: 80 }
  ],
  [
    { id: 1, text: "Signing of the Magna Carta (1215)", year: 1215 },
    { id: 2, text: "The Russian Revolution (1917)", year: 1917 },
    { id: 3, text: "Fall of Constantinople (1453)", year: 1453 },
    { id: 4, text: "Invention of the Telephone (1876)", year: 1876 },
    { id: 5, text: "Buddha's Enlightenment (528 BCE)", year: -528 },
    { id: 6, text: "First Human in Space - Yuri Gagarin (1961)", year: 1961 }
  ],
];

// Helper function to get a random event set
export const getRandomEventSet = (): EventSet => {
  const index = Math.floor(Math.random() * allEventSets.length);
  return [...allEventSets[index]];
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
