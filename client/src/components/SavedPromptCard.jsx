import { useState } from 'react';

const SavedPromptCard = ({ prompt, onDelete }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleDelete = () => {
    if (window.confirm('Bu kaydedilmiş prompt\'u silmek istediğinizden emin misiniz?')) {
      onDelete(prompt._id);
    }
  };
  
  const truncatePrompt = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between mb-3">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary bg-opacity-10 text-primary rounded-full">
            {prompt.model}
          </span>
          <span className="inline-block ml-2 px-3 py-1 text-xs font-semibold bg-secondary bg-opacity-10 text-secondary rounded-full">
            {prompt.useCase}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(prompt.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="mt-3 mb-4">
        <pre
          className="whitespace-pre-wrap text-gray-800 font-mono text-sm cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? prompt.prompt : truncatePrompt(prompt.prompt)}
        </pre>
        {prompt.prompt.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-xs mt-1 hover:underline"
          >
            {isExpanded ? 'Daha az göster' : 'Devamını oku'}
          </button>
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleCopy}
          className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1"
        >
          {isCopied ? 'Kopyalandı!' : 'Kopyala'}
        </button>
        <button
          onClick={handleDelete}
          className="btn bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default SavedPromptCard; 