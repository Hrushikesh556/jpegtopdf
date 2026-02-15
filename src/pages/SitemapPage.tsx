import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

const sitePages = [
  {
    category: '🔧 Converter Tools',
    pages: [
      { label: 'JPG to PDF Converter', page: 'home', url: '/', desc: 'Convert JPG, JPEG images to PDF online for free' },
      { label: 'PNG to PDF Converter', page: 'png-to-pdf', url: '/png-to-pdf', desc: 'Convert PNG images to PDF documents' },
      { label: 'JPEG to PDF Converter', page: 'jpeg-to-pdf', url: '/jpeg-to-pdf', desc: 'Convert JPEG photos to PDF format' },
      { label: 'Image to PDF Converter', page: 'image-to-pdf', url: '/image-to-pdf', desc: 'Convert any image format to PDF' },
    ],
  },
  {
    category: '📖 Guides & Tutorials',
    pages: [
      { label: 'How to Convert JPG to PDF', page: 'how-to-guide', url: '/how-to-convert-jpg-to-pdf', desc: 'Complete step-by-step guide' },
      { label: 'Blog & Articles', page: 'blog', url: '/blog', desc: 'Tips, guides, and tutorials' },
      { label: 'FAQ', page: 'faq', url: '/faq', desc: 'Frequently asked questions' },
    ],
  },
  {
    category: '🏢 Company',
    pages: [
      { label: 'About Us', page: 'about', url: '/about', desc: 'Learn about our mission and team' },
      { label: 'Contact Us', page: 'contact', url: '/contact', desc: 'Get in touch with us' },
      { label: 'Privacy Policy', page: 'privacy', url: '/privacy-policy', desc: 'How we handle your data' },
      { label: 'Terms of Service', page: 'terms', url: '/terms-of-service', desc: 'Usage terms and conditions' },
      { label: 'Sitemap', page: 'sitemap', url: '/sitemap', desc: 'This page — all site pages listed' },
    ],
  },
];

export function SitemapPage({ onNavigate }: SitemapPageProps) {
  return (
    <div>
      <SEOHead
        title="Sitemap - JPG to PDF Converter | All Pages"
        description="Complete sitemap of JPG to PDF Converter website. Find all tools, guides, tutorials, and pages in one place."
        canonical="https://convertjpgtopdf.online/sitemap"
        keywords="sitemap, jpg to pdf pages, site map, all pages"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Sitemap' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Sitemap</h1>
        <p className="text-gray-600 mb-8">Complete list of all pages on JPG to PDF Converter.</p>

        <div className="space-y-8">
          {sitePages.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{section.category}</h2>
              <div className="space-y-2">
                {section.pages.map((page) => (
                  <div
                    key={page.page}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition flex items-center justify-between group"
                  >
                    <div>
                      <button
                        onClick={() => onNavigate(page.page)}
                        className="font-semibold text-gray-900 group-hover:text-red-600 transition text-left"
                      >
                        {page.label}
                      </button>
                      <p className="text-sm text-gray-500 mt-0.5">{page.desc}</p>
                      <p className="text-xs text-gray-400 mt-0.5 font-mono">{page.url}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
