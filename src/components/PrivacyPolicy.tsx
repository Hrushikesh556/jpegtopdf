import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8">
        <Link to="/" className="inline-flex items-center text-violet-600 hover:text-violet-700 font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Converter
        </Link>
      </nav>

      <article className="prose prose-slate prose-lg max-w-none">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
          Privacy Policy
        </h1>
        
        <p className="text-slate-600 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg mb-2">Privacy First Guarantee</h3>
              <p className="text-green-700">
                <strong>Your files never leave your device.</strong> All image processing happens entirely within your browser. 
                We don't upload, store, access, or have any visibility into your files. Your privacy is completely protected.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700">
            Welcome to JPG to PDF Converter ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of any information associated with your use of our service. This Privacy Policy explains how we handle data when you use our free online image to PDF conversion tool.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How Our Service Works</h2>
          <p className="text-slate-700 mb-4">
            Our JPG to PDF converter is designed with privacy as a core principle. Here's how it works:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li><strong>Client-Side Processing:</strong> All image-to-PDF conversion happens directly in your web browser using JavaScript. Your files are processed locally on your device.</li>
            <li><strong>No File Uploads:</strong> Your images are never uploaded to our servers or any third-party servers. They remain exclusively on your device throughout the entire conversion process.</li>
            <li><strong>No Storage:</strong> We don't store your images, PDFs, or any file data. Once you close the browser tab or refresh the page, all file references are cleared from memory.</li>
            <li><strong>No Account Required:</strong> We don't require user accounts, registrations, or login credentials to use our service.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information We Collect</h2>
          <p className="text-slate-700 mb-4">
            While we don't collect your files or personal information, we may collect limited anonymous data for service improvement:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li><strong>Usage Analytics:</strong> We may use privacy-respecting analytics to understand how many people visit our site and which features are most used. This data is aggregated and anonymized.</li>
            <li><strong>Technical Information:</strong> Standard web server logs may include your IP address, browser type, operating system, and referring pages. This data is used solely for security monitoring and service optimization.</li>
            <li><strong>Error Reports:</strong> If the application encounters errors, anonymous diagnostic information may be collected to help us improve the service.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information We Don't Collect</h2>
          <p className="text-slate-700 mb-4">
            To be absolutely clear, we do NOT collect:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li>Your images or any files you convert</li>
            <li>The content of your PDFs</li>
            <li>Personal identification information</li>
            <li>Email addresses or contact information</li>
            <li>Payment or financial information</li>
            <li>Location data beyond approximate country (for analytics)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies and Tracking</h2>
          <p className="text-slate-700 mb-4">
            Our website may use minimal cookies for:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li><strong>Essential Functionality:</strong> Cookies that are necessary for the website to function properly.</li>
            <li><strong>Analytics:</strong> Privacy-respecting analytics cookies to understand site usage patterns. These do not track you across other websites.</li>
            <li><strong>Preferences:</strong> Cookies to remember your settings (like preferred page size or orientation) for a better user experience.</li>
          </ul>
          <p className="text-slate-700 mt-4">
            You can control cookies through your browser settings. Disabling cookies will not affect the core functionality of our converter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Third-Party Services</h2>
          <p className="text-slate-700 mb-4">
            Our website may include:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li><strong>Advertising:</strong> We may display ads through third-party networks like Google AdSense. These services may use cookies to show relevant ads. You can opt out of personalized advertising through Google's ad settings.</li>
            <li><strong>CDN Services:</strong> We may use Content Delivery Networks to serve website assets faster. These services may collect anonymized technical data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Security</h2>
          <p className="text-slate-700">
            Since your files never leave your device, they are protected by your device's own security measures. Our website is served over HTTPS to ensure secure communication. We implement industry-standard security practices to protect our infrastructure and any limited data we do collect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
          <p className="text-slate-700">
            Our service is intended for general audiences and does not knowingly collect information from children under 13. Since we don't collect personal information from any users, this applies universally.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Your Rights</h2>
          <p className="text-slate-700 mb-4">
            Depending on your jurisdiction, you may have rights regarding your personal data, including:
          </p>
          <ul className="text-slate-700 space-y-2">
            <li>The right to access your personal data</li>
            <li>The right to correct inaccurate data</li>
            <li>The right to delete your data</li>
            <li>The right to data portability</li>
            <li>The right to opt out of data collection</li>
          </ul>
          <p className="text-slate-700 mt-4">
            Since we don't collect personal data or store your files, most of these rights are automatically fulfilled by our privacy-first design.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
          <p className="text-slate-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
          <p className="text-slate-700">
            If you have any questions about this Privacy Policy or our practices, please contact us through our website. We're committed to addressing your concerns and maintaining your trust.
          </p>
        </section>

        <div className="bg-slate-100 rounded-xl p-6 mt-12">
          <h3 className="font-bold text-slate-900 text-lg mb-3">Summary</h3>
          <p className="text-slate-700">
            In summary: <strong>Your files are private.</strong> They never leave your device, are never stored on any server, and are automatically cleared when you leave the page. We built this tool with your privacy as the top priority. You can use our JPG to PDF converter with complete confidence that your images remain yours alone.
          </p>
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-slate-200 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Start Converting Images
        </Link>
      </div>
    </main>
  );
}
