import { ResponsiveAd } from './AdBanner';

interface FooterProps {
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
  'sitemap': '/sitemap',
};

function FooterLink({ page, children, onNavigate }: {
  page: string;
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}) {
  const href = PAGE_PATHS[page] || '/';
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page);
      }}
      className="hover:text-white transition"
    >
      {children}
    </a>
  );
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16" role="contentinfo">
      {/* Footer Ad */}
      <div className="bg-gray-800 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <ResponsiveAd adSlot="9012345678" label="Sponsored" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                PDF
              </div>
              <span className="text-white font-bold">JPG to PDF Converter</span>
            </a>
            <p className="text-sm leading-relaxed mb-4">
              The fastest, most private way to convert images to PDF online. No signup, no server uploads,
              100% free. Trusted by millions of users worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded-full">🔒 100% Private</span>
              <span className="bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">⚡ Instant</span>
              <span className="bg-orange-900/50 text-orange-400 px-2 py-1 rounded-full">🆓 Free</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">PDF Tools</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { page: 'home', label: 'JPG to PDF' },
                { page: 'png-to-pdf', label: 'PNG to PDF' },
                { page: 'jpeg-to-pdf', label: 'JPEG to PDF' },
                { page: 'image-to-pdf', label: 'Image to PDF' },
              ].map((link) => (
                <li key={link.page}>
                  <FooterLink page={link.page} onNavigate={onNavigate}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
              <li><span className="text-gray-600">PDF to JPG (Coming Soon)</span></li>
              <li><span className="text-gray-600">Compress PDF (Coming Soon)</span></li>
              <li><span className="text-gray-600">Merge PDF (Coming Soon)</span></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { page: 'how-to-guide', label: 'How-To Guide' },
                { page: 'faq', label: 'FAQ' },
                { page: 'blog', label: 'Blog & Guides' },
              ].map((link) => (
                <li key={link.page}>
                  <FooterLink page={link.page} onNavigate={onNavigate}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { page: 'about', label: 'About Us' },
                { page: 'contact', label: 'Contact Us' },
                { page: 'privacy', label: 'Privacy Policy' },
                { page: 'terms', label: 'Terms of Service' },
                { page: 'sitemap', label: 'Sitemap' },
              ].map((link) => (
                <li key={link.page}>
                  <FooterLink page={link.page} onNavigate={onNavigate}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Link Cloud - SEO Keywords */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3 text-center">Popular Searches</h4>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[
              'JPG to PDF', 'Convert JPG to PDF', 'JPEG to PDF', 'PNG to PDF', 'Image to PDF',
              'Free JPG to PDF Converter', 'JPG to PDF Online', 'Photo to PDF', 'Picture to PDF',
              'JPG to PDF No Signup', 'JPG to PDF Mobile', 'Combine Images to PDF',
              'Convert Pictures to PDF', 'JPEG to PDF Free', 'Merge JPG to PDF',
              'Multiple Images to PDF', 'JPG to PDF Without Login', 'Image to PDF Online Free',
              'Convert Photo to PDF', 'Scan to PDF', 'JPG to PDF Converter Free',
              'Batch Image to PDF', 'Convert Image to PDF Online',
            ].map((keyword) => (
              <a
                key={keyword}
                href="/"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                className="text-[10px] bg-gray-800 text-gray-500 hover:text-gray-300 px-2.5 py-1 rounded-full transition"
              >
                {keyword}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p className="text-gray-500">© {new Date().getFullYear()} JPG to PDF Converter. All rights reserved.</p>
          <p className="mt-1 text-gray-600 text-xs">
            Free online image to PDF converter. No login, no signup, no watermark. 100% client-side processing.
          </p>
          <p className="mt-2 text-gray-700 text-[10px]">
            This site uses Google AdSense for advertising. We use minimal, non-intrusive ads to keep our tools free for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
