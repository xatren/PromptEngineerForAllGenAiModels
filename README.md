# AI Prompt Engineering Tool

Modern ve kullanıcı dostu bir yapay zeka prompt taslağı oluşturma aracı. Bu uygulama, kullanıcıların seçtikleri AI modeline ve kullanım senaryosuna göre en uygun prompt taslaklarını üretir.

## Özellikler

- Farklı AI modellerine (Google Gemini, ChatGPT, Claude vb.) göre prompt oluşturma
- Kullanım senaryosuna göre özelleştirilmiş prompt taslakları
- Prompt düzenleme, kaydetme ve paylaşma özellikleri
- Modern ve responsive tasarım (TailwindCSS ile)
- MongoDB veritabanı entegrasyonu
- Google Gemini API entegrasyonu (ücretsiz)

## Teknolojiler

### Frontend
- React.js
- React Router DOM
- TailwindCSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API entegrasyonu

## Kurulum

### Ön Koşullar
- Node.js (v16+)
- MongoDB
- Google Gemini API Anahtarı

### Google Gemini API Anahtarı Alma
1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin ve Google hesabınızla giriş yapın.
2. "Get API key" butonuna tıklayın.
3. Yeni bir API anahtarı oluşturun.
4. Oluşturulan API anahtarını kopyalayın ve güvenli bir yerde saklayın.

### Kurulum Adımları

1. Projeyi klonlayın:
   ```
   git clone https://github.com/yourusername/prompteng.git
   cd prompteng
   ```

2. Backend için bağımlılıkları yükleyin:
   ```
   cd server
   npm install
   ```

3. Frontend için bağımlılıkları yükleyin:
   ```
   cd ../client
   npm install
   ```

4. `.env` dosyasını düzenleyin:
   ```
   cd ../server
   cp .env.example .env
   ```
   
   `.env` dosyasını açın ve MongoDB URI'yi ve Google Gemini API anahtarınızı ayarlayın.
   ```
   MONGO_URI=mongodb://localhost:27017/prompteng
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. Uygulamayı başlatın:
   
   Backend:
   ```
   cd server
   npm run dev
   ```

   Frontend:
   ```
   cd client
   npm run dev
   ```

6. Tarayıcınızda `http://localhost:3000` adresine gidin.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 