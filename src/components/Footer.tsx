interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li><a href="/jpg-to-pdf" onClick={(e) => handleClick(e, '/jpg-to-pdf')} className="text-gray-400 hover:text-white transition-colors">JPG to PDF</a></li>
              <li><a href="/png-to-pdf" onClick={(e) => handleClick(e, '/png-to-pdf')} className="text-gray-400 hover:text-white transition-colors">PNG to PDF</a></li>
              <li><a href="/jpeg-to-pdf" onClick={(e) => handleClick(e, '/jpeg-to-pdf')} className="text-gray-400 hover:text-white transition-colors">JPEG to PDF</a></li>
              <li><a href="/image-to-pdf" onClick={(e) => handleClick(e, '/image-to-pdf')} className="text-gray-400 hover:text-white transition-colors">Image to PDF</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" onClick={(e) => handleClick(e, '/blog')} className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/faq" onClick={(e) => handleClick(e, '/faq')} className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/how-to-convert-jpg-to-pdf" onClick={(e) => handleClick(e, '/how-to-convert-jpg-to-pdf')} className="text-gray-400 hover:text-white transition-colors">How-To Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" onClick={(e) => handleClick(e, '/about')} className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="/contact" onClick={(e) => handleClick(e, '/contact')} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy-policy" onClick={(e) => handleClick(e, '/privacy-policy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" onClick={(e) => handleClick(e, '/terms-of-service')} className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li><a href="/sitemap" onClick={(e) => handleClick(e, '/sitemap')} className="text-gray-400 hover:text-white transition-colors">HTML Sitemap</a></li>
              <li><a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">XML Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ConvertJPGtoPDF.online - Free JPG to PDF Converter. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            All processing happens in your browser. Your files never leave your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
