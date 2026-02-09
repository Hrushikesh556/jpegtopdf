import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd, InArticleAd } from '../components/AdBanner';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div>
      <SEOHead
        title="Privacy Policy - JPG to PDF Converter | 100% Private & Secure"
        description="Privacy policy for JPG to PDF Converter. All processing happens in your browser. Files never leave your device. Learn about our data practices."
        canonical="https://convertjpgtopdf.online/privacy-policy"
        keywords="privacy policy, jpg to pdf privacy, secure file conversion, private pdf converter"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Privacy Policy' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <ResponsiveAd adSlot="1122334455" className="mb-8" />

        <div className="prose prose-gray max-w-none space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-green-900 mb-2">🔒 TL;DR: Your Files Are 100% Private</h2>
            <p className="text-green-800">
              All image processing and PDF conversion happens entirely in your web browser.
              Your files are never uploaded to any server. We don't collect, store, or have access to any of your images or documents.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">How Our Tool Works</h2>
            <p className="text-gray-700 leading-relaxed">
              Our JPG to PDF converter uses client-side JavaScript to process images directly in your browser.
              No files are transmitted over the internet to any server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Data We Don't Collect</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We do not collect your images or files</li>
              <li>We do not store any converted PDFs</li>
              <li>We do not require login or personal information</li>
              <li>We do not track what files you convert</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Analytics</h2>
            <p className="text-gray-700 leading-relaxed">
              We may use basic analytics (such as Google Analytics) to understand traffic patterns. This data is anonymized.
            </p>
          </section>

          <InArticleAd adSlot="2233445566" />

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Advertising & Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use <strong>Google AdSense</strong> to display advertisements. Here's what you should know:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Google AdSense & Cookies</h3>
              <ul className="list-disc list-inside text-sm text-blue-800 space-y-2">
                <li>Google uses cookies to serve ads based on your browsing history.</li>
                <li>You may opt out via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Ads Settings</a>.</li>
                <li>Third-party ad networks may use cookies and web beacons.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3"><strong>Types of cookies used:</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Essential cookies:</strong> Website functionality</li>
              <li><strong>Analytics cookies:</strong> Understanding visitor behavior</li>
              <li><strong>Advertising cookies:</strong> Google AdSense ads</li>
              <li><strong>Preference cookies:</strong> Settings and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">GDPR Rights (EU Users)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">EU residents have rights to access, rectify, erase, restrict, and port their data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">CCPA Rights (California Users)</h2>
            <p className="text-gray-700 leading-relaxed">
              California residents have specific rights regarding personal information under CCPA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not directed to children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              Questions about privacy? <button onClick={() => onNavigate('contact')} className="text-blue-600 underline">Contact us</button> or
              email <a href="mailto:contact@convertjpgtopdf.online" className="text-blue-600 underline">contact@convertjpgtopdf.online</a>
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <ResponsiveAd adSlot="3344556677" className="mt-8" />
      </div>
    </div>
  );
}
