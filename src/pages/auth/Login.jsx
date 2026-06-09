import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiLogIn, FiShield } from 'react-icons/fi'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [dataForm, setDataForm] = useState({ username: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validasi kredensial untuk beyie
    if (dataForm.username === 'beyie' && dataForm.password === 'beyiepass') {
      // Simulasi login sukses
      setTimeout(() => {
        // PERBAIKAN: Set item ke localStorage terlebih dahulu secara berurutan
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          name: 'Beyie',
          firstName: 'Beyie',
          lastName: '',
          email: 'beyie@nastore.id',
          points: 150,
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        }))
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', dataForm.username)
        }

        // PERBAIKAN: Matikan loading sebelum melakukan navigasi untuk mencegah tumpang tindih state
        setLoading(false)
        
        // PERBAIKAN: Navigasi dipanggil setelah data dipastikan aman di storage
        navigate('/')
      }, 500)
    } else {
      // Login gagal
      setError('Login failed! Username atau password salah. Gunakan "beyie" dan "beyiepass"')
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10 mb-4 animate-pulse-gentle">
          <FiShield className="text-2xl text-[#F875AA]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-2">Sign in to access admin dashboard</p>
      </div>

      {/* Error Alert dengan Animasi */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm animate-shake">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username Field */}
        <div className="group">
          <label className="block text-gray-700 text-sm font-medium mb-2 group-focus-within:text-[#F875AA] transition-colors">
            Username
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
            <input
              type="text"
              name="username"
              value={dataForm.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent bg-gray-50 transition-all duration-300 focus:bg-white"
              required
            />
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
            Demo: username "beyie"
          </p>
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
              placeholder="Enter your password"
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
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-gray-300 rounded-full"></span>
            Demo: password "beyiepass"
          </p>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#F875AA] focus:ring-[#F875AA] transition-all duration-200 group-hover:scale-110" 
            />
            <span className="text-sm text-gray-600 group-hover:text-[#F875AA] transition-colors">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-[#F875AA] hover:text-[#F875AA]/80 font-medium transition-all duration-200 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="relative w-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] hover:from-[#F875AA]/90 hover:to-[#AEDEFC]/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        >
          <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? <FiLoader className="animate-spin" /> : <FiLogIn />}
            {loading ? 'Signing in...' : 'Sign In'}
          </span>
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#F875AA] hover:text-[#F875AA]/80 font-semibold transition-all duration-200 hover:underline inline-flex items-center gap-1 group">
            Create Account
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </p>
      </div>

      {/* Admin Info */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
          <FiShield className="text-[#F875AA]" />
          Admin Access Only
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Demo: beyie / beyiepass
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        @keyframes pulseGentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-pulse-gentle { animation: pulseGentle 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}