import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd, InArticleAd } from '../components/AdBanner';

interface HowToGuidePageProps {
  onNavigate: (page: string) => void;
}

export function HowToGuidePage({ onNavigate }: HowToGuidePageProps) {
  return (
    <div>
      <SEOHead
        title="How to Convert JPG to PDF - Complete Step-by-Step Guide (2024)"
        description="Learn how to convert JPG to PDF online for free. Complete guide with step-by-step instructions, tips for best quality, mobile instructions, and troubleshooting."
        canonical="https://jpgtopdfconverter.com/how-to-convert-jpg-to-pdf"
        keywords="how to convert jpg to pdf, jpg to pdf tutorial, image to pdf guide, convert pictures to pdf, how to make pdf from images, step by step jpg to pdf"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'How to Convert JPG to PDF' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wide">Complete Guide</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
            How to Convert JPG to PDF Online — Free Step-by-Step Guide
          </h1>
          <p className="text-gray-500 text-sm">
            Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · 8 min read
          </p>
        </div>

        <ResponsiveAd adSlot="1155001100" className="mb-8" />

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">📋 Table of Contents</h2>
          <ol className="space-y-1.5 text-sm">
            {[
              'Why Convert JPG to PDF?',
              'Step-by-Step: Convert JPG to PDF Online',
              'How to Convert Multiple Images to One PDF',
              'Converting JPG to PDF on Mobile',
              'Best Settings for Different Use Cases',
              'Tips for Best Quality PDF Output',
              'Converting JPG to PDF for Official Documents',
              'Troubleshooting Common Issues',
              'Alternative Methods',
            ].map((item, i) => (
              <li key={i}>
                <a href={`#section-${i + 1}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {i + 1}. {item}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="prose prose-gray max-w-none">
          {/* Section 1 */}
          <h2 id="section-1" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            1. Why Convert JPG to PDF?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Converting <strong>JPG images to PDF</strong> is one of the most common digital tasks. PDFs are the universal standard for sharing documents because they look the same on every device, can't be easily edited (maintaining document integrity), and can combine multiple pages into a single file. Here are the most common reasons people convert JPG to PDF:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Official document submission</strong> — Government forms, visa applications, tax documents</li>
            <li><strong>Academic submissions</strong> — University assignments, exam papers, research documents</li>
            <li><strong>Professional use</strong> — Reports, presentations, portfolios, proposals</li>
            <li><strong>Scanning documents</strong> — Combining scanned pages into one document</li>
            <li><strong>Email attachments</strong> — Sending multiple images as one organized file</li>
            <li><strong>Archiving</strong> — Long-term storage of photos and documents</li>
            <li><strong>Printing</strong> — PDFs ensure correct formatting when printing</li>
          </ul>

          {/* Section 2 */}
          <h2 id="section-2" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            2. Step-by-Step: Convert JPG to PDF Online
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Follow these simple steps to <strong>convert JPG to PDF</strong> using our free online converter:
          </p>

          <div className="space-y-6 mb-6">
            <div className="bg-white rounded-xl border-2 border-red-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Open the Converter</h3>
                  <p className="text-gray-600">
                    Go to our{' '}
                    <button onClick={() => onNavigate('home')} className="text-blue-600 underline font-medium">
                      JPG to PDF Converter
                    </button>{' '}
                    homepage. No signup or login needed — the tool is ready to use immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-orange-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Upload Your Images</h3>
                  <p className="text-gray-600 mb-2">
                    Click the upload area or drag and drop your JPG, JPEG, or PNG files directly onto the page.
                    You can select multiple images at once — up to 50 images per conversion.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    💡 <strong>Tip:</strong> On desktop, hold Ctrl (or Cmd on Mac) to select multiple files in the file picker.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-amber-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Arrange Your Pages</h3>
                  <p className="text-gray-600">
                    After uploading, you'll see thumbnail previews of all your images. Drag and drop them to rearrange
                    the order — the sequence you set will be the page order in your final PDF. You can also delete any
                    unwanted images by clicking the X button on each thumbnail.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Configure PDF Settings</h3>
                  <p className="text-gray-600 mb-2">Customize your PDF output:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                    <li><strong>Page Size:</strong> A4 (international), Letter (US), or Auto (match image size)</li>
                    <li><strong>Orientation:</strong> Portrait or Landscape</li>
                    <li><strong>Margin:</strong> None, Small (10mm), or Large (20mm)</li>
                    <li><strong>Image Fit:</strong> Contain (no crop) or Fill (full page)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-blue-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Convert & Download</h3>
                  <p className="text-gray-600">
                    Click the <strong>"Convert to PDF"</strong> button. The conversion happens instantly in your browser.
                    A progress bar shows how many images have been processed. Once complete, the PDF downloads automatically
                    to your device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <InArticleAd adSlot="1155001101" />

          {/* Section 3 */}
          <h2 id="section-3" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            3. How to Convert Multiple Images to One PDF
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Combining <strong>multiple JPG images into a single PDF</strong> is one of the most powerful features of our tool.
            This is perfect for creating multi-page documents from scanned pages, photo collections, or document compilations.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Simply upload all your images at once (you can select up to 50), arrange them in the correct order using drag-and-drop,
            and click Convert. Each image will become one page in your PDF, maintaining the exact order you set.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 Pro Tips for Multi-Page PDFs:</h3>
            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
              <li>Name your files numerically (1.jpg, 2.jpg, 3.jpg) for easy identification</li>
              <li>Use A4 page size for documents that will be printed</li>
              <li>Choose "Contain" fit mode to prevent any image cropping</li>
              <li>Add small margins for a more professional look</li>
            </ul>
          </div>

          {/* Section 4 */}
          <h2 id="section-4" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            4. Converting JPG to PDF on Mobile
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>JPG to PDF converter works perfectly on mobile phones and tablets</strong>. Whether you're using an
            iPhone, Android phone, or iPad, the experience is fully optimized with large touch targets, smooth drag-and-drop
            reordering, and a sticky convert button at the bottom of the screen.
          </p>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">On iPhone (iOS):</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
            <li>Open Safari or Chrome and visit our website</li>
            <li>Tap the upload area</li>
            <li>Select "Photo Library" to choose from your camera roll</li>
            <li>Select your images and tap "Add"</li>
            <li>Arrange, set options, and tap Convert</li>
            <li>Find the PDF in your Downloads or Files app</li>
          </ol>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">On Android:</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
            <li>Open Chrome and visit our website</li>
            <li>Tap the upload area</li>
            <li>Choose images from your Gallery or Files</li>
            <li>Arrange and configure settings</li>
            <li>Tap Convert — the PDF saves to your Downloads folder</li>
          </ol>

          <InArticleAd adSlot="1155001102" />

          {/* Section 5 */}
          <h2 id="section-5" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            5. Best Settings for Different Use Cases
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Use Case</th>
                  <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Page Size</th>
                  <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Orientation</th>
                  <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Margin</th>
                  <th className="text-left p-3 font-bold text-gray-900 border border-gray-200">Fit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 text-gray-700">Official documents</td>
                  <td className="p-3 border border-gray-200 text-gray-700">A4</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Portrait</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Small</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Contain</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">Photo album</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Auto</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Auto</td>
                  <td className="p-3 border border-gray-200 text-gray-700">None</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Fill</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 text-gray-700">Scanned pages</td>
                  <td className="p-3 border border-gray-200 text-gray-700">A4</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Portrait</td>
                  <td className="p-3 border border-gray-200 text-gray-700">None</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Fill</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">US Letter forms</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Letter</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Portrait</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Small</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Contain</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 text-gray-700">Landscape photos</td>
                  <td className="p-3 border border-gray-200 text-gray-700">A4</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Landscape</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Small</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Contain</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 text-gray-700">Receipts / invoices</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Auto</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Auto</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Small</td>
                  <td className="p-3 border border-gray-200 text-gray-700">Contain</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 6 */}
          <h2 id="section-6" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            6. Tips for Best Quality PDF Output
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6">
            <li><strong>Use high-resolution images:</strong> 300 DPI or higher for documents that will be printed. Phone camera images are usually high enough quality.</li>
            <li><strong>Avoid heavy compression:</strong> If saving images before uploading, use high quality JPEG settings (90%+).</li>
            <li><strong>Match orientation to content:</strong> Use Portrait for documents and Landscape for wide photos or presentations.</li>
            <li><strong>Use "Contain" for documents:</strong> This ensures no part of your document is cropped out.</li>
            <li><strong>Add margins for printing:</strong> If you plan to print the PDF, add at least Small margins to prevent content from being cut off by the printer.</li>
          </ul>

          <InArticleAd adSlot="1155001103" />

          {/* Section 7 */}
          <h2 id="section-7" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            7. Converting JPG to PDF for Official Documents
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Many official processes require documents in PDF format. Here's how to ensure your converted PDFs meet requirements:
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">🏛️ Government Forms</h3>
              <p className="text-sm text-gray-600">Use A4 page size, Portrait orientation, Small margins. Make sure the text in your scanned images is clear and readable. Convert at the highest quality available.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">✈️ Visa & Passport Applications</h3>
              <p className="text-sm text-gray-600">Follow the specific size requirements from the embassy. Usually A4 with no margins works best. Ensure images are well-lit and not blurry.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">🎓 University Submissions</h3>
              <p className="text-sm text-gray-600">Check your university's requirements. Most accept A4 or Letter size. Use Portrait orientation for text documents, and include proper margins.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">💼 Business Documents</h3>
              <p className="text-sm text-gray-600">For professional appearance, use A4 with Small margins and Contain fit. This ensures clean edges and consistent formatting.</p>
            </div>
          </div>

          {/* Section 8 */}
          <h2 id="section-8" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            8. Troubleshooting Common Issues
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">❓ Images not uploading?</h3>
              <p className="text-sm text-gray-600">Make sure your files are in JPG, JPEG, or PNG format. Other formats like WEBP, HEIC, BMP, or GIF are not currently supported. Check that you haven't exceeded the 50 image limit.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">❓ PDF not downloading?</h3>
              <p className="text-sm text-gray-600">Check if pop-ups are blocked in your browser settings. Try a different browser. On mobile, check your Downloads folder. Clear browser cache and reload.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">❓ Images look blurry in PDF?</h3>
              <p className="text-sm text-gray-600">This usually means the original images are low resolution. Try using higher resolution source images. Our tool maintains 92% JPEG quality during conversion.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">❓ Conversion is slow?</h3>
              <p className="text-sm text-gray-600">Large images take longer to process. Try reducing the number of images or their resolution. Close other browser tabs to free up memory. Chrome generally offers the best performance.</p>
            </div>
          </div>

          {/* Section 9 */}
          <h2 id="section-9" className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            9. Alternative Methods to Convert JPG to PDF
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While our online tool is the fastest and most convenient method, here are other ways to convert JPG to PDF:
          </p>
          <div className="space-y-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Using Windows (Print to PDF)</h3>
              <p className="text-sm text-gray-600">Right-click the image → Print → Select "Microsoft Print to PDF" as printer → Save. Limited to one image at a time.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Using Mac (Preview)</h3>
              <p className="text-sm text-gray-600">Open images in Preview → File → Export as PDF. Can handle multiple images but requires manual arrangement.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Using Adobe Acrobat</h3>
              <p className="text-sm text-gray-600">Professional tool with advanced features but requires a paid subscription ($12.99+/month).</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Using Our Online Tool (Recommended ✅)</h3>
              <p className="text-sm text-gray-600">Free, works on any device, handles multiple images, drag-and-drop reorder, custom settings, 100% private. No installation needed.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 text-center border border-red-100 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Convert Your Images?</h2>
            <p className="text-gray-600 mb-4">Try our free JPG to PDF converter now — no signup required.</p>
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition shadow-lg text-lg"
            >
              🚀 Convert JPG to PDF Now
            </button>
          </div>
        </div>

        <ResponsiveAd adSlot="1155001104" className="mt-8" />
      </div>
    </div>
  );
}
