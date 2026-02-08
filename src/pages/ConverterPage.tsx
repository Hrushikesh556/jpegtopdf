import { useState, useCallback } from 'react';
import { UploadBox } from '../components/UploadBox';
import { SortableImageGrid } from '../components/SortableImageGrid';
import { SettingsPanel } from '../components/SettingsPanel';
import { SeoContent } from '../components/SeoContent';
import { generatePdf } from '../utils/pdfGenerator';
import { ResponsiveAd, SidebarAd, InArticleAd, MultiplexAd } from '../components/AdBanner';
import type { ImageFile, PdfSettings } from '../types';

interface ConverterPageProps {
  title: string;
  description: string;
  acceptTypes?: string;
}

export function ConverterPage({ title, description, acceptTypes }: ConverterPageProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<PdfSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 10,
    imageFit: 'contain',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [conversionCount, setConversionCount] = useState(0);

  const handleImagesAdded = useCallback((newImages: ImageFile[]) => {
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleReorder = useCallback((reordered: ImageFile[]) => {
    setImages(reordered);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setProgress({ current: 0, total: images.length });

    try {
      await generatePdf(images, settings, (current, total) => {
        setProgress({ current, total });
      });
      setConversionCount((c) => c + 1);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div>
      {/* Top Ad */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <ResponsiveAd adSlot="1234567890" className="mb-2" label="Sponsored" />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-red-50 via-orange-50 to-white pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{description}</p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-sm text-gray-500">
            {[
              { icon: '🔒', label: '100% Private' },
              { icon: '⚡', label: 'Instant Convert' },
              { icon: '🆓', label: 'Free Forever' },
              { icon: '📱', label: 'Mobile Friendly' },
              { icon: '🚫', label: 'No Signup' },
            ].map((badge) => (
              <span key={badge.label} className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>

          {/* Social Proof */}
          {conversionCount === 0 && (
            <p className="text-xs text-gray-400 mt-4">
              ⭐ Rated 4.8/5 · Used by 12,000+ people daily · No signup required
            </p>
          )}
          {conversionCount > 0 && (
            <p className="text-xs text-green-600 mt-4 font-medium">
              ✅ {conversionCount} PDF{conversionCount > 1 ? 's' : ''} converted successfully in this session!
            </p>
          )}
        </div>
      </section>

      {/* Converter */}
      <section className="max-w-6xl mx-auto px-4 py-8" id="converter">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <UploadBox onImagesAdded={handleImagesAdded} imageCount={images.length} acceptTypes={acceptTypes} />
            {images.length > 0 && (
              <SortableImageGrid images={images} onReorder={handleReorder} onDelete={handleDelete} />
            )}
          </div>

          <div className="space-y-4">
            <SettingsPanel settings={settings} onSettingsChange={setSettings} />

            <button
              onClick={handleConvert}
              disabled={images.length === 0 || isConverting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg hidden lg:block ${
                images.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : isConverting
                  ? 'bg-orange-400 text-white cursor-wait'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              {isConverting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Converting {progress.current}/{progress.total}...
                </span>
              ) : images.length === 0 ? (
                'Upload Images First'
              ) : (
                `🚀 Convert ${images.length} ${images.length === 1 ? 'Image' : 'Images'} to PDF`
              )}
            </button>

            <div className="hidden lg:block mt-4">
              <SidebarAd adSlot="2345678901" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Button */}
      {images.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-base transition ${
              isConverting
                ? 'bg-orange-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-red-500 to-orange-500 text-white active:scale-[0.98]'
            }`}
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Converting {progress.current}/{progress.total}...
              </span>
            ) : (
              `🚀 Convert ${images.length} ${images.length === 1 ? 'Image' : 'Images'} to PDF`
            )}
          </button>
        </div>
      )}

      {/* Below Tool Ad */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <ResponsiveAd adSlot="3456789012" label="Sponsored" />
      </div>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How to Convert JPG to PDF</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, color: 'red', title: 'Upload Images', desc: 'Drag & drop or click to upload JPG, JPEG, PNG files. Up to 50 at once.' },
            { step: 2, color: 'orange', title: 'Arrange Pages', desc: 'Drag thumbnails to reorder. Delete unwanted images.' },
            { step: 3, color: 'amber', title: 'Configure', desc: 'Set page size, orientation, margins, and image fit mode.' },
            { step: 4, color: 'green', title: 'Download PDF', desc: 'Click Convert and download your PDF instantly.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className={`w-14 h-14 bg-${item.color}-100 text-${item.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}>
                {item.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <InArticleAd adSlot="4567890123" />
      </div>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto px-4 mt-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Our JPG to PDF Converter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🔒', title: 'Privacy First', desc: 'All processing in your browser. Files never leave your device. No server uploads ever.' },
            { icon: '⚡', title: 'Blazing Fast', desc: 'Convert images to PDF in under 3 seconds. No waiting queues or processing delays.' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Desktop, laptop, phone, tablet. Any device, any browser, any operating system.' },
            { icon: '🎯', title: 'Drag & Drop', desc: 'Intuitive drag-and-drop upload and page reordering. Touch-friendly on mobile.' },
            { icon: '⚙️', title: 'Full Control', desc: 'Page size, orientation, margins, image fit — customize your PDF exactly how you need it.' },
            { icon: '🚫', title: 'No Signup', desc: 'No account, no email, no personal info. Just open and convert. Zero friction.' },
          ].map((feature) => (
            <div key={feature.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">More Free PDF Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🖼️', title: 'JPG to PDF', desc: 'Convert JPG images to PDF', page: 'home' },
            { icon: '🎨', title: 'PNG to PDF', desc: 'Convert PNG to PDF', page: 'png-to-pdf' },
            { icon: '📸', title: 'JPEG to PDF', desc: 'Convert JPEG photos to PDF', page: 'jpeg-to-pdf' },
            { icon: '🏞️', title: 'Image to PDF', desc: 'Any image format to PDF', page: 'image-to-pdf' },
          ].map((tool) => (
            <button
              key={tool.title}
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: tool.page }))}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow group text-left"
            >
              <span className="text-2xl group-hover:scale-110 inline-block transition-transform">{tool.icon}</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1 group-hover:text-red-600 transition">{tool.title}</h3>
              <p className="text-xs text-gray-500">{tool.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <SeoContent />

      {/* Multiplex Ad */}
      <div className="max-w-4xl mx-auto px-4 mt-8 mb-4">
        <MultiplexAd adSlot="5678901234" />
      </div>
    </div>
  );
}
