import { NavLink, useNavigate } from 'react-router-dom'
import { 
  FiHome, FiPackage, FiGift, FiBarChart2, FiLogOut, 
  FiUserCheck, FiMessageCircle, FiSettings, FiTrendingUp, 
  FiUsers, FiShoppingCart, FiGrid, FiChevronRight
} from 'react-icons/fi'

export default function Sidebar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <FiHome />, badge: null },
    { path: '/products', name: 'Products', icon: <FiPackage />, badge: '8' },
    { path: '/membership', name: 'Membership', icon: <FiGift />, badge: null },
    { path: '/reports', name: 'Reports', icon: <FiBarChart2 />, badge: 'New' },
    { path: '/testimonials', name: 'Testimonials', icon: <FiMessageCircle />, badge: '9' },
    { path: '/profile', name: 'Profile', icon: <FiUserCheck />, badge: null },
  ]

  const menuClass = ({ isActive }) =>
    `flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-[#F875AA] text-white shadow-md scale-[1.02]' 
        : 'text-gray-600 hover:bg-[#FDEDED] hover:text-[#F875AA] hover:translate-x-1'
    }`

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-[#FFFAF4] shadow-x5 flex flex-col z-30 animate-slide-in">
      {/* Logo Admin */}
      <div className="flex items-center gap-3 border-b border-[#FEFDED] px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] shadow-lg animate-pulse-gentle">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent">na_store</h1>
          <p className="text-xs text-gray-400">Admin Dashboard</p>
        </div>
      </div>

      {/* Menu Admin */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">MAIN MENU</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => menuClass({ isActive })}>
              <div className="flex items-center gap-3">
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full animate-bounce-subtle ${
                  item.badge === 'New' ? 'bg-green-500 text-white' : 'bg-[#F875AA] text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 pt-6 border-t border-[#FDEDED]">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">QUICK STATS</p>
          <div className="space-y-3">
            {[
              { icon: <FiUsers />, label: 'Total Customers', value: '1,234', change: '+12%' },
              { icon: <FiShoppingCart />, label: 'Total Orders', value: '156', change: '+8%' },
              { icon: <FiTrendingUp />, label: 'Revenue', value: 'Rp 12.4M', change: '+18%' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#FDEDED] rounded-xl p-3 hover:shadow-md transition-all duration-300 hover:translate-x-1 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-[#F875AA] group-hover:scale-110 transition-transform duration-200">{stat.icon}</div>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-800 font-bold">{stat.value}</span>
                    <span className="text-xs text-green-500 ml-1">{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 pt-6 border-t border-[#FDEDED]">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">CATEGORIES</p>
          <div className="space-y-2">
            {['Bracelets', 'Necklaces', 'Rings', 'Keychains'].map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-500 hover:bg-[#FDEDED] hover:text-[#F875AA] transition-all duration-200 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FiGrid className="text-[#F875AA] group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{cat}</span>
                </div>
                <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#F875AA]" />
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile Admin */}
      <div className="border-t border-[#FDEDED] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#FDEDED] to-[#FFF5E4] p-4 transition-all duration-300 hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white font-bold text-lg shadow-md animate-pulse-gentle">
            {user.name?.[0] || 'A'}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{user.name || 'Admin User'}</p>
            <p className="text-xs text-[#F875AA]">Administrator</p>
          </div>
          <FiSettings className="text-gray-400 hover:text-[#F875AA] cursor-pointer transition-all duration-200 hover:rotate-90" />
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-md group"
        >
          <FiLogOut className="group-hover:rotate-180 transition-transform duration-300" /> Logout
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseGentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        .animate-pulse-gentle { animation: pulseGentle 2s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounceSubtle 1s ease-in-out infinite; }
      `}</style>
    </aside>
  )
}