export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Student',
      avatar: '👩‍🎓',
      content: 'This tool saved me so much time! I needed to submit multiple photos as a PDF for my application and this made it super easy.',
      rating: 5,
    },
    {
      name: 'David K.',
      role: 'Freelancer',
      avatar: '👨‍💼',
      content: 'Finally a converter that doesn\'t upload my files to some random server. Fast, private, and free - exactly what I needed.',
      rating: 5,
    },
    {
      name: 'Maria L.',
      role: 'Office Manager',
      avatar: '👩‍💻',
      content: 'We use this daily for document processing. The ability to reorder pages before converting is a game-changer.',
      rating: 5,
    },
    {
      name: 'James R.',
      role: 'Photographer',
      avatar: '📸',
      content: 'Great for creating quick portfolios! The quality is excellent and I love that it works on my phone too.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Loved by <span className="text-violet-400">Millions</span> Worldwide
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join millions of users who trust our JPG to PDF converter for their document needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-extrabold text-violet-400 mb-2">10M+</div>
            <div className="text-slate-400">PDFs Created</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-extrabold text-violet-400 mb-2">50M+</div>
            <div className="text-slate-400">Images Converted</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-extrabold text-violet-400 mb-2">4.9/5</div>
            <div className="text-slate-400">User Rating</div>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-extrabold text-violet-400 mb-2">190+</div>
            <div className="text-slate-400">Countries</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
