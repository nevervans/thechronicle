import { Request, Response } from 'express';

// In a real app, this would connect to a database
let globalStats = {
  totalGames: 0,
  correctGuesses: 0,
  incorrectGuesses: 0,
  longestStreak: 0,
};

export const gameController = {
  // Get game stats
  getStats: (req: Request, res: Response) => {
    res.json({
      success: true,
      data: globalStats,
    });
  },
  
  // Save game stats
  saveStats: (req: Request, res: Response) => {
    const { correct, streak } = req.body;
    
    globalStats.totalGames += 1;
    
    if (correct) {
      globalStats.correctGuesses += 1;
    } else {
      globalStats.incorrectGuesses += 1;
    }
    
    if (streak > globalStats.longestStreak) {
      globalStats.longestStreak = streak;
    }
    
    res.json({
      success: true,
      data: globalStats,
    });
  },
};
