import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiX, FiCamera, FiShield, FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'))
  const [formData, setFormData] = useState({
    name: user.name || 'Zhefanya',
    email: user.email || 'zhefanya@nastore.id',
    phone: user.phone || '+62 812 3456 7890',
    address: user.address || 'Jl. Handmade No. 123, Creative District',
    joinDate: user.joinDate || 'January 2024',
    avatar: user.avatar || null,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const stats = [
    { label: 'Total Orders', value: '24', icon: <FiUser />, color: 'bg-[#F875AA]/10 text-[#F875AA]' },
    { label: 'Points Balance', value: `${user.points || 150} pts`, icon: <FiShield />, color: 'bg-[#AEDEFC]/10 text-[#AEDEFC]' },
    { label: 'Member Since', value: formData.joinDate, icon: <FiCalendar />, color: 'bg-green-100 text-green-600' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account information</p>
        </div>
        {saveSuccess && (
          <div className="bg-green-100 text-green-600 px-4 py-2 rounded-xl flex items-center gap-2 animate-slide-in-right">
            <FiCheckCircle /> Profile updated successfully!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md border border-[#FDEDED] overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="h-28 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] relative">
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            
            <div className="relative px-6 pb-6">
              <div className="flex justify-center -mt-12 mb-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-4xl text-white shadow-lg border-4 border-white ring-2 ring-[#F875AA]/20 group-hover:ring-4 transition-all duration-300">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      formData.name?.charAt(0) || 'Z'
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-[#F875AA] p-2 rounded-full text-white shadow-md hover:bg-[#F875AA]/80 transition-all duration-300 hover:scale-110">
                    <FiCamera size={12} />
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Administrator</p>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-3 py-1 bg-[#FDEDED] rounded-full text-xs text-[#F875AA] font-medium">
                    {user.points >= 500 ? 'Platinum' : user.points >= 200 ? 'Gold' : user.points >= 100 ? 'Silver' : 'Bronze'} Member
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#FDEDED] px-6 py-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((stat, idx) => (
                  <div key={idx} className="group hover:-translate-y-1 transition-all duration-300">
                    <div className={`${stat.color} p-2 rounded-xl inline-flex mb-2 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#FDEDED] p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white py-2.5 rounded-xl transition-all duration-300 font-medium group"
              >
                <FiUser className="group-hover:scale-110 transition-transform" /> Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-[#FDEDED] p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-[#F875AA] hover:text-[#F875AA]/80 transition-all duration-300 hover:gap-3"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:rotate-90"><FiX /></button>
                  <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300"><FiSave /> Save</button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {['name', 'email', 'phone', 'address'].map((field) => (
                <div key={field} className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-focus-within:text-[#F875AA] transition-colors">
                    {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : field === 'phone' ? 'Phone Number' : 'Address'}
                  </label>
                  {isEditing ? (
                    field === 'address' ? (
                      <textarea name={field} value={formData[field]} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent focus:bg-white transition-all duration-300" />
                    ) : (
                      <input type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} name={field} value={formData[field]} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent focus:bg-white transition-all duration-300" />
                    )
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-2.5 bg-[#FDEDED] rounded-xl group-hover:shadow-sm transition-all duration-300">
                      {field === 'name' ? <FiUser className="text-gray-400" /> : field === 'email' ? <FiMail className="text-gray-400" /> : field === 'phone' ? <FiPhone className="text-gray-400" /> : <FiMapPin className="text-gray-400" />}
                      <span>{formData[field]}</span>
                    </div>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 rounded-xl">
                  <FiCalendar className="text-gray-400" />
                  <span className="text-gray-600">{formData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-[#FDEDED] to-[#AEDEFC] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div><p className="font-semibold text-gray-800">💳 Payment Methods</p><p className="text-xs text-gray-500 mt-1">Manage your cards</p></div>
              <button className="text-[#F875AA] text-sm font-medium group-hover:translate-x-1 transition-transform">Manage →</button>
            </div>
            <div className="bg-gradient-to-r from-[#FDEDED] to-[#AEDEFC] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div><p className="font-semibold text-gray-800">📦 Order History</p><p className="text-xs text-gray-500 mt-1">View all orders</p></div>
              <button className="text-[#F875AA] text-sm font-medium group-hover:translate-x-1 transition-transform">View →</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
      `}</style>
    </div>
  )
}