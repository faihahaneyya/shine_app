import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // TAMBAHKAN INI
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiPackage, FiAlertTriangle, FiXCircle, FiCheckCircle } from 'react-icons/fi'
import productsData from '../data/products.json'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const categories = ['All', ...new Set(productsData.map(p => p.category))]

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-[#F875AA]">Dashboard</span>
          <span>/</span>
          <span>Inventory</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Inventory</h1>
      </div>

      {/* Stats Cards (Diringkas untuk menghemat ruang) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
         {/* ... (Statistik tetap sama seperti codingan kamu sebelumnya) */}
      </div>

      {/* Table Section */}
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
                          {product.icon}
                        </div>
                        {/* UBAH BAGIAN INI MENJADI LINK */}
                        <Link 
                          to={`/products/${product.id}`} 
                          className="font-medium text-gray-800 hover:text-[#F875AA] transition-colors"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{product.category}</td>
                    <td className="px-5 py-4 font-semibold text-[#F875AA]">Rp {product.price.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                        <FiEdit2 className="inline mr-2 text-gray-400 cursor-pointer" />
                        <FiTrash2 className="inline text-gray-400 cursor-pointer" />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}