// Temporary in-memory storage for prompts
const savedPrompts = [];

// @desc    Generate a prompt based on user inputs
// @route   POST /api/prompts/generate
// @access  Public
const generatePrompt = async (req, res) => {
  try {
    const { model, useCase, taskDescription } = req.body;

    if (!model || !useCase || !taskDescription) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Mock response
    const mockResponse = {
      model,
      useCase,
      prompt: `This is a test prompt for ${model} and ${useCase}. Task: ${taskDescription}`,
      tips: ['Tip 1', 'Tip 2', 'Tip 3']
    };

    res.status(200).json(mockResponse);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Save a prompt to memory
// @route   POST /api/prompts/save
// @access  Public
const savePrompt = async (req, res) => {
  try {
    const { model, useCase, prompt, tips } = req.body;

    const newPrompt = {
      _id: Date.now().toString(),
      model,
      useCase,
      prompt,
      tips: tips || [],
      createdAt: new Date().toISOString()
    };

    savedPrompts.push(newPrompt);
    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all saved prompts
// @route   GET /api/prompts/saved
// @access  Public
const getSavedPrompts = async (req, res) => {
  res.status(200).json(savedPrompts);
};

// @desc    Delete a prompt
// @route   DELETE /api/prompts/:id
// @access  Public
const deletePrompt = async (req, res) => {
  try {
    const promptId = req.params.id;
    const index = savedPrompts.findIndex(p => p._id === promptId);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    savedPrompts.splice(index, 1);
    res.status(200).json({ message: 'Prompt deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { generatePrompt, savePrompt, getSavedPrompts, deletePrompt }; 