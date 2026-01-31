import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            About JPG to PDF Converter
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            A free, privacy-focused tool built to help millions convert images to PDF quickly and securely.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-8">
          
          {/* Mission */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We believe file conversion should be simple, fast, and free. Our mission is to provide 
              the best online image to PDF converter without requiring signups, subscriptions, or 
              uploading your files to external servers.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">100% Free</h3>
                  <p className="text-xs text-slate-600">No hidden costs or premium features</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Privacy First</h3>
                  <p className="text-xs text-slate-600">Files never leave your device</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Lightning Fast</h3>
                  <p className="text-xs text-slate-600">Instant browser-based conversion</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Mobile Friendly</h3>
                  <p className="text-xs text-slate-600">Works great on any device</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Upload Images</h3>
                  <p className="text-xs text-slate-600">Drag and drop or click to select JPG/PNG files</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Arrange & Configure</h3>
                  <p className="text-xs text-slate-600">Reorder pages and choose PDF settings</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Download PDF</h3>
                  <p className="text-xs text-slate-600">Click convert and get your PDF instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
            >
              Start Converting
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
