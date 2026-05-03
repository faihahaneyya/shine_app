import { FiShoppingCart, FiStar, FiTrendingUp } from 'react-icons/fi'
import { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const getStockStatus = () => {
    if (product.stock > 10) return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-50', icon: '✅' }
    if (product.stock > 0) return { text: `Only ${product.stock} left`, color: 'text-orange-500', bg: 'bg-orange-50', icon: '⚠️' }
    return { text: 'Out of Stock', color: 'text-red-500', bg: 'bg-red-50', icon: '❌' }
  }

  const status = getStockStatus()

  return (
    <div 
      className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 border border-[#FDEDED] group animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${product.id * 50}ms` }}
    >
      {/* Image Section dengan Animasi */}
      <div className="relative h-48 bg-gradient-to-br from-[#FDEDED] to-[#AEDEFC] flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-[#F875AA]/0 via-[#F875AA]/10 to-[#F875AA]/0 transform -translate-x-full ${isHovered ? 'animate-shimmer' : ''}`}></div>
        
        {/* Icon/Image dengan Animasi */}
        <span className={`text-6xl transition-all duration-500 transform ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}`}>
          {product.icon || '📿'}
        </span>
        
        {/* Best Seller Badge dengan Animasi */}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce-subtle flex items-center gap-1">
            <FiTrendingUp className="text-xs" /> Best Seller
          </span>
        )}
        
        {/* Stock Status Badge di pojok kanan atas */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${status.bg} ${status.color} shadow-sm ${isHovered ? 'scale-105' : 'scale-100'}`}>
          <span className="flex items-center gap-1">
            <span>{status.icon}</span> {status.text}
          </span>
        </div>
        
        {/* Sold Out Overlay dengan Animasi */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm animate-fade-in">
            <span className="text-white font-bold px-4 py-2 bg-red-500 rounded-full text-sm shadow-lg transform transition-all duration-300 hover:scale-105">
              Sold Out
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`font-semibold text-gray-800 transition-all duration-300 ${isHovered ? 'text-[#F875AA] translate-x-1' : ''}`}>
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">{product.category}</p>
          </div>
          
          {/* Rating dengan Animasi */}
          <div className="flex items-center gap-1 bg-[#FDEDED] px-2 py-1 rounded-full transition-all duration-300 group-hover:shadow-sm">
            <FiStar className="text-[#F875AA] text-xs fill-[#F875AA] animate-pulse-gentle" />
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        {/* Price dan Tombol */}
        <div className="mt-4 flex justify-between items-center">
          <div className="transition-all duration-300">
            <span className={`font-bold text-lg transition-all duration-300 ${isHovered ? 'text-[#F875AA] scale-105 inline-block' : 'text-[#F875AA]'}`}>
              Rp {product.price.toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`p-2.5 rounded-full transition-all duration-300 transform ${
              product.stock > 0 
                ? 'bg-[#FDEDED] text-[#F875AA] hover:bg-[#F875AA] hover:text-white hover:scale-110 hover:shadow-md active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiShoppingCart className={`transition-all duration-300 ${isHovered && product.stock > 0 ? 'rotate-12' : ''}`} />
          </button>
        </div>
        
        {/* Progress Bar untuk Low Stock (opsional) */}
        {product.stock > 0 && product.stock <= 10 && (
          <div className="mt-3">
            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-orange-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${(product.stock / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-orange-500 mt-1 text-right">Hurry up! Stock almost gone</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pulseGentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          animation: shimmer 0.8s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 1s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-pulse-gentle {
          animation: pulseGentle 1s ease-in-out infinite;
        }
        .group:hover .group-hover\:shadow-sm {
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
      `}</style>
    </div>
  )
}