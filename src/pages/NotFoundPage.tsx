import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div>
      <SEOHead
        title="Page Not Found - JPG to PDF Converter"
        description="The page you're looking for doesn't exist. Try our free JPG to PDF converter or browse our other tools."
        canonical="https://jpgtopdfconverter.com/"
      />
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 — Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition shadow-lg"
          >
            🚀 Go to JPG to PDF Converter
          </button>
          <button
            onClick={() => onNavigate('sitemap')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
          >
            View Sitemap
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Looking for one of these?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { page: 'home', label: '🖼️ JPG to PDF Converter', desc: 'Convert JPG images to PDF' },
              { page: 'png-to-pdf', label: '🎨 PNG to PDF Converter', desc: 'Convert PNG to PDF' },
              { page: 'jpeg-to-pdf', label: '📸 JPEG to PDF Converter', desc: 'Convert JPEG photos to PDF' },
              { page: 'image-to-pdf', label: '🏞️ Image to PDF Converter', desc: 'Any image to PDF' },
              { page: 'how-to-guide', label: '📖 How-To Guide', desc: 'Step-by-step instructions' },
              { page: 'faq', label: '❓ FAQ', desc: 'Common questions answered' },
              { page: 'blog', label: '✍️ Blog & Guides', desc: 'Tips and tutorials' },
              { page: 'contact', label: '📧 Contact Us', desc: 'Get help and support' },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="text-left p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200 group"
              >
                <span className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition block">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
