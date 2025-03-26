import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="py-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-primary">AI Prompt</span> <span className="text-secondary">Engineering</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Seçtiğiniz yapay zeka modeliyle mükemmel prompt'lar oluşturun, düzenleyin ve paylaşın.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="card hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <div className="bg-primary bg-opacity-10 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">AI Modeli Seçin</h2>
          <p className="text-gray-600 text-center mb-4">
            ChatGPT, Claude, Google Gemini ve daha fazlası arasından ihtiyacınıza uygun modeli seçin.
          </p>
          <Link to="/generator" className="btn btn-primary block text-center mt-auto">
            Başlayın
          </Link>
        </div>
        
        <div className="card hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <div className="bg-secondary bg-opacity-10 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-secondary">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Prompt Oluşturun</h2>
          <p className="text-gray-600 text-center mb-4">
            İhtiyacınıza göre özelleştirilmiş, etkili prompt taslakları üretin.
          </p>
          <Link to="/generator" className="btn btn-secondary block text-center mt-auto">
            Prompt Oluştur
          </Link>
        </div>
        
        <div className="card hover:shadow-lg transition-all">
          <div className="flex justify-center mb-4">
            <div className="bg-accent bg-opacity-10 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Kaydedin & Paylaşın</h2>
          <p className="text-gray-600 text-center mb-4">
            Oluşturduğunuz prompt'ları kaydedin, düzenleyin ve başkalarıyla paylaşın.
          </p>
          <Link to="/saved" className="btn bg-accent text-white hover:bg-pink-600 block text-center mt-auto">
            Kaydedilenleri Görüntüle
          </Link>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Desteklenen AI Modelleri</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="py-2 px-4">
            <span className="font-medium">ChatGPT</span>
          </div>
          <div className="py-2 px-4">
            <span className="font-medium">Claude</span>
          </div>
          <div className="py-2 px-4">
            <span className="font-medium">Google Gemini</span>
          </div>
          <div className="py-2 px-4">
            <span className="font-medium">LLaMA</span>
          </div>
          <div className="py-2 px-4">
            <span className="font-medium">Mistral AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 