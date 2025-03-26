import { useState, useEffect } from 'react';
import { getSavedPrompts, deletePrompt, updatePrompt } from '../services/promptService';

const SavedPromptsPage = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const response = await getSavedPrompts();
      
      if (response && Array.isArray(response)) {
        setPrompts(response);
      } else {
        console.error('Unexpected response format:', response);
        setError('Kaydedilmiş promptları yüklerken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
      setError('Kaydedilmiş promptları yüklerken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (prompt) => {
    setEditingId(prompt._id);
    setEditText(prompt.prompt);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleSaveEdit = async (promptId) => {
    try {
      const promptToUpdate = prompts.find(p => p._id === promptId);
      const updatedPrompt = { 
        ...promptToUpdate, 
        prompt: editText,
        _id: promptId
      };
      
      await updatePrompt(promptId, updatedPrompt);
      setPrompts(prompts.map(p => p._id === promptId ? { ...p, prompt: editText } : p));
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating prompt:', error);
      alert('Prompt güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async (promptId) => {
    if (window.confirm('Bu promptu silmek istediğinizden emin misiniz?')) {
      try {
        await deletePrompt(promptId);
        setPrompts(prompts.filter(p => p._id !== promptId));
      } catch (error) {
        console.error('Error deleting prompt:', error);
        alert('Prompt silinirken bir hata oluştu');
      }
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Prompt panoya kopyalandı!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Kaydedilmiş Promptlar</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl text-gray-600">Kaydedilmiş prompt bulunamadı</h3>
          <p className="mt-2 text-gray-500">Prompt Oluşturucu'yu kullanarak yeni promptlar oluşturup kaydedebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="card border border-gray-200 hover:shadow-md transition-all">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <div>
                  <span className="px-2 py-1 text-xs font-medium bg-primary bg-opacity-10 text-primary rounded">
                    {prompt.model || 'Generic'}
                  </span>
                  {prompt.useCase && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-secondary bg-opacity-10 text-secondary rounded">
                      {prompt.useCase}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleCopy(prompt.prompt)} 
                    className="text-gray-500 hover:text-primary p-1"
                    title="Kopyala"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleEdit(prompt)} 
                    className="text-gray-500 hover:text-secondary p-1"
                    title="Düzenle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(prompt._id)} 
                    className="text-gray-500 hover:text-red-500 p-1"
                    title="Sil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                {editingId === prompt._id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 min-h-[120px] font-mono text-sm"
                    />
                    <div className="flex justify-end mt-3 space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => handleSaveEdit(prompt._id)}
                        className="px-3 py-1 text-sm bg-secondary text-white rounded hover:bg-secondary-dark"
                      >
                        Kaydet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-3 rounded min-h-[120px] mb-3">
                      {prompt.prompt}
                    </div>
                    
                    {prompt.tips && prompt.tips.length > 0 && (
                      <div className="mt-3 bg-yellow-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-2">İpuçları:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {prompt.tips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-700">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
                {new Date(prompt.createdAt).toLocaleString('tr-TR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPromptsPage; 