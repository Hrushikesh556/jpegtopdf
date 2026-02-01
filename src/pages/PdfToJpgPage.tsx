import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PdfToJpgPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      <Navbar currentPath="/pdf-to-jpg" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-50 animate-float" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 pt-12 sm:pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full mb-6 animate-fade-in">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Coming Soon</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">PDF to JPG</span> Converter
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 animate-fade-in">
            Convert PDF pages to high-quality JPG images. Extract and download individual pages as images.
          </p>
          
          {/* Coming Soon Card */}
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-3">We're Working On It!</h2>
            <p className="text-gray-600 mb-6">
              PDF to JPG conversion is coming soon. In the meantime, try our JPG to PDF converter.
            </p>
            
            <a 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Try JPG to PDF
            </a>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            What to Expect
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '📄', title: 'Page Selection', desc: 'Choose which pages to convert' },
              { icon: '🖼️', title: 'High Quality', desc: 'Export in high resolution' },
              { icon: '📦', title: 'Batch Download', desc: 'Download all images at once' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center opacity-60">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
