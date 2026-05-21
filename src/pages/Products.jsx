import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Digunakan untuk berpindah ke halaman detail penuh
import { FiPackage, FiAlertTriangle, FiXCircle, FiCheckCircle, FiEdit2, FiTrash2 } from 'react-icons/fi'
import productsData from '../data/products.json'

// MENGGUNAKAN KOMPONEN ASLI YANG SUDAH ADA DI FOLDERMU
import PageContainer from '../components/PageContainer'
import StatCard from '../components/StatCard'
import SearchBar from '../components/SearchBar'
import FilterTabs from '../components/FilterTabs'
import Loading from '../components/Loading'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Mengambil list kategori unik untuk FilterTabs
  const categories = ['All', ...new Set(productsData.map(p => p.category))]

  // Filter pencarian & kategori
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Kalkulasi data untuk StatCard
  const totalProducts = productsData.length
  const lowStock = productsData.filter(p => p.stock > 0 && p.stock <= 5).length
  const outOfStock = productsData.filter(p => p.stock === 0).length

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100', icon: <FiXCircle /> }
    if (stock <= 5) return { text: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-100', icon: <FiAlertTriangle /> }
    return { text: 'Safe', color: 'text-green-600', bg: 'bg-green-100', icon: <FiCheckCircle /> }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loading /> {/* Feedback Component bawaan */}
      </div>
    )
  }

  return (
    <PageContainer>
      {/* 1. Header Halaman */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-[#F875AA]">Dashboard</span>
          <span>/</span>
          <span>Inventory</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Inventory</h1>
      </div>

      {/* 2. Stats Cards - Menggunakan StatCard.jsx bawaan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<FiPackage className="text-[#F875AA]" />}
          className="bg-white border border-[#FDEDED]"
        />
        <StatCard
          title="Low Stock Warning"
          value={lowStock}
          icon={<FiAlertTriangle className="text-orange-500" />}
          className="bg-white border border-[#FDEDED]"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock}
          icon={<FiXCircle className="text-red-500" />}
          className="bg-white border border-[#FDEDED]"
        />
      </div>

      {/* 3. Filter & Search Toolbar - Menggunakan SearchBar & FilterTabs bawaan */}
      <div className="bg-white p-4 rounded-2xl border border-[#FDEDED] shadow-sm space-y-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product name..."
        />
        <FilterTabs
          items={categories}
          activeItem={selectedCategory}
          onItemSelect={(category) => setSelectedCategory(category)}
        />
      </div>

      {/* 4. Table Section - Struktur Data Display Component */}
      <div className="bg-white rounded-2xl shadow-md border border-[#FDEDED] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">PRODUCT</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">CATEGORY</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">PRICE</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">STATUS</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <tr key={product.id} className="border-b border-[#FDEDED] hover:bg-gray-50 transition-all">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                          {product.icon || '📿'}
                        </div>
                        {/* KETIKA DITEKAN, AKAN BERPINDAH KE HALAMAN DETAIL PENUH SESUAI SCREENSHOT */}
                        <Link 
                          to={`/products/${product.id}`} 
                          className="font-medium text-gray-800 hover:text-[#F875AA] transition-colors"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{product.category}</td>
                    <td className="px-5 py-4 font-semibold text-[#F875AA]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <FiEdit2 className="inline mr-2 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                      <FiTrash2 className="inline text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  )
}