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
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1>Blog & Guides</h1>
      <p className="lead">Learn everything about PDF conversion with our comprehensive guides.</p>
      
      <article className="bg-gray-50 p-6 rounded-xl mb-6">
        <h2>How to Convert JPG to PDF on iPhone</h2>
        <p>Converting JPG images to PDF on your iPhone is easy with our online converter. Simply open Safari, visit convertjpgtopdf.online, and upload your photos directly from your camera roll.</p>
      </article>
      
      <article className="bg-gray-50 p-6 rounded-xl mb-6">
        <h2>Best Practices for Image to PDF Conversion</h2>
        <p>Get the best results when converting images to PDF by following these tips: use high-resolution images, choose the right page size, and organize before converting.</p>
      </article>
      
      <article className="bg-gray-50 p-6 rounded-xl">
        <h2>JPG vs PNG: Which Format to Use?</h2>
        <p>JPG is best for photographs with many colors, while PNG is ideal for screenshots and images with transparency.</p>
      </article>
    </div>
  );

  const FAQPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {[
          { q: 'How do I convert JPG to PDF?', a: 'Upload your images, arrange them, and click Convert. Your PDF downloads instantly.' },
          { q: 'Is it free?', a: 'Yes, 100% free with no hidden costs or watermarks.' },
          { q: 'Is it safe?', a: 'Absolutely. All processing happens in your browser. Files never leave your device.' },
          { q: 'Do I need an account?', a: 'No registration required.' },
          { q: 'What formats are supported?', a: 'JPG, JPEG, and PNG images.' },
          { q: 'How many images can I convert?', a: 'Up to 50 images at once.' },
          { q: 'Does it work on mobile?', a: 'Yes, fully optimized for all devices.' },
        ].map((faq, i) => (
          <details key={i} className="bg-gray-50 rounded-xl p-4">
            <summary className="font-bold cursor-pointer">{faq.q}</summary>
            <p className="mt-3 text-gray-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-8">Have questions or feedback? We'd love to hear from you!</p>
      <div className="bg-blue-50 p-8 rounded-xl">
        <p className="text-xl font-semibold text-blue-800">
          📧 contact@convertjpgtopdf.online
        </p>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1>About JPG to PDF Converter</h1>
      <p>We believe converting images to PDF should be simple, fast, and free.</p>
      <h2>Our Mission</h2>
      <p>To provide the best free PDF conversion tool that respects your privacy.</p>
      <h2>Why We're Different</h2>
      <ul>
        <li><strong>Privacy First</strong> - Files never leave your device</li>
        <li><strong>Instant Conversion</strong> - No server processing</li>
        <li><strong>Completely Free</strong> - No premium tiers or limits</li>
        <li><strong>Works Everywhere</strong> - Desktop, tablet, or phone</li>
      </ul>
    </div>
  );

  const PrivacyPage = () => (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1>Privacy Policy</h1>
      <p><strong>Your Privacy is Our Priority</strong></p>
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
        <strong>Key Point:</strong> Your files are NEVER uploaded to our servers. All conversion happens in your browser.
      </div>
      <h2>How It Works</h2>
      <p>Our converter uses client-side JavaScript. Your images are processed entirely in your browser and never leave your device.</p>
      <h2>Information We Collect</h2>
      <p>We collect minimal analytics data (pages visited, browser type) to improve our service. We do NOT collect your files or personal information.</p>
      <h2>Third-Party Services</h2>
      <p>We use Google Analytics and Google AdSense. You can opt out of personalized advertising at Google Ad Settings.</p>
    </div>
  );

  const TermsPage = () => (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1>Terms of Service</h1>
      <h2>1. Acceptance of Terms</h2>
      <p>By using ConvertJPGtoPDF.online, you agree to these terms.</p>
      <h2>2. Description of Service</h2>
      <p>We provide a free online tool for converting images to PDF format.</p>
      <h2>3. Use of Service</h2>
      <p>You agree to use our service only for lawful purposes.</p>
      <h2>4. Intellectual Property</h2>
      <p>You retain all rights to your images. We do not claim ownership over your content.</p>
      <h2>5. Disclaimer</h2>
      <p>The service is provided "as is" without warranties of any kind.</p>
    </div>
  );

  const HowToPage = () => (
    <div className="prose prose-lg max-w-4xl mx-auto">
      <h1>How to Convert JPG to PDF - Complete Guide</h1>
      <h2>Quick Method: Use Our Online Converter</h2>
      <ol>
        <li><strong>Open the Converter</strong> - Visit convertjpgtopdf.online</li>
        <li><strong>Upload Images</strong> - Click or drag & drop your JPG files</li>
        <li><strong>Arrange Order</strong> - Drag to reorder if needed</li>
        <li><strong>Choose Settings</strong> - Select page size, orientation, margins</li>
        <li><strong>Convert & Download</strong> - Click the button and get your PDF</li>
      </ol>
      <h2>Tips for Best Results</h2>
      <ul>
        <li>Use high-resolution images for better quality</li>
        <li>Choose A4 for standard documents</li>
        <li>Use Auto size to preserve original dimensions</li>
        <li>Add margins if you plan to print</li>
      </ul>
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
