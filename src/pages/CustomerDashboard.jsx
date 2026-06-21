import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiSearch, FiAward, FiPhone, FiMail, FiUser, FiLogOut, FiHeart, FiStar, FiGrid, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import productsData from '../data/products.json'
import Button from '../components/Button'
import Modal from '../components/Modal'

// Import product images
const images = import.meta.glob('../assets/*.jpg', { eager: true })

const getImageUrl = (productId) => {
  const key = `../assets/product-${productId}.jpg`
  return images[key]?.default ?? ''
}

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'))
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cartProduct, setCartProduct] = useState(null)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [userPoints, setUserPoints] = useState(user.points || 100)

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Get categories
  const categories = ['All', ...new Set(productsData.map(p => p.category))]

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Handle buy product
  const handleBuyClick = (product) => {
    setCartProduct(product)
    setCheckoutSuccess(false)
  }

  const handleConfirmPurchase = () => {
    setCheckoutSuccess(true)
    // Add 10 points for buying!
    const newPoints = userPoints + 10
    setUserPoints(newPoints)

    // Update local storage
    const updatedUser = { ...user, points: newPoints }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    window.dispatchEvent(new Event('storage'))

    setTimeout(() => {
      setCartProduct(null)
      setCheckoutSuccess(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FFF5E4]/20 pb-24 font-sans text-gray-700 antialiased">
      {/* Dynamic Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-[#FDEDED]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] shadow-md">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent">na_store.id</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Handmade Jewelry</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#FFF5F5] border border-[#F875AA]/20 rounded-xl">
              <FiAward className="text-[#F875AA]" />
              <span className="text-xs font-bold text-gray-700">{userPoints} Poin</span>
              <span className="text-[9px] bg-[#F875AA] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Silver Member</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {(user.name || 'U')[0].toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-gray-800">Hi, {user.name || 'Pelanggan'}! 🌸</p>
                <p className="text-[10px] text-gray-400 font-medium">Customer Account</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <FiLogOut /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-8 space-y-8">
        {/* HERO BANNER SECTION */}
        <section className="bg-gradient-to-r from-[#FFF5E4] via-[#FFFAF4] to-[#FDEDED] rounded-3xl p-8 md:p-12 border border-[#FDEDED] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F875AA]/5 rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#AEDEFC]/5 rounded-tr-[100px]" />

          <div className="space-y-4 max-w-xl relative z-10">
            <span className="inline-block bg-[#F875AA]/10 text-[#F875AA] border border-[#F875AA]/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              🎀 Handmade with Love & Care 🎀
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">
              Temukan Aksesoris Handmade Lucu yang Didesain Khusus Untukmu!
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Kami memproduksi perhiasan handmade premium mulai dari kalung titanium, gelang manik-manik, cincin minimalis, hingga gantungan rajut aesthetic.
            </p>
            <div className="pt-2">
              <a href="#katalog" className="inline-flex items-center gap-2 bg-[#F875AA] hover:bg-[#f25c95] text-white font-bold px-5 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95">
                Mulai Belanja <FiArrowRight />
              </a>
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0 relative z-10">
            {/* User Info CRM Card */}
            <div className="bg-white rounded-2xl border border-[#FDEDED] shadow-sm p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#F875AA] uppercase tracking-widest border-b border-gray-100 pb-2">
                Kartu Loyalitas Member
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] text-[#F875AA] flex items-center justify-center shrink-0">
                    <FiUser size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Nama Pengguna</p>
                    <p className="text-xs font-bold text-gray-800">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBF5FF] text-[#AEDEFC] flex items-center justify-center shrink-0">
                    <FiMail size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Alamat Email</p>
                    <p className="text-xs font-bold text-gray-800 truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <FiPhone size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Nomor Ponsel</p>
                      <p className="text-xs font-bold text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#FFFDF0] border border-yellow-200 rounded-xl p-3 text-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Kumpulkan Poin Tiap Belanja</p>
                <p className="text-xs text-yellow-600 font-extrabold mt-0.5">+10 Poin Tiap 1x Simulasi Pembelian</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH AND FILTER */}
        <section id="katalog" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Katalog Produk</h2>
              <p className="text-xs text-gray-400 mt-0.5">Pilih produk handmade favoritmu dari na_store.</p>
            </div>

            <div className="w-full md:w-80">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 text-xs focus:border-[#F875AA] focus:outline-none transition-all shadow-3xs"
                />
              </div>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 uppercase tracking-wider whitespace-nowrap border ${selectedCategory === category
                  ? 'bg-[#F875AA] text-white border-[#F875AA] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-100 hover:border-[#F875AA] hover:text-[#F875AA]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-gray-100 text-gray-400">
                <FiShoppingBag className="mx-auto text-4xl mb-3 text-gray-300 animate-pulse" />
                <p className="font-bold text-sm">Produk tidak ditemukan</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl border border-[#FDEDED] hover:border-[#F875AA]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  <div className="relative bg-[#FFF5F5]/30 flex items-center justify-center p-6 min-h-[180px]">
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 bg-[#F875AA] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs z-10">
                        Best Seller
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-[#F875AA] flex items-center justify-center shadow-3xs opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95 duration-200">
                      <FiHeart fill="currentColor" size={14} />
                    </button>
                    <img
                      src={getImageUrl(product.id)}
                      alt={product.name}
                      className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{product.category}</span>
                      <h4 className="font-bold text-gray-800 text-sm line-clamp-2 hover:text-[#F875AA] transition-colors">{product.name}</h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-extrabold text-[#F875AA] text-sm">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                        <FiStar className="text-yellow-400 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {product.stock > 0 ? (
                        <button
                          onClick={() => handleBuyClick(product)}
                          className="w-full bg-[#FFF5F5] hover:bg-[#F875AA] text-[#F875AA] hover:text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-3xs hover:shadow-xs active:scale-95"
                        >
                          Beli Sekarang
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-50 text-gray-400 border border-gray-200 font-bold py-2 rounded-xl text-xs uppercase tracking-wider cursor-not-allowed text-center"
                        >
                          Habis
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* PURCHASE SIMULATION MODAL */}
      <Modal isOpen={!!cartProduct} onClose={() => !checkoutSuccess && setCartProduct(null)} title="Simulasi Pembelian">
        {cartProduct && (
          <div className="space-y-4">
            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-3 animate-zoom-in">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)] text-white text-3xl">
                  <FiCheckCircle />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-md">Pembelian Berhasil!</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Konfirmasi simulasi pembelian telah dicatat.</p>
                  <p className="text-xs text-yellow-600 font-extrabold mt-2">Selamat! Anda mendapatkan +10 Poin Reward! ✨</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={getImageUrl(cartProduct.id)}
                    alt={cartProduct.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150`
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs">{cartProduct.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase mt-0.5">{cartProduct.category}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-y border-gray-100 py-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga Barang:</span>
                    <span className="font-bold text-gray-800">Rp {cartProduct.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Metode Pembayaran:</span>
                    <span className="font-bold text-emerald-500">Saldo Simulasi</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-gray-200 text-sm font-extrabold">
                    <span className="text-gray-700">Total Pembayaran:</span>
                    <span className="text-[#F875AA]">Rp {cartProduct.price.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button
                    type="secondary"
                    onClick={() => setCartProduct(null)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleConfirmPurchase}
                  >
                    Konfirmasi Beli
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
