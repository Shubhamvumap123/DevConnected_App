import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:opacity-80 transition-opacity">
            DevConnect
          </Link>
          <div className="flex space-x-4">
            <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105">
              Login
            </Link>
            <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-200 hover:scale-105">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
