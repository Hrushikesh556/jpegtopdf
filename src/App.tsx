import { HashRouter, Routes, Route } from 'react-router-dom';
import ImageConverter from './components/ImageConverter';
import SEOContent from './components/SEOContent';
import PrivacyPolicy from './components/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <ImageConverter />
      <SEOContent />
    </>
  );
}

export function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jpg-to-pdf" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}