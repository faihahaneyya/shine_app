import { useState, useRef, useEffect } from 'react'
import { FiSearch, FiBell, FiUser, FiUserCheck, FiLogOut, FiChevronDown, FiGrid, FiSun } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const formatName = (name) => {
    if (!name) return 'Admin'
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }

  const displayName = formatName(user.name)
  const initial = displayName.charAt(0)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
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

          {/* Notification */}
          <div className="relative">
            <button className="relative rounded-full p-2 hover:bg-gray-100 transition-all duration-300 hover:scale-110">
              <FiBell className="h-5 w-5 text-gray-500 hover:text-[#F875AA] transition-colors" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center animate-pulse">3</span>
            </button>
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
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-semibold">
                      {initial}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{displayName}</p>
                      <p className="text-xs text-[#F875AA]">Admin</p>
                    </div>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#FDEDED] hover:text-[#F875AA] transition-all duration-200 group">
                  <FiUserCheck className="group-hover:scale-110 transition-transform" /> <span className="text-sm">My Profile</span>
                </Link>
                <button onClick={() => { setIsDropdownOpen(false); handleLogout(); }} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition-all duration-200 group border-t border-gray-100">
                  <FiLogOut className="text-red-500 group-hover:rotate-180 transition-transform duration-300" /> <span className="text-sm text-red-500">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.4s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </header>
  )
}