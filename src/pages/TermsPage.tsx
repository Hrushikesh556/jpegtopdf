import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd } from '../components/AdBanner';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div>
      <SEOHead
        title="Terms of Service - JPG to PDF Converter"
        description="Read the terms of service for using JPG to PDF Converter, a free online image to PDF conversion tool."
        canonical="https://jpgtopdfconverter.com/terms-of-service"
        keywords="terms of service, jpg to pdf terms, usage policy"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Terms of Service' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <ResponsiveAd adSlot="1122001100" className="mb-8" />

        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using JPG to PDF Converter ("the Service"), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed">
              JPG to PDF Converter is a free, browser-based tool that converts JPG, JPEG, and PNG images into PDF documents.
              All processing occurs entirely within your web browser. No files are uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Free Service</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided free of charge. We reserve the right to modify, suspend, or discontinue
              the Service at any time without prior notice. We are not liable for any modification, suspension,
              or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You are responsible for the content of any files you process using the Service.</li>
              <li>You must not use the Service for any illegal or unauthorized purpose.</li>
              <li>You must not attempt to interfere with or disrupt the Service.</li>
              <li>You must have the right to process any images you upload to the tool.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service, including its design, code, and content, is owned by JPG to PDF Converter and is
              protected by copyright and other intellectual property laws. You may not copy, modify, distribute,
              or create derivative works based on the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the Service is also governed by our{' '}
              <button onClick={() => onNavigate('privacy')} className="text-blue-600 underline hover:text-blue-800">
                Privacy Policy
              </button>. All file processing happens client-side in your browser — we never have access to your files.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Advertising</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service displays advertisements through Google AdSense to support free operation. By using the
              Service, you acknowledge that advertisements will be displayed. We strive to keep ads non-intrusive
              and never use pop-ups or ads that block the tool's functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
              OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall JPG to PDF Converter be liable for any indirect, incidental, special, or
              consequential damages arising out of or in connection with your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately
              upon posting. Your continued use of the Service constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:contact@jpgtopdfconverter.com" className="text-blue-600 underline">
                contact@jpgtopdfconverter.com
              </a>
            </p>
          </section>
        </div>

        <ResponsiveAd adSlot="1122001101" className="mt-8" />
      </div>
    </div>
  );
}
