import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageConverter from '../components/ImageConverter';

export default function JpgToPdfPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-indigo-50/30 to-white">
      <Navbar currentPath="/jpg-to-pdf" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-50 animate-float" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600">100% Free • Works Offline</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JPG to PDF</span> Converter
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in">
            Transform your JPG and JPEG images into professional PDF documents in seconds. No signup required.
          </p>
        </div>
      </section>

      {/* Converter */}
      <section className="py-6">
        <ImageConverter />
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
            Convert JPG to PDF Online — Fast & Free
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🖼️</span> Supports All JPG Formats
              </h3>
              <p className="text-gray-600 text-sm">
                Our converter handles JPG, JPEG, and even PNG files. Upload multiple images at once and combine them into a single PDF document.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🔒</span> Privacy Guaranteed
              </h3>
              <p className="text-gray-600 text-sm">
                Your images are processed entirely in your browser. Nothing is uploaded to any server, ensuring complete privacy.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📐</span> Customizable Settings
              </h3>
              <p className="text-gray-600 text-sm">
                Choose your page size (A4, Letter, or Auto), set margins, and select portrait or landscape orientation.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">⚡</span> Instant Download
              </h3>
              <p className="text-gray-600 text-sm">
                Get your PDF immediately after conversion. No email required, no waiting in queues, no watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
