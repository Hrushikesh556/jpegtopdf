export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow border border-slate-200 p-5 sm:p-8">
          <div className="prose prose-sm prose-slate max-w-none">
            
            {/* Key Point */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-800 text-sm m-0">Your Files Stay Private</h3>
                  <p className="text-green-700 text-xs mt-1 m-0">
                    All image processing happens locally in your browser. Your files are never uploaded to our servers.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-0">Overview</h2>
            <p className="text-slate-600 text-sm">
              JPG to PDF Converter ("we", "our", "us") is committed to protecting your privacy. 
              This policy explains how our service handles your data.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Data We Don't Collect</h2>
            <ul className="text-slate-600 text-sm space-y-1">
              <li>We do not upload your images to any server</li>
              <li>We do not store your files</li>
              <li>We do not require account creation</li>
              <li>We do not track individual file conversions</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-900">How Our Tool Works</h2>
            <p className="text-slate-600 text-sm">
              Our converter uses JavaScript and the jsPDF library to process images entirely 
              within your web browser. When you select images, they are read using the browser's 
              File API and converted to PDF locally. The resulting PDF is generated in your 
              browser's memory and downloaded directly to your device.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Analytics</h2>
            <p className="text-slate-600 text-sm">
              We may use anonymous analytics tools to understand general usage patterns such as 
              page views and device types. These analytics do not track your file contents or 
              personal information.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Cookies</h2>
            <p className="text-slate-600 text-sm">
              We may use essential cookies for basic website functionality. Third-party 
              advertising partners may also use cookies. You can control cookie settings 
              through your browser preferences.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Third-Party Services</h2>
            <p className="text-slate-600 text-sm">
              Our website may display advertisements from third-party ad networks. These 
              networks may use cookies and similar technologies to serve relevant ads. 
              We recommend reviewing the privacy policies of these ad networks.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Children's Privacy</h2>
            <p className="text-slate-600 text-sm">
              Our service is not directed to children under 13. We do not knowingly collect 
              personal information from children.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Changes to This Policy</h2>
            <p className="text-slate-600 text-sm">
              We may update this privacy policy from time to time. Any changes will be posted 
              on this page with an updated revision date.
            </p>

            <h2 className="text-lg font-bold text-slate-900">Contact</h2>
            <p className="text-slate-600 text-sm">
              If you have questions about this privacy policy, please contact us through 
              our website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
