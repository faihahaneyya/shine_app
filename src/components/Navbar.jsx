import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiBell, FiUser, FiUserCheck, FiLogOut, FiChevronDown, FiGrid, FiSun, FiShoppingBag, FiInfo, FiCheckCircle } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
// Import resmi komponen Popover Shadcn
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

export default function Navbar() {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false) // State penampung buka-tutup lonceng
  
  const dropdownRef = useRef(null)
  const bellRef = useRef(null) // Ref tambahan untuk area deteksi luar lonceng
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const formatName = (name) => {
    if (!name) return 'Admin'
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }

  const displayName = formatName(user.name)
  const initial = displayName.charAt(0)

  // Data Dummy Notifikasi sinkron dengan tugas CRM na_store
  const notifications = [
    {
      id: 1,
      title: 'Pesanan Baru Masuk!',
      desc: 'Nadia Rahma memesan Kalung Titanium Rosegold.',
      time: '2 menit yang lalu',
      icon: <FiShoppingBag className="text-pink-500" />,
      bg: 'bg-pink-50'
    },
    {
      id: 2,
      title: 'Stok Hampir Habis',
      desc: 'Sisa stok untuk Gelang Silver Charm tinggal 2 pcs.',
      time: '1 jam yang lalu',
      icon: <FiInfo className="text-amber-500" />,
      bg: 'bg-amber-50'
    },
    {
      id: 3,
      title: 'Pembayaran Diterima',
      desc: 'Siti Sarah telah menyelesaikan pembayaran Rp 175.000.',
      time: '3 jam yang lalu',
      icon: <FiCheckCircle className="text-emerald-500" />,
      bg: 'bg-emerald-50'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Menutup Dropdown Profil jika klik di luar
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      // Menutup Popover Lonceng jika klik di luar
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl animate-fade-in-down">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <FiGrid className="text-gray-400 text-xl group-hover:text-[#F875AA] group-hover:rotate-90 transition-all duration-300" />
          <h2 className="text-lg font-semibold text-gray-700 group-hover:text-[#F875AA] transition-colors duration-300">Admin Overview</h2>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-4">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:text-[#F875AA]" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm focus:border-[#F875AA] focus:outline-none focus:ring-2 focus:ring-[#F875AA]/20 focus:bg-white transition-all duration-300 peer"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button className="rounded-full p-2 hover:bg-gray-100 transition-all duration-300 hover:rotate-12">
            <FiSun className="h-5 w-5 text-gray-500 hover:text-[#F875AA] transition-colors" />
          </button>

          {/* Notification Lonceng dengan Popover Shadcn */}
          <div className="relative" ref={bellRef}>
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <button className="relative rounded-full p-2 hover:bg-gray-100 transition-all duration-300 hover:scale-110 group">
                  <FiBell className="h-5 w-5 text-gray-500 group-hover:text-[#F875AA] group-hover:animate-swing transition-colors" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#F875AA] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {notifications.length}
                  </span>
                </button>
              </PopoverTrigger>

              {/* Kotak Dropdown Isi Notifikasi Custom Pink Soft */}
              <PopoverContent className="w-80 bg-white border border-[#FDEDED] rounded-2xl shadow-xl p-0 z-50 overflow-hidden mt-2 animate-fade-in-up">
                <div className="bg-gradient-to-r from-[#FFF5E4] to-[#FFFAF4] px-4 py-3 border-b border-[#FDEDED] flex items-center justify-between">
                  <span className="font-bold text-gray-800 text-xs tracking-wide">Notifikasi Toko</span>
                  <span className="text-[9px] font-bold text-[#F875AA] bg-white border border-[#FDEDED] px-2 py-0.5 rounded-full uppercase">
                    {notifications.length} Info
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-[#FDEDED]/40">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 flex gap-3 hover:bg-[#FDEDED]/10 transition-colors duration-200 cursor-pointer group/item">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${notif.bg}`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-gray-800 group-hover\/item:text-[#F875AA] transition-colors truncate">{notif.title}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-normal line-clamp-2">{notif.desc}</p>
                        <span className="text-[9px] text-gray-400 block mt-1 font-medium">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full text-center py-2 bg-[#FFFAF4] border-t border-[#FDEDED] text-[10px] font-bold text-gray-500 hover:text-[#F875AA] transition-colors">
                  Tandai Semua Telah Dibaca
                </button>
              </PopoverContent>
            </Popover>
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#F875AA] transition-colors">{displayName}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-semibold shadow-md text-lg transition-all duration-300 group-hover:scale-110">
                {initial || 'A'}
              </div>
              <FiChevronDown className={`hidden md:block text-gray-400 transition-all duration-300 group-hover:text-[#F875AA] ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-[#FDEDED] to-[#FFF5E4]">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.name || 'Admin User'}</p>
                  <p className="text-xs text-[#F875AA] mt-0.5 truncate">{user.email || 'admin@na_store.id'}</p>
                </div>
                <div className="p-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-[#FDEDED] hover:text-[#F875AA] transition-all"
                  >
                    <FiUser className="text-base" /> My Profile
                  </Link>
                  <Link
                    to="/komponen"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <FiUserCheck className="text-base" /> Tugas Komponen
                  </Link>
                </div>
                <div className="p-1 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 rounded-lg hover:bg-red-50 transition-all"
                  >
                    <FiLogOut className="text-base" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Tambahan animasi goyang ikon lonceng */}
      <style>{`
        @keyframes bellSwing {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        .group:hover .group-hover\\:animate-swing {
          animation: bellSwing 0.6s ease-in-out;
        }
      `}</style>
    </header>
  )
}