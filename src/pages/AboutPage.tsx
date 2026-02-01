import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar currentPath="/about" />
      
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 pt-12 sm:pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JPGtoPDF</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in">
            We built the simplest, fastest, and most private image to PDF converter on the web.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="gradient-primary p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="text-white/80">Making document conversion accessible to everyone</p>
            </div>
            
            <div className="p-6 sm:p-8">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Every day, millions of people need to convert images to PDF for work, school, or personal use. 
                Yet most existing tools are slow, filled with ads, require sign-ups, or worse—upload your private 
                files to unknown servers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We created JPGtoPDF to solve this problem. Our tool runs entirely in your browser, meaning your 
                files never leave your device. It's fast, free, and respects your privacy. No signup required, 
                no watermarks added, no limits imposed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            What We Stand For
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Privacy First',
                desc: 'Your files are processed locally in your browser. We never see, store, or have access to your images.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: '⚡',
                title: 'Speed Matters',
                desc: 'No uploads to slow servers. Conversion happens instantly on your device.',
                color: 'from-yellow-500 to-orange-600'
              },
              {
                icon: '💎',
                title: 'Simplicity',
                desc: 'A clean, intuitive interface that works. No confusing options or hidden features.',
                color: 'from-indigo-500 to-purple-600'
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Browser-Based Processing</h3>
                  <p className="text-gray-600 text-sm">When you upload images, they stay on your device. JavaScript processes them directly in your browser using the jsPDF library.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">No Server Uploads</h3>
                  <p className="text-gray-600 text-sm">Unlike other tools, we don't upload your files anywhere. This makes conversion faster and keeps your data private.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Instant Download</h3>
                  <p className="text-gray-600 text-sm">Once the PDF is generated, it downloads directly to your device. The file is created and destroyed locally—we never touch it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Convert?</h2>
          <p className="text-gray-600 mb-6">
            Try our free JPG to PDF converter now. No signup, no hassle.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Start Converting
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
