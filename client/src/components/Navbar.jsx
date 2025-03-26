import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary border-b-2 border-primary' : 'hover:text-primary';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Prompt</span>
            <span className="text-2xl font-bold text-secondary">Eng</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`font-medium ${isActive('/')}`}>
              Ana Sayfa
            </Link>
            <Link to="/generator" className={`font-medium ${isActive('/generator')}`}>
              Prompt Oluşturucu
            </Link>
            <Link to="/saved" className={`font-medium ${isActive('/saved')}`}>
              Kaydedilenler
            </Link>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu button - can be expanded later */}
            <button className="text-gray-600 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 