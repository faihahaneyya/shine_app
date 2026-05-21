import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiHeart, FiSmile, FiShoppingBag, FiAward, FiStar, FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

// Menggunakan komponen bawaan lokal yang sudah terbukti ada di folder
import PageContainer from '../components/PageContainer'
import Card from '../components/Card'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function Profile() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'))
  const [formData, setFormData] = useState({
    name: user.name || 'Beyie',
    email: user.email || 'beyie@nastore.id',
    phone: user.phone || '+62 812 3456 7890',
    address: user.address || 'Jl. Handmade No. 123, Creative District',
    joinDate: user.joinDate || 'May 2026',
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loading />
      </div>
    )
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-6 p-2 animate-bounce-in">
        
        {/* Banner Alert Sukses yang Imut */}
        {saveSuccess && (
          <div className="bg-[#FDEDED] text-[#F875AA] px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold border-2 border-dashed border-[#F875AA]/30 shadow-sm justify-center animate-pulse">
            <FiSmile size={16} className="animate-spin" /> Yay! Profil kamu berhasil diperbarui dengan maniss! ✨
          </div>
        )}

        {/* Grid Utama (Kiri: Kartu Profil Imut, Kanan: Form Pastel) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* KOLOM KIRI - KARTU PROFIL IMUT (4 Kolom) */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-3xl border-2 border-[#FDEDED] shadow-sm overflow-hidden p-5 text-center relative group">
              {/* Dekorasi Aksen Love Menggemaskan */}
              <div className="absolute top-3 right-3 text-[#F875AA]/20 group-hover:text-[#F875AA]/50 transition-colors">
                <FiHeart size={20} fill="currentColor" />
              </div>
              
              {/* Lingkaran Avatar Super Cute dengan Efek Ring Ganda */}
              <div className="flex justify-center my-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-3xl font-black text-white shadow-md ring-4 ring-[#FDEDED] ring-offset-2 transform group-hover:rotate-12 transition-transform duration-300">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center justify-center gap-1">
                {formData.name} ✨
              </h2>
              <p className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md inline-block mt-1">
                Administrator
              </p>
              
              <div className="mt-4 px-4 py-1.5 bg-[#FDEDED] text-[#F875AA] text-xs font-extrabold rounded-full border border-[#F875AA]/20 tracking-wide inline-block">
                🎀 na_store Team 🎀
              </div>

              {/* Tombol Logout Minimalis Bulat */}
              <div className="border-t-2 border-dashed border-[#FDEDED] pt-4 mt-5">
                <div onClick={handleLogout} className="w-full">
                  <Button type="danger">
                    <span className="flex items-center justify-center gap-1.5 w-full text-xs font-bold py-0.5 tracking-wider uppercase">
                      <FiLogOut size={12} /> Log Out
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN - DATA STATISTIK & DATA FORM (8 Kolom) */}
          <div className="md:col-span-8 space-y-6">
            
            {/* 3 Blok Statistik Mini yang Menggemaskan */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#FFF5F5] p-3 rounded-2xl border border-[#F875AA]/20 shadow-sm text-center">
                <div className="w-8 h-8 rounded-full bg-white text-[#F875AA] flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                  <FiShoppingBag size={14} />
                </div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-tight">Orders</p>
                <p className="text-base font-black text-gray-800 mt-0.5">24</p>
              </div>

              <div className="bg-[#F0F8FF] p-3 rounded-2xl border border-[#AEDEFC]/40 shadow-sm text-center">
                <div className="w-8 h-8 rounded-full bg-white text-[#AEDEFC] flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                  <FiAward size={14} fill="currentColor" />
                </div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-tight">Points</p>
                <p className="text-base font-black text-gray-800 mt-0.5">{user.points || 150}</p>
              </div>

              <div className="bg-[#FFFDF0] p-3 rounded-2xl border border-yellow-200 shadow-sm text-center">
                <div className="w-8 h-8 rounded-full bg-white text-yellow-400 flex items-center justify-center mx-auto mb-1.5 shadow-sm">
                  <FiStar size={14} fill="currentColor" />
                </div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-tight">Tier</p>
                <p className="text-sm font-black text-gray-800 mt-1 truncate">Silver</p>
              </div>
            </div>

            {/* Kotak Informasi Utama */}
            <div className="bg-white rounded-3xl border-2 border-[#FDEDED] shadow-sm p-6">
              
              {/* Header Box Form */}
              <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-[#FDEDED] pb-4">
                <h3 className="font-black text-gray-800 text-sm tracking-wide uppercase flex items-center gap-1.5">
                  <span className="inline-block animate-bounce text-[#F875AA]">🌸</span> 
                  My Sweet Profile
                </h3>
                
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold text-[#F875AA] bg-[#FFF5F5] hover:bg-[#FDEDED] px-3 py-1.5 rounded-full border border-[#F875AA]/20 transition-all flex items-center gap-1"
                  >
                    ✏️ Edit Profil
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditing(false)} 
                      className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-xl transition-colors text-xs font-bold"
                    >
                      Batal
                    </button>
                    <div onClick={handleSave}>
                      <Button type="success">
                        <span className="text-xs px-2 font-bold">✨ Simpan</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tampilan Fields Input / Data */}
              <div className="space-y-4">
                {[
                  { id: 'name', label: 'Nama Lengkap', icon: <FiUser size={14} /> },
                  { id: 'email', label: 'Alamat Email', icon: <FiMail size={14} /> },
                  { id: 'phone', label: 'Nomor Ponsel', icon: <FiPhone size={14} /> },
                  { id: 'address', label: 'Alamat Rumah', icon: <FiMapPin size={14} /> }
                ].map((item) => (
                  <div key={item.id} className="space-y-1">
                    <label className="text-[10px] font-black text-[#F875AA] uppercase tracking-widest block ml-1">
                      {item.label}
                    </label>
                    
                    <div>
                      {isEditing ? (
                        item.id === 'address' ? (
                          <textarea
                            name={item.id}
                            value={formData[item.id]}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 text-sm border-2 border-[#FDEDED] rounded-2xl bg-[#FFF5F5]/20 focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA] transition-all font-medium text-gray-700"
                          />
                        ) : (
                          <input
                            type="text"
                            name={item.id}
                            value={formData[item.id]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border-2 border-[#FDEDED] rounded-2xl bg-[#FFF5F5]/20 focus:outline-none focus:ring-2 focus:ring-[#F875AA]/30 focus:border-[#F875AA] transition-all font-medium text-gray-700"
                          />
                        )
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#FFF5F5]/30 border border-[#FDEDED] rounded-2xl text-sm text-gray-700 font-bold hover:bg-[#FFF5F5]/60 transition-colors">
                          <span className="text-[#F875AA]/60">{item.icon}</span>
                          <span className="break-all">{formData[item.id]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Member Since Field */}
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                    Tanggal Bergabung
                  </label>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50/50 rounded-2xl text-sm text-gray-400 font-bold border border-gray-100">
                    <FiCalendar size={14} />
                    <span>{formData.joinDate}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Animasi Bounce Lucu */}
      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.95); }
          50% { transform: scale(1.01); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in { animation: bounceIn 0.4s ease-out forwards; }
      `}</style>
    </PageContainer>
  )
}