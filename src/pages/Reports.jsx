import { useState, useEffect } from 'react'
import { FiDownload, FiTrendingUp, FiTrendingDown, FiShoppingCart, FiBarChart2, FiRepeat, FiCornerDownLeft, FiAward } from 'react-icons/fi'
import transactionsData from '../data/transactions.json'
import productsData from '../data/products.json'

// IMPORT SEUA KOMPONEN SINKRONISASI DARI FOLDERMU
import PageContainer from '../components/PageContainer'
import StatCard from '../components/StatCard'
import DataTable from '../components/DataTable'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('2025-04')
  const [selectedYear, setSelectedYear] = useState('2025') 
  const [isLoading, setIsLoading] = useState(true)
  const [animatedHeights, setAnimatedHeights] = useState([])
  const [chartReady, setChartReady] = useState(false)

  // Perhitungan Data (100% utuh tidak ada yang dikurangi)
  const totalRevenue = transactionsData.reduce((sum, t) => sum + t.total, 0)
  const totalOrders = transactionsData.length
  const averageOrder = totalRevenue / totalOrders

  const returnedOrders = transactionsData.filter(t => t.status === 'Cancelled').length
  const returnRate = ((returnedOrders / totalOrders) * 100).toFixed(0)

  const customerOrders = {}
  transactionsData.forEach(t => {
    if (t.customerName) {
      customerOrders[t.customerName] = (customerOrders[t.customerName] || 0) + 1
    }
  })
  const repeatCustomers = Object.values(customerOrders).filter(count => count > 1).length
  const repeatRate = ((repeatCustomers / Object.keys(customerOrders).length) * 100).toFixed(0)

  const completedOrders = transactionsData.filter(t => t.status === 'Completed').length
  const commercialRate = ((completedOrders / totalOrders) * 100).toFixed(0)

  const productSales = {}
  transactionsData.forEach(t => {
    if (!productSales[t.productName]) productSales[t.productName] = { quantity: 0, revenue: 0 }
    productSales[t.productName].quantity += t.quantity
    productSales[t.productName].revenue += t.total
  })

  const bestSelling = Object.entries(productSales).map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  const monthlyData = {}
  transactionsData.forEach(t => {
    const month = t.date.substring(0, 7)
    if (!monthlyData[month]) monthlyData[month] = { revenue: 0, orders: 0 }
    monthlyData[month].revenue += t.total
    monthlyData[month].orders += 1
  })

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const chartData = months.map((month, idx) => {
    const monthKey = `2025-${String(idx + 1).padStart(2, '0')}`
    return {
      month,
      revenue: monthlyData[monthKey]?.revenue || 0,
      orders: monthlyData[monthKey]?.orders || 0
    }
  })

  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1)

  const currentMonthData = monthlyData[selectedMonth] || { revenue: 0, orders: 0 }
  const lastMonthData = monthlyData['2025-03'] || { revenue: 0, orders: 0 }
  const revenueChange = lastMonthData.revenue ? ((currentMonthData.revenue - lastMonthData.revenue) / lastMonthData.revenue * 100).toFixed(1) : 0

  const statusCount = {
    Completed: completedOrders,
    Pending: transactionsData.filter(t => t.status === 'Pending').length,
    Cancelled: returnedOrders,
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        const heights = chartData.map(data => (data.revenue / maxRevenue) * 100)
        setAnimatedHeights(heights)
        setChartReady(true)
      }, 50)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loading />
      </div>
    )
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span className="text-[#F875AA]">Dashboard</span>
              <span>/</span>
              <span>Sales Trends</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Sales Trends</h1>
            <p className="text-gray-500 mt-1">Monitor sales performance by period</p>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className="border border-gray-200 p-2 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA] cursor-pointer"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <Button variant="primary" icon={<FiDownload />}>
              Export
            </Button>
          </div>
        </div>

        {/* SEKARANG SUDAH BEDA: Menggunakan Komponen StatCard bawaan tokomu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            title="Commercial"
            value={`${commercialRate}%`}
            icon={<FiShoppingCart className="text-blue-500 text-xl" />}
            className="bg-white border border-[#FDEDED]"
          />
          <StatCard
            title="Repeat Order"
            value={`${repeatRate}%`}
            icon={<FiRepeat className="text-green-500 text-xl" />}
            className="bg-white border border-[#FDEDED]"
          />
          <StatCard
            title="Return"
            value={`${returnRate}%`}
            icon={<FiCornerDownLeft className="text-red-500 text-xl" />}
            className="bg-white border border-[#FDEDED]"
          />
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FiBarChart2 className="text-[#F875AA]" /> Sales Chart {selectedYear}
            </h2>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} 
              className="border border-gray-200 p-2 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA] cursor-pointer"
            >
              <option value="">All Months</option>
              {Object.keys(monthlyData).map(month => <option key={month} value={month}>{month}</option>)}
            </select>
          </div>
          
          <div className="h-80 flex items-end gap-2">
            {chartData.map((data, idx) => {
              const heightPercent = chartReady ? animatedHeights[idx] || 0 : (data.revenue / maxRevenue) * 100
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-[#FDEDED] rounded-t-lg relative h-64 overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#F875AA] to-[#AEDEFC] rounded-t-lg transition-all duration-700 ease-out hover:opacity-90"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-10">
                        Rp {(data.revenue / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{data.month}</span>
                </div>
              )
            })}
          </div>
          
          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400 pt-4 border-t border-[#FDEDED]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F875AA] rounded-full"></div>
              <span>Revenue (Rp Million)</span>
            </div>
          </div>
        </div>

        {/* 2 Columns: Top Products & KPI Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* SEKARANG SUDAH BEDA: Menggunakan Komponen DataTable bawaan tokomu */}
          <DataTable 
            title="Top Selling Products" 
            headers={['Rank', 'Product Name', 'Quantity', 'Progress Metric']}
          >
            {bestSelling.map((product, idx) => {
              const maxQty = bestSelling[0]?.quantity || 1
              const percent = (product.quantity / maxQty) * 100
              return (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                  <td className="px-6 py-4 text-sm font-bold text-gray-500">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-amber-600' : 'bg-[#F875AA]'}`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#F875AA]">{product.quantity} pcs</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                    </div>
                  </td>
                </tr>
              )}
            )}
          </DataTable>

          {/* KPI Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-[#F875AA]" /> Key Performance Indicators
            </h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Commercial</span>
                  <span className="text-sm font-semibold text-blue-600">{commercialRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${commercialRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Repeat Order</span>
                  <span className="text-sm font-semibold text-green-600">{repeatRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${repeatRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Return</span>
                  <span className="text-sm font-semibold text-red-600">{returnRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-red-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${returnRate}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#FDEDED] grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-[#F875AA]">{totalOrders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F875AA]">{completedOrders}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F875AA]">{repeatCustomers}</p>
                <p className="text-xs text-gray-500">Loyal Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FDEDED] hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span> Order Status Distribution
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">✅</div>
              <p className="text-green-600 font-semibold">Completed</p>
              <p className="text-2xl font-bold text-green-600">{statusCount.Completed}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">⏳</div>
              <p className="text-yellow-600 font-semibold">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCount.Pending}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">❌</div>
              <p className="text-red-600 font-semibold">Cancelled / Return</p>
              <p className="text-2xl font-bold text-red-600">{statusCount.Cancelled}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}