import express from 'express';
import { generatePrompt } from '../controllers/promptGeneratorController.js';

const router = express.Router();

// Route to generate a prompt
router.post('/generate', generatePrompt);

export default router; 