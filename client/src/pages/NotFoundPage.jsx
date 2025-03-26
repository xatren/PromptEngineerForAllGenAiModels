import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönüp tekrar deneyin.
        </p>
        <Link to="/" className="btn btn-primary">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 