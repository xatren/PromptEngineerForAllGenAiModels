import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary border-b-2 border-primary' : 'hover:text-primary';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
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
            <button 
              className="text-gray-600 hover:text-primary focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link 
              to="/" 
              className={`block py-2 px-4 ${location.pathname === '/' ? 'bg-primary bg-opacity-10 text-primary' : ''}`}
              onClick={toggleMobileMenu}
            >
              Ana Sayfa
            </Link>
            <Link 
              to="/generator" 
              className={`block py-2 px-4 ${location.pathname === '/generator' ? 'bg-primary bg-opacity-10 text-primary' : ''}`}
              onClick={toggleMobileMenu}
            >
              Prompt Oluşturucu
            </Link>
            <Link 
              to="/saved" 
              className={`block py-2 px-4 ${location.pathname === '/saved' ? 'bg-primary bg-opacity-10 text-primary' : ''}`}
              onClick={toggleMobileMenu}
            >
              Kaydedilenler
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 