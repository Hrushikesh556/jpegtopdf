import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResponsiveAd } from '../components/AdBanner';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend API
    setSubmitted(true);
  };

  return (
    <div>
      <SEOHead
        title="Contact Us - JPG to PDF Converter | Get Help & Support"
        description="Contact the JPG to PDF Converter team for help, feedback, or business inquiries. We're here to help with any questions about our free image to PDF conversion tool."
        canonical="https://convertjpgtopdf.online/contact"
        keywords="contact jpg to pdf, support, help, feedback"
      />
      <Breadcrumbs
        items={[
          { label: 'Home', page: 'home' },
          { label: 'Contact Us' },
        ]}
        onNavigate={onNavigate}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Have a question, feedback, or need help? We'd love to hear from you.
        </p>

        <ResponsiveAd adSlot="1133001100" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-red-600 underline hover:text-red-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Question</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="business">Business Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-600 transition shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Email</p>
                    <a href="mailto:contact@convertjpgtopdf.online" className="text-sm text-blue-600 hover:underline">
                      contact@convertjpgtopdf.online
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">⏰</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Response Time</p>
                    <p className="text-sm text-gray-600">We usually respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🌍</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Available</p>
                    <p className="text-sm text-gray-600">Worldwide — our tool works 24/7 in your browser</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
              <h2 className="text-lg font-bold text-green-900 mb-2">🔒 Privacy Note</h2>
              <p className="text-sm text-green-800 leading-relaxed">
                If you're contacting us about a file conversion issue, please know that we never have access
                to your files. All processing happens in your browser. We cannot recover or access any documents
                you've converted.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-2">💡 Quick Help</h2>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>
                  • Check our{' '}
                  <button onClick={() => onNavigate('how-to-guide')} className="underline font-medium hover:text-blue-600">
                    How-To Guide
                  </button>{' '}
                  for step-by-step instructions
                </li>
                <li>
                  • Visit our{' '}
                  <button onClick={() => onNavigate('faq')} className="underline font-medium hover:text-blue-600">
                    FAQ page
                  </button>{' '}
                  for common questions
                </li>
                <li>• Try clearing your browser cache if the tool isn't loading</li>
                <li>• Make sure JavaScript is enabled in your browser</li>
              </ul>
            </div>
          </div>
        </div>

        <ResponsiveAd adSlot="1133001101" className="mt-8" />
      </div>
    </div>
  );
}
