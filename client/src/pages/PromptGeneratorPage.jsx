import { useState } from 'react';
import axios from 'axios';
import ModelSelector from '../components/ModelSelector';
import UseCaseSelector from '../components/UseCaseSelector';
import PromptForm from '../components/PromptForm';
import PromptResult from '../components/PromptResult';

const PromptGeneratorPage = () => {
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [selectedUseCase, setSelectedUseCase] = useState('creative-writing');
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGeneratePrompt = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/prompts/generate', {
        model: selectedModel,
        useCase: selectedUseCase,
        taskDescription: formData.taskDescription,
        additionalContext: formData.additionalContext,
        constraints: formData.constraints
      });
      
      setGeneratedPrompt(response.data);
    } catch (error) {
      console.error('Prompt oluşturulurken hata:', error);
      alert('Prompt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSavePrompt = async (promptText) => {
    try {
      await axios.post('/api/prompts/save', {
        model: selectedModel,
        useCase: selectedUseCase,
        prompt: promptText
      });
      
      alert('Prompt başarıyla kaydedildi!');
    } catch (error) {
      console.error('Prompt kaydedilirken hata:', error);
      alert('Prompt kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  const handleEditPrompt = (updatedPrompt) => {
    setGeneratedPrompt({
      ...generatedPrompt,
      prompt: updatedPrompt
    });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Prompt Oluşturucu</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ModelSelector 
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <UseCaseSelector
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
          />
        </div>
        
        <div className="lg:col-span-2">
          <PromptForm 
            onGeneratePrompt={handleGeneratePrompt}
            isLoading={isLoading}
          />
          
          {generatedPrompt && (
            <PromptResult
              promptData={generatedPrompt}
              onSave={handleSavePrompt}
              onEdit={handleEditPrompt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGeneratorPage; 