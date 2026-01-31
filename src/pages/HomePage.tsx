import ImageConverter from '../components/ImageConverter';
import SEOContent from '../components/SEOContent';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            100% Free • No Signup Required
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Convert JPG to PDF Online
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Free online converter to turn your JPG, JPEG, and PNG images into PDF documents. 
            Fast, secure, and works entirely in your browser.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              ✓ Drag & Drop
            </span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              ✓ Reorder Pages
            </span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              ✓ Custom Settings
            </span>
            <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              ✓ Instant Download
            </span>
          </div>
        </div>
      </section>

      {/* Converter */}
      <ImageConverter />

      {/* SEO Content */}
      <SEOContent />
    </>
  );
}
