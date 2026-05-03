import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiUser, FiMail, FiPhone, FiStar, FiAward, FiTrendingUp, FiX, FiChevronRight, FiUsers } from 'react-icons/fi'
import customersData from '../data/customers.json'

export default function Membership() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Diamond': return 'bg-purple-100 text-purple-700'
      case 'Gold': return 'bg-yellow-100 text-yellow-700'
      case 'Silver': return 'bg-gray-200 text-gray-700'
      case 'Bronze': return 'bg-amber-100 text-amber-700'
      default: return 'bg-blue-100 text-blue-700'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'VIP': return 'bg-pink-100 text-pink-700'
      case 'Regular': return 'bg-green-100 text-green-700'
      case 'New': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const tiers = ['all', 'Diamond', 'Gold', 'Silver', 'Bronze']

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || customer.tier === filterTier
    return matchesSearch && matchesTier
  })

  const totalPoints = customersData.reduce((sum, c) => sum + c.points, 0)
  const totalOrders = customersData.reduce((sum, c) => sum + c.orders, 0)
  const activeCustomers = customersData.filter(c => c.active).length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading customer data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Customer Data</h1>
          <p className="text-gray-500 mt-1">Manage and view all your loyal customer information</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Total {customersData.length} Customers</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Customers</p>
              <p className="text-3xl font-bold">{customersData.length}</p>
            </div>
            <FiUsers className="text-4xl opacity-50" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#FDEDED]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-2xl font-bold text-[#F875AA]">{totalPoints.toLocaleString()}</p>
            </div>
            <FiStar className="text-2xl text-gray-300" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#FDEDED]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
            </div>
            <FiTrendingUp className="text-2xl text-gray-300" />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-[#FDEDED]">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent focus:bg-white transition-all duration-300" 
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  filterTier === tier
                    ? 'bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#FDEDED] hover:text-[#F875AA]'
                }`}
              >
                {tier === 'all' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-400 flex items-center gap-2">
          <FiFilter className="text-[#F875AA]" />
          <span>{filteredCustomers.length} customers found</span>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCustomers.map((customer, idx) => (
          <div 
            key={customer.id} 
            className="bg-white rounded-2xl shadow-md border border-[#FDEDED] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
            onClick={() => {
              setSelectedCustomer(customer)
              setShowDetail(true)
            }}
          >
            {/* Header Card */}
            <div className="bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10 p-4 border-b border-[#FDEDED]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-[#F875AA] transition-colors">{customer.name}</h3>
                    <p className="text-xs text-gray-400">{customer.email}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                  {!customer.active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Body Card */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-[#FDEDED] rounded-lg">
                  <p className="text-2xl font-bold text-[#F875AA]">{customer.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
                <div className="text-center p-2 bg-[#FDEDED] rounded-lg">
                  <p className={`text-2xl font-bold ${getTierColor(customer.tier).split(' ')[1]}`}>{customer.tier}</p>
                  <p className="text-xs text-gray-500">Tier</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center pt-3 border-t border-[#FDEDED]">
                <div className="flex items-center gap-1">
                  <FiTrendingUp className="text-xs text-gray-400" />
                  <span className="text-sm text-gray-600">{customer.orders} transactions</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${customer.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-400">{customer.active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>

            {/* Footer Card */}
            <div className="bg-gray-50 px-4 py-2 text-right border-t border-[#FDEDED]">
              <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
                Click for details <FiChevronRight className="text-xs" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#FDEDED]">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-500">No customers found</p>
          <button onClick={() => { setSearchTerm(''); setFilterTier('all'); }} className="mt-4 text-[#F875AA] hover:underline">
            Clear filters
          </button>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showDetail && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] p-6 text-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCustomer.name}</h2>
                    <p className="text-sm opacity-90">{selectedCustomer.status}</p>
                    <p className="text-xs opacity-75">Joined {selectedCustomer.joinDate}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetail(false)} className="p-1 hover:bg-white/20 rounded-full transition">
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Contact */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">CONTACT</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiMail className="text-[#F875AA]" />
                    <span className="text-sm">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <FiPhone className="text-[#F875AA]" />
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Points & Tier */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">POINTS & TIER</h3>
                <div className="bg-[#FDEDED] rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Points</span>
                    <span className="text-2xl font-bold text-[#F875AA]">{selectedCustomer.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Tier</span>
                    <span className={`font-bold ${getTierColor(selectedCustomer.tier).split(' ')[1]}`}>{selectedCustomer.tier}</span>
                  </div>
                  {selectedCustomer.nextTier && (
                    <div className="mt-3 pt-3 border-t border-[#AEDEFC]">
                      <p className="text-xs text-gray-500">
                        Need <strong className="text-[#F875AA]">{selectedCustomer.nextTier.pointsNeeded.toLocaleString()} more points</strong> to reach next tier ({selectedCustomer.nextTier.name})
                      </p>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (selectedCustomer.points / (selectedCustomer.points + selectedCustomer.nextTier.pointsNeeded)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">ACTIVITY</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">{selectedCustomer.orders}</p>
                    <p className="text-xs text-gray-500">Total Transactions</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{selectedCustomer.orders * 10}</p>
                    <p className="text-xs text-gray-500">Points Earned</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#FDEDED] p-4 bg-gray-50">
              <button 
                onClick={() => setShowDetail(false)}
                className="w-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white py-2 rounded-xl hover:shadow-md transition-all duration-300"
              >
                Close
              </button>
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