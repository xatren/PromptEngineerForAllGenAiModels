import { useState } from 'react';

const PromptForm = ({ onGeneratePrompt, isLoading }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [constraints, setConstraints] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskDescription.trim()) {
      alert('Lütfen bir görev açıklaması girin.');
      return;
    }
    
    onGeneratePrompt({
      taskDescription,
      additionalContext,
      constraints
    });
  };
  
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Prompt Detaylarını Girin</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Görev Açıklaması <span className="text-red-500">*</span>
          </label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="AI'ın yapmasını istediğiniz görevi açıklayın. Örn: 'React hooks hakkında kapsamlı bir blog yazısı yaz'"
            className="input min-h-[120px] resize-y"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Ne kadar ayrıntılı açıklama yaparsanız, o kadar iyi sonuçlar alırsınız.</p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="additionalContext" className="block text-sm font-medium text-gray-700 mb-1">
            Ek Bağlam (İsteğe Bağlı)
          </label>
          <textarea
            id="additionalContext"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Hedef kitle, içerik uzunluğu, ton, stil gibi ek bilgileri belirtin"
            className="input min-h-[100px] resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">AI'a ek bağlam sağlamak daha hedefli çıktılar almanıza yardımcı olur.</p>
        </div>
        
        <div className="mb-5">
          <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">
            Kısıtlamalar (İsteğe Bağlı)
          </label>
          <textarea
            id="constraints"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="Kaçınılması gereken konular veya uyulması gereken kurallar"
            className="input min-h-[100px] resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">AI'ın neleri yapmaması gerektiğini belirtmek, istenmeyen içerikleri önler.</p>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full flex justify-center items-center py-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Prompt Oluşturuluyor...
            </>
          ) : 'Prompt Oluştur'}
        </button>
      </form>
    </div>
  );
};

export default PromptForm; 