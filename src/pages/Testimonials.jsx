import { useState, useEffect } from 'react'
import { FiStar, FiMessageCircle, FiHeart, FiFilter } from 'react-icons/fi'

export default function Testimonials() {
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const testimonials = [
    { id: 1, name: 'Sarah Johnson', product: 'Pink Gold Bracelet', rating: 5, text: 'Absolutely love my bracelet from na_store! The quality is amazing and the design is so unique. I get compliments every time I wear it!', date: '2 weeks ago', avatar: 'S', verified: true, category: 'bracelet' },
    { id: 2, name: 'David Kim', product: 'Valentine Special', rating: 5, text: 'Great customer service and beautiful products. The Valentine\'s special collection is perfect for gifts! Will definitely shop again.', date: '1 month ago', avatar: 'D', verified: true, category: 'special' },
    { id: 3, name: 'Michael Chen', product: 'Gift Set', rating: 5, text: 'Bought a gift set for my wife and she was thrilled! The packaging was beautiful and the quality exceeded our expectations.', date: '3 weeks ago', avatar: 'M', verified: true, category: 'gift' },
    { id: 4, name: 'Lisa Anderson', product: 'Artisan Keychain', rating: 5, text: 'The keychains are so cute and well-made! Perfect little gifts for friends. Love supporting handmade businesses!', date: '5 days ago', avatar: 'L', verified: true, category: 'keychain' },
    { id: 5, name: 'Emily Rodriguez', product: 'Handmade Doll', rating: 5, text: 'The handmade dolls are adorable! Perfect for decoration and made with such care. Will definitely order more for my collection!', date: '1 week ago', avatar: 'E', verified: true, category: 'doll' },
    { id: 6, name: 'Jessica Wong', product: 'Pearl Necklace', rating: 4, text: 'Beautiful necklace, very elegant! The pearls look real and the packaging was lovely. Would recommend to anyone looking for unique jewelry.', date: '2 months ago', avatar: 'J', verified: true, category: 'necklace' },
    { id: 7, name: 'Brian Tan', product: 'Crystal Pendant', rating: 5, text: 'The crystal pendant is stunning! The energy feels amazing and the craftsmanship is top notch. Very happy with my purchase.', date: '3 weeks ago', avatar: 'B', verified: false, category: 'necklace' },
    { id: 8, name: 'Amanda Lee', product: 'Minimalist Ring Set', rating: 5, text: 'Love these rings! They stack beautifully and the quality is perfect for daily wear. Very comfortable and stylish.', date: '1 week ago', avatar: 'A', verified: true, category: 'ring' },
    { id: 9, name: 'Olivia Chen', product: 'Rose Gold Bracelet', rating: 5, text: 'Best purchase ever! The bracelet is so pretty and the customer service was amazing. Will buy more as gifts for my friends!', date: '4 days ago', avatar: 'O', verified: true, category: 'bracelet' }
  ]

  const categories = [
    { value: 'all', label: 'All Reviews', icon: '📋' },
    { value: 'bracelet', label: 'Bracelets', icon: '💗' },
    { value: 'necklace', label: 'Necklaces', icon: '💎' },
    { value: 'ring', label: 'Rings', icon: '💍' },
    { value: 'keychain', label: 'Keychains', icon: '🔑' },
    { value: 'special', label: 'Special', icon: '🎁' },
  ]

  const filteredTestimonials = filter === 'all' ? testimonials : testimonials.filter(t => t.category === filter)

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
  const totalReviews = testimonials.length
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length
  const fourStarCount = testimonials.filter(t => t.rating === 4).length

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className={`text-sm ${i < rating ? 'fill-[#F875AA] text-[#F875AA]' : 'text-gray-200'}`} />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Customer Reviews</h1>
        <p className="text-gray-500 mt-1">See what our happy customers are saying about their na_store purchases</p>
      </div>

      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold">{averageRating}</span>
              <div>
                {renderStars(Math.round(averageRating))}
                <p className="text-sm opacity-90 mt-1">Based on {totalReviews} reviews</p>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm w-12">5 ★</span>
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(fiveStarCount / totalReviews) * 100}%` }}></div>
                </div>
                <span className="text-sm w-8">{fiveStarCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm w-12">4 ★</span>
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(fourStarCount / totalReviews) * 100}%` }}></div>
                </div>
                <span className="text-sm w-8">{fourStarCount}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <FiHeart className="text-white fill-white animate-pulse" />
              <span className="font-semibold text-xl">98%</span>
            </div>
            <p className="text-sm opacity-90">would recommend</p>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap gap-2 animate-slide-in-up">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              filter === cat.value
                ? 'bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white shadow-md scale-105'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-[#FDEDED] hover:text-[#F875AA] hover:scale-105'
            }`}
          >
            <span className="mr-1">{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial, idx) => (
          <div key={testimonial.id} className="bg-white rounded-2xl shadow-md border border-[#FDEDED] p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex justify-between items-start mb-3">
              {renderStars(testimonial.rating)}
              {testimonial.verified && (
                <span className="text-xs bg-[#FDEDED] text-[#F875AA] px-2 py-0.5 rounded-full">✓ Verified</span>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">"{testimonial.text}"</p>
            <div className="flex items-center gap-3 pt-3 border-t border-[#FDEDED]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                {testimonial.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 group-hover:text-[#F875AA] transition-colors">{testimonial.name}</p>
                <p className="text-xs text-gray-400">{testimonial.product} • {testimonial.date}</p>
              </div>
              <FiMessageCircle className="text-gray-300 group-hover:text-[#F875AA] transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#FDEDED] animate-fade-in">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500">No reviews found for this category</p>
          <button onClick={() => setFilter('all')} className="mt-4 text-[#F875AA] hover:underline">View all reviews</button>
        </div>
      )}

      {/* Write a Review CTA */}
      <div className="bg-gradient-to-r from-[#FDEDED] to-[#AEDEFC] rounded-2xl p-6 text-center border border-[#F875AA]/20 hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Experience</h3>
        <p className="text-gray-500 text-sm mb-4">Love our products? We'd love to hear from you!</p>
        <button className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white px-6 py-2 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 font-medium">
          Write a Review
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .animate-slide-in-up { animation: slideInUp 0.4s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}