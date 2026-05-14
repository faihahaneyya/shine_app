import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiArrowLeft, FiBox, FiStar, FiShoppingBag } from 'react-icons/fi'
import productsData from '../data/products.json'

const images = import.meta.glob('../assets/*.jpg', { eager: true })

const getImageUrl = (productId) => {
  const key = `../assets/product-${productId}.jpg`
  return images[key]?.default ?? ''
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id])

  if (!product) return <div className="p-20 text-center">Memuat produk...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#F875AA] mb-6 transition-all font-medium"
      >
        <FiArrowLeft /> Kembali ke Daftar Produk
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-[#FDEDED] overflow-hidden flex flex-col md:flex-row">
        
        {/* AREA GAMBAR */}
        <div className="md:w-1/2 bg-[#fdf2f5] flex items-center justify-center p-10">
          <img 
            src={getImageUrl(product.id)}
            alt={product.name} 
            className="w-full h-auto max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>

        {/* DETAIL PRODUK */}
        <div className="md:w-1/2 p-8 lg:p-12 space-y-6">
          <div>
            <span className="px-3 py-1 bg-[#F875AA] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mt-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-extrabold text-[#F875AA] mt-3">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><FiBox size={24}/></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Stok</p>
                <p className="font-bold text-gray-800">{product.stock} Pcs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><FiShoppingBag size={24}/></div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Terjual</p>
                <p className="font-bold text-gray-800">{product.sold} Unit</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : ""} />
              ))}
            </div>
            <span className="font-bold text-gray-700">{product.rating}</span>
            <span className="text-gray-400 text-sm">| Rating Pelanggan</span>
          </div>

          <div className="pt-4">
            <button className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold hover:bg-gray-700 transition-colors shadow-lg">
              Edit Data Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}