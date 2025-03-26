import { useState } from 'react';

const aiModels = [
  { id: 'gemini-pro', name: 'Google Gemini Pro', description: 'Google\'s advanced reasoning model with great performance.' },
  { id: 'gemini-1.5-pro', name: 'Google Gemini 1.5 Pro', description: 'Google\'s newer multimodal model with extended context.' },
  { id: 'gpt-4', name: 'ChatGPT (GPT-4)', description: 'OpenAI\'s most advanced model with strong reasoning capabilities.' },
  { id: 'gpt-3.5-turbo', name: 'ChatGPT (GPT-3.5)', description: 'Powerful and cost-effective OpenAI model.' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Anthropic\'s most capable model for complex tasks.' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced Claude model for everyday use.' },
  { id: 'llama-3', name: 'Meta LLaMA 3', description: 'Meta\'s open-source foundational language model.' },
];

const ModelSelector = ({ selectedModel, setSelectedModel }) => {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">AI Modelini Seçin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiModels.map((model) => (
          <div
            key={model.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedModel === model.id
                ? 'border-primary bg-primary bg-opacity-10'
                : 'border-gray-200 hover:border-primary'
            } ${model.id.includes('gemini') ? 'ring-2 ring-primary ring-opacity-30' : ''}`}
            onClick={() => setSelectedModel(model.id)}
          >
            <div className="flex items-center mb-2">
              <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                selectedModel === model.id ? 'border-primary' : 'border-gray-300'
              }`}>
                {selectedModel === model.id && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <h3 className="font-medium">{model.name}</h3>
              {model.id.includes('gemini') && (
                <span className="ml-2 text-xs bg-primary text-white px-1 py-0.5 rounded">Ücretsiz</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector; 