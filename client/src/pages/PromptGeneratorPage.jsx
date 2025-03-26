import { useState } from 'react';
import ModelSelector from '../components/ModelSelector';
import UseCaseSelector from '../components/UseCaseSelector';
import PromptForm from '../components/PromptForm';
import PromptResult from '../components/PromptResult';
import { generatePrompt, savePrompt } from '../services/promptService';

const PromptGeneratorPage = () => {
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [selectedUseCase, setSelectedUseCase] = useState('creative-writing');
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleGeneratePrompt = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generatePrompt({
        model: selectedModel,
        useCase: selectedUseCase,
        taskDescription: formData.taskDescription,
        additionalContext: formData.additionalContext,
        constraints: formData.constraints
      });
      
      // Google Gemini API yanıtı kontrolü
      if (response.data) {
        setGeneratedPrompt(response.data);
        // Scroll to results if on mobile
        if (window.innerWidth < 768) {
          setTimeout(() => {
            const resultElement = document.getElementById('prompt-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      } else {
        console.error('Unexpected response format:', response);
        throw new Error('Prompt oluşturulurken bir hata oluştu');
      }
    } catch (error) {
      console.error('Prompt oluşturulurken hata:', error);
      setError('Prompt oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSavePrompt = async (promptText) => {
    try {
      // In-memory sunucu için veri yapısını ayarlayalım
      const promptData = {
        model: selectedModel,
        useCase: selectedUseCase,
        prompt: promptText,
        tips: generatedPrompt.tips || []
      };
      
      const result = await savePrompt(promptData);
      
      if (result && result._id) {
        alert('Prompt başarıyla kaydedildi!');
        return true;
      } else {
        console.error('Unexpected save result:', result);
        throw new Error('Prompt kaydedilirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Prompt kaydedilirken hata:', error);
      alert('Prompt kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
      return false;
    }
  };
  
  const handleEditPrompt = (updatedPrompt) => {
    setGeneratedPrompt({
      ...generatedPrompt,
      prompt: updatedPrompt
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prompt Oluşturucu</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-1 lg:order-1">
          <ModelSelector 
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
          <UseCaseSelector
            selectedUseCase={selectedUseCase}
            setSelectedUseCase={setSelectedUseCase}
          />
        </div>
        
        <div className="lg:col-span-2 order-2 lg:order-2">
          <PromptForm 
            onGeneratePrompt={handleGeneratePrompt}
            isLoading={isLoading}
          />
          
          {generatedPrompt && (
            <div id="prompt-result">
              <PromptResult
                promptData={generatedPrompt}
                onSave={handleSavePrompt}
                onEdit={handleEditPrompt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGeneratorPage; 