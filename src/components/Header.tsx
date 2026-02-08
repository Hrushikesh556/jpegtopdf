import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const PAGE_PATHS: Record<string, string> = {
  'home': '/',
  'png-to-pdf': '/png-to-pdf',
  'jpeg-to-pdf': '/jpeg-to-pdf',
  'image-to-pdf': '/image-to-pdf',
  'how-to-guide': '/how-to-convert-jpg-to-pdf',
  'faq': '/faq',
  'blog': '/blog',
  'about': '/about',
  'contact': '/contact',
  'privacy': '/privacy-policy',
  'terms': '/terms-of-service',
};

function NavLink({ page, children, onClick, className }: {
  page: string;
  children: React.ReactNode;
  onClick: (page: string) => void;
  className?: string;
}) {
  const href = PAGE_PATHS[page] || '/';
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick(page);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toolLinks = [
    { id: 'home', label: 'JPG to PDF', icon: '🖼️', desc: 'Convert JPG images to PDF' },
    { id: 'png-to-pdf', label: 'PNG to PDF', icon: '🎨', desc: 'Convert PNG images to PDF' },
    { id: 'jpeg-to-pdf', label: 'JPEG to PDF', icon: '📸', desc: 'Convert JPEG photos to PDF' },
    { id: 'image-to-pdf', label: 'Image to PDF', icon: '🏞️', desc: 'Convert any image to PDF' },
  ];

  const navLinks = [
    { id: 'how-to-guide', label: 'How-To Guide', icon: '📖' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'blog', label: 'Blog', icon: '✍️' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" role="banner">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink
          page="home"
          onClick={onNavigate}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
            PDF
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-gray-900 block leading-tight">JPG to PDF</span>
            <span className="text-[10px] text-gray-400 block leading-tight">Free Online Converter</span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {/* Tools Dropdown */}
          <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
            <button
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                ['home', 'png-to-pdf', 'jpeg-to-pdf', 'image-to-pdf'].includes(currentPage)
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
              aria-haspopup="true"
              aria-expanded={toolsOpen}
            >
              🔧 Tools
              <svg className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                {toolLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    page={link.id}
                    onClick={(page) => { onNavigate(page); setToolsOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-gray-50 transition ${
                      currentPage === link.id ? 'bg-red-50' : ''
                    }`}
                  >
                    <span className="text-lg mt-0.5">{link.icon}</span>
                    <div>
                      <span className={`text-sm font-semibold block ${currentPage === link.id ? 'text-red-600' : 'text-gray-900'}`}>{link.label}</span>
                      <span className="text-xs text-gray-500">{link.desc}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              page={link.id}
              onClick={onNavigate}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === link.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="mr-1">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-2">
          <NavLink
            page="home"
            onClick={onNavigate}
            className="hidden md:block px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:from-red-600 hover:to-orange-600 transition shadow-md"
          >
            Convert Now →
          </NavLink>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Tools</p>
          {toolLinks.map((link) => (
            <NavLink
              key={link.id}
              page={link.id}
              onClick={(page) => { onNavigate(page); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-3 ${
                currentPage === link.id ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{link.icon}</span>
              <div>
                <span className="block">{link.label}</span>
                <span className="text-xs text-gray-400">{link.desc}</span>
              </div>
            </NavLink>
          ))}

          <div className="border-t border-gray-100 my-2" />

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Resources</p>
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              page={link.id}
              onClick={(page) => { onNavigate(page); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                currentPage === link.id ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{link.icon}</span> {link.label}
            </NavLink>
          ))}

          <div className="border-t border-gray-100 my-2" />

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">More</p>
          {[
            { id: 'about', label: 'About Us', icon: 'ℹ️' },
            { id: 'contact', label: 'Contact', icon: '📧' },
            { id: 'privacy', label: 'Privacy Policy', icon: '🔒' },
            { id: 'terms', label: 'Terms of Service', icon: '📋' },
          ].map((link) => (
            <NavLink
              key={link.id}
              page={link.id}
              onClick={(page) => { onNavigate(page); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                currentPage === link.id ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{link.icon}</span> {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
