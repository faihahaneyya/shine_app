import { Link } from 'react-router-dom'
import { FiHome, FiAlertTriangle } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EDFFFO] to-[#FDEDED] animate-fade-in">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="relative mb-6">
          <div className="text-8xl animate-bounce-subtle">🔍</div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#F875AA] rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-7xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] hover:from-[#F875AA]/90 hover:to-[#AEDEFC]/90 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 group"
          >
            <FiHome className="group-hover:scale-110 transition-transform" /> Back to Dashboard
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-8">Error 404 • Page not found</p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-bounce-subtle { animation: bounceSubtle 2s ease-in-out infinite; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  )
}