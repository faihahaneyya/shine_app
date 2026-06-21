import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiLoader, FiUserPlus } from 'react-icons/fi'
import { userAPI } from '../../services/userAPI'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [dataForm, setDataForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (dataForm.password !== dataForm.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setLoading(true)

    try {
      const payload = {
        username: dataForm.name,
        email: dataForm.email,
        NoHp: dataForm.phone,
        password: dataForm.password,
        role: 'user'
      }

      await userAPI.registerUser(payload)

      // Tampilkan pesan sukses lalu arahkan ke halaman login
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Gagal mendaftar!')
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10 mb-4 animate-pulse-gentle">
          <FiUserPlus className="text-2xl text-[#F875AA]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-500 mt-2">Join our handmade community</p>
      </div>

      {/* Pesan Sukses Registrasi */}
      {success && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center animate-fade-in-up">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-emerald-700 font-bold text-sm">Akun berhasil dibuat!</p>
          <p className="text-emerald-600 text-xs mt-0.5">Mengalihkan ke halaman login...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Username
          </label>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type="text" 
              name="name" 
              value={dataForm.name} 
              onChange={handleChange} 
              placeholder="Your Username" 
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white" 
              required 
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Email Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type="email" 
              name="email" 
              value={dataForm.email} 
              onChange={handleChange} 
              placeholder="you@example.com" 
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white" 
              required 
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type="tel" 
              name="phone" 
              value={dataForm.phone} 
              onChange={handleChange} 
              placeholder="+62 812 3456 7890" 
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white" 
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Password Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={dataForm.password} 
              onChange={handleChange} 
              placeholder="Create password" 
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white" 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F875AA] transition-colors duration-200"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={dataForm.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirm password" 
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white" 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F875AA] transition-colors duration-200"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
        </div>

        {/* Password Strength Indicator (optional) */}
        {dataForm.password && (
          <div className="mt-1">
            <div className="flex gap-1 h-1">
              <div className={`flex-1 rounded-full transition-all duration-300 ${dataForm.password.length >= 6 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 rounded-full transition-all duration-300 ${dataForm.password.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 rounded-full transition-all duration-300 ${/[A-Z]/.test(dataForm.password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 rounded-full transition-all duration-300 ${/[0-9]/.test(dataForm.password) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Use 8+ chars with letters & numbers</p>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="relative w-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] hover:from-[#F875AA]/90 hover:to-[#AEDEFC]/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group mt-4"
        >
          <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? <FiLoader className="animate-spin" /> : <FiUserPlus />}
            {loading ? 'Creating account...' : 'Create Account'}
          </span>
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-[#F875AA] hover:text-[#F875AA]/80 font-semibold transition-all duration-200 hover:underline inline-flex items-center gap-1 group">
            Sign In
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </p>
      </div>

      {/* Terms Info */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="text-[#F875AA] hover:underline">Terms</a> and{" "}
          <a href="#" className="text-[#F875AA] hover:underline">Privacy Policy</a>
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseGentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}