export default function SEOContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      
      {/* How to Use */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
          How to Convert JPG to PDF
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold">1</div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Upload Images</h3>
            <p className="text-xs text-slate-600">Drag & drop or click to select JPG, JPEG, or PNG files</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold">2</div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Arrange Pages</h3>
            <p className="text-xs text-slate-600">Drag to reorder and set page size, orientation, margins</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-3 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold">3</div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">Download PDF</h3>
            <p className="text-xs text-slate-600">Click convert and your PDF downloads instantly</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
          Why Use Our JPG to PDF Converter?
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: '🔒', title: '100% Private', desc: 'Files never leave your device' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Instant browser-based conversion' },
            { icon: '🆓', title: 'Completely Free', desc: 'No signup, no limits, no watermarks' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Desktop, tablet, and mobile' },
            { icon: '🔄', title: 'Batch Convert', desc: 'Up to 50 images at once' },
            { icon: '⚙️', title: 'Custom Settings', desc: 'Page size, margins, orientation' },
          ].map((feature, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">{feature.title}</h3>
                <p className="text-xs text-slate-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-10 bg-white rounded-lg border border-slate-200 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">
          Free Online JPG to PDF Converter
        </h2>
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            Our <strong>JPG to PDF converter</strong> is a free online tool that transforms your 
            JPEG and PNG images into PDF documents instantly. Whether you need to convert a single 
            photo or combine multiple images into one PDF, our tool makes it simple and fast.
          </p>
          <p>
            Unlike other online converters, we process everything directly in your browser. This 
            means your <strong>images never leave your device</strong>, ensuring complete privacy 
            and security. No file uploads, no waiting for server processing, and no risk of your 
            personal photos being stored on external servers.
          </p>
          <p>
            Perfect for students submitting assignments, professionals creating reports, or anyone 
            who needs to convert <strong>image to PDF</strong> quickly. Our tool supports drag-and-drop 
            upload, custom page sizes (A4, Letter, or auto-fit), adjustable margins, and both 
            portrait and landscape orientations.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10" id="faq">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: 'Is this JPG to PDF converter really free?',
              a: 'Yes, completely free! No signup required, no hidden fees, no watermarks on your PDFs.'
            },
            {
              q: 'Are my images uploaded to a server?',
              a: 'No. All conversion happens in your browser. Your images never leave your device, ensuring complete privacy.'
            },
            {
              q: 'How many images can I convert at once?',
              a: 'You can convert up to 50 images in a single PDF. Simply upload all your images, arrange them in order, and convert.'
            },
            {
              q: 'What image formats are supported?',
              a: 'We support JPG, JPEG, and PNG image formats. All common image types from cameras and phones work perfectly.'
            },
            {
              q: 'Can I use this on my phone?',
              a: 'Yes! Our converter is fully mobile-optimized. It works great on iPhones, Android phones, and tablets.'
            },
            {
              q: 'How do I change the page order?',
              a: 'After uploading, simply drag and drop the image thumbnails to rearrange them in your preferred order.'
            }
          ].map((faq, i) => (
            <details key={i} className="bg-white rounded-lg border border-slate-200 group">
              <summary className="px-4 py-3 cursor-pointer font-medium text-slate-800 text-sm flex justify-between items-center">
                {faq.q}
                <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-4 pb-3 text-sm text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-10 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Popular Uses for JPG to PDF Conversion
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Submitting scanned documents</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Creating photo albums</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Combining receipts for expense reports</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Archiving important photos</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Preparing documents for email</span>
          </div>
          <div className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-slate-700">Creating portfolios</span>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <a href="#/png-to-pdf" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            PNG to PDF
          </a>
          <a href="#/pdf-to-jpg" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            PDF to JPG
          </a>
          <span className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-500">
            Merge PDF (Coming Soon)
          </span>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JPG to PDF Converter",
            "url": "https://jpgtopdf.com",
            "description": "Free online tool to convert JPG images to PDF documents",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Convert JPG to PDF",
              "Convert PNG to PDF",
              "Drag and drop upload",
              "Reorder pages",
              "Custom page sizes",
              "No signup required",
              "100% client-side processing"
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is this JPG to PDF converter really free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, completely free! No signup required, no hidden fees, no watermarks on your PDFs."
                }
              },
              {
                "@type": "Question",
                "name": "Are my images uploaded to a server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. All conversion happens in your browser. Your images never leave your device."
                }
              },
              {
                "@type": "Question",
                "name": "How many images can I convert at once?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can convert up to 50 images in a single PDF."
                }
              }
            ]
          })
        }}
      />
    </section>
  );
}
