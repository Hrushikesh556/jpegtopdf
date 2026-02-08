import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd, InArticleAd } from '../components/AdBanner';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      <SEOHead
        title="About Us - JPG to PDF Converter | Free Online Image to PDF Tool"
        description="Learn about JPG to PDF Converter — the fastest, most private way to convert images to PDF online. Our mission, technology, and commitment to keeping it free."
        canonical="https://jpgtopdfconverter.com/about"
        keywords="about jpg to pdf converter, about us, image to pdf tool, free pdf converter"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'About Us' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About JPG to PDF Converter</h1>

        <ResponsiveAd adSlot="4455667788" className="mb-8" />

        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            We built this tool because we were frustrated with existing JPG to PDF converters that are slow,
            bloated with ads, require signups, or upload your private files to remote servers.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-2">🎯 Our Mission</h2>
            <p className="text-blue-800">
              To provide the fastest, most private, and most user-friendly image-to-PDF conversion tool on the internet —
              completely free, with no strings attached.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🖥️', title: 'Client-Side Processing', desc: 'Everything runs in your browser. Your files never touch our servers because we don\'t have file processing servers.' },
              { icon: '🚀', title: 'Built for Speed', desc: 'Our tool loads in under 2 seconds and converts images to PDF almost instantly.' },
              { icon: '📱', title: 'Mobile-First Design', desc: 'Designed from the ground up to work beautifully on mobile devices.' },
              { icon: '✨', title: 'No Account Needed', desc: 'No signup, no login, no email required. Just open the tool and start converting.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.icon} {item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <InArticleAd adSlot="5566778899" />

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Keep It Free</h2>
          <p className="text-gray-700 leading-relaxed">
            We use non-intrusive <strong>Google AdSense</strong> advertisements to support free operation.
            We believe in a fair exchange: you get a completely free, high-quality PDF converter, and we display
            carefully placed ads that don't interfere with your workflow.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Our Technology</h2>
          <p className="text-gray-700 leading-relaxed">
            Built with React for a fast user interface, jsPDF for client-side PDF generation, and dnd-kit for
            smooth drag-and-drop reordering. Everything is optimized for performance, accessibility, and SEO.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Our Tools</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><button onClick={() => onNavigate('home')} className="text-blue-600 underline">JPG to PDF Converter</button> — Convert JPG images to PDF</li>
            <li><button onClick={() => onNavigate('png-to-pdf')} className="text-blue-600 underline">PNG to PDF Converter</button> — Convert PNG images to PDF</li>
            <li><button onClick={() => onNavigate('jpeg-to-pdf')} className="text-blue-600 underline">JPEG to PDF Converter</button> — Convert JPEG photos to PDF</li>
            <li><button onClick={() => onNavigate('image-to-pdf')} className="text-blue-600 underline">Image to PDF Converter</button> — Convert any image to PDF</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Future Roadmap</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>PDF to JPG conversion</li>
            <li>PDF compression</li>
            <li>PDF merge tool</li>
            <li>Page rotation</li>
            <li>Watermark support</li>
            <li>Batch processing improvements</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions, feedback, or suggestions? We'd love to hear from you.
            Visit our <button onClick={() => onNavigate('contact')} className="text-blue-600 underline">Contact page</button> or
            email us at <a href="mailto:contact@jpgtopdfconverter.com" className="text-blue-600 underline">contact@jpgtopdfconverter.com</a>.
          </p>
        </div>

        <ResponsiveAd adSlot="6677889900" className="mt-8" />
      </div>
    </div>
  );
}
