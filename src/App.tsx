import { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const JpgToPdfPage = lazy(() => import('./pages/JpgToPdfPage'));
const PngToPdfPage = lazy(() => import('./pages/PngToPdfPage'));
const PdfToJpgPage = lazy(() => import('./pages/PdfToJpgPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

// Simple router based on pathname
function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    // Handle link clicks for SPA navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const path = anchor.pathname;
        if (path !== currentPath && !anchor.hash) {
          e.preventDefault();
          window.history.pushState({}, '', path);
          setCurrentPath(path);
          window.scrollTo(0, 0);
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, [currentPath]);

  // Route matching
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/jpg-to-pdf':
        return <JpgToPdfPage />;
      case '/png-to-pdf':
        return <PngToPdfPage />;
      case '/pdf-to-jpg':
        return <PdfToJpgPage />;
      case '/about':
        return <AboutPage />;
      case '/privacy-policy':
        return <PrivacyPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {renderPage()}
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <Router />
      <Analytics />
    </>
  );
}
