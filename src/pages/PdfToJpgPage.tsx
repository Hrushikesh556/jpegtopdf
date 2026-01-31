export default function PdfToJpgPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium mb-4">
            Coming Soon
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Convert PDF to JPG Online
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Extract images from PDF files and convert PDF pages to JPG format. Coming soon!
          </p>
        </div>
      </section>

      {/* Coming Soon Card */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 mb-2">Coming Soon</h2>
          <p className="text-slate-600 text-sm mb-6">
            We're working on adding PDF to JPG conversion. In the meantime, try our other tools!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="#/"
              className="px-5 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
            >
              JPG to PDF
            </a>
            <a 
              href="#/png-to-pdf"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              PNG to PDF
            </a>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Upcoming Features</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-slate-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Extract All Pages</h4>
            <p className="text-xs text-slate-600">Convert every page to JPG</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-slate-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Quality Options</h4>
            <p className="text-xs text-slate-600">Choose output resolution</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-slate-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-800 text-sm mb-1">Batch Download</h4>
            <p className="text-xs text-slate-600">Download as ZIP file</p>
          </div>
        </div>
      </section>
    </>
  );
}
