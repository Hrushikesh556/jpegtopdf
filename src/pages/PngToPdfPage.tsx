import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageConverter from '../components/ImageConverter';

export default function PngToPdfPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/50 via-white to-teal-50/30">
      <Navbar currentPath="/png-to-pdf" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200 to-teal-200 rounded-full blur-3xl opacity-50 animate-float" />
          <div className="absolute bottom-0 -left-40 w-60 h-60 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600">Free Online Converter • No Signup</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">PNG to PDF</span> Converter
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-6 animate-fade-in">
            Convert PNG images to PDF format instantly. High quality, preserves transparency, 100% free and private.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 animate-fade-in">
            <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-green-500">✓</span> No Registration
            </span>
            <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-green-500">✓</span> High Quality
            </span>
            <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-green-500">✓</span> 100% Private
            </span>
            <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-green-500">✓</span> Mobile Friendly
            </span>
          </div>
        </div>
      </section>

      {/* Converter */}
      <section className="py-6" id="converter">
        <ImageConverter />
      </section>

      {/* SEO Article Content */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Main Intro */}
          <article className="prose prose-lg max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Free PNG to PDF Converter — High Quality, Private, No Signup Required
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              Need to convert PNG images to PDF quickly? Our <strong>free PNG to PDF converter</strong> transforms your PNG files into professional PDF documents in seconds—without registration, without watermarks, and without uploading files to any server. Everything happens right in your browser for maximum speed and complete privacy.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you're converting screenshots, digital artwork, logos, infographics, or scanned documents with transparent backgrounds, this tool is designed for one purpose: <strong>convert PNG to PDF online</strong>, free, and hassle-free.
            </p>
          </article>

          {/* Why Convert PNG to PDF */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📄</span> Why Convert PNG to PDF?
            </h2>
            <p className="text-gray-600 mb-4">
              PNG files are excellent for images with transparency, sharp graphics, and screenshots. However, PDFs offer significant advantages for sharing and archiving:
            </p>
            <ul className="space-y-3">
              {[
                'Universal compatibility across all devices and operating systems',
                'Multiple PNG images combined into one organized document',
                'Professional appearance for business and official documents',
                'Consistent printing with exact page sizes (A4, Letter)',
                'Easier to email and share than multiple image files',
                'Preserves PNG quality in the final document',
                'Required format for many official portals and applications'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Convert - Step by Step */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🔄</span> How to Convert PNG to PDF (Step-by-Step)
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { step: '1', title: 'Upload PNG Files', desc: 'Click the upload area or drag and drop your PNG images' },
              { step: '2', title: 'Arrange Order', desc: 'Drag images to reorder pages as needed' },
              { step: '3', title: 'Choose Settings', desc: 'Select page size, orientation, and margins' },
              { step: '4', title: 'Click Convert', desc: 'Press the Convert to PDF button' },
              { step: '5', title: 'Download PDF', desc: 'Your PDF downloads automatically' },
              { step: '6', title: 'Done!', desc: 'Share your professional PDF document' }
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 mb-10">
            <strong>No waiting. No signup. No email required.</strong> Just instant PNG to PDF conversion.
          </p>

          {/* Privacy Section */}
          <div className="bg-green-600 text-white rounded-2xl p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔒</span> 100% Privacy — Files Never Leave Your Device
            </h2>
            <p className="opacity-90 mb-4">
              Unlike many online converters that upload your images to remote servers, our PNG to PDF tool works <strong>entirely in your browser</strong>. This means:
            </p>
            <ul className="space-y-2 opacity-90">
              <li className="flex items-center gap-2"><span>✓</span> Your PNG files are never uploaded anywhere</li>
              <li className="flex items-center gap-2"><span>✓</span> No one can access your images or PDFs</li>
              <li className="flex items-center gap-2"><span>✓</span> Conversion is faster with no upload/download wait</li>
              <li className="flex items-center gap-2"><span>✓</span> Works offline after the page loads</li>
              <li className="flex items-center gap-2"><span>✓</span> Safe for sensitive documents like IDs and certificates</li>
            </ul>
          </div>

          {/* PNG vs JPG Comparison */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🆚</span> PNG vs JPG: When to Use Each for PDF Conversion
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-bold text-green-700 mb-3 text-lg">Use PNG for PDF when:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Images have transparent backgrounds</li>
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Screenshots and digital graphics</li>
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Logos and icons with sharp edges</li>
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Text-heavy images (better quality)</li>
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Infographics and charts</li>
                <li className="flex items-start gap-2"><span className="text-green-500">•</span> Documents requiring crisp text</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-700 mb-3 text-lg">Use JPG for PDF when:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Photographs and camera images</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Images with many colors/gradients</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Smaller file size is priority</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> No transparency needed</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Scanned photos</li>
                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Web images and downloads</li>
              </ul>
            </div>
          </div>

          {/* Features Grid */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">⚡</span> Features That Make This PNG to PDF Tool Stand Out
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: '📤', title: 'Batch Upload', desc: 'Upload multiple PNG files at once' },
              { icon: '🔀', title: 'Drag & Drop Reorder', desc: 'Arrange pages in any order' },
              { icon: '📐', title: 'Page Size Options', desc: 'A4, Letter, or auto-fit to image' },
              { icon: '📏', title: 'Margin Control', desc: 'None, small, or large margins' },
              { icon: '🔄', title: 'Orientation', desc: 'Portrait or landscape mode' },
              { icon: '🎨', title: 'Transparency Support', desc: 'PNG transparency handled properly' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Works perfectly on phones' },
              { icon: '💯', title: 'No Watermarks', desc: 'Clean, professional output' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">💼</span> Perfect For Every PNG to PDF Need
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: '🎨 Designers', items: ['Logos & branding assets', 'Portfolio pieces', 'Client presentations', 'Design mockups'] },
              { title: '📚 Students', items: ['Screenshots of notes', 'Digital assignments', 'Research images', 'Online class materials'] },
              { title: '💼 Business', items: ['Reports with charts', 'Infographics', 'Documentation', 'Marketing materials'] }
            ].map((group, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Section */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📱</span> PNG to PDF on Mobile (Android & iPhone)
            </h2>
            <p className="text-gray-600 mb-4">
              Most users today need to convert images on their phones. This website is fully optimized for mobile devices:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Large, easy-to-tap upload button</li>
              <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Touch-friendly drag and drop reordering</li>
              <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Fast processing on any smartphone</li>
              <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> No app installation required</li>
              <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Works in Chrome, Safari, Firefox</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Simply open this page on your phone, upload your PNG screenshots or images, and download the PDF instantly.
            </p>
          </div>

          {/* Tips Section */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">💡</span> Tips for Best PNG to PDF Results
          </h2>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
            <ul className="space-y-3">
              {[
                'Use high-resolution PNG files for crisp PDF output',
                'Crop unnecessary whitespace before uploading',
                'Choose A4 size for standard document printing',
                'Use "Auto" page size to match your image dimensions exactly',
                'Select small margins for a cleaner, modern look',
                'Arrange images in the correct order before converting'
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">{i + 1}.</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">❓</span> Frequently Asked Questions
          </h2>
          
          <div className="space-y-3 mb-10">
            {[
              {
                q: 'Is this PNG to PDF converter completely free?',
                a: 'Yes! Our PNG to PDF converter is 100% free with no limits, no watermarks, and no hidden fees. Convert as many PNG files as you need.'
              },
              {
                q: 'Do I need to create an account to use this tool?',
                a: 'No registration or signup is required. Just upload your PNG files and convert instantly. We believe in frictionless tools.'
              },
              {
                q: 'Are my PNG files uploaded to a server?',
                a: 'No. All processing happens locally in your browser using JavaScript. Your files never leave your device, ensuring complete privacy and security.'
              },
              {
                q: 'Will PNG transparency be preserved in the PDF?',
                a: 'PNG images with transparent backgrounds will be converted with a white background in the PDF, as PDF format handles transparency differently than PNG.'
              },
              {
                q: 'Can I convert multiple PNG files into one PDF?',
                a: 'Yes! You can upload up to 50 PNG files and combine them into a single PDF document. Use drag and drop to arrange the page order before converting.'
              },
              {
                q: 'Does this PNG to PDF tool work on mobile phones?',
                a: 'Absolutely! Our tool is fully optimized for mobile browsers on both Android and iPhone. No app installation needed—just use your browser.'
              },
              {
                q: 'What is the maximum file size I can convert?',
                a: 'Since processing happens in your browser, you can convert typical PNG files without issues. Very large files may depend on your device\'s available memory.'
              },
              {
                q: 'Can I also convert JPG images to PDF?',
                a: 'Yes! Check out our JPG to PDF converter for converting JPEG and JPG images to PDF format. The same great features apply.'
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Speed & Reliability */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span> Fast, Reliable PNG to PDF Conversion
            </h2>
            <p className="opacity-90 mb-4">
              Because conversion happens directly in your browser, you get:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 opacity-90">
              <li className="flex items-center gap-2">⚡ No server delays or queues</li>
              <li className="flex items-center gap-2">🔄 Instant processing</li>
              <li className="flex items-center gap-2">📶 Works on slow internet connections</li>
              <li className="flex items-center gap-2">💾 No file size upload limits</li>
              <li className="flex items-center gap-2">🌐 Works offline after page loads</li>
              <li className="flex items-center gap-2">✨ Results in seconds, not minutes</li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Start Converting PNG to PDF Now
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your PNG images, arrange them in order, and download your professional PDF in seconds. 
              This free PNG to PDF converter is built for speed, privacy, and simplicity.
            </p>
            <button 
              onClick={() => {
                const converter = document.getElementById('converter');
                converter?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg"
            >
              <span>🖼️</span> Convert PNG to PDF Free
            </button>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <a href="#/" className="text-green-700 hover:underline font-medium">JPG to PDF</a>
              <span className="text-gray-300">|</span>
              <a href="#/pdf-to-jpg" className="text-green-700 hover:underline font-medium">PDF to JPG</a>
              <span className="text-gray-300">|</span>
              <a href="#/about" className="text-green-700 hover:underline font-medium">About Us</a>
            </div>
          </div>

        </div>
      </section>

      {/* JSON-LD Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Is this PNG to PDF converter completely free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our PNG to PDF converter is 100% free with no limits, no watermarks, and no hidden fees."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to create an account?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No registration or signup is required. Just upload your PNG files and convert instantly."
              }
            },
            {
              "@type": "Question",
              "name": "Are my PNG files uploaded to a server?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. All processing happens locally in your browser. Your files never leave your device."
              }
            },
            {
              "@type": "Question",
              "name": "Will PNG transparency be preserved?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "PNG images with transparent backgrounds will be converted with a white background in the PDF."
              }
            },
            {
              "@type": "Question",
              "name": "Can I convert multiple PNG files into one PDF?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can upload up to 50 PNG files and combine them into a single PDF document."
              }
            },
            {
              "@type": "Question",
              "name": "Does this work on mobile phones?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! Our tool is fully optimized for mobile browsers on both Android and iPhone."
              }
            }
          ]
        })
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PNG to PDF Converter",
          "description": "Free online PNG to PDF converter. Convert multiple PNG images to a single PDF document instantly. No signup, no watermarks, 100% private.",
          "url": "https://jpgtopdf.com/png-to-pdf",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Convert PNG to PDF",
            "Batch conversion",
            "Drag and drop reorder",
            "Custom page sizes",
            "100% client-side processing",
            "No registration required",
            "Mobile friendly"
          ]
        })
      }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Convert PNG to PDF",
          "description": "Step-by-step guide to convert PNG images to PDF format online for free",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Upload PNG Files",
              "text": "Click the upload area or drag and drop your PNG images"
            },
            {
              "@type": "HowToStep",
              "name": "Arrange Order",
              "text": "Drag images to reorder pages as needed"
            },
            {
              "@type": "HowToStep",
              "name": "Choose Settings",
              "text": "Select page size (A4, Letter, Auto), orientation, and margins"
            },
            {
              "@type": "HowToStep",
              "name": "Convert",
              "text": "Click the Convert to PDF button"
            },
            {
              "@type": "HowToStep",
              "name": "Download",
              "text": "Your PDF downloads automatically"
            }
          ]
        })
      }} />

      <Footer />
    </div>
  );
}
