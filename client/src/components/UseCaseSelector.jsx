const useCases = [
  { id: 'creative-writing', name: 'Yaratıcı Yazı', description: 'Hikayeler, şiirler veya yaratıcı içerik üretimi.' },
  { id: 'business', name: 'İş & Pazarlama', description: 'İş planları, pazarlama metinleri, raporlar.' },
  { id: 'programming', name: 'Programlama & Kod', description: 'Kod oluşturma, hata ayıklama ve bilişim yardımı.' },
  { id: 'education', name: 'Eğitim & Öğretim', description: 'Öğrenme materyalleri, özet ve açıklamalar.' },
  { id: 'data-analysis', name: 'Veri Analizi', description: 'Veri yorumlama ve analiz görevleri.' },
  { id: 'personal-assistant', name: 'Kişisel Asistan', description: 'Günlük görevler, hatırlatıcılar, organizasyon.' },
];

const UseCaseSelector = ({ selectedUseCase, setSelectedUseCase }) => {
  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Kullanım Senaryonuzu Seçin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((useCase) => (
          <div
            key={useCase.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedUseCase === useCase.id
                ? 'border-secondary bg-secondary bg-opacity-10'
                : 'border-gray-200 hover:border-secondary'
            }`}
            onClick={() => setSelectedUseCase(useCase.id)}
          >
            <div className="flex items-center mb-2">
              <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${
                selectedUseCase === useCase.id ? 'border-secondary' : 'border-gray-300'
              }`}>
                {selectedUseCase === useCase.id && (
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                )}
              </div>
              <h3 className="font-medium">{useCase.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseCaseSelector; 