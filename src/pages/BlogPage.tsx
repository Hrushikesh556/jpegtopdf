import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd, InArticleAd } from '../components/AdBanner';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

const articles = [
  {
    id: 'jpg-vs-pdf',
    title: 'JPG vs PDF: What\'s the Difference and When to Use Each',
    excerpt: 'Understanding the key differences between JPG and PDF formats helps you choose the right format for every situation — from photo sharing to official documents.',
    date: '2024-12-15',
    readTime: '5 min',
    category: 'Guide',
  },
  {
    id: 'best-pdf-settings',
    title: 'Best PDF Settings for Printing, Emailing, and Archiving',
    excerpt: 'Learn the optimal page size, orientation, margin, and quality settings for different PDF use cases including printing, emailing, and long-term archiving.',
    date: '2024-12-10',
    readTime: '4 min',
    category: 'Tips',
  },
  {
    id: 'scan-to-pdf',
    title: 'How to Scan Documents to PDF Using Your Phone',
    excerpt: 'Turn your smartphone into a document scanner. Learn how to capture, crop, and convert scanned images to professional PDF documents.',
    date: '2024-12-05',
    readTime: '6 min',
    category: 'Tutorial',
  },
  {
    id: 'combine-images-pdf',
    title: 'How to Combine Multiple Images into One PDF',
    excerpt: 'Step-by-step guide to merging multiple JPG, JPEG, and PNG images into a single, well-organized PDF document.',
    date: '2024-11-28',
    readTime: '4 min',
    category: 'Tutorial',
  },
  {
    id: 'pdf-for-students',
    title: 'PDF Tools Every Student Needs in 2024',
    excerpt: 'Essential PDF tools and techniques for students: converting assignments, compiling research, submitting applications, and organizing study materials.',
    date: '2024-11-20',
    readTime: '5 min',
    category: 'Guide',
  },
  {
    id: 'image-quality',
    title: 'How to Maintain Image Quality When Converting to PDF',
    excerpt: 'Tips and best practices to ensure your images look crisp and professional in converted PDF documents. Avoid common quality pitfalls.',
    date: '2024-11-15',
    readTime: '4 min',
    category: 'Tips',
  },
];

export function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <div>
      <SEOHead
        title="Blog - JPG to PDF Tips, Guides & Tutorials | JPG to PDF Converter"
        description="Learn everything about converting images to PDF. Tips, tutorials, guides for JPG to PDF conversion, document scanning, PDF settings, and more."
        canonical="https://jpgtopdfconverter.com/blog"
        keywords="jpg to pdf blog, pdf conversion tips, image to pdf guide, pdf tutorials, document conversion tips"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Blog & Guides' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Blog & Guides</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Tips, tutorials, and guides for converting images to PDF like a pro.
        </p>

        <ResponsiveAd adSlot="1166001100" className="mb-8" />

        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={article.id}>
              <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    article.category === 'Guide' ? 'bg-blue-100 text-blue-700' :
                    article.category === 'Tips' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="text-xs text-gray-400">· {article.readTime} read</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {article.excerpt}
                </p>
                <button
                  onClick={() => onNavigate('how-to-guide')}
                  className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center gap-1"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </article>
              {index === 2 && <InArticleAd adSlot="1166001101" />}
            </div>
          ))}
        </div>

        {/* SEO Text Block */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Image to PDF Conversion</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our blog covers everything you need to know about <strong>converting JPG to PDF</strong>, <strong>image to PDF best practices</strong>,
            and document management tips. Whether you're a student looking to submit assignments, a professional creating reports,
            or anyone who needs to <strong>combine images into PDF</strong> documents, our guides will help you get the best results.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We regularly publish new articles about PDF conversion techniques, image quality optimization, and productivity tips.
            Bookmark this page and check back for the latest guides on making the most of our <strong>free JPG to PDF converter</strong>.
          </p>
        </div>

        <ResponsiveAd adSlot="1166001102" className="mt-8" />
      </div>
    </div>
  );
}
