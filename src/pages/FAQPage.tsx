import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd, InArticleAd } from '../components/AdBanner';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is JPG to PDF Converter?',
        a: 'JPG to PDF Converter is a free online tool that converts JPG, JPEG, and PNG images into PDF documents. It works entirely in your web browser — no software installation needed, no signup required, and no files are uploaded to any server.'
      },
      {
        q: 'Is this tool really free?',
        a: 'Yes, 100% free. There are no hidden charges, no premium tiers, no watermarks, and no limits on daily conversions. We support the tool through non-intrusive advertisements.'
      },
      {
        q: 'Do I need to create an account?',
        a: 'No! Our JPG to PDF converter requires no signup, no login, and no personal information whatsoever. Just open the page and start converting images to PDF immediately.'
      },
      {
        q: 'Do I need to install any software?',
        a: 'No software installation is required. JPG to PDF Converter runs entirely in your web browser. It works on Chrome, Firefox, Safari, Edge, and all other modern browsers.'
      },
    ],
  },
  {
    category: 'Conversion',
    questions: [
      {
        q: 'How do I convert JPG to PDF?',
        a: 'Simply: 1) Click the upload area or drag and drop your JPG files, 2) Arrange the images in your preferred order, 3) Choose your PDF settings (page size, orientation, margins), 4) Click "Convert to PDF" and download your file instantly.'
      },
      {
        q: 'Can I convert multiple images to one PDF?',
        a: 'Yes! You can upload up to 50 images at once and combine them all into a single PDF document. Each image will be placed on its own page. You can drag and drop to reorder pages before converting.'
      },
      {
        q: 'What image formats are supported?',
        a: 'We support JPG, JPEG, and PNG image formats. These cover virtually all image files from cameras, phones, screenshots, scanners, and web downloads.'
      },
      {
        q: 'Can I convert JPEG to PDF?',
        a: 'Yes! JPEG and JPG are the same format — they use identical compression and file structure. Our tool fully supports both .jpg and .jpeg file extensions.'
      },
      {
        q: 'Can I convert PNG to PDF?',
        a: 'Yes! Our tool supports PNG images including those with transparency. PNG files are converted to PDF while maintaining image quality.'
      },
      {
        q: 'What page sizes are available?',
        a: 'You can choose from A4 (210 × 297mm, international standard), Letter (8.5 × 11 inches, US standard), or Auto (which creates pages matching each image\'s exact dimensions).'
      },
      {
        q: 'Can I set portrait or landscape orientation?',
        a: 'Yes! You can choose between Portrait and Landscape orientation for your PDF pages. When using "Auto" page size, the orientation is determined automatically based on each image\'s dimensions.'
      },
      {
        q: 'What margin options are available?',
        a: 'We offer three margin settings: None (0px — edge to edge), Small (10mm), and Large (20mm). Choose based on whether you need the PDF for viewing, printing, or binding.'
      },
      {
        q: 'What is the difference between Contain and Fill modes?',
        a: '"Contain" fits the entire image within the page while maintaining aspect ratio (may leave white space). "Fill" scales the image to cover the entire page area (may crop edges). Use Contain for documents, Fill for photos.'
      },
    ],
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is it safe to convert files here?',
        a: 'Absolutely safe. All processing happens locally in your web browser using JavaScript. Your images are never uploaded to any server. We literally cannot see or access your files. This is the most private way to convert images to PDF.'
      },
      {
        q: 'Are my files uploaded to a server?',
        a: 'No. Zero files are uploaded. Everything is processed client-side in your browser. Your images go directly from your device to the PDF generator running in your browser — nothing is sent over the internet.'
      },
      {
        q: 'Can you see my images?',
        a: 'No, we cannot. The conversion happens entirely on your device. We have no server-side file processing. We don\'t collect, store, or transmit any of your images or converted PDFs.'
      },
      {
        q: 'Is my data stored anywhere?',
        a: 'No image data is stored anywhere. Once you close the browser tab, all image data is gone. We only use cookies for analytics and advertising purposes (with your consent), not for file storage.'
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Is there a file size limit?',
        a: 'There is no strict file size limit. You can upload up to 50 images per conversion session. Since processing happens in your browser, very large images may take slightly longer to process. For best results, we recommend keeping individual images under 20MB.'
      },
      {
        q: 'Does it work on mobile phones?',
        a: 'Yes! Our converter is fully optimized for mobile devices. It works great on iPhone, Android phones, iPad, and all tablets. The interface automatically adapts to your screen size with large touch targets and a sticky convert button.'
      },
      {
        q: 'Does it work offline?',
        a: 'After the initial page load, the core conversion functionality works offline since all processing is client-side. However, you need an internet connection for the initial page load and to display advertisements.'
      },
      {
        q: 'Why is the conversion slow with many images?',
        a: 'Each image needs to be loaded, processed through a canvas element, and added to the PDF. With many large images, this can take a few seconds. The progress indicator shows you exactly how many images have been processed. Try using smaller images for faster conversion.'
      },
      {
        q: 'The download isn\'t working. What should I do?',
        a: 'Try these steps: 1) Make sure pop-ups aren\'t blocked in your browser, 2) Check your download settings in browser preferences, 3) Try a different browser (Chrome recommended), 4) Clear your browser cache and reload the page, 5) If on mobile, check your Downloads folder.'
      },
      {
        q: 'Which browsers are supported?',
        a: 'We support all modern browsers: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Opera, and Brave. We recommend using the latest version of Chrome for the best experience.'
      },
    ],
  },
];

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div>
      <SEOHead
        title="FAQ - JPG to PDF Converter | Frequently Asked Questions"
        description="Find answers to frequently asked questions about converting JPG to PDF online. Learn about file formats, privacy, mobile support, page sizes, and more."
        canonical="https://convertjpgtopdf.online/faq"
        keywords="jpg to pdf faq, how to convert jpg to pdf, jpg to pdf help, image to pdf questions, pdf converter faq"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'FAQ' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Everything you need to know about converting JPG images to PDF.
        </p>

        <ResponsiveAd adSlot="1144001100" className="mb-8" />

        {/* Quick Jump Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Jump to Section</h2>
          <div className="flex flex-wrap gap-2">
            {faqs.map((section) => (
              <a
                key={section.category}
                href={`#faq-${section.category.toLowerCase()}`}
                className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-lg text-sm font-medium text-gray-600 transition"
              >
                {section.category}
              </a>
            ))}
          </div>
        </div>

        {faqs.map((section, sIndex) => (
          <div key={section.category} className="mb-10">
            <h2
              id={`faq-${section.category.toLowerCase()}`}
              className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
            >
              <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold">
                {sIndex + 1}
              </span>
              {section.category}
            </h2>

            <div className="space-y-2">
              {section.questions.map((faq, qIndex) => {
                const key = `${sIndex}-${qIndex}`;
                const isOpen = openIndex === key;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(key)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-900 text-sm md:text-base">{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {sIndex === 1 && <InArticleAd adSlot="1144001101" />}
          </div>
        ))}

        {/* Still have questions */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 text-center border border-red-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-600 mb-4">We're here to help. Send us a message and we'll get back to you within 24 hours.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition shadow-lg"
          >
            Contact Us
          </button>
        </div>

        <ResponsiveAd adSlot="1144001102" className="mt-8" />
      </div>
    </div>
  );
}
