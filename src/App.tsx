import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UploadBox } from './components/UploadBox';
import { SettingsPanel } from './components/SettingsPanel';
import { SortableImageGrid } from './components/SortableImageGrid';
import { generatePdf, downloadPdf, cleanupPdfUrl, type PdfResult } from './utils/pdfGenerator';
import type { ImageFile, PdfSettings } from './types';

// SEO data for each page
interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  h1: string;
}

const pageSEOData: Record<string, PageSEO> = {
  home: {
    title: 'JPG to PDF Converter - Free Online Tool | Convert Images to PDF Instantly',
    description: 'Convert JPG to PDF online for FREE. No signup required, no watermarks, 100% secure. Upload multiple images, reorder pages, and download your PDF instantly.',
    canonical: 'https://convertjpgtopdf.online/',
    h1: 'JPG to PDF Converter - Free Online'
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter - Convert JPG Images to PDF Free Online',
    description: 'Convert JPG files to PDF instantly. Free online JPG to PDF converter with no signup, no watermarks. Drag, drop, convert, and download.',
    canonical: 'https://convertjpgtopdf.online/jpg-to-pdf',
    h1: 'Convert JPG to PDF Online Free'
  },
  'png-to-pdf': {
    title: 'PNG to PDF Converter - Convert PNG Images to PDF Free Online',
    description: 'Convert PNG files to PDF instantly. Free online PNG to PDF converter. Upload multiple PNG images, combine into one PDF. No signup required.',
    canonical: 'https://convertjpgtopdf.online/png-to-pdf',
    h1: 'Convert PNG to PDF Online Free'
  },
  'jpeg-to-pdf': {
    title: 'JPEG to PDF Converter - Convert JPEG Images to PDF Free',
    description: 'Convert JPEG files to PDF online for free. No signup, no watermarks. Upload JPEG images, arrange pages, download PDF instantly.',
    canonical: 'https://convertjpgtopdf.online/jpeg-to-pdf',
    h1: 'Convert JPEG to PDF Online Free'
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter - Convert Any Image to PDF Free Online',
    description: 'Convert images to PDF online. Support for JPG, JPEG, PNG. Free image to PDF converter with no signup. Combine multiple images into one PDF.',
    canonical: 'https://convertjpgtopdf.online/image-to-pdf',
    h1: 'Convert Images to PDF Online Free'
  },
  blog: {
    title: 'Blog & Guides - JPG to PDF Converter Tips | ConvertJPGtoPDF.online',
    description: 'Learn PDF conversion tips, image optimization guides, and best practices. Expert tutorials on converting JPG, PNG to PDF.',
    canonical: 'https://convertjpgtopdf.online/blog',
    h1: 'Blog & Guides'
  },
  faq: {
    title: 'FAQ - Frequently Asked Questions | JPG to PDF Converter',
    description: 'Find answers to common questions about converting JPG to PDF. Learn about our free converter, privacy, supported formats, and more.',
    canonical: 'https://convertjpgtopdf.online/faq',
    h1: 'Frequently Asked Questions'
  },
  contact: {
    title: 'Contact Us | JPG to PDF Converter Support',
    description: 'Get in touch with the JPG to PDF Converter team. Questions, feedback, or support - we are here to help.',
    canonical: 'https://convertjpgtopdf.online/contact',
    h1: 'Contact Us'
  },
  about: {
    title: 'About Us | Free JPG to PDF Converter - Our Mission',
    description: 'Learn about ConvertJPGtoPDF.online - our mission to provide free, private, and fast image to PDF conversion for everyone.',
    canonical: 'https://convertjpgtopdf.online/about',
    h1: 'About JPG to PDF Converter'
  },
  privacy: {
    title: 'Privacy Policy | JPG to PDF Converter - Your Privacy Matters',
    description: 'Read our privacy policy. Your files never leave your device. We prioritize your privacy with 100% client-side processing.',
    canonical: 'https://convertjpgtopdf.online/privacy-policy',
    h1: 'Privacy Policy'
  },
  terms: {
    title: 'Terms of Service | JPG to PDF Converter',
    description: 'Terms of Service for ConvertJPGtoPDF.online. Read about acceptable use, disclaimers, and your rights.',
    canonical: 'https://convertjpgtopdf.online/terms-of-service',
    h1: 'Terms of Service'
  },
  howto: {
    title: 'How to Convert JPG to PDF - Complete Step-by-Step Guide',
    description: 'Learn how to convert JPG images to PDF with our complete guide. Step-by-step instructions, tips, and best practices for perfect PDF conversion.',
    canonical: 'https://convertjpgtopdf.online/how-to-convert-jpg-to-pdf',
    h1: 'How to Convert JPG to PDF - Complete Guide'
  },
  sitemap: {
    title: 'Sitemap | JPG to PDF Converter - All Pages',
    description: 'Browse all pages on ConvertJPGtoPDF.online. Find tools, guides, and resources for converting images to PDF.',
    canonical: 'https://convertjpgtopdf.online/sitemap',
    h1: 'Sitemap'
  }
};

// Update page meta tags dynamically
const updatePageSEO = (pageKey: string) => {
  const seo = pageSEOData[pageKey] || pageSEOData.home;
  
  // Update title
  document.title = seo.title;
  
  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', seo.description);
  }
  
  // Update canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', seo.canonical);
  }
  
  // Update OG tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.title);
  
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.description);
  
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', seo.canonical);
  
  // Update Twitter tags
  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', seo.title);
  
  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', seo.description);
};

// Page mapping for URL routing
const getPageFromPath = (path: string): string => {
  const routes: Record<string, string> = {
    '/': 'home',
    '/jpg-to-pdf': 'jpg-to-pdf',
    '/png-to-pdf': 'png-to-pdf',
    '/jpeg-to-pdf': 'jpeg-to-pdf',
    '/image-to-pdf': 'image-to-pdf',
    '/blog': 'blog',
    '/faq': 'faq',
    '/contact': 'contact',
    '/about': 'about',
    '/privacy-policy': 'privacy',
    '/terms-of-service': 'terms',
    '/how-to-convert-jpg-to-pdf': 'howto',
    '/sitemap': 'sitemap',
  };
  return routes[path] || 'home';
};

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<PdfSettings>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 'small',
    imageFit: 'contain',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pdfResult, setPdfResult] = useState<PdfResult | null>(null);

  // Initialize page from URL and update SEO
  useEffect(() => {
    const path = window.location.pathname;
    const pageKey = getPageFromPath(path);
    setCurrentPage(pageKey);
    updatePageSEO(pageKey);
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const pageKey = getPageFromPath(path);
      setCurrentPage(pageKey);
      updatePageSEO(pageKey);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (pdfResult) {
        cleanupPdfUrl(pdfResult.url);
      }
    };
  }, [pdfResult]);

  const navigate = useCallback((path: string) => {
    const pageKey = getPageFromPath(path);
    window.history.pushState({}, '', path);
    setCurrentPage(pageKey);
    updatePageSEO(pageKey);
    window.scrollTo(0, 0);
  }, []);

  const handleFilesAdded = useCallback((newFiles: ImageFile[]) => {
    setError(null);
    // Clear previous PDF result when new files are added
    if (pdfResult) {
      cleanupPdfUrl(pdfResult.url);
      setPdfResult(null);
    }
    setImages(prev => [...prev, ...newFiles]);
  }, [pdfResult]);

  const handleReorderImages = useCallback((reorderedImages: ImageFile[]) => {
    setImages(reorderedImages);
    // Clear previous PDF result when images are reordered
    if (pdfResult) {
      cleanupPdfUrl(pdfResult.url);
      setPdfResult(null);
    }
  }, [pdfResult]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
    // Clear previous PDF result when images are removed
    if (pdfResult) {
      cleanupPdfUrl(pdfResult.url);
      setPdfResult(null);
    }
  }, [pdfResult]);

  const handleClearAll = useCallback(() => {
    setImages([]);
    setError(null);
    if (pdfResult) {
      cleanupPdfUrl(pdfResult.url);
      setPdfResult(null);
    }
  }, [pdfResult]);

  const handleConvert = useCallback(async () => {
    if (images.length === 0) {
      setError('Please add at least one image');
      return;
    }

    // Clear previous result
    if (pdfResult) {
      cleanupPdfUrl(pdfResult.url);
      setPdfResult(null);
    }

    setIsConverting(true);
    setProgress(0);
    setError(null);

    try {
      const result = await generatePdf(images, settings, (p) => {
        setProgress(p);
      });
      
      setPdfResult(result);
      
      // Auto-download the PDF
      downloadPdf(result);
      
    } catch (err) {
      console.error('Conversion error:', err);
      setError(err instanceof Error ? err.message : 'Error converting images. Please try again.');
    } finally {
      setIsConverting(false);
    }
  }, [images, settings, pdfResult]);

  const handleDownloadAgain = useCallback(() => {
    if (pdfResult) {
      downloadPdf(pdfResult);
    }
  }, [pdfResult]);

  // Get dynamic content based on current page
  const getConverterContent = () => {
    const content: Record<string, { h1: string; subtitle: string }> = {
      'home': {
        h1: 'JPG to PDF Converter - Free Online',
        subtitle: 'Convert your JPG, JPEG, and PNG images to PDF instantly. No signup required. 100% free and private.'
      },
      'jpg-to-pdf': {
        h1: 'Convert JPG to PDF Online Free',
        subtitle: 'Transform your JPG images into professional PDF documents. Fast, free, and secure conversion.'
      },
      'png-to-pdf': {
        h1: 'Convert PNG to PDF Online Free',
        subtitle: 'Convert PNG images to PDF format instantly. Perfect for screenshots, graphics, and transparent images.'
      },
      'jpeg-to-pdf': {
        h1: 'Convert JPEG to PDF Online Free',
        subtitle: 'Turn your JPEG photos into PDF documents. Ideal for documents, scans, and digital photos.'
      },
      'image-to-pdf': {
        h1: 'Convert Images to PDF Online Free',
        subtitle: 'Convert any image format (JPG, PNG, JPEG) to PDF. Combine multiple images into one document.'
      }
    };
    return content[currentPage] || content.home;
  };

  // Converter Component
  const ConverterSection = () => {
    const { h1, subtitle } = getConverterContent();
    
    return (
    <>
      {/* Hero */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {h1}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </section>

      {/* Success Message with Download Button */}
      {pdfResult && (
        <div className="mb-6 p-6 bg-green-50 border-2 border-green-400 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">✅</span>
              <div>
                <h3 className="font-bold text-green-800 text-lg">PDF Created Successfully!</h3>
                <p className="text-green-700">Your PDF is ready. If download didn't start, click the button.</p>
              </div>
            </div>
            <button
              onClick={handleDownloadAgain}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-green-300">
            <p className="text-sm text-green-700">
              <strong>File:</strong> {pdfResult.filename} | <strong>Size:</strong> {(pdfResult.blob.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        </div>
      )}

      {/* Main Converter */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <UploadBox 
            onFilesAdded={handleFilesAdded} 
            maxFiles={50}
            currentCount={images.length}
          />
          
          <SortableImageGrid 
            images={images} 
            onReorder={handleReorderImages}
            onRemove={handleRemoveImage}
          />
          
          {images.length > 0 && (
            <div className="mt-6 space-y-4">
              {/* Progress Bar */}
              {isConverting && (
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300 ease-out flex items-center justify-center text-xs text-white font-bold"
                    style={{ width: `${progress}%` }}
                  >
                    {progress > 10 && `${progress}%`}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={isConverting || images.length === 0}
                className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isConverting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Converting... {progress}%
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>🔄</span>
                    Convert {images.length} Image{images.length !== 1 ? 's' : ''} to PDF
                  </span>
                )}
              </button>

              {/* Download Button (appears after conversion) */}
              {pdfResult && !isConverting && (
                <button
                  onClick={handleDownloadAgain}
                  className="w-full bg-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF Again
                </button>
              )}
              
              {/* Clear All Button */}
              <button
                onClick={handleClearAll}
                disabled={isConverting}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                🗑️ Clear All Images
              </button>
            </div>
          )}
        </div>
        
        <div>
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>
      </div>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Convert JPG to PDF</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: '📤', title: '1. Upload', desc: 'Drag & drop or click to upload your images' },
            { icon: '🔀', title: '2. Arrange', desc: 'Drag images to reorder PDF pages' },
            { icon: '⚙️', title: '3. Settings', desc: 'Choose page size, orientation, and margins' },
            { icon: '📥', title: '4. Download', desc: 'Click convert and get your PDF instantly' },
          ].map((step, i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Converter?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔒', title: '100% Private', desc: 'Files processed locally in your browser. Never uploaded to servers.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Instant conversion with no waiting or processing delays.' },
            { icon: '🆓', title: 'Completely Free', desc: 'No hidden fees, watermarks, or premium features.' },
            { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on iPhone, Android, and tablets.' },
            { icon: '🚫', title: 'No Signup', desc: 'Start converting immediately. No account needed.' },
            { icon: '📄', title: 'Multiple Images', desc: 'Combine up to 50 images into one PDF.' },
          ].map((feature, i) => (
            <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose prose-lg max-w-none mb-12">
        <h2>Free JPG to PDF Converter Online</h2>
        <p>
          Looking for a fast, free, and secure way to convert JPG to PDF? Our online JPG to PDF converter
          allows you to convert JPG images to PDF documents instantly, without any software installation
          or registration. Whether you need to convert a single image or combine multiple JPG files into
          one PDF, our tool handles it all with ease.
        </p>
        
        <h3>Convert JPG to PDF Without Signup</h3>
        <p>
          Unlike other online converters that force you to create an account, our JPG to PDF converter
          requires no registration whatsoever. Simply upload your images, adjust settings if needed,
          and download your PDF. It's that simple.
        </p>
        
        <h3>Privacy-First Image to PDF Conversion</h3>
        <p>
          We built this converter with privacy as the top priority. All image processing happens directly
          in your web browser using JavaScript. Your JPG files are never uploaded to any server. They
          never leave your device. This means your sensitive documents, personal photos, and confidential
          images remain completely private.
        </p>
        
        <h3>Combine Multiple JPG Images into One PDF</h3>
        <p>
          Need to combine multiple JPG images into a single PDF document? Our converter makes it easy.
          Upload up to 50 images at once, drag and drop to arrange them in your preferred order, and
          convert them all into one professional PDF file.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I convert JPG to PDF for free?', a: 'Upload your JPG images using the upload box above, arrange them in your preferred order by dragging, select your settings (page size, orientation, margins), and click "Convert to PDF". Your PDF will download automatically.' },
            { q: 'Is this converter safe to use?', a: 'Yes! All processing happens directly in your browser using JavaScript. Your files are never uploaded to any server, ensuring complete privacy and security.' },
            { q: 'Can I convert multiple images at once?', a: 'Absolutely! You can upload up to 50 images at once and combine them into a single PDF document. Simply select multiple files or drag and drop them together.' },
            { q: 'Do I need to create an account?', a: 'No registration or signup is required. Just visit the page, upload your images, and convert immediately. No email, no password, no account needed.' },
            { q: 'Does it work on mobile phones?', a: 'Yes, our converter is fully optimized for mobile devices including iPhone, Android phones, and tablets. The touch-friendly interface makes it easy to upload and convert on the go.' },
          ].map((faq, i) => (
            <details key={i} className="bg-gray-50 rounded-xl p-4 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
    );
  };

  // Other page components
  const BlogPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Guides</h1>
      <p className="text-xl text-gray-600 mb-8">Expert tips, tutorials, and best practices for PDF conversion. Learn how to get the most out of our free tools.</p>
      
      {/* Featured Article */}
      <article className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border border-blue-100">
        <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">FEATURED</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">The Complete Guide to Converting Images to PDF in 2024</h2>
        <p className="text-gray-700 mb-4">Whether you're a student submitting assignments, a professional preparing documents, or just organizing personal files, knowing how to efficiently convert images to PDF is an essential skill. In this comprehensive guide, we'll cover everything you need to know about JPG to PDF conversion, including best practices, common pitfalls, and pro tips.</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>📅 Updated: January 2024</span>
          <span className="mx-2">•</span>
          <span>⏱️ 8 min read</span>
        </div>
      </article>

      {/* Article Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">MOBILE</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Convert JPG to PDF on iPhone & Android</h2>
          <p className="text-gray-600 mb-4">Converting images to PDF on your smartphone is easier than ever. Our mobile-optimized converter works perfectly in Safari, Chrome, and other mobile browsers. Simply visit convertjpgtopdf.online, tap to upload photos from your camera roll or gallery, arrange them in your preferred order, and download your PDF instantly. No app installation required!</p>
          <ul className="text-sm text-gray-600 space-y-1 mb-4">
            <li>✅ Works on all iPhone models (iOS 12+)</li>
            <li>✅ Compatible with Android 8.0 and above</li>
            <li>✅ No app download needed</li>
            <li>✅ Touch-friendly drag & drop interface</li>
          </ul>
          <span className="text-sm text-gray-500">⏱️ 3 min read</span>
        </article>

        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3">TIPS</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Best Practices for Image to PDF Conversion</h2>
          <p className="text-gray-600 mb-4">Get professional-quality PDFs every time by following these expert tips:</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li><strong>Use High Resolution:</strong> Start with images at least 150 DPI for screen viewing, 300 DPI for printing.</li>
            <li><strong>Choose the Right Page Size:</strong> A4 for international documents, Letter for US/Canada.</li>
            <li><strong>Organize First:</strong> Rename files numerically before uploading for easier arrangement.</li>
            <li><strong>Consider Margins:</strong> Add margins if you plan to print or bind the document.</li>
            <li><strong>Optimize File Size:</strong> Compress large images before conversion for smaller PDFs.</li>
          </ul>
          <span className="text-sm text-gray-500">⏱️ 4 min read</span>
        </article>

        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">COMPARISON</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">JPG vs PNG vs JPEG: Which Format Should You Use?</h2>
          <p className="text-gray-600 mb-4">Understanding image formats helps you choose the right source files for PDF conversion:</p>
          <div className="space-y-3 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <strong className="text-gray-900">JPG/JPEG</strong>
              <p className="text-gray-600">Best for photographs and images with gradients. Uses lossy compression, smaller file sizes. Ideal for scanned documents, photos.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <strong className="text-gray-900">PNG</strong>
              <p className="text-gray-600">Best for screenshots, logos, and images with text. Supports transparency. Larger files but no quality loss.</p>
            </div>
          </div>
          <span className="text-sm text-gray-500 mt-4 block">⏱️ 5 min read</span>
        </article>

        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3">SECURITY</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why Client-Side Processing Matters for Privacy</h2>
          <p className="text-gray-600 mb-4">Many online converters upload your files to their servers, creating privacy and security risks. Here's why our browser-based approach is safer:</p>
          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>🔒 <strong>Zero Server Upload:</strong> Your files never leave your device</li>
            <li>🛡️ <strong>No Data Retention:</strong> Nothing to delete because nothing is stored</li>
            <li>⚡ <strong>Faster Processing:</strong> No upload/download time needed</li>
            <li>🌐 <strong>Works Offline:</strong> After initial load, works without internet</li>
            <li>✅ <strong>GDPR Compliant:</strong> No personal data collection</li>
          </ul>
          <span className="text-sm text-gray-500">⏱️ 4 min read</span>
        </article>

        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-3">USE CASES</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10 Common Uses for JPG to PDF Conversion</h2>
          <ol className="text-sm text-gray-600 space-y-2 mb-4 list-decimal list-inside">
            <li>Submitting scanned documents for applications</li>
            <li>Creating photo albums and portfolios</li>
            <li>Archiving receipts and invoices</li>
            <li>Preparing presentations from screenshots</li>
            <li>Submitting homework assignments</li>
            <li>Creating e-books from scanned pages</li>
            <li>Sending multiple images as one attachment</li>
            <li>Preparing documents for digital signatures</li>
            <li>Archiving medical records and certificates</li>
            <li>Creating instruction manuals with images</li>
          </ol>
          <span className="text-sm text-gray-500">⏱️ 3 min read</span>
        </article>

        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">TROUBLESHOOTING</span>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Common PDF Conversion Problems & Solutions</h2>
          <div className="text-sm space-y-3">
            <div>
              <strong className="text-gray-900">Problem: PDF file is too large</strong>
              <p className="text-gray-600">Solution: Compress images before uploading, or use JPG format instead of PNG.</p>
            </div>
            <div>
              <strong className="text-gray-900">Problem: Images appear blurry</strong>
              <p className="text-gray-600">Solution: Use higher resolution source images (at least 150 DPI).</p>
            </div>
            <div>
              <strong className="text-gray-900">Problem: Wrong page order</strong>
              <p className="text-gray-600">Solution: Use our drag-and-drop reorder feature before converting.</p>
            </div>
            <div>
              <strong className="text-gray-900">Problem: Download doesn't start</strong>
              <p className="text-gray-600">Solution: Check your browser's popup blocker settings, or use the Download button that appears after conversion.</p>
            </div>
          </div>
          <span className="text-sm text-gray-500 mt-4 block">⏱️ 5 min read</span>
        </article>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Convert Your Images?</h2>
        <p className="mb-6 opacity-90">Try our free JPG to PDF converter now. No signup required.</p>
        <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.location.reload(); }} className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Start Converting →
        </a>
      </div>
    </div>
  );

  const FAQPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-xl text-gray-600 mb-8">Find answers to the most common questions about our free JPG to PDF converter.</p>

      {/* Quick Answers */}
      <div className="bg-blue-50 p-6 rounded-2xl mb-8">
        <h2 className="text-lg font-bold text-blue-800 mb-4">⚡ Quick Answers</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <span className="font-bold text-gray-900">Is it free?</span>
            <p className="text-gray-600 mt-1">Yes, 100% free forever</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <span className="font-bold text-gray-900">Is it safe?</span>
            <p className="text-gray-600 mt-1">Yes, files never leave your device</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <span className="font-bold text-gray-900">Need signup?</span>
            <p className="text-gray-600 mt-1">No, start converting instantly</p>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {/* General Questions */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">📋</span>
            General Questions
          </h2>
          <div className="space-y-3">
            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                How do I convert JPG to PDF?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>Converting JPG to PDF is simple:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Click the upload box or drag & drop your JPG images</li>
                  <li>Arrange the images in your preferred order by dragging</li>
                  <li>Select your settings (page size, orientation, margins)</li>
                  <li>Click the "Convert to PDF" button</li>
                  <li>Your PDF will download automatically</li>
                </ol>
                <p className="mt-2">The entire process takes just seconds!</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Is this converter really free?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>Yes, our JPG to PDF converter is <strong>100% free</strong> with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>No hidden fees or premium tiers</li>
                  <li>No watermarks on your PDFs</li>
                  <li>No daily conversion limits</li>
                  <li>No email registration required</li>
                  <li>No software to download</li>
                </ul>
                <p className="mt-2">We support the service through non-intrusive advertising.</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                What image formats are supported?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>We support the most common image formats:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>JPG/JPEG</strong> - Best for photographs and scanned documents</li>
                  <li><strong>PNG</strong> - Best for screenshots and images with text</li>
                </ul>
                <p className="mt-2">These formats cover 99% of typical use cases. If you have other formats (like HEIC, WebP, TIFF), you'll need to convert them to JPG or PNG first.</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                How many images can I convert at once?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>You can convert up to <strong>50 images</strong> into a single PDF at once. This is usually more than enough for most use cases like:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Multi-page document scans</li>
                  <li>Photo albums</li>
                  <li>Homework assignments</li>
                  <li>Business presentations</li>
                </ul>
                <p className="mt-2">If you need to convert more images, you can create multiple PDFs and merge them later.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Privacy & Security */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-600 p-2 rounded-lg">🔒</span>
            Privacy & Security
          </h2>
          <div className="space-y-3">
            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Is it safe to use this converter?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p><strong>Yes, absolutely!</strong> Our converter is designed with security as the top priority:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>100% client-side processing</strong> - Your images are converted entirely in your browser using JavaScript</li>
                  <li><strong>No file uploads</strong> - Your files never leave your device or get sent to any server</li>
                  <li><strong>No data storage</strong> - We don't (and can't) store your images or PDFs</li>
                  <li><strong>HTTPS encryption</strong> - All connections are secure</li>
                  <li><strong>Works offline</strong> - After loading the page, the converter works without internet</li>
                </ul>
                <p className="mt-2">This is the safest type of online converter possible because your files physically never leave your computer.</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Are my files uploaded to your servers?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p><strong>No, never.</strong> Unlike most online converters that upload your files to process them on their servers, our tool works completely differently:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>When you select images, they stay in your browser's memory</li>
                  <li>The PDF is created using JavaScript running on your device</li>
                  <li>We don't have servers that receive or store files</li>
                  <li>When you close the tab, everything is gone</li>
                </ul>
                <p className="mt-2">You can verify this by converting files with your internet disconnected (after the page loads).</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Can I use this for confidential documents?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>Yes! Our converter is ideal for sensitive documents because:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Files never leave your device</li>
                  <li>No account means no data breach risk</li>
                  <li>No server storage means nothing to hack</li>
                </ul>
                <p className="mt-2">Use it confidently for medical records, financial documents, legal papers, personal photos, and any other sensitive content.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Technical Questions */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">⚙️</span>
            Technical Questions
          </h2>
          <div className="space-y-3">
            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Does it work on mobile phones?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p><strong>Yes!</strong> Our converter is fully optimized for mobile devices:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Works on iPhone (iOS 12+) with Safari</li>
                  <li>Works on Android with Chrome</li>
                  <li>Touch-friendly drag & drop for reordering</li>
                  <li>Responsive design fits all screen sizes</li>
                  <li>Upload directly from camera roll/gallery</li>
                </ul>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Which browsers are supported?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>We support all modern browsers:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Google Chrome (recommended)</li>
                  <li>Mozilla Firefox</li>
                  <li>Apple Safari</li>
                  <li>Microsoft Edge</li>
                  <li>Opera</li>
                </ul>
                <p className="mt-2">For best results, use the latest version of your browser. Internet Explorer is not supported.</p>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                What page sizes are available?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>We offer three page size options:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>A4</strong> (210 × 297 mm) - International standard, best for documents</li>
                  <li><strong>Letter</strong> (8.5 × 11 inches) - US/Canada standard</li>
                  <li><strong>Auto/Fit</strong> - Matches each image's original dimensions, best for photos</li>
                </ul>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Why is my PDF file large?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>PDF file size depends on your source images. To reduce size:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Compress images before uploading</li>
                  <li>Use JPG format instead of PNG</li>
                  <li>Reduce image resolution if print quality isn't needed</li>
                  <li>Use fewer images per PDF</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg">🔧</span>
            Troubleshooting
          </h2>
          <div className="space-y-3">
            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                My download doesn't start - what should I do?
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>If the PDF doesn't download automatically:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Look for the green "Download PDF" button that appears after conversion</li>
                  <li>Click the "Download PDF Again" button</li>
                  <li>Check if your browser blocked a download (look for popup blocker notification)</li>
                  <li>Check your Downloads folder - it may have downloaded silently</li>
                  <li>Try refreshing the page and converting again</li>
                  <li>Try using a different browser</li>
                </ol>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                The converter is stuck or not responding
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>If the converter seems frozen:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Wait a moment - large images take longer to process</li>
                  <li>Refresh the page and try again with fewer images</li>
                  <li>Close other browser tabs to free up memory</li>
                  <li>Try compressing your images first</li>
                  <li>Clear your browser cache and cookies</li>
                  <li>Try a different browser</li>
                </ul>
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-xl p-4 group">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                Images look blurry in the PDF
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600">
                <p>Blurry images in your PDF usually mean the source images were low resolution. To fix:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Use higher resolution source images (300 DPI for print)</li>
                  <li>Select "Auto" page size to keep original dimensions</li>
                  <li>Avoid stretching small images onto large page sizes</li>
                  <li>Use "Contain" image fit instead of "Fill"</li>
                </ul>
              </div>
            </details>
          </div>
        </section>
      </div>

      {/* Still Have Questions */}
      <section className="mt-12 bg-gray-50 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6">We're here to help! Reach out to us anytime.</p>
        <a href="/contact" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/contact'); window.location.reload(); }} className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Contact Us
        </a>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-xl text-gray-600 mb-8">Have questions, feedback, or suggestions? We'd love to hear from you!</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📧</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Email Us</h2>
                <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 hover:underline text-lg">
                  contact@convertjpgtopdf.online
                </a>
                <p className="text-gray-600 mt-2 text-sm">We typically respond within 24-48 hours.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💬</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Feedback Welcome</h2>
                <p className="text-gray-700">
                  We're constantly improving! Let us know what features you'd like to see or how we can make the converter better.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🐛</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Report a Bug</h2>
                <p className="text-gray-700">
                  Found something not working? Please include your browser, device, and steps to reproduce the issue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Topics */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Before You Contact Us</h2>
          <p className="text-gray-600 mb-4">Check if your question is answered here:</p>
          
          <div className="space-y-3">
            <a href="/faq" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/faq'); window.location.reload(); }} className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <span className="font-bold text-gray-900">❓ FAQ</span>
              <p className="text-sm text-gray-600 mt-1">Common questions about using our converter</p>
            </a>
            
            <a href="/how-to-convert-jpg-to-pdf" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/how-to-convert-jpg-to-pdf'); window.location.reload(); }} className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <span className="font-bold text-gray-900">📖 How-To Guide</span>
              <p className="text-sm text-gray-600 mt-1">Step-by-step instructions for converting images</p>
            </a>
            
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/privacy-policy'); window.location.reload(); }} className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <span className="font-bold text-gray-900">🔒 Privacy Policy</span>
              <p className="text-sm text-gray-600 mt-1">How we handle your data (spoiler: we don't store your files)</p>
            </a>
            
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/terms-of-service'); window.location.reload(); }} className="block bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
              <span className="font-bold text-gray-900">📜 Terms of Service</span>
              <p className="text-sm text-gray-600 mt-1">Legal information about using our service</p>
            </a>
          </div>
        </div>
      </div>

      {/* Business Inquiries */}
      <div className="bg-white border border-gray-200 p-8 rounded-2xl mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Inquiries</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">💼 Partnerships</h3>
            <p className="text-gray-600 text-sm">
              Interested in partnering with us or integrating our technology? We're open to collaboration opportunities.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">📢 Advertising</h3>
            <p className="text-gray-600 text-sm">
              Looking to advertise on our platform? Contact us for advertising opportunities and rates.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">📰 Press & Media</h3>
            <p className="text-gray-600 text-sm">
              Writing about us? We're happy to provide information, quotes, or interviews.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">🏢 Enterprise</h3>
            <p className="text-gray-600 text-sm">
              Need a custom solution for your organization? Let's discuss your requirements.
            </p>
          </div>
        </div>
        <p className="mt-6 text-gray-700">
          For all business inquiries, email us at <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 hover:underline font-semibold">contact@convertjpgtopdf.online</a>
        </p>
      </div>

      {/* Response Time */}
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">⏱️ Response Time</h2>
        <p className="text-gray-700">
          We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days. 
          For urgent matters, please include "URGENT" in your email subject line.
        </p>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About ConvertJPGtoPDF.online</h1>
      <p className="text-xl text-gray-600 mb-8">We're on a mission to make document conversion simple, fast, and completely free for everyone.</p>
      
      {/* Mission Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          We believe that essential digital tools should be accessible to everyone, regardless of their technical expertise or financial resources. That's why we created ConvertJPGtoPDF.online — a free, privacy-focused image to PDF converter that works entirely in your browser.
        </p>
        <p className="text-gray-700">
          Our goal is simple: provide the fastest, most secure, and easiest-to-use JPG to PDF converter on the internet. No accounts, no subscriptions, no hidden fees — just a tool that works.
        </p>
      </section>

      {/* Story Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 Our Story</h2>
        <div className="prose prose-lg text-gray-700">
          <p>
            ConvertJPGtoPDF.online was born out of frustration. We were tired of online converters that:
          </p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>Required email registration just to convert one file</li>
            <li>Added watermarks unless you paid for premium</li>
            <li>Uploaded personal files to unknown servers</li>
            <li>Were slow, clunky, and full of aggressive ads</li>
            <li>Didn't work properly on mobile devices</li>
          </ul>
          <p>
            So we built something better. A converter that respects your time, your privacy, and your intelligence. One that just works — instantly, securely, and completely free.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💎 Our Core Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
            <p className="text-gray-600">
              Your files are YOUR files. They never leave your device. All processing happens locally in your browser using JavaScript. We don't have servers that store your images — because we don't need them. This isn't just a feature; it's a fundamental design principle.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Speed & Simplicity</h3>
            <p className="text-gray-600">
              No signup forms. No email verification. No "processing queues." Just upload, convert, and download. Our tool is designed to get you from image to PDF in seconds, not minutes. We respect your time.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Truly Free</h3>
            <p className="text-gray-600">
              No "free tier" with limited features. No watermarks on your PDFs. No daily conversion limits. The full tool is completely free, supported by minimal, non-intrusive advertising. We believe everyone deserves access to quality tools.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Access</h3>
            <p className="text-gray-600">
              Works on any device with a modern web browser — Windows, Mac, Linux, iPhone, Android, tablets. No software to install, no apps to download. Just visit the website and start converting.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gray-50 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Technology Behind the Tool</h2>
        <p className="text-gray-700 mb-4">
          ConvertJPGtoPDF.online is built with modern web technologies designed for performance and security:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">React</strong>
            <p className="text-sm text-gray-600">Modern UI framework for a smooth, responsive experience</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">jsPDF</strong>
            <p className="text-sm text-gray-600">Client-side PDF generation library — no server needed</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">HTML5 Canvas</strong>
            <p className="text-sm text-gray-600">In-browser image processing for format conversion</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">Drag & Drop API</strong>
            <p className="text-sm text-gray-600">Native browser API for intuitive file handling</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">Tailwind CSS</strong>
            <p className="text-sm text-gray-600">Responsive design that works on all screen sizes</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <strong className="text-gray-900">TypeScript</strong>
            <p className="text-sm text-gray-600">Type-safe code for reliability and fewer bugs</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Who We Are</h2>
        <p className="text-gray-700 mb-4">
          We're a small team of developers and designers who are passionate about creating useful, privacy-respecting tools. We're based across the globe, united by a common goal: making the internet a little more helpful and a lot less annoying.
        </p>
        <p className="text-gray-700">
          Have questions or feedback? We'd love to hear from you at <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 hover:underline">contact@convertjpgtopdf.online</a>.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold">100%</div>
            <div className="text-blue-200">Private & Secure</div>
          </div>
          <div>
            <div className="text-4xl font-bold">0</div>
            <div className="text-blue-200">Files Stored</div>
          </div>
          <div>
            <div className="text-4xl font-bold">50+</div>
            <div className="text-blue-200">Images Per PDF</div>
          </div>
          <div>
            <div className="text-4xl font-bold">∞</div>
            <div className="text-blue-200">Free Conversions</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Try It?</h2>
        <p className="text-gray-600 mb-6">Experience the fastest, most private JPG to PDF converter online.</p>
        <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.location.reload(); }} className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Convert Images Now →
        </a>
      </section>
    </div>
  );

  const PrivacyPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-2">Last Updated: January 1, 2024</p>
      <p className="text-xl text-gray-600 mb-8">Your privacy is critically important to us. This policy explains how we handle your data.</p>
      
      {/* Key Highlight */}
      <div className="bg-green-50 border-2 border-green-400 p-6 rounded-2xl mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🔒</span>
          <div>
            <h2 className="text-xl font-bold text-green-800 mb-2">The Most Important Thing</h2>
            <p className="text-green-700 text-lg">
              <strong>Your files are NEVER uploaded to our servers.</strong> All image processing and PDF conversion happens entirely in your web browser using JavaScript. Your images never leave your device. We cannot see, access, or store your files because they are never transmitted to us.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700">
            ConvertJPGtoPDF.online ("we," "our," or "us") operates the website located at convertjpgtopdf.online. This Privacy Policy describes how we collect, use, and protect information when you use our service.
          </p>
          <p className="text-gray-700">
            By using our website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        {/* How Our Tool Works */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How Our Converter Works (Client-Side Processing)</h2>
          <p className="text-gray-700 mb-4">
            Our JPG to PDF converter is designed with privacy as the top priority. Here's exactly how it works:
          </p>
          <div className="bg-gray-50 p-6 rounded-xl space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-gray-900">Local Processing</strong>
                <p className="text-gray-600">When you upload images, they are processed using JavaScript running in your browser. The conversion from JPG/PNG to PDF happens on your device.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-gray-900">No File Uploads</strong>
                <p className="text-gray-600">Your images are NOT uploaded to any server. They remain in your browser's memory only during the conversion process.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-gray-900">No Storage</strong>
                <p className="text-gray-600">We do not store, save, or retain any of your images or converted PDFs. Once you close the browser tab, all data is gone.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <strong className="text-gray-900">Works Offline</strong>
                <p className="text-gray-600">After the initial page load, our tool can work without an internet connection, proving that no data is sent to servers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Information We Do NOT Collect</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Your uploaded images or files</li>
            <li>Your converted PDF documents</li>
            <li>Your name, email, or personal contact information</li>
            <li>Payment information (we don't charge for our service)</li>
            <li>Any user account data (we don't have user accounts)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Information We May Collect</h3>
          <p className="text-gray-700 mb-4">We collect minimal, anonymized data to improve our service:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Usage Data:</strong> Pages visited, time spent on site, click patterns (anonymized)</li>
            <li><strong>Device Information:</strong> Browser type, operating system, screen size (for compatibility)</li>
            <li><strong>Approximate Location:</strong> Country/region level only (from IP address, not stored)</li>
            <li><strong>Referrer Data:</strong> How you found our website (search engine, direct link, etc.)</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies for analytics and advertising. Here's what we use:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left">Cookie Type</th>
                  <th className="border border-gray-300 p-3 text-left">Purpose</th>
                  <th className="border border-gray-300 p-3 text-left">Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3">Essential</td>
                  <td className="border border-gray-300 p-3">Remember your cookie consent preference</td>
                  <td className="border border-gray-300 p-3">ConvertJPGtoPDF.online</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Analytics</td>
                  <td className="border border-gray-300 p-3">Understand how visitors use our site</td>
                  <td className="border border-gray-300 p-3">Google Analytics</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3">Advertising</td>
                  <td className="border border-gray-300 p-3">Display relevant ads to support our free service</td>
                  <td className="border border-gray-300 p-3">Google AdSense</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-gray-700 mt-4">
            You can manage cookie preferences through our cookie consent banner or your browser settings. Note that disabling certain cookies may affect site functionality.
          </p>
        </section>

        {/* Third Party Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900">Google Analytics</h3>
              <p className="text-gray-600">We use Google Analytics to understand website traffic and usage patterns. This helps us improve our service. Google Analytics uses cookies and collects anonymized data. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a></p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900">Google AdSense</h3>
              <p className="text-gray-600">We display ads through Google AdSense to keep our service free. Google may use cookies to show personalized ads based on your browsing history. You can opt out of personalized ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad Settings</a>.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900">Vercel (Hosting)</h3>
              <p className="text-gray-600">Our website is hosted on Vercel. Vercel may collect server logs including IP addresses and request data. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vercel Privacy Policy</a></p>
            </div>
          </div>
        </section>

        {/* GDPR */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights (GDPR & CCPA)</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Right to Access:</strong> Request information about data we hold about you</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong>Right to Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
            <li><strong>Right to Opt-Out:</strong> Opt out of sale of personal information (CCPA)</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Since we don't collect personal files or create user accounts, most of these rights don't apply. However, if you have concerns about analytics data, please contact us.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect against unauthorized access:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
            <li>HTTPS encryption for all connections</li>
            <li>No storage of user files (nothing to breach)</li>
            <li>Regular security updates and monitoring</li>
            <li>Secure hosting on Vercel's infrastructure</li>
          </ul>
        </section>

        {/* Children */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700">
            Our service is not directed at children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-blue-50 p-6 rounded-xl mt-4">
            <p className="text-gray-800">
              <strong>Email:</strong> <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 hover:underline">contact@convertjpgtopdf.online</a>
            </p>
            <p className="text-gray-800 mt-2">
              <strong>Website:</strong> <a href="https://convertjpgtopdf.online" className="text-blue-600 hover:underline">https://convertjpgtopdf.online</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  const TermsPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-gray-600 mb-2">Effective Date: January 1, 2024</p>
      <p className="text-xl text-gray-600 mb-8">Please read these terms carefully before using our service.</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        {/* Quick Summary */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-3">📋 Quick Summary (Plain English)</h2>
          <ul className="text-blue-700 space-y-2">
            <li>✅ Our service is free to use</li>
            <li>✅ Your files are processed locally and never uploaded to our servers</li>
            <li>✅ You own your content — we don't claim any rights to it</li>
            <li>✅ Don't use our service for anything illegal</li>
            <li>✅ We're not responsible if something goes wrong with your files</li>
            <li>✅ We can update these terms, and continued use means you accept changes</li>
          </ul>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ConvertJPGtoPDF.online (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update these Terms at any time, and your continued use of the Service following any changes indicates your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
          <p>
            ConvertJPGtoPDF.online provides a free online tool for converting images (JPG, JPEG, PNG) to PDF format. Our Service operates entirely within your web browser using client-side JavaScript technology, meaning:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Your files are processed locally on your device</li>
            <li>Your files are NOT uploaded to any external server</li>
            <li>No account registration is required</li>
            <li>The Service is provided free of charge</li>
            <li>We may display advertisements to support the free service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
          <p>By using our Service, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>Use the Service lawfully:</strong> You will not use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
            <li><strong>Respect intellectual property:</strong> You will only convert images that you own or have the right to convert. Do not use our Service to infringe on copyrights, trademarks, or other intellectual property rights.</li>
            <li><strong>Avoid harmful content:</strong> You will not process images containing illegal content, malware, or anything intended to harm others.</li>
            <li><strong>Not abuse the Service:</strong> You will not attempt to hack, overload, or disrupt our Service or its infrastructure.</li>
            <li><strong>Accept responsibility:</strong> You are solely responsible for all content you process using our Service.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Your Content</h3>
          <p>
            You retain full ownership of all images you upload and PDFs you create. We do NOT claim any ownership rights or license to your content. Since all processing happens in your browser, we never have access to your files.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Our Content</h3>
          <p>
            The Service itself, including its design, logos, code, and documentation, is owned by ConvertJPGtoPDF.online and is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our Service without express written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, which explains how we handle your information. Key points:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Your files are processed locally and never uploaded to our servers</li>
            <li>We collect minimal analytics data to improve the Service</li>
            <li>We use Google Analytics and AdSense, which may use cookies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
          </div>
          <p className="mt-4">We do not warrant that:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>The Service will meet your specific requirements</li>
            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from the Service will be accurate or reliable</li>
            <li>The quality of any products, services, information, or other material obtained through the Service will meet your expectations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL CONVERTJPGTOPDF.ONLINE, ITS OWNERS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Loss of profits, data, or use</li>
            <li>Cost of procurement of substitute services</li>
            <li>Any damages resulting from errors, mistakes, or inaccuracies of content</li>
            <li>Personal injury or property damage resulting from your use of the Service</li>
            <li>Any bugs, viruses, or similar harmful code transmitted through the Service</li>
            <li>Any interruption or cessation of the Service</li>
          </ul>
          <p className="mt-4">
            Our total liability for any claim arising from your use of the Service is limited to the amount you paid us for the Service (which is $0, as our Service is free).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless ConvertJPGtoPDF.online and its owners, employees, and affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Your use of and access to the Service</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including intellectual property rights</li>
            <li>Any content you process through the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Services</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
          <p className="mt-4">
            We use the following third-party services:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            <li><strong>Google Analytics:</strong> For understanding website usage</li>
            <li><strong>Vercel:</strong> For website hosting</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
          </p>
          <p className="mt-4">
            All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by updating the "Effective Date" at the top of this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-blue-50 p-6 rounded-xl mt-4">
            <p className="text-gray-800">
              <strong>Email:</strong> <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 hover:underline">contact@convertjpgtopdf.online</a>
            </p>
            <p className="text-gray-800 mt-2">
              <strong>Website:</strong> <a href="https://convertjpgtopdf.online" className="text-blue-600 hover:underline">https://convertjpgtopdf.online</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  const HowToPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Convert JPG to PDF - Complete Guide</h1>
      <p className="text-xl text-gray-600 mb-8">Learn how to convert your images to PDF in just a few seconds with our free online tool. No software needed!</p>

      {/* Quick Steps */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Quick 4-Step Guide</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">1</div>
            <h3 className="font-bold text-gray-900 mb-2">Upload</h3>
            <p className="text-sm text-gray-600">Click or drag & drop your JPG, JPEG, or PNG images</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">2</div>
            <h3 className="font-bold text-gray-900 mb-2">Arrange</h3>
            <p className="text-sm text-gray-600">Drag images to reorder pages in your PDF</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">3</div>
            <h3 className="font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600">Choose page size, orientation, and margins</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">4</div>
            <h3 className="font-bold text-gray-900 mb-2">Download</h3>
            <p className="text-sm text-gray-600">Click Convert and download your PDF instantly</p>
          </div>
        </div>
      </section>

      {/* Detailed Instructions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Detailed Step-by-Step Instructions</h2>
        
        <div className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Upload Your Images</h3>
            <p className="text-gray-700 mb-4">
              Start by visiting <a href="/" className="text-blue-600 hover:underline">convertjpgtopdf.online</a>. You'll see a large upload box in the center of the page. You have two options to upload your images:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Click Method:</strong> Click the upload box or the "Select Images" button, then choose files from your device</li>
              <li><strong>Drag & Drop:</strong> Simply drag your image files from your computer and drop them onto the upload area</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-600">
                <strong>💡 Pro Tip:</strong> You can upload up to 50 images at once. Supported formats: JPG, JPEG, PNG.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Arrange Your Images</h3>
            <p className="text-gray-700 mb-4">
              After uploading, you'll see thumbnail previews of all your images. Each thumbnail shows a page number indicating its position in the final PDF. To reorder:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>On Desktop:</strong> Click and hold an image, drag it to a new position, then release</li>
              <li><strong>On Mobile:</strong> Touch and hold an image, drag it to the desired position, then lift your finger</li>
              <li><strong>Delete Image:</strong> Click the red "×" button on any image to remove it</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-600">
                <strong>💡 Pro Tip:</strong> Name your files numerically (01.jpg, 02.jpg, etc.) before uploading for easier organization.
              </p>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3: Configure Settings</h3>
            <p className="text-gray-700 mb-4">
              On the right side (or below on mobile), you'll find the Settings panel. Here's what each option does:
            </p>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-4">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">📄 Page Size</h4>
                  <ul className="text-gray-600 text-sm mt-2 space-y-1">
                    <li><strong>A4 (210 × 297 mm):</strong> Standard international paper size. Best for documents, reports, and official papers.</li>
                    <li><strong>Letter (8.5 × 11 in):</strong> Standard US/Canada paper size. Choose this if printing in North America.</li>
                    <li><strong>Auto/Fit:</strong> Each page matches the original image dimensions. Best for photos and artwork.</li>
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">🔄 Orientation</h4>
                  <ul className="text-gray-600 text-sm mt-2 space-y-1">
                    <li><strong>Portrait:</strong> Tall pages (vertical). Best for documents, forms, and scanned papers.</li>
                    <li><strong>Landscape:</strong> Wide pages (horizontal). Best for presentations, photos, and wide images.</li>
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">📏 Margins</h4>
                  <ul className="text-gray-600 text-sm mt-2 space-y-1">
                    <li><strong>None (0):</strong> Images extend to page edges. Best for photos and posters.</li>
                    <li><strong>Small (10px):</strong> Thin border around images. Good balance between space and content.</li>
                    <li><strong>Large (20px):</strong> Wider borders. Best for printing or formal documents.</li>
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">🖼️ Image Fit</h4>
                  <ul className="text-gray-600 text-sm mt-2 space-y-1">
                    <li><strong>Contain:</strong> Entire image visible, may have white space. Preserves aspect ratio.</li>
                    <li><strong>Fill:</strong> Image fills the page, may crop edges. No white space.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4: Convert and Download</h3>
            <p className="text-gray-700 mb-4">
              Once you're happy with the arrangement and settings, click the blue "Convert to PDF" button. Here's what happens:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>A progress bar shows the conversion status</li>
              <li>Each image is processed and added to the PDF</li>
              <li>When complete, the PDF automatically downloads</li>
              <li>A green success banner appears with file details</li>
              <li>If download doesn't start, click the "Download PDF" button</li>
            </ol>
            <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
              <p className="text-sm text-green-700">
                <strong>✅ That's it!</strong> Your PDF is ready to use. Open it with any PDF viewer, send it via email, or print it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Platform-Specific Guides</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🍎 iPhone & iPad</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
              <li>Open Safari and go to convertjpgtopdf.online</li>
              <li>Tap the upload area</li>
              <li>Select "Photo Library" to choose images</li>
              <li>Select multiple photos by tapping them</li>
              <li>Tap "Add" in the top-right corner</li>
              <li>Touch and hold images to drag and reorder</li>
              <li>Tap "Convert to PDF"</li>
              <li>Choose "Download" when prompted</li>
              <li>Find your PDF in the Files app → Downloads</li>
            </ol>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🤖 Android</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
              <li>Open Chrome and go to convertjpgtopdf.online</li>
              <li>Tap the upload area</li>
              <li>Choose "Files" or "Gallery"</li>
              <li>Long-press to select multiple images</li>
              <li>Tap "Done" or checkmark</li>
              <li>Touch and hold images to reorder</li>
              <li>Tap "Convert to PDF"</li>
              <li>PDF saves to Downloads folder automatically</li>
              <li>Open with any PDF reader app</li>
            </ol>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🪟 Windows</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
              <li>Open any browser (Chrome, Edge, Firefox)</li>
              <li>Go to convertjpgtopdf.online</li>
              <li>Click the upload box or drag files from Explorer</li>
              <li>Hold Ctrl and click to select multiple files</li>
              <li>Drag thumbnails to reorder</li>
              <li>Click "Convert to PDF"</li>
              <li>File downloads to your Downloads folder</li>
            </ol>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🍏 Mac</h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 text-sm">
              <li>Open Safari, Chrome, or Firefox</li>
              <li>Go to convertjpgtopdf.online</li>
              <li>Click upload or drag from Finder</li>
              <li>Hold Cmd and click to select multiple</li>
              <li>Drag to rearrange order</li>
              <li>Click "Convert to PDF"</li>
              <li>Find PDF in Downloads folder</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Best Practices for Quality PDFs</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3">✅ Do This</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>✅ Use high-resolution images (300 DPI for print)</li>
              <li>✅ Keep consistent image dimensions when possible</li>
              <li>✅ Use JPG for photos, PNG for screenshots</li>
              <li>✅ Add margins if you plan to print</li>
              <li>✅ Preview images before converting</li>
              <li>✅ Name files logically before uploading</li>
              <li>✅ Use Portrait for documents, Landscape for slides</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-3">❌ Avoid This</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>❌ Using tiny, pixelated images</li>
              <li>❌ Mixing very different image sizes</li>
              <li>❌ Converting hundreds of images at once</li>
              <li>❌ Using Fill mode for important document text</li>
              <li>❌ Forgetting to check page order before converting</li>
              <li>❌ Using PNG for regular photos (larger file size)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 Troubleshooting Common Issues</h2>
        
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Images won't upload
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600">
              <p><strong>Possible causes:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>File format not supported (only JPG, JPEG, PNG allowed)</li>
                <li>File too large (try compressing first)</li>
                <li>Browser cache issue (try refreshing the page)</li>
                <li>Try using a different browser</li>
              </ul>
            </div>
          </details>
          
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Download doesn't start automatically
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Look for the green "Download PDF" button and click it</li>
                <li>Check if your browser blocked a popup (allow popups for our site)</li>
                <li>Check your Downloads folder - it may have downloaded silently</li>
                <li>Try a different browser</li>
              </ul>
            </div>
          </details>
          
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              Images appear blurry in PDF
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Your source images may be low resolution</li>
                <li>Try using higher quality original images</li>
                <li>Use "Auto" page size to preserve original dimensions</li>
                <li>Avoid enlarging small images to fit larger page sizes</li>
              </ul>
            </div>
          </details>
          
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
              PDF file is very large
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Reduce the resolution of source images before uploading</li>
                <li>Use JPG format instead of PNG</li>
                <li>Compress images using an image compression tool first</li>
                <li>Fewer images = smaller PDF</li>
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Convert Your Images?</h2>
        <p className="mb-6 opacity-90">Try our free JPG to PDF converter now. No signup required.</p>
        <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.location.reload(); }} className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Start Converting →
        </a>
      </section>
    </div>
  );

  const SitemapPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">🛠️ Tools</h2>
          <ul className="space-y-2">
            <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-gray-700 hover:text-blue-600">Home</a></li>
            <li><a href="/jpg-to-pdf" onClick={(e) => { e.preventDefault(); navigate('/jpg-to-pdf'); }} className="text-gray-700 hover:text-blue-600">JPG to PDF</a></li>
            <li><a href="/png-to-pdf" onClick={(e) => { e.preventDefault(); navigate('/png-to-pdf'); }} className="text-gray-700 hover:text-blue-600">PNG to PDF</a></li>
            <li><a href="/image-to-pdf" onClick={(e) => { e.preventDefault(); navigate('/image-to-pdf'); }} className="text-gray-700 hover:text-blue-600">Image to PDF</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">📚 Resources</h2>
          <ul className="space-y-2">
            <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }} className="text-gray-700 hover:text-blue-600">Blog</a></li>
            <li><a href="/faq" onClick={(e) => { e.preventDefault(); navigate('/faq'); }} className="text-gray-700 hover:text-blue-600">FAQ</a></li>
            <li><a href="/how-to-convert-jpg-to-pdf" onClick={(e) => { e.preventDefault(); navigate('/how-to-convert-jpg-to-pdf'); }} className="text-gray-700 hover:text-blue-600">How-To Guide</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">ℹ️ Company</h2>
          <ul className="space-y-2">
            <li><a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }} className="text-gray-700 hover:text-blue-600">About</a></li>
            <li><a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className="text-gray-700 hover:text-blue-600">Contact</a></li>
            <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} className="text-gray-700 hover:text-blue-600">Privacy</a></li>
            <li><a href="/terms-of-service" onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }} className="text-gray-700 hover:text-blue-600">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'blog': return <BlogPage />;
      case 'faq': return <FAQPage />;
      case 'contact': return <ContactPage />;
      case 'about': return <AboutPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'howto': return <HowToPage />;
      case 'sitemap': return <SitemapPage />;
      default: return <ConverterSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={navigate} />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
