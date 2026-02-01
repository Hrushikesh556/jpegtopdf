import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageConverter from '../components/ImageConverter';
import SEOContent from '../components/SEOContent';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-indigo-50/30 to-white">
      <Navbar currentPath="/" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-50 animate-float" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-40 animate-float delay-500" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600">100% Free • No Login Required</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in delay-100">
            Free <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JPG to PDF</span> Converter
          </h1>
          
          {/* Subheading */}
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 animate-fade-in delay-200">
            Convert JPG, JPEG, PNG images to PDF instantly. Fast, private, and works entirely in your browser.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-500 animate-fade-in delay-300">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Conversion</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Converter Tool */}
      <section className="py-6">
        <ImageConverter />
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            Why Choose Our JPG to PDF Converter?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Trusted by thousands of users daily for fast, secure document conversion
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Convert in seconds' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Files never leave your device' },
              { icon: '📱', title: 'Mobile Ready', desc: 'Works on all devices' },
              { icon: '🎨', title: 'High Quality', desc: 'No compression' },
              { icon: '📄', title: 'Multiple Pages', desc: 'Up to 50 images' },
              { icon: '↕️', title: 'Drag & Drop', desc: 'Reorder pages easily' },
              { icon: '📐', title: 'Custom Size', desc: 'A4, Letter, or Auto' },
              { icon: '💰', title: '100% Free', desc: 'No hidden fees' },
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 card-hover"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-indigo-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
            How to Convert JPG to PDF
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Three simple steps to create your PDF
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Upload Images', desc: 'Drag & drop or click to select your JPG, JPEG, or PNG files', icon: '📤' },
              { step: '2', title: 'Arrange Pages', desc: 'Drag to reorder, select page size and orientation', icon: '📋' },
              { step: '3', title: 'Download PDF', desc: 'Click convert and download your PDF instantly', icon: '📥' },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" />
                )}
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-600 mb-2">STEP {item.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <SEOContent />

      <Footer />
    </div>
  );
}
