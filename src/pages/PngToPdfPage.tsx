import ImageConverter from '../components/ImageConverter';

export default function PngToPdfPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            100% Free • No Signup
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
            Convert PNG to PDF Online
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Free PNG to PDF converter. Convert your PNG images to PDF documents with transparent background support.
          </p>
        </div>
      </section>

      {/* Converter */}
      <ImageConverter />

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-slate-900 mb-4">About PNG to PDF Conversion</h2>
          
          <p className="text-slate-600 mb-4">
            PNG (Portable Network Graphics) files are popular for their lossless compression and transparency support. 
            Converting PNG to PDF allows you to create professional documents while preserving image quality.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Why Convert PNG to PDF?</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Preserve transparency in documents</li>
                <li>• Create high-quality print files</li>
                <li>• Universal document sharing</li>
                <li>• Combine multiple PNGs into one file</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Key Features</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Maintains image quality</li>
                <li>• Supports transparency</li>
                <li>• Batch conversion</li>
                <li>• Custom page sizes</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-3">How to Convert PNG to PDF</h3>
          <ol className="text-sm text-slate-600 space-y-2 mb-6">
            <li>1. Click the upload area or drag and drop your PNG files</li>
            <li>2. Arrange the order of images if needed</li>
            <li>3. Choose your preferred page size and orientation</li>
            <li>4. Click "Convert to PDF" to download your file</li>
          </ol>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Privacy First:</strong> All PNG files are processed locally in your browser. 
              Your images are never uploaded to our servers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
