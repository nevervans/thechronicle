import express from 'express';
import { gameController } from '../controllers/gameController';

const router = express.Router();

// Get stats route
router.get('/stats', gameController.getStats);

// Save stats route
router.post('/stats', gameController.saveStats);

export default router;
