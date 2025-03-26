import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'apikey');

// Map of model names to their API identifiers
const modelMap = {
  'gemini-pro': 'gemini-pro',
  'gemini-1.5-pro': 'gemini-1.5-pro',
  'gemini-1.5-flash': 'gemini-1.5-flash',
};

// Function to generate a prompt using Gemini API
export const generatePrompt = async (req, res) => {
  try {
    const { model, useCase, taskDescription, additionalContext, constraints } = req.body;

    if (!taskDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Task description is required' 
      });
    }

    // Get the model identifier
    const modelId = modelMap[model] || 'gemini-pro';
    
    // Initialize the model
    const genModel = genAI.getGenerativeModel({ model: modelId });

    // Structure the prompt for the AI
    let promptTemplate = `You are an expert prompt engineer. Create a high-quality, effective prompt for ${useCase || 'general use'} with the following details:

TASK: ${taskDescription}
${additionalContext ? `ADDITIONAL CONTEXT: ${additionalContext}` : ''}
${constraints ? `CONSTRAINTS: ${constraints}` : ''}

Please provide:
1. A detailed, well-structured prompt that will guide an AI to produce excellent results for this task
2. 2-3 tips for getting better results with this prompt

Format your response as a JSON object with the following structure:
{
  "prompt": "The complete prompt text goes here",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Focus on clarity, specificity, and providing the right level of guidance. Include any relevant formatting, examples, or constraints that will help the AI understand exactly what is needed.`;

    // Generate content
    const result = await genModel.generateContent(promptTemplate);
    const response = result.response;
    const text = response.text();
    
    // Try to parse the response as JSON
    try {
      // Extract JSON from the response (handles cases where AI includes markdown code blocks)
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
      const jsonString = jsonMatch ? jsonMatch[0].replace(/```json\n|```/g, '') : text;
      
      const parsedResponse = JSON.parse(jsonString);
      
      return res.status(200).json({
        success: true,
        data: {
          prompt: parsedResponse.prompt,
          tips: parsedResponse.tips || [],
          model: model,
          useCase: useCase
        }
      });
    } catch (parseError) {
      // If JSON parsing fails, return the raw text
      console.error('Failed to parse AI response as JSON:', parseError);
      
      return res.status(200).json({
        success: true,
        data: {
          prompt: text,
          tips: [],
          model: model,
          useCase: useCase
        }
      });
    }
  } catch (error) {
    console.error('Error generating prompt:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to generate prompt',
      error: error.message
    });
  }
}; 
