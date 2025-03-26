import { GoogleGenerativeAI } from '@google/generative-ai';

// Temporary in-memory storage for prompts
const savedPrompts = [];

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

// @desc    Generate a prompt based on user inputs
// @route   POST /api/prompts/generate
// @access  Public
const generatePrompt = async (req, res) => {
  try {
    const { model, useCase, taskDescription, additionalContext, constraints } = req.body;

    if (!model || !useCase || !taskDescription) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Check if a valid API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Return mock response if no API key
      const mockResponse = {
        model,
        useCase,
        prompt: `Bu bir test prompt'udur - ${model} ve ${useCase} kullanım senaryosu için.\n\nGörev: ${taskDescription}${additionalContext ? `\nEk Bağlam: ${additionalContext}` : ''}${constraints ? `\nKısıtlamalar: ${constraints}` : ''}`,
        tips: [
          'Hedeflerinize uygun belirli bir dil kullanın',
          'Talimatlarınızda net ve özlü olun',
          'Sonuçlara göre test edin ve yinelemeler yapın'
        ]
      };
      return res.status(200).json(mockResponse);
    }

    try {
      // Build the prompt for Gemini
      let prompt = `Sen bir ${model} için uzman prompt mühendisisin. 
      ${useCase} kullanım senaryoları için etkili bir prompt oluştur. 
      Görevin, kullanıcının gereksinimlerine göre mümkün olan en iyi promptu oluşturmaktır.\n\n`;

      prompt += `Görev Açıklaması: ${taskDescription}\n`;
      
      if (additionalContext) {
        prompt += `Ek Bağlam: ${additionalContext}\n`;
      }
      
      if (constraints) {
        prompt += `Kısıtlamalar: ${constraints}\n`;
      }

      prompt += `\nLütfen önce optimize edilmiş promptu ver, ardından "İPUÇLARI:" başlığıyla bu prompttan en iyi sonuçları almak için 3-5 maddelik tavsiyeler listesi ekle.`;

      // Initialize Gemini Pro model
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Call the Gemini API
      const result = await geminiModel.generateContent(prompt);
      const responseText = result.response.text();
      
      // Split the response between the prompt and tips
      const parts = responseText.split('İPUÇLARI:');
      const promptText = parts[0].trim();
      
      // Extract tips if they exist
      let tips = [];
      if (parts.length > 1) {
        // Extract bullet points, removing the bullet characters
        tips = parts[1].split('\n')
          .map(tip => tip.trim().replace(/^[•\-*\d]\.?\s*/, ''))
          .filter(tip => tip.length > 0);
      }

      // Create response object
      const responseData = {
        model,
        useCase,
        prompt: promptText,
        tips
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to mock response if API call fails
      const mockResponse = {
        model,
        useCase,
        prompt: `Bu bir yedek prompt'tur - ${model} ve ${useCase} kullanım senaryosu için.\n\nGörev: ${taskDescription}${additionalContext ? `\nEk Bağlam: ${additionalContext}` : ''}${constraints ? `\nKısıtlamalar: ${constraints}` : ''}`,
        tips: [
          'API çağrısı başarısız oldu - hedefiniz için net bir dil kullanın',
          'Talimatlarınızda açık ve özlü olun',
          'İyi sonuçlar için belirli bilgiler içerin'
        ]
      };
      return res.status(200).json(mockResponse);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Save a prompt to memory
// @route   POST /api/prompts/save
// @access  Public
const savePrompt = async (req, res) => {
  try {
    const { model, useCase, prompt, tips } = req.body;

    if (!model || !useCase || !prompt) {
      return res.status(400).json({ message: 'Model, use case, and prompt are required' });
    }

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
    console.error('Error saving prompt:', error);
    res.status(500).json({ message: 'Error saving prompt', error: error.message });
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
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    res.status(500).json({ message: 'Error deleting prompt', error: error.message });
  }
};

export { generatePrompt, savePrompt, getSavedPrompts, deletePrompt }; 