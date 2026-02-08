import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { SEOHead } from './components/SEOHead';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ConverterPage } from './pages/ConverterPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { HowToGuidePage } from './pages/HowToGuidePage';
import { BlogPage } from './pages/BlogPage';
import { SitemapPage } from './pages/SitemapPage';
import { JpegToPdfPage } from './pages/JpegToPdfPage';
import { ImageToPdfPage } from './pages/ImageToPdfPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Map URL paths to page IDs
const PATH_TO_PAGE: Record<string, string> = {
  '/': 'home',
  '/jpg-to-pdf': 'home',
  '/png-to-pdf': 'png-to-pdf',
  '/jpeg-to-pdf': 'jpeg-to-pdf',
  '/image-to-pdf': 'image-to-pdf',
  '/privacy-policy': 'privacy',
  '/about': 'about',
  '/terms-of-service': 'terms',
  '/contact': 'contact',
  '/faq': 'faq',
  '/how-to-convert-jpg-to-pdf': 'how-to-guide',
  '/blog': 'blog',
  '/sitemap': 'sitemap',
};

// Map page IDs to URL paths (for navigation)
const PAGE_TO_PATH: Record<string, string> = {
  'home': '/',
  'png-to-pdf': '/png-to-pdf',
  'jpeg-to-pdf': '/jpeg-to-pdf',
  'image-to-pdf': '/image-to-pdf',
  'privacy': '/privacy-policy',
  'about': '/about',
  'terms': '/terms-of-service',
  'contact': '/contact',
  'faq': '/faq',
  'how-to-guide': '/how-to-convert-jpg-to-pdf',
  'blog': '/blog',
  'sitemap': '/sitemap',
};

function getPageFromPath(path: string): string {
  // Remove trailing slash
  const cleanPath = path === '/' ? '/' : path.replace(/\/$/, '');
  return PATH_TO_PAGE[cleanPath] || '404';
}

export function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    const path = PAGE_TO_PATH[page] || '/';
    window.history.pushState({ page }, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handler = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage(getPageFromPath(window.location.pathname));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Handle custom navigate events (from other components)
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        handleNavigate(customEvent.detail);
      }
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, [handleNavigate]);

  // Set initial history state
  useEffect(() => {
    const path = PAGE_TO_PATH[currentPage] || '/';
    window.history.replaceState({ page: currentPage }, '', path);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <SEOHead
              title="JPG to PDF Converter - Free Online Image to PDF Tool | No Signup"
              description="Convert JPG to PDF online for free. No signup required. Upload multiple images, reorder pages, and download your PDF instantly. 100% private."
              canonical="https://jpgtopdfconverter.com/"
              keywords="jpg to pdf, convert jpg to pdf, image to pdf, free jpg to pdf converter, jpg to pdf online, jpg to pdf without login"
            />
            <ConverterPage
              title="JPG to PDF Converter"
              description="Convert JPG, JPEG, and PNG images to PDF instantly. Free, private, no signup required. All processing happens in your browser."
            />
          </>
        );
      case 'png-to-pdf':
        return (
          <>
            <SEOHead
              title="PNG to PDF Converter - Convert PNG to PDF Online Free | No Signup"
              description="Convert PNG images to PDF online for free. Upload multiple PNG files, arrange them, and download your PDF in seconds. 100% private, no signup."
              canonical="https://jpgtopdfconverter.com/png-to-pdf"
              keywords="png to pdf, convert png to pdf, png to pdf converter, png to pdf online, png to pdf free"
            />
            <Breadcrumbs
              items={[
                { label: 'Home', page: 'home' },
                { label: 'PNG to PDF Converter' },
              ]}
              onNavigate={handleNavigate}
            />
            <ConverterPage
              title="PNG to PDF Converter"
              description="Convert PNG images to PDF online for free. Upload multiple PNG files, arrange them, and download your PDF in seconds."
              acceptTypes="image/png"
            />
          </>
        );
      case 'jpeg-to-pdf':
        return <JpegToPdfPage onNavigate={handleNavigate} />;
      case 'image-to-pdf':
        return <ImageToPdfPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'how-to-guide':
        return <HowToGuidePage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapPage onNavigate={handleNavigate} />;
      case '404':
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <SEOHead
              title="JPG to PDF Converter - Free Online Image to PDF Tool | No Signup"
              description="Convert JPG to PDF online for free. No signup required."
              canonical="https://jpgtopdfconverter.com/"
            />
            <ConverterPage
              title="JPG to PDF Converter"
              description="Convert JPG, JPEG, and PNG images to PDF instantly. Free, private, no signup required."
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1" role="main">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <CookieConsent />
    </div>
  );
}
