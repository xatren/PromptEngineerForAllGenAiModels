import { useState, useEffect } from 'react';
import axios from 'axios';
import SavedPromptCard from '../components/SavedPromptCard';

const SavedPromptsPage = () => {
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    fetchSavedPrompts();
  }, []);
  
  const fetchSavedPrompts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/prompts/saved');
      setSavedPrompts(response.data);
    } catch (error) {
      console.error('Kaydedilmiş promptlar getirilirken hata:', error);
      alert('Kaydedilmiş promptlar yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeletePrompt = async (promptId) => {
    try {
      await axios.delete(`/api/prompts/${promptId}`);
      // Update the local state
      setSavedPrompts(savedPrompts.filter(prompt => prompt._id !== promptId));
    } catch (error) {
      console.error('Prompt silinirken hata:', error);
      alert('Prompt silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  const filteredPrompts = filter === 'all' 
    ? savedPrompts 
    : savedPrompts.filter(prompt => prompt.useCase === filter);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Kaydedilmiş Promptlar</h1>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filtrele:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Tümü</option>
            <option value="creative-writing">Yaratıcı Yazı</option>
            <option value="business">İş & Pazarlama</option>
            <option value="programming">Programlama & Kod</option>
            <option value="education">Eğitim & Öğretim</option>
            <option value="data-analysis">Veri Analizi</option>
            <option value="personal-assistant">Kişisel Asistan</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : filteredPrompts.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 p-6 rounded-lg inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 text-gray-500 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-700">Henüz Kaydedilmiş Prompt Bulunmuyor</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            {filter === 'all' 
              ? 'Prompt Oluşturucuyu kullanarak yeni promptlar oluşturup kaydedebilirsiniz.'
              : 'Seçili filtreye uygun kaydedilmiş prompt bulunamadı. Lütfen farklı bir filtre seçin veya yeni promptlar oluşturun.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <SavedPromptCard 
              key={prompt._id} 
              prompt={prompt} 
              onDelete={handleDeletePrompt} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPromptsPage; 