import { FiShoppingCart, FiPackage, FiUsers, FiDollarSign, FiTrendingUp, FiEye, FiArrowUp, FiArrowDown, FiStar, FiClock, FiAlertCircle, FiUser, FiTruck, FiCamera, FiCheckSquare, FiPlus, FiMoreHorizontal, FiPieChart, FiBarChart2, FiCalendar, FiMessageSquare, FiBriefcase, FiTarget, FiX } from 'react-icons/fi'
import { MdOutlineCloudQueue } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('This Month')
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Data from the design
  const stats = [
    { title: 'Total Customers', value: '212', icon: <FiUsers />, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Vendors', value: '82', icon: <FiBriefcase />, color: 'from-green-500 to-green-600' },
    { title: 'Total Invoices', value: '132', icon: <FiDollarSign />, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Bills', value: '164', icon: <FiShoppingCart />, color: 'from-pink-500 to-pink-600' },
  ]

  const incomeExpense = {
    incomeToday: 0,
    expenseToday: 23,
    incomeThisMonth: 247,
    expenseThisMonth: 254,
    totalIncome: 365,
    totalExpense: 458
  }

  const chartData = {
    wednesday: { income: 1256, expense: 235 }
  }

  const accountBalances = [
    { id: 1, bank: 'Maybank', holderName: 'Cash', balance: 521611.20, status: 'Active' },
    { id: 2, bank: 'Ocbc Bank', holderName: 'Carissa', balance: 160156.00, status: 'Paused' },
    { id: 3, bank: 'RHB Bank', holderName: 'Renee', balance: 52229.00, status: 'Canceled' },
    { id: 4, bank: 'Public Bank', holderName: 'Preston', balance: 82786.00, status: 'Active' },
    { id: 5, bank: 'UOB Bank', holderName: 'Bowman', balance: 105150.00, status: 'Paused' },
    { id: 6, bank: 'Ambank', holderName: 'Wendy', balance: 5484.40, status: 'Canceled' },
  ]

  const progressData = [
    { label: 'On Going', percentage: 25, color: '#F875AA' },
    { label: 'On Hold', percentage: 32, color: '#FFB347' },
    { label: 'Finished', percentage: 68, color: '#4CAF50' },
  ]

  // Month options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleMonthSelect = (month) => {
    setSelectedMonth(month)
    setShowCalendarModal(false)
    alert(`Selected: ${month}\nData will be updated for this month.`)
  }

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
    <div className="space-y-6 animate-fade-in-up bg-gray-50 min-h-screen p-6">
      {/* Header with Breadcrumb */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="text-[#F875AA]">🏠</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-gray-700">Accounting</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Accounting Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* This Month Button with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowCalendarModal(!showCalendarModal)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-600 hover:shadow-md transition-all"
            >
              <FiCalendar /> {selectedMonth}
            </button>
            
            {/* Calendar Dropdown Modal */}
            {showCalendarModal && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-20 animate-fade-in">
                <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Select Month</span>
                  <button 
                    onClick={() => setShowCalendarModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(month)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedMonth === month 
                          ? 'bg-[#F875AA]/10 text-[#F875AA] font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setSelectedMonth('This Month')
                      setShowCalendarModal(false)
                      alert('Showing current month data')
                    }}
                    className="w-full text-center text-xs text-[#F875AA] hover:underline"
                  >
                    Reset to Current Month
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* New Transaction Button - Non-fungsional, hanya tampilan */}
          <button 
            className="bg-[#F875AA] text-white px-4 py-2 rounded-lg shadow-sm text-sm opacity-70 cursor-not-allowed flex items-center gap-1"
            disabled
          >
            <FiPlus className="text-sm" /> New Transaction
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {['Cashflow', 'Project', 'Manage Deals', 'CRM', 'Messenger', 'Settings'].map((item, idx) => (
          <button 
            key={idx}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              item === 'Cashflow' 
                ? 'bg-[#F875AA]/10 text-[#F875AA] border-b-2 border-[#F875AA]' 
                : 'text-gray-600 hover:text-[#F875AA] hover:bg-gray-50'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Income vs Expense and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-gray-600 font-medium mb-3 flex items-center gap-2">
              <FiTrendingUp className="text-[#F875AA]" /> Income vs Expense
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <span className="text-gray-500 text-sm">Expense Today</span>
                <span className="font-semibold text-red-500">Rp{incomeExpense.expenseToday.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <span className="text-gray-500 text-sm">Income This Month</span>
                <span className="font-semibold text-green-500">Rp{incomeExpense.incomeThisMonth.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <span className="text-gray-500 text-sm">Expense This Month</span>
                <span className="font-semibold text-red-500">Rp{incomeExpense.expenseThisMonth.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <span className="text-gray-500 text-sm">Total Income</span>
                <span className="font-semibold text-green-600">Rp{incomeExpense.totalIncome.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <span className="text-gray-500 text-sm">Total Expense</span>
                <span className="font-semibold text-red-600">Rp{incomeExpense.totalExpense.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Progress Circles */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-gray-600 font-medium mb-4">Project Progress</h3>
            <div className="flex flex-wrap justify-around gap-4">
              {progressData.map((item, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="#E5E7EB" strokeWidth="6" fill="none" />
                      <circle 
                        cx="40" cy="40" r="34" 
                        stroke={item.color} 
                        strokeWidth="6" 
                        fill="none" 
                        strokeDasharray={`${item.percentage * 2.13} 213.6`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out group-hover:opacity-80"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: item.color }}>
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart & Pie Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-600 font-medium flex items-center gap-2">
                <FiBarChart2 className="text-[#F875AA]" /> Financial Chart
              </h3>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="relative h-48">
              <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-40">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 w-12">
                    <div className="relative flex gap-1">
                      <div 
                        className="w-4 bg-[#F875AA] rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{ height: `${Math.random() * 80 + 40}px` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-[#F875AA] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Rp{(Math.random() * 500 + 100).toFixed(0).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div 
                        className="w-4 bg-[#AEDEFC] rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{ height: `${Math.random() * 60 + 20}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F875AA] rounded"></div>
                <span className="text-xs text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#AEDEFC] rounded"></div>
                <span className="text-xs text-gray-600">Expense</span>
              </div>
            </div>
          </div>

          {/* Pie Chart - Wednesday specific */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-600 font-medium flex items-center gap-2">
                <FiPieChart className="text-[#F875AA]" /> Wednesday Breakdown
              </h3>
              <span className="text-sm font-semibold text-gray-700">Income: Rp{chartData.wednesday.income.toLocaleString('id-ID')} | Expense: Rp{chartData.wednesday.expense.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="#F875AA" strokeWidth="20" fill="none" strokeDasharray="219.9 439.8" />
                  <circle cx="80" cy="80" r="70" stroke="#AEDEFC" strokeWidth="20" fill="none" strokeDasharray="219.9 439.8" strokeDashoffset="-219.9" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#F875AA]">84%</span>
                  <span className="text-xs text-gray-500">Income</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#F875AA] rounded"></div>
                  <span className="text-sm text-gray-600">Income: Rp{chartData.wednesday.income.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#AEDEFC] rounded"></div>
                  <span className="text-sm text-gray-600">Expense: Rp{chartData.wednesday.expense.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Balance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FiDollarSign className="text-[#F875AA]" />
            Account Balance
          </h2>
          <button className="text-[#F875AA] text-sm hover:underline flex items-center gap-1">
            <FiPlus /> Add Account
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">No</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Bank</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Holder Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Balance</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountBalances.map((account, idx) => (
                <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 group">
                  <td className="px-6 py-3 text-sm text-gray-600">{account.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-800">{account.bank}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{account.holderName}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-[#F875AA]">
                    Rp{account.balance.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      account.status === 'Active' ? 'bg-green-100 text-green-600' :
                      account.status === 'Paused' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-gray-400 hover:text-[#F875AA] transition-colors">
                      <FiMoreHorizontal />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Notes */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>📊 On Going: 25%</span>
            <span>⏸ On Hold: 32%</span>
            <span>✅ Finished: 68%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">Last updated: Today</span>
            <button className="text-[#F875AA] hover:underline text-xs">Refresh</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}