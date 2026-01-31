import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 15l2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
              JPG to PDF Converter
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent sm:hidden">
              JPG to PDF
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') || isActive('/jpg-to-pdf')
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              JPG to PDF
            </Link>
            <Link 
              to="/privacy-policy" 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/privacy-policy')
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Privacy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/') || isActive('/jpg-to-pdf')
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                JPG to PDF Converter
              </Link>
              <Link 
                to="/privacy-policy" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/privacy-policy')
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}