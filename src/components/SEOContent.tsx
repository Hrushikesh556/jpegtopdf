export default function SEOContent() {
  return (
    <section className="py-12 px-4 bg-white" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Article Content */}
        <article className="prose prose-lg max-w-none">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Free JPG to PDF Converter — Fast, Private, No Login
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Intro */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 sm:p-8 rounded-2xl mb-8">
            <p className="text-gray-700 leading-relaxed m-0">
              Need to turn images into a single, shareable document in seconds? Our <strong>JPG to PDF converter</strong> lets you upload multiple JPG, JPEG, or PNG files, arrange them in order, and download a clean PDF instantly—without login, without watermarks, and without uploading your files to any server. Everything runs in your browser for maximum speed and privacy.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4 mb-0">
              Whether you're submitting exam forms, office paperwork, government documents, or homework scans, this tool is designed for one thing: <strong>convert image to PDF online</strong>, free, and hassle-free.
            </p>
          </div>

          {/* Why Convert Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">📄</span>
              Why Convert JPG to PDF?
            </h3>
            <p className="text-gray-700 mb-4">
              Images are great for photos, but PDFs are better for documents. A single PDF is easier to:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                'Share on WhatsApp and email',
                'Upload to portals and application forms',
                'Print in the correct page size',
                'Keep pages in the right order',
                'Preserve quality across devices'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              If you've ever had to upload multiple photos to a website that accepts only one file, you already know why <strong>JPG to PDF</strong> is essential.
            </p>
          </div>

          {/* How To Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">📝</span>
              How to Convert JPG to PDF (Step-by-Step)
            </h3>
            <ol className="space-y-3 mb-4">
              {[
                'Click the upload box and select one or more JPG/PNG images',
                'Drag and drop to reorder pages as you like',
                'Choose page size (A4, Letter, or Auto), margins, and orientation',
                'Click Convert to PDF',
                'Download your file instantly'
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4 bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                  <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-indigo-600 font-semibold">
              No waiting. No signup. No email required.
            </p>
          </div>

          {/* Privacy Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl mb-10 border border-green-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🔒</span>
              100% Privacy — Files Never Leave Your Device
            </h3>
            <p className="text-gray-700 mb-4">
              Unlike many converters that upload your images to a server, this tool works entirely in your browser. That means:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                'Your images are not stored',
                'No one can access your files',
                'Conversion is faster because there\'s no upload time',
                'You can even use it on a slow internet connection'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-4 mb-0">
              If you're converting sensitive documents like ID proofs, certificates, or signed forms, this <strong>privacy-first approach</strong> matters.
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">✨</span>
              Features That Make This JPG to PDF Tool Different
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: '📤', text: 'Upload multiple images at once' },
                { icon: '🖱️', text: 'Drag & drop to set page order' },
                { icon: '📐', text: 'Page size options: A4, Letter, Auto fit' },
                { icon: '📏', text: 'Margin control for neat printing' },
                { icon: '🔄', text: 'Portrait and landscape orientation' },
                { icon: '📱', text: 'Works smoothly on mobile phones' },
                { icon: '✅', text: 'Clean, watermark-free PDF output' },
                { icon: '💸', text: 'Completely free JPG to PDF converter' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🎯</span>
              Perfect for Students, Offices, and Online Forms
            </h3>
            <p className="text-gray-700 mb-4">This tool is widely used for:</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                'School and college assignments',
                'Government exam applications',
                'Job application portals',
                'Office documentation and reports',
                'Scanned receipts and bills',
                'Converting notes photos into one PDF'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-xl">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700">
              If you take pictures of notes or documents on your phone, you can turn them into a proper PDF in seconds.
            </p>
          </div>

          {/* Mobile Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-2xl mb-10 border border-blue-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📱</span>
              JPG to PDF on Mobile (Android & iPhone)
            </h3>
            <p className="text-gray-700 mb-4">
              Most users today convert images on their phones. This website is fully optimized for mobile:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                'Large upload button',
                'Touch-friendly reordering',
                'Fast processing even on mid-range devices',
                'No app installation needed'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 font-medium mb-0">
              Just open the site in Chrome or Safari and convert.
            </p>
          </div>

          {/* Tips Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">💡</span>
              Tips for Best PDF Quality
            </h3>
            <p className="text-gray-700 mb-4">For the best results:</p>
            <ul className="space-y-2 mb-4">
              {[
                'Use clear, well-lit images',
                'Crop extra background before uploading',
                'Arrange pages in the correct order',
                'Choose "A4" if you plan to print',
                'Use small margins for a clean look'
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              These small steps ensure your final PDF looks professional.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">❓</span>
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-3">
              {[
                { q: 'Is this JPG to PDF converter free?', a: 'Yes. It\'s completely free with no limits and no watermarks.' },
                { q: 'Do I need to sign up?', a: 'No login or signup is required.' },
                { q: 'Are my images uploaded to a server?', a: 'No. All processing happens locally in your browser.' },
                { q: 'Can I convert PNG to PDF too?', a: 'Yes, PNG files are supported along with JPG and JPEG.' },
                { q: 'Does it work on mobile?', a: 'Yes. The tool is fully mobile-friendly.' },
                { q: 'Can I reorder pages before creating the PDF?', a: 'Yes. Drag and drop images to set the exact order.' }
              ].map((faq, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <svg className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* When to Use Section */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-xl">📌</span>
              When Should You Use JPG to PDF Instead of Sharing Images?
            </h3>
            <p className="text-gray-700 mb-4">Use a PDF when:</p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                'A website accepts only PDF uploads',
                'You want multiple images in one file',
                'You need consistent page size for printing',
                'You want a more professional format for email'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              PDF is universally accepted and looks the same everywhere.
            </p>
          </div>

          {/* Safe Fast Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 rounded-2xl mb-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">🚀</span>
              Safe, Fast, and Reliable
            </h3>
            <p className="mb-4 text-white/90">
              Because the conversion happens in your browser:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                'There\'s no server downtime',
                'No queue or waiting',
                'No file size worries for typical document photos',
                'Instant results every time'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 mb-0 text-white/90">
              This makes it one of the <strong>fastest ways to convert JPG to PDF online</strong>.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 p-6 sm:p-8 rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Try It Now
            </h3>
            <p className="text-gray-700 mb-6">
              Upload your images, arrange them, and download your PDF in seconds. This <strong>free JPG to PDF converter without login</strong> is built for speed, privacy, and simplicity—exactly what you need when you're in a hurry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#converter" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Start Converting Now
              </a>
            </div>
            <p className="text-gray-600 mt-6 text-sm">
              If you also need related tools, check out{' '}
              <a href="/png-to-pdf" className="text-indigo-600 hover:underline font-medium">PNG to PDF</a> and{' '}
              <a href="/pdf-to-jpg" className="text-indigo-600 hover:underline font-medium">PDF to JPG</a> to handle all your document conversion needs in one place.
            </p>
          </div>

        </article>

        {/* JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this JPG to PDF converter free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. It's completely free with no limits and no watermarks." }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": { "@type": "Answer", "text": "No login or signup is required." }
              },
              {
                "@type": "Question",
                "name": "Are my images uploaded to a server?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. All processing happens locally in your browser." }
              },
              {
                "@type": "Question",
                "name": "Can I convert PNG to PDF too?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, PNG files are supported along with JPG and JPEG." }
              },
              {
                "@type": "Question",
                "name": "Does it work on mobile?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. The tool is fully mobile-friendly." }
              },
              {
                "@type": "Question",
                "name": "Can I reorder pages before creating the PDF?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Drag and drop images to set the exact order." }
              }
            ]
          })
        }} />
      </div>
    </section>
  );
}
