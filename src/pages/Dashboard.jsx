import { useState, useEffect } from 'react'
import { FiShoppingCart, FiUsers, FiDollarSign, FiBriefcase, FiCalendar, FiPlus } from 'react-icons/fi'

// Import Komponen Nyata dari Proyek Anda
import PageContainer from '../components/PageContainer'
import StatCard from '../components/StatCard' 
import BarChartFinancial from '../components/BarChartFinancial'
import PieChartBreakdown from '../components/PieChartBreakdown'
import DataTable from '../components/DataTable'
import BadgeStatus from '../components/BadgeStatus'
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('This Month')
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { title: 'Total Customers', value: '212', icon: <FiUsers />, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Vendors', value: '82', icon: <FiBriefcase />, color: 'from-green-500 to-green-600' },
    { title: 'Total Invoices', value: '132', icon: <FiDollarSign />, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Bills', value: '164', icon: <FiShoppingCart />, color: 'from-pink-500 to-pink-600' },
  ]

  const accountBalances = [
    { id: 1, bank: 'Maybank', holderName: 'Cash', balance: 521611.20, status: 'Active' },
    { id: 2, bank: 'Ocbc Bank', holderName: 'Carissa', balance: 160156.00, status: 'Paused' },
    { id: 3, bank: 'RHB Bank', holderName: 'Renee', balance: 52229.00, status: 'Canceled' },
    { id: 4, bank: 'Public Bank', holderName: 'Preston', balance: 82786.00, status: 'Active' },
    { id: 5, bank: 'UOB Bank', holderName: 'Bowman', balance: 105150.00, status: 'Paused' },
    { id: 6, bank: 'Ambank', holderName: 'Wendy', balance: 5484.40, status: 'Canceled' },
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Memuat Analisis Finansial Na_store.id...</p>
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      {/* Header Top Bar */}
      <div className="flex justify-between items-center flex-wrap gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Accounting Overview</h1>
          <p className="text-xs text-gray-400 mt-0.5">Ringkasan transaksi kas harian dan invoice ritel.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<FiCalendar />} onClick={() => setShowCalendarModal(true)}>
            {selectedMonth}
          </Button>
          <Button variant="primary" icon={<FiPlus />} disabled={true}>
            New Transaction
          </Button>
        </div>
      </div>

      {/* PERBAIKAN 1: Sekarang Menggunakan Komponen StatCard (Sesuai Materi) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            // Kirim warna gradasi ke custom class StatCard jika komponen mendukungnya
            className="bg-white border border-gray-100 shadow-sm" 
          />
        ))}
      </div>

      {/* Grafik Finansial Campuran */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChartFinancial />
        </div>
        <div className="lg:col-span-1">
          <PieChartBreakdown income={247000} expense={23000} />
        </div>
      </div>

      {/* Tabel Saldo Perbankan */}
      <DataTable 
        title="Pemetaan Saldo Akun Perbankan Vendor" 
        headers={['No', 'Nama Instansi Bank', 'Nama Pemegang Akun', 'Total Saldo Keuangan', 'Status Akun']}
      >
        {accountBalances.map((account) => (
          <tr key={account.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
            <td className="px-6 py-4 text-sm text-gray-500">{account.id}</td>
            <td className="px-6 py-4 text-sm font-semibold text-gray-800">{account.bank}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{account.holderName}</td>
            <td className="px-6 py-4 text-sm font-bold text-[#F875AA]">
              Rp{account.balance.toLocaleString('id-ID')}
            </td>
            <td className="px-6 py-4">
              <BadgeStatus status={account.status} />
            </td>
          </tr>
        ))}
      </DataTable>

      {/* Modal Filter */}
      <Modal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)} title="Saring Periode Pembukuan">
        <div className="grid grid-cols-3 gap-2">
          {months.map((month) => (
            /* PERBAIKAN 2: Menggunakan Komponen <Button> Atomik, bukan tag <button> mentah */
            <Button
              key={month}
              variant={selectedMonth === month ? 'primary' : 'secondary'}
              onClick={() => { setSelectedMonth(month); setShowCalendarModal(false); }}
              className="text-center justify-center text-xs py-2"
            >
              {month.substring(0, 3)}
            </Button>
          ))}
        </div>
      </Modal>
    </PageContainer>
  )
}