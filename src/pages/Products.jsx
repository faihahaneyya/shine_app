import { useState, useEffect } from 'react'
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

  // Statistics
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
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-[#F875AA]">Dashboard</span>
          <span>/</span>
          <span>Inventory</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Inventory</h1>
        <p className="text-gray-500 mt-1">Manage your product stock</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-[#F875AA]">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-[#FDEDED] rounded-xl flex items-center justify-center">
              <FiPackage className="text-2xl text-[#F875AA]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Low Stock</p>
              <p className="text-3xl font-bold text-orange-500">{lowStock}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FiAlertTriangle className="text-2xl text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <p className="text-3xl font-bold text-red-500">{outOfStock}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FiXCircle className="text-2xl text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Add Button */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-[#FDEDED]">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent focus:bg-white transition-all duration-300" 
            />
          </div>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#F875AA] transition-all duration-300 cursor-pointer hover:border-[#F875AA]"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white rounded-xl font-medium hover:shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <FiPlus /> Add Product
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-400 flex items-center gap-2">
          <FiFilter className="text-[#F875AA]" />
          <span>Showing {filteredProducts.length} products</span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-md border border-[#FDEDED] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">PRODUCT</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">CATEGORY</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">PRICE</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">STOCK</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">SOLD</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">STATUS</th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <tr key={product.id} className="border-b border-[#FDEDED] hover:bg-gray-50 transition-all duration-200 group animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#F875AA]/20 to-[#AEDEFC]/20 rounded-xl flex items-center justify-center text-xl">
                          {product.icon}
                        </div>
                        <span className="font-medium text-gray-800 group-hover:text-[#F875AA] transition-colors">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{product.category}</td>
                    <td className="px-5 py-4 font-semibold text-[#F875AA]">Rp {product.price.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-600">{product.stock} pcs</td>
                    <td className="px-5 py-4 text-gray-600">{product.sold} x</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.icon}
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                          <FiEdit2 />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500">No products found</p>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }} className="mt-4 text-[#F875AA] hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] p-5 text-white">
              <h2 className="text-xl font-bold">Add New Product</h2>
              <p className="text-sm opacity-90">Enter product information</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]" placeholder="Enter product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]">
                  <option>Necklace</option>
                  <option>Bracelet</option>
                  <option>Ring</option>
                  <option>Earring</option>
                  <option>Keychain</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]" placeholder="Price" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA]" placeholder="Stock quantity" />
                </div>
              </div>
            </div>
            <div className="border-t border-[#FDEDED] p-4 flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white rounded-xl hover:shadow-md transition">Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}