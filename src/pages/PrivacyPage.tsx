import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar currentPath="/privacy-policy" />
      
      {/* Hero */}
      <section className="relative py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
            
            {/* Key Point */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-green-900 mb-1">The Most Important Thing</h3>
                  <p className="text-green-800">
                    <strong>Your files never leave your device.</strong> All image processing and PDF conversion happens 
                    entirely in your browser. We don't upload, store, or have access to your images.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 text-gray-700">
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                <p className="mb-3">
                  We collect minimal information to provide and improve our service:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Usage Data:</strong> Anonymous analytics like page views, feature usage, and error reports</li>
                  <li><strong>Device Information:</strong> Browser type, operating system, and screen size for optimization</li>
                </ul>
                <p className="mt-3 text-sm text-gray-500">
                  We do NOT collect: Your images, PDFs, personal files, email addresses, or any identifying information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. How Your Files Are Processed</h2>
                <p className="mb-3">When you use our JPG to PDF converter:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>You select images from your device</li>
                  <li>JavaScript in your browser reads and processes these files</li>
                  <li>The PDF is generated locally using the jsPDF library</li>
                  <li>The PDF downloads directly to your device</li>
                  <li>All data is cleared when you close or refresh the page</li>
                </ol>
                <p className="mt-3 font-medium text-green-700">
                  At no point do your files touch our servers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies and Tracking</h2>
                <p className="mb-3">We may use:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> For basic site functionality</li>
                  <li><strong>Analytics:</strong> Anonymous usage statistics to improve the service</li>
                  <li><strong>Advertising:</strong> Third-party ads may use cookies (see section 4)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
                <p className="mb-3">Our website may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                </ul>
                <p className="mt-3">
                  These services have their own privacy policies. We recommend reviewing them:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-indigo-600">
                  <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Privacy Policy</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
                <p>
                  Since your files are processed locally and never transmitted to us, there's no server-side 
                  security risk for your documents. Your browser's built-in security protects your data during 
                  processing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Children's Privacy</h2>
                <p>
                  Our service is available to users of all ages. We do not knowingly collect personal 
                  information from children under 13. Since we don't collect personal data, this service 
                  is safe for children to use under parental guidance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use our service without creating an account</li>
                  <li>Clear your browser data at any time</li>
                  <li>Disable cookies in your browser settings</li>
                  <li>Contact us with any privacy concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Changes will be posted on this page 
                  with an updated revision date. Continued use of the service constitutes acceptance of the 
                  updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or our practices, please contact us through 
                  our website.
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
