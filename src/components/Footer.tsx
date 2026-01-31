import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 15l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-white">JPG to PDF</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Free online converter for images to PDF. Fast, secure, and private.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                  JPG to PDF
                </Link>
              </li>
              <li>
                <Link to="/png-to-pdf" className="text-slate-400 hover:text-white text-sm transition-colors">
                  PNG to PDF
                </Link>
              </li>
              <li>
                <Link to="/pdf-to-jpg" className="text-slate-400 hover:text-white text-sm transition-colors">
                  PDF to JPG
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {currentYear} JPG to PDF Converter. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                ✓ 100% Free
              </span>
              <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                ✓ Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
