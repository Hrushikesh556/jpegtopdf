import ImageConverter from '../components/ImageConverter';

export default function JpgToPdfPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-violet-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            100% Free • No Signup Required
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            JPG to PDF Converter
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Convert your JPG, JPEG, and PNG images to PDF instantly. Free, fast, and secure.
          </p>
        </div>
      </section>

      {/* Converter */}
      <ImageConverter />

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">Key Features</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Secure & Private</h3>
            <p className="text-xs text-slate-600">Files processed locally in your browser</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Instant Conversion</h3>
            <p className="text-xs text-slate-600">No waiting, immediate results</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Custom Settings</h3>
            <p className="text-xs text-slate-600">Page size, margins, orientation</p>
          </div>
        </div>
      </section>
    </>
  );
}
