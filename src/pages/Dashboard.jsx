import { FiShoppingCart, FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiEye, FiArrowUp, FiArrowDown, FiStar, FiClock, FiAlertCircle, FiUser, FiTruck, FiCamera, FiCheckSquare } from 'react-icons/fi'
import productsData from '../data/products.json'
import transactionsData from '../data/transactions.json'
import customersData from '../data/customers.json'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const totalProducts = productsData.length
  const totalRevenue = transactionsData.reduce((sum, t) => sum + t.total, 0)
  const totalOrders = transactionsData.length
  const lowStockProducts = productsData.filter(p => p.stock > 0 && p.stock <= 5)
  const outOfStockProducts = productsData.filter(p => p.stock === 0)
  const completedOrders = transactionsData.filter(t => t.status === 'Completed').length
  const completionRate = ((completedOrders / totalOrders) * 100).toFixed(0)

  // Top Customers (by points)
  const topCustomers = [...customersData]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5)

  // Critical Stock (products with stock <= 5 and > 0)
  const criticalStock = productsData
    .filter(p => p.stock > 0 && p.stock <= 5)
    .sort((a, b) => a.stock - b.stock)

  // Today's Schedule
  const todaySchedule = [
    { id: 1, task: 'Restock Titanium Necklace', time: '09:00 - 10:00', icon: <FiTruck />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, task: 'QC Silver Couple Rings', time: '10:30 - 12:00', icon: <FiCheckSquare />, color: 'bg-green-100 text-green-600' },
    { id: 3, task: 'Pack Reseller Orders', time: '13:00 - 14:00', icon: <FiPackage />, color: 'bg-orange-100 text-orange-600' },
    { id: 4, task: 'Update New Product Photos', time: '15:00 - 16:00', icon: <FiCamera />, color: 'bg-purple-100 text-purple-600' },
    { id: 5, task: 'Review Customer Feedback', time: '16:30 - 17:30', icon: <FiStar />, color: 'bg-yellow-100 text-yellow-600' },
  ]

  const stats = [
    { title: 'Total Orders', value: totalOrders, icon: <FiShoppingCart />, change: '+12%', changeType: 'up', color: 'from-blue-500 to-blue-600' },
    { title: 'Total Products', value: totalProducts, icon: <FiPackage />, change: '+5%', changeType: 'up', color: 'from-purple-500 to-purple-600' },
    { title: 'Customers', value: customersData.length, icon: <FiUsers />, change: '+8%', changeType: 'up', color: 'from-green-500 to-green-600' },
    { title: 'Revenue', value: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`, icon: <FiDollarSign />, change: '+18%', changeType: 'up', color: 'from-pink-500 to-pink-600' },
  ]

  const recentOrders = transactionsData.slice(-5).reverse()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your store overview today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Last 30 days</span>
          <FiTrendingUp className="text-green-500" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group animate-slide-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  {stat.changeType === 'up' ? <FiArrowUp /> : <FiArrowDown />} {stat.change}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Columns: Completion Rate, Today's Schedule, Member Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Rate Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <h3 className="text-gray-500 text-sm mb-3 flex items-center gap-2">
            <FiTrendingUp className="text-[#F875AA]" /> Order Completion Rate
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 group">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="50" stroke="#FDEDED" strokeWidth="8" fill="none" />
                <circle 
                  cx="56" cy="56" r="50" 
                  stroke="#F875AA" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray={`${completionRate * 3.14} 314`} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#F875AA] group-hover:scale-110 transition-transform duration-300">
                {completionRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{completedOrders} of {totalOrders} orders completed</p>
            <div className="w-full mt-3 p-2 bg-green-50 rounded-lg text-center">
              <p className="text-green-600 text-xs font-medium">✓ On track for monthly target</p>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-500 text-sm flex items-center gap-2">
              <FiClock className="text-[#F875AA]" /> Today's Schedule
            </h3>
            <span className="text-xs bg-[#FDEDED] text-[#F875AA] px-2 py-0.5 rounded-full">{todaySchedule.length} tasks</span>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#F875AA] transition-colors">{item.task}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <button className="text-xs text-[#F875AA] opacity-0 group-hover:opacity-100 transition-opacity">Detail</button>
              </div>
            ))}
          </div>
        </div>

        {/* Member Rewards Card */}
        <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] rounded-2xl p-5 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl animate-bounce">✨</span>
                <h3 className="font-semibold text-lg">Member Rewards</h3>
              </div>
              <p className="text-white/90 text-xs mt-1">Get 20% off on your next purchase with min. 200 points!</p>
              <Link 
                to="/membership" 
                className="inline-flex items-center gap-2 mt-3 bg-white text-[#F875AA] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#FDEDED] transition-all duration-300 hover:shadow-lg group"
              >
                View Rewards 
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
            <div className="text-5xl animate-float">🎁</div>
          </div>
        </div>
      </div>

      {/* 2 Columns: Top Customers & Critical Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <FiStar className="text-[#F875AA]" /> Top Customers
            </h3>
            <Link to="/membership" className="text-xs text-[#F875AA] hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer, idx) => (
              <div key={customer.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-[#F875AA]'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-[#F875AA] transition-colors">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.tier} • {customer.orders} transactions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#F875AA]">{customer.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Stock */}
        <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <FiAlertCircle className="text-orange-500" /> Critical Stock
            </h3>
            <Link to="/products" className="text-xs text-[#F875AA] hover:underline">Manage stock →</Link>
          </div>
          {criticalStock.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FiPackage className="text-4xl mx-auto mb-2 opacity-50" />
              <p className="text-sm">No critical stock items</p>
            </div>
          ) : (
            <div className="space-y-3">
              {criticalStock.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-orange-50 transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">
                      {product.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-500">{product.stock} pcs</p>
                    <p className="text-xs text-gray-400">left</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {outOfStockProducts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-red-500 flex items-center gap-1">
                <FiAlertCircle /> {outOfStockProducts.length} product(s) out of stock
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4 animate-shake">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 animate-pulse">⚠️</div>
            <div>
              <p className="text-yellow-700 font-medium">Low Stock Alert</p>
              <p className="text-yellow-600 text-sm">
                {lowStockProducts.map(p => p.name).join(', ')} - Stock is running low! Please restock soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiShoppingCart className="text-[#F875AA]" />
            Recent Orders
          </h2>
          <Link to="/reports" className="text-[#F875AA] text-sm hover:underline flex items-center gap-1 group">
            View All 
            <FiEye className="group-hover:scale-110 transition-transform duration-200" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 rounded-lg">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Product</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Qty</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Total</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 group animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 group-hover:text-[#F875AA] transition-colors">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.productName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.quantity}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-[#F875AA]">Rp {order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-600 hover:bg-green-200' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-slide-in-up { animation: slideInUp 0.4s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}