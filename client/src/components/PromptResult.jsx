import { useState } from 'react';

const PromptResult = ({ promptData, onSave, onEdit }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState(promptData?.prompt || '');
  const [isEditing, setIsEditing] = useState(false);
  
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
  
  const handleSave = () => {
    onSave(isEditing ? editablePrompt : promptData.prompt);
  };
  
  return (
    <div className="card bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Oluşturulan Prompt</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handleCopy}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
          >
            {isCopied ? 'Kopyalandı!' : 'Kopyala'}
          </button>
          <button 
            onClick={handleEdit}
            className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
          >
            {isEditing ? 'Kaydet' : 'Düzenle'}
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-secondary text-sm"
          >
            Kaydet
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {isEditing ? (
          <textarea
            value={editablePrompt}
            onChange={(e) => setEditablePrompt(e.target.value)}
            className="w-full min-h-[200px] p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        ) : (
          <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
            {promptData.prompt}
          </pre>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Hakkında</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium text-gray-700">Model: </span>
            <span className="text-sm">{promptData.model}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium text-gray-700">Kullanım: </span>
            <span className="text-sm">{promptData.useCase}</span>
          </div>
        </div>
        
        {promptData.tips && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">İpuçları</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {promptData.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptResult; 