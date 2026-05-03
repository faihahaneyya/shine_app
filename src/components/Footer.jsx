import { FaHeart, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white shadow-lg mt-8 rounded-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="group">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">na_store<span className="text-[#F875AA]">.</span>id</h3>
            <p className="text-gray-400 mt-2 text-sm group-hover:text-gray-500 transition-colors">Handmade with Love <FaHeart className="inline text-[#F875AA] animate-pulse" /></p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">Contact</a></li>
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Customer Service</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">Returns Policy</a></li>
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#F875AA] transition-all duration-200 hover:translate-x-1 inline-block">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              {[FaInstagram, FaTiktok, FaFacebook].map((Icon, idx) => (
                <div key={idx} className="text-gray-400 hover:text-[#F875AA] transition-all duration-300 cursor-pointer hover:scale-125 hover:-translate-y-1">
                  <Icon className="text-xl" />
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">Email: admin@nastore.id</p>
            <p className="text-gray-400 text-sm">Phone: +62 812 3456 7890</p>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 na_store.id Admin Dashboard. Made with <FaHeart className="inline text-[#F875AA] animate-pulse" /> for accessories lovers.</p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </footer>
  )
}