import { useState, useEffect } from 'react'
import { FiShoppingCart, FiUsers, FiDollarSign, FiBriefcase, FiCalendar, FiPlus, FiX, FiCheck } from 'react-icons/fi'

import PageContainer from '../components/PageContainer'
import StatCard from '../components/StatCard'
import BarChartFinancial from '../components/BarChartFinancial'
import PieChartBreakdown from '../components/PieChartBreakdown'
import DataTable from '../components/DataTable'
import BadgeStatus from '../components/BadgeStatus'
import Button from '../components/Button'
import Modal from '../components/Modal'

/* ─── Komponen Form Transaksi Baru ──────────────────────────────────── */
function NewTransactionForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    type: 'income',
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    bank: 'Maybank',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const categories = {
    income: ['Penjualan Produk', 'Pembayaran Invoice', 'Transfer Masuk', 'Refund', 'Lainnya'],
    expense: ['Pembelian Bahan Baku', 'Biaya Operasional', 'Gaji Karyawan', 'Biaya Pengiriman', 'Lainnya'],
  }

  const banks = ['Maybank', 'Ocbc Bank', 'RHB Bank', 'Public Bank', 'UOB Bank', 'Ambank']

  const validate = () => {
    const errs = {}
    if (!form.category) errs.category = 'Kategori wajib dipilih'
    if (!form.description.trim()) errs.description = 'Deskripsi wajib diisi'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Jumlah harus lebih dari 0'
    if (!form.date) errs.date = 'Tanggal wajib diisi'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    // Simulasi simpan (tanpa backend nyata)
    setTimeout(() => {
      setLoading(false)
      onSuccess({
        ...form,
        amount: Number(form.amount),
        id: Date.now(),
      })
    }, 900)
  }

  const field = (label, key, content, error) => (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5">{label}</label>
      {content}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipe Transaksi */}
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1.5">Tipe Transaksi</label>
        <div className="grid grid-cols-2 gap-2">
          {['income', 'expense'].map(t => (
            <button
              key={t} type="button"
              onClick={() => setForm(f => ({ ...f, type: t, category: '' }))}
              className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                form.type === t
                  ? t === 'income'
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {t === 'income' ? '📈 Pemasukan' : '📉 Pengeluaran'}
            </button>
          ))}
        </div>
      </div>

      {/* Kategori */}
      {field('Kategori', 'category',
        <select
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA]"
        >
          <option value="">-- Pilih Kategori --</option>
          {categories[form.type].map(c => <option key={c}>{c}</option>)}
        </select>,
        errors.category
      )}

      {/* Bank */}
      {field('Akun Bank',  'bank',
        <select
          value={form.bank}
          onChange={e => setForm(f => ({ ...f, bank: e.target.value }))}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA]"
        >
          {banks.map(b => <option key={b}>{b}</option>)}
        </select>
      )}

      {/* Deskripsi */}
      {field('Deskripsi Transaksi', 'description',
        <input
          type="text"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Contoh: Penjualan gelang silver batch #12"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA]"
        />,
        errors.description
      )}

      {/* Jumlah & Tanggal */}
      <div className="grid grid-cols-2 gap-3">
        {field('Jumlah (Rp)', 'amount',
          <input
            type="number"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            placeholder="0"
            min="1"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA]"
          />,
          errors.amount
        )}
        {field('Tanggal', 'date',
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA]"
          />,
          errors.date
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#F875AA] to-[#d64d8a] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#F875AA]/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Menyimpan...</>
          ) : (
            <><FiCheck />Simpan Transaksi</>
          )}
        </button>
      </div>
    </form>
  )
}

/* ─── Komponen Toast Notifikasi ─────────────────────────────────────── */
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])
  return (
    <div className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold animate-fade-in-up transition-all ${type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-rose-500'}`}>
      <span className="text-lg">{type === 'success' ? '✅' : '❌'}</span>
      {msg}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><FiX /></button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [showNewTransaction, setShowNewTransaction] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('This Month')
  const [toast, setToast] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { title: 'Total Customers', value: '212', icon: <FiUsers />, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Vendors', value: '82', icon: <FiBriefcase />, color: 'from-green-500 to-green-600' },
    { title: 'Total Invoices', value: String(132 + transactions.filter(t => t.type === 'income').length), icon: <FiDollarSign />, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Bills', value: String(164 + transactions.filter(t => t.type === 'expense').length), icon: <FiShoppingCart />, color: 'from-pink-500 to-pink-600' },
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

  const handleTransactionSuccess = (data) => {
    setTransactions(prev => [data, ...prev])
    setShowNewTransaction(false)
    setToast({ msg: `Transaksi ${data.type === 'income' ? 'pemasukan' : 'pengeluaran'} Rp${Number(data.amount).toLocaleString('id-ID')} berhasil disimpan!`, type: 'success' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Memuat Analisis Finansial Na_store.id...</p>
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Accounting Overview</h1>
          <p className="text-xs text-gray-400 mt-0.5">Ringkasan transaksi kas harian dan invoice ritel.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<FiCalendar />} onClick={() => setShowCalendarModal(true)}>
            {selectedMonth}
          </Button>
          {/* ✅ New Transaction — sekarang aktif */}
          <Button variant="primary" icon={<FiPlus />} onClick={() => setShowNewTransaction(true)}>
            New Transaction
          </Button>
        </div>
      </div>

      {/* Riwayat transaksi baru (jika ada) */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-[#FFF5E4] to-white">
            <p className="text-sm font-bold text-gray-700">📋 Transaksi Terbaru ({transactions.length})</p>
          </div>
          <div className="divide-y divide-gray-50">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${tx.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                    {tx.type === 'income' ? '📈' : '📉'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{tx.description}</p>
                    <p className="text-[11px] text-gray-400">{tx.category} · {tx.bank} · {tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}Rp{Number(tx.amount).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <StatCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} className="bg-white border border-gray-100 shadow-sm" />
        ))}
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><BarChartFinancial /></div>
        <div className="lg:col-span-1"><PieChartBreakdown income={247000} expense={23000} /></div>
      </div>

      {/* Tabel Saldo */}
      <DataTable
        title="Pemetaan Saldo Akun Perbankan Vendor"
        headers={['No', 'Nama Instansi Bank', 'Nama Pemegang Akun', 'Total Saldo Keuangan', 'Status Akun']}
      >
        {accountBalances.map((account) => (
          <tr key={account.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
            <td className="px-6 py-4 text-sm text-gray-500">{account.id}</td>
            <td className="px-6 py-4 text-sm font-semibold text-gray-800">{account.bank}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{account.holderName}</td>
            <td className="px-6 py-4 text-sm font-bold text-[#F875AA]">Rp{account.balance.toLocaleString('id-ID')}</td>
            <td className="px-6 py-4"><BadgeStatus status={account.status} /></td>
          </tr>
        ))}
      </DataTable>

      {/* Modal Pilih Bulan */}
      <Modal isOpen={showCalendarModal} onClose={() => setShowCalendarModal(false)} title="Saring Periode Pembukuan">
        <div className="grid grid-cols-3 gap-2">
          {months.map((month) => (
            <Button
              key={month}
              variant={selectedMonth === month ? 'primary' : 'secondary'}
              onClick={() => { setSelectedMonth(month); setShowCalendarModal(false) }}
              className="text-center justify-center text-xs py-2"
            >
              {month.substring(0, 3)}
            </Button>
          ))}
        </div>
      </Modal>

      {/* Modal New Transaction */}
      {showNewTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowNewTransaction(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-[#F875AA] to-[#d64d8a] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <div>
                  <p className="text-white font-bold text-sm">Tambah Transaksi Baru</p>
                  <p className="text-white/70 text-[11px]">Catat pemasukan atau pengeluaran bisnis</p>
                </div>
              </div>
              <button onClick={() => setShowNewTransaction(false)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
                <FiX />
              </button>
            </div>
            {/* Body Modal */}
            <div className="p-5">
              <NewTransactionForm onClose={() => setShowNewTransaction(false)} onSuccess={handleTransactionSuccess} />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifikasi */}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </PageContainer>
  )
}