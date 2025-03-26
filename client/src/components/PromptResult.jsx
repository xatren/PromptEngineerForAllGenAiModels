import { useState, useEffect } from 'react';

const PromptResult = ({ promptData, onSave, onEdit }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState(promptData?.prompt || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (promptData) {
      setEditablePrompt(promptData.prompt);
    }
  }, [promptData]);
  
  if (!promptData) return null;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editablePrompt : promptData.prompt);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      onEdit(editablePrompt);
      setIsEditing(false);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };
  
  const handleSave = async () => {
    try {
      const result = await onSave(isEditing ? editablePrompt : promptData.prompt);
      setIsSaved(true);
      
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      
      return result;
    } catch (error) {
      console.error('Error saving prompt:', error);
      return false;
    }
  };
  
  return (
    <div className="card bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 className="text-xl font-bold">Oluşturulan Prompt</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleCopy}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center"
            title="Panoya kopyala"
          >
            {isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kopyalandı
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Kopyala
              </>
            )}
          </button>
          <button 
            onClick={handleEdit}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center"
            title={isEditing ? "Değişiklikleri kaydet" : "Prompt'u düzenle"}
          >
            {isEditing ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Değişiklikleri Kaydet
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Düzenle
              </>
            )}
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-secondary text-sm flex items-center"
            title="Kaydedilenler listesine ekle"
          >
            {isSaved ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kaydedildi
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Kaydet
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        {isEditing ? (
          <textarea
            value={editablePrompt}
            onChange={(e) => setEditablePrompt(e.target.value)}
            className="w-full min-h-[250px] p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-y"
          />
        ) : (
          <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm p-2">
            {promptData.prompt}
          </pre>
        )}
      </div>
      
      <div>
        <h3 className="text-md font-semibold mb-2">Prompt Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium text-gray-700">Model: </span>
            <span className="text-sm">{promptData.model}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium text-gray-700">Kullanım: </span>
            <span className="text-sm">{promptData.useCase}</span>
          </div>
        </div>
        
        {promptData.tips && promptData.tips.length > 0 && (
          <div>
            <h3 className="text-md font-semibold mb-2">İpuçları</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 bg-gray-50 p-4 rounded">
              {promptData.tips.map((tip, index) => (
                <li key={index} className="pb-1 pt-1 border-b border-gray-100 last:border-0">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptResult; 