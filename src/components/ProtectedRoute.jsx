import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ isAllowed, redirectTo = '/login' }) {
  const [showRedirect, setShowRedirect] = useState(false)

  useEffect(() => {
    if (!isAllowed) {
      // Sedikit delay agar animasi terlihat (opsional)
      const timer = setTimeout(() => {
        setShowRedirect(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isAllowed])

  if (!isAllowed) {
    if (showRedirect) {
      return <Navigate to={redirectTo} replace />
    }
    // Tampilkan loading singkat sebelum redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5E4] to-[#EDFFFO]">
        <div className="text-center animate-fade-in">
          <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#F875AA] text-sm animate-pulse">Redirecting to login...</p>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
          .animate-pulse { animation: pulse 1s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }

  return <Outlet />
}