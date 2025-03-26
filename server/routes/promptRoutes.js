import express from 'express';
import {
  generatePrompt,
  savePrompt,
  getSavedPrompts,
  deletePrompt
} from '../controllers/simpleController.js';

const router = express.Router();

// Generate a prompt
router.post('/generate', generatePrompt);

// Save a prompt
router.post('/save', savePrompt);

// Get all saved prompts
router.get('/saved', getSavedPrompts);

// Delete a prompt
router.delete('/:id', deletePrompt);

export default router; 