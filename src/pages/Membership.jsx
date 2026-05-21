import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import customersData from '../data/customers.json'

// Import komponen sesuai modul tugas
import PageContainer from '../components/PageContainer'
import FilterTabs from '../components/FilterTabs'
import CustomerCard from '../components/CustomerCard'
import BadgeStatus from '../components/BadgeStatus'
import Button from '../components/Button'
import Modal from '../components/Modal'

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

  const tierList = ['all', 'Diamond', 'Gold', 'Silver', 'Bronze']

  // Fungsi Filter Pencarian data pelanggan Na_store.id agar tidak hilang
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === 'all' || customer.tier === filterTier
    return matchesSearch && matchesTier
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Database CRM Pelanggan...</p>
        </div>
      </div>
    )
  }

  return (
    <PageContainer>
      {/* Judul Halaman */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Customer CRM & Membership</h1>
        <p className="text-xs text-gray-400 mt-0.5">Kelola tingkatan loyalitas dan poin reward pembeli aksesoris.</p>
      </div>

      {/* Bagian Toolbar Pencarian Utama */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:border-[#F875AA] focus:outline-none focus:bg-white transition-all"
          />
        </div>
        
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Filter Tiers:</p>
          <FilterTabs items={tierList} activeItem={filterTier} onItemSelect={(item) => setFilterTier(item)} />
        </div>
      </div>

      {/* Grid Iterasi CustomerCard yang sudah dibungkus Komponen <Card> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCustomers.map((customer, index) => (
          <CustomerCard 
            key={customer.id} 
            customer={customer} 
            delay={index * 30}
            onClick={() => {
              setSelectedCustomer(customer)
              setShowDetail(true)
            }}
          />
        ))}
      </div>

      {/* Modal Detail Saat Baris Data Ditekan */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Profil Detail Member CRM">
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#F875AA] text-white font-bold flex items-center justify-center text-lg">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{selectedCustomer.name}</h4>
                <p className="text-xs text-gray-400">{selectedCustomer.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs border-y border-gray-100 py-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Tingkat Keanggotaan:</span>
                <BadgeStatus status={selectedCustomer.tier} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Poin:</span>
                <span className="font-bold text-[#F875AA]">{selectedCustomer.points.toLocaleString()} Poin</span>
              </div>
            </div>
            <Button variant="primary" onClick={() => setShowDetail(false)}>
              Tutup Rincian
            </Button>
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}